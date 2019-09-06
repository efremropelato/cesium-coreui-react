import React from 'react';

const Dashboard = React.lazy(() => import('./views/Demography/Dashboard'));
const Data = React.lazy(() => import('./views/Demography/Data'));
const Maps = React.lazy(() => import('./views/Demography/Maps'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/demography/data', name: 'Data', component: Data },
  { path: '/demography/maps', name: 'Maps', component: Maps },
];

export default routes;
