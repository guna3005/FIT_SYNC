import React from 'react';
import FoodLogPage from './pages/FoodLogPage';
import WorkoutLogPage from './pages/WorkoutLogPage';
import AnalyticsPage from './pages/AnalyticsPage';

const routes = [
  {
    path: '/food-log',
    element: <FoodLogPage />,
  },
  {
    path: '/workout-log',
    element: <WorkoutLogPage />,
  },
  {
    path: '/analytics',
    element: <AnalyticsPage />,
  },
];

export default routes;
