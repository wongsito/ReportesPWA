const STATIC = 'staticv1';
const INMUTABLE = 'inmutablev1';
const DYNAMIC = 'dynamicv1';

const APP_SHELL = [
    '/',
    '/index.html',
    'js/app.js',
    'img/wongsito.png',
    'img/wong.png',
    'css/styles.css',
    'pages/offline.html'
];

const APP_SHELL_INMUTABLE = ['https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'];

self.addEventListener("install", (e) => {
    const staticCache = caches.open(STATIC).then(cache => {
        cache.addAll(APP_SHELL);
    });

    const staticInmutable = caches.open(INMUTABLE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    });

    e.waitUntil(Promise.all([staticCache, staticInmutable]));

    console.log("Instalando");
});


self.addEventListener("activate", (e) => {
    console.log("Activado");
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request)
        .then((response) => {
            const responseClone = response.clone();
            caches.open(DYNAMIC).then((cache) => {
                cache.put(e.request, responseClone);
            });
            return response;
        })
        .catch(() => {
            return caches.match('pages/offline.html');
        })
    );
});

