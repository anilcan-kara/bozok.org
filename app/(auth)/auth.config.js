const publicFileExtensions = [
    'xml',
    'txt',
    'json',
    'rss',
    'atom',
    'csv',
    'ics',
    'yaml',
    'text',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'webp',
    'svg',
    'ico',
    'bmp',
    'tif',
    'tiff',
    'css',
    'less',
    'scss',
    'styl',
    'js',
    'mjs',
    'jsx',
    'ts',
    'tsx',
    'php',
    'asp',
    'aspx',
    'jsonld',
];

export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: '/',
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            let isLoggedIn = !!auth?.user;
            let isOnChat = nextUrl.pathname.startsWith('/');
            let isOnRegister = nextUrl.pathname.startsWith('/register');
            let isOnLogin = nextUrl.pathname.startsWith('/login');
            let isPublic = publicFileExtensions.some((e) => nextUrl.pathname.endsWith(e));

            if (isLoggedIn && (isOnLogin || isOnRegister)) {
                return Response.redirect(new URL('/', nextUrl));
            }

            if (isOnRegister || isOnLogin || isPublic) {
                return true;
            }

            if (isOnChat) {
                if (isLoggedIn) {
                    return true;
                }

                return false;
            }

            if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }

            return true;
        },
    },
};
