import { Col } from 'antd';
import { DepartmentModal } from '../Detail';
import { DepartmentsManagementHeader } from './Components/Header';
import { SearchDepartmentsManagement } from './Components/Search';
import { TableDataDepartmentsManagement } from './Components/TableData';
import { useState } from 'react';

export const DepartmentsManagementIndex: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [departmentId, setDepartmentId] = useState<string>();

    return (
        <Col className="h-full">
            <DepartmentsManagementHeader setDepartmentId={setDepartmentId} setIsModalOpen={setIsModalOpen} />
            <Col className="h-[calc(100vh_-_143px)] overflow-auto">
                <SearchDepartmentsManagement />
                <TableDataDepartmentsManagement setDepartmentId={setDepartmentId} setIsModalOpen={setIsModalOpen} />
            </Col>
            <DepartmentModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                departmentId={departmentId}
                setDepartmentId={setDepartmentId}
            />
        </Col>
    );
};
