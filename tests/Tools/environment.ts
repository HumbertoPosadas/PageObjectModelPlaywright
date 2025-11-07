interface EnvConfig {
    baseUrl: string;
    apiUrl: string;
    extraHttpHeaders?: { 
        [key: string]: string 
    };
}

export class Environnement {
    private static configs: Record<string, EnvConfig> = {
        DEV: {
            baseUrl: 'http://dev.example.com',
            apiUrl: 'http://dev.example.com/api',
            extraHttpHeaders: {
                Authorization: 'Bearer dev-token',
            },
        },
        TEST: {
            baseUrl: 'http://test.example.com',
            apiUrl: 'http://test.example.com/api',
            extraHttpHeaders: {
                Authorization: 'Bearer test-token',
            },
        },
        PROD: {
            baseUrl: 'http://example.com',
            apiUrl: 'http://example.com/api',
            extraHttpHeaders: {
                Authorization: 'Bearer prod-token',
            },
        },
        DEFAULT: {
            baseUrl: 'http://localhost:3000',
            apiUrl: 'http://localhost:3000/api',
            extraHttpHeaders: {
                Authorization: 'Bearer default-token',
            },
        },
    };

    static getConfig(): EnvConfig {
        const env = process.env.ENVIRONMENT || 'DEFAULT';
        return this.configs[env] || this.configs['DEFAULT'];
    }
}