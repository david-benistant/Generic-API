import {corsConfig } from '@libs/cors-config'
const Files = {
    putFile: {
        handler : 'src/routes/files/Put/handler.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: '/file',
                    cors: corsConfig,
                }
            }
        ]
    },
    getFile: {
        handler : 'src/routes/files/Get/handler.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: '/file/{fileKey}',
                    cors: corsConfig,
                }
            }
        ]
    },
    downloadFile: {
        handler : 'src/routes/files/Download/handler.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: '/file/{fileKey}/download',
                    cors: corsConfig,
                }
            }
        ]
    },
    delFile: {
        handler : 'src/routes/files/Delete/handler.handler',
        events: [
            {
                http: {
                    method: 'delete',
                    path: '/file/{fileKey}',
                    cors: corsConfig,
                }
            }
        ]
    },
};

export default Files;