import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import StoreProvider from 'context/StoreProvider';
import router from 'navigation/router';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StoreProvider>
    <React.StrictMode>
      <React.Fragment>
        <React.Suspense fallback={<>Loading...</>}>
          <RouterProvider router={router} />
        </React.Suspense>
      </React.Fragment>
    </React.StrictMode>
  </StoreProvider>,
);
