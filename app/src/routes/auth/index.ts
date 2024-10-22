import {corsConfig } from '@libs/cors-config'
const Auth = {
    login: {
        handler : 'src/routes/auth/Login/handler.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: '/auth/login',
                    cors: corsConfig,
                }
            }

        ]
    },
    register: {
        handler : 'src/routes/auth/Register/handler.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: '/auth/register',
                    cors: corsConfig,
                }
            }

        ]
    },
};

export default Auth;