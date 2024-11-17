import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { PrivateRouter } from './privateRoute.tsx';
import { PublicRouter } from './publicRouter.tsx';
import { rootPaths } from './route.ts';

export const BrowserRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                <div className="flex justify-center min-h-screen items-center" style={{ backgroundColor: '#FAFAFA' }}>
                    <Outlet />
                </div>
            }
            errorElement={<Navigate to={rootPaths.dashboard} />}
        >
            {PublicRouter}
            {PrivateRouter}
        </Route>,
    ),
);
