import { Client } from 'pg';
import { faker } from '@faker-js/faker';

// Connection to the local Supabase instance
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres';

// Batch size for inserts
const BATCH_SIZE = 2000;

// Config
const TOTAL_TEACHERS = 50;
const TOTAL_STUDENTS = 5000;
const TOTAL_COURSES = 300;
const TOTAL_ENROLLMENTS = 40000;
const ASSIGNMENTS_PER_COURSE = 4; // ~1200 assignments total
const TOTAL_SUBMISSIONS = 100000;

const client = new Client({ connectionString: DATABASE_URL });

/**
 * Utility to execute batch inserts
 */
async function insertBatch(table: string, columns: string[], rows: any[][]) {
  if (rows.length === 0) return;
  const colString = columns.join(', ');
  
  // Create value placeholders like ($1, $2), ($3, $4)
  const placeholders = [];
  const flatValues = [];
  let paramIndex = 1;

  for (const row of rows) {
    const rowPlaceholders = [];
    for (const val of row) {
      rowPlaceholders.push(`$${paramIndex++}`);
      flatValues.push(val);
    }
    placeholders.push(`(${rowPlaceholders.join(', ')})`);
  }

  const query = `INSERT INTO ${table} (${colString}) VALUES ${placeholders.join(', ')} ON CONFLICT DO NOTHING RETURNING id`;
  const res = await client.query(query, flatValues);
  return res.rows.map((r: any) => r.id);
}

async function main() {
  await client.connect();
  console.log('Connected to database. Starting seed...');

  try {
    // Clean existing data for idempotency
    await client.query('TRUNCATE TABLE users, courses, enrollments, assignments, submissions, grades, notifications CASCADE');
    console.log('Truncated existing tables.');

    // 1. GENERATE TEACHERS
    console.log(`Generating ${TOTAL_TEACHERS} teachers...`);
    const teacherRows = Array.from({ length: TOTAL_TEACHERS }).map(() => [
      faker.string.uuid(),
      faker.person.fullName(),
      faker.internet.email(),
      faker.internet.password(), // mocked hash
      'teacher'
    ]);
    const teacherIds = await insertBatch('users', ['id', 'name', 'email', 'password_hash', 'role'], teacherRows);

    // 2. GENERATE STUDENTS
    console.log(`Generating ${TOTAL_STUDENTS} students...`);
    const studentIds: string[] = [];
    for (let i = 0; i < TOTAL_STUDENTS; i += BATCH_SIZE) {
      const batch = Array.from({ length: Math.min(BATCH_SIZE, TOTAL_STUDENTS - i) }).map(() => [
        faker.string.uuid(),
        faker.person.fullName(),
        faker.internet.email(),
        faker.internet.password(),
        'student'
      ]);
      const inserted = await insertBatch('users', ['id', 'name', 'email', 'password_hash', 'role'], batch);
      if (inserted) studentIds.push(...inserted);
      console.log(`  Inserted ${studentIds.length}/${TOTAL_STUDENTS} students`);
    }

    // 3. GENERATE COURSES
    console.log(`Generating ${TOTAL_COURSES} courses...`);
    const courseRows = Array.from({ length: TOTAL_COURSES }).map(() => [
      faker.string.uuid(),
      faker.company.catchPhrase() + ' Course',
      faker.lorem.paragraph(),
      faker.helpers.arrayElement(teacherIds) // Random teacher
    ]);
    const courseIds = await insertBatch('courses', ['id', 'title', 'description', 'teacher_id'], courseRows);

    // 4. GENERATE ENROLLMENTS
    console.log(`Generating ${TOTAL_ENROLLMENTS} enrollments...`);
    // Ensure unique student_id + course_id pairs
    const enrollmentPairs = new Set<string>();
    const enrollmentsByCourse = new Map<string, string[]>(); // courseId -> studentId[]
    
    while (enrollmentPairs.size < TOTAL_ENROLLMENTS) {
      const studentId = faker.helpers.arrayElement(studentIds);
      const courseId = faker.helpers.arrayElement(courseIds);
      const pair = `${studentId}:${courseId}`;
      
      if (!enrollmentPairs.has(pair)) {
        enrollmentPairs.add(pair);
        if (!enrollmentsByCourse.has(courseId)) enrollmentsByCourse.set(courseId, []);
        enrollmentsByCourse.get(courseId)!.push(studentId);
      }
    }

    const enrollmentRows = Array.from(enrollmentPairs).map(pair => {
      const [studentId, courseId] = pair.split(':');
      return [faker.string.uuid(), studentId, courseId];
    });

    for (let i = 0; i < enrollmentRows.length; i += BATCH_SIZE) {
      const batch = enrollmentRows.slice(i, i + BATCH_SIZE);
      await insertBatch('enrollments', ['id', 'student_id', 'course_id'], batch);
      console.log(`  Inserted ${Math.min(i + BATCH_SIZE, enrollmentRows.length)}/${TOTAL_ENROLLMENTS} enrollments`);
    }

    // 5. GENERATE ASSIGNMENTS
    console.log(`Generating assignments (~${TOTAL_COURSES * ASSIGNMENTS_PER_COURSE})...`);
    const assignmentRows = [];
    const assignmentsByCourse = new Map<string, string[]>();

    for (const courseId of courseIds) {
      const courseAssignments = [];
      for (let i = 0; i < ASSIGNMENTS_PER_COURSE; i++) {
        const id = faker.string.uuid();
        courseAssignments.push(id);
        assignmentRows.push([
          id,
          courseId,
          `Assignment: ${faker.lorem.words(3)}`,
          faker.lorem.sentences(2),
          faker.system.filePath(),
          faker.date.future()
        ]);
      }
      assignmentsByCourse.set(courseId, courseAssignments);
    }
    await insertBatch('assignments', ['id', 'course_id', 'title', 'description', 'file_url', 'due_date'], assignmentRows);

    // 6. GENERATE SUBMISSIONS (And corresponding grades)
    console.log(`Generating ${TOTAL_SUBMISSIONS} submissions and grades...`);
    const submissionPairs = new Set<string>(); // assignment_id:student_id
    const submissionRows = [];
    const gradeRows = [];

    // Find valid assignment/student combinations from enrollments
    const validPairs: { assignmentId: string, studentId: string, courseId: string }[] = [];
    for (const courseId of courseIds) {
      const enrolled = enrollmentsByCourse.get(courseId) || [];
      const assignments = assignmentsByCourse.get(courseId) || [];
      
      for (const studentId of enrolled) {
        for (const assignmentId of assignments) {
          validPairs.push({ assignmentId, studentId, courseId });
        }
      }
    }

    // Shuffle and slice the exact amount we need
    const selectedPairs = faker.helpers.shuffle(validPairs).slice(0, TOTAL_SUBMISSIONS);

    for (const pair of selectedPairs) {
      const subId = faker.string.uuid();
      const status = faker.helpers.arrayElement(['pending', 'processing', 'graded']);
      
      submissionRows.push([
        subId,
        pair.assignmentId,
        pair.studentId,
        faker.system.filePath(),
        status
      ]);

      if (status === 'graded') {
        const teacherId = faker.helpers.arrayElement(teacherIds); // mock the teacher who graded it
        gradeRows.push([
          faker.string.uuid(),
          subId,
          teacherId,
          faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
          faker.lorem.sentence()
        ]);
      }
    }

    for (let i = 0; i < submissionRows.length; i += BATCH_SIZE) {
      const subBatch = submissionRows.slice(i, i + BATCH_SIZE);
      await insertBatch('submissions', ['id', 'assignment_id', 'student_id', 'file_url', 'status'], subBatch);
      console.log(`  Inserted ${Math.min(i + BATCH_SIZE, submissionRows.length)}/${TOTAL_SUBMISSIONS} submissions`);
    }

    // Insert grades for the graded submissions
    console.log(`Generating ${gradeRows.length} grades...`);
    for (let i = 0; i < gradeRows.length; i += BATCH_SIZE) {
      const gradeBatch = gradeRows.slice(i, i + BATCH_SIZE);
      await insertBatch('grades', ['id', 'submission_id', 'grader_id', 'score', 'feedback'], gradeBatch);
    }

    console.log('✅ Seed completed successfully!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await client.end();
  }
}

main();
