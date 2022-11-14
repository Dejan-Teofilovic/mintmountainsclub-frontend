import React from 'react';
import { useRoutes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    }
  ]);
}