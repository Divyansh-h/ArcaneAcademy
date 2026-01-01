export const config = {
    api: {
        baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
        endpoints: {
            auth: {
                login: '/auth/login',
                register: '/auth/register',
            },
            users: '/users',
            grading: {
                submissions: (id: string) => `/grading/submissions/${id}/grade`,
                assignments: '/grading/assignments',
            }
        }
    },
    features: {
        demoMode: import.meta.env.VITE_DEMO_MODE === 'true',
    }
};
