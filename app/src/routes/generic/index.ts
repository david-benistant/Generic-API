import {corsConfig } from '@libs/cors-config'
const Generic = {
    createGeneric: {
        handler : 'src/routes/generic/Create/handler.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: '/generic',
                    cors: corsConfig,
                }
            }
        ]
    },
    listGeneric: {
        handler : 'src/routes/generic/List/handler.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: '/generic',
                    cors: corsConfig,
                }
            }
        ]
    },
    searchGeneric: {
        handler : 'src/routes/generic/Search/handler.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: '/generic/search',
                    cors: corsConfig,
                }
            }
        ]
    },
    getGeneric: {
        handler : 'src/routes/generic/Get/handler.handler',
        events: [
            {
                http: {
                    method: 'get',
                    path: '/generic/{genericId}',
                    cors: corsConfig,
                }
            }
        ]
    },
    delGeneric: {
        handler : 'src/routes/generic/Delete/handler.handler',
        events: [
            {
                http: {
                    method: 'delete',
                    path: '/generic/{genericId}',
                    cors: corsConfig,
                }
            }
        ]
    },
    updateGeneric: {
        handler : 'src/routes/generic/Update/handler.handler',
        events: [
            {
                http: {
                    method: 'patch',
                    path: '/generic/{genericId}',
                    cors: corsConfig,
                }
            }
        ]
    },
};

export default Generic;