import { DeActivedAccount } from '@pages/public/DeActivedAccount.tsx';
import { LoginPage } from '../pages/public/Login.tsx';
import { Route } from 'react-router-dom';
import { rootPaths } from './route.ts';
import { LogoutPage } from '@pages/public/Logout.tsx';

export const PublicRouter = (
    <Route>
        <Route path={rootPaths.login} element={<LoginPage />} />
        <Route path={rootPaths.logout} element={<LogoutPage />} />
        <Route path={rootPaths.deActived} element={<DeActivedAccount />} />
    </Route>
);
