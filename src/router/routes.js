const routes = [
  {
    path: '/',
    redirect: '/cards',
    component: () => import('src/layouts/AppLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('src/pages/Home.vue'),
      },
      {
        path: '/cards',
        component: () => import('src/pages/Cards.vue'),
      },
      {
        path: '/payments',
        component: () => import('src/pages/Payments.vue'),
      },
      {
        path: '/credit',
        component: () => import('src/pages/Credit.vue'),
      },
      {
        path: '/settings',
        component: () => import('src/pages/Settings.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
