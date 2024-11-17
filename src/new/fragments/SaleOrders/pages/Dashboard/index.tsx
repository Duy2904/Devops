import { DashboardHeader } from './components/DashboadHeader';
import React from 'react';
import { SaleOrdersList } from './components/SaleOrderList';

export const SaleOrderDashboard: React.FC = () => {
    return (
        <div>
            <DashboardHeader />
            <SaleOrdersList />
        </div>
    );
};
