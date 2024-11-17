import { Button, Drawer, Flex } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { HistoryDetailDto } from '@sdk/tour-operations';
import { TableHistory } from './TableHistory';
import { useGetAuditLog } from './hooks/useSearchAuditLog';

interface HistoryProps {
    id: string;
    title: string;
    tableName: string;
    isOpenHistory: boolean;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const History: React.FC<HistoryProps> = props => {
    const { id, title, tableName, isOpenHistory, setIsOpenHistory } = props;

    const { mutateAsync: getAuditLog, isLoading } = useGetAuditLog();
    const [data, setData] = useState<HistoryDetailDto[]>([]);

    const handleGetAudit = useCallback(async () => {
        setData([]);
        const responseData = await getAuditLog({ tableName, id });
        setData(responseData as HistoryDetailDto[]);
    }, [getAuditLog, id, tableName]);

    const handleCloseDrawer = () => {
        setIsOpenHistory(false);
        setData([]);
    };

    useEffect(() => {
        if (isOpenHistory) {
            handleGetAudit();
        }
    }, [handleGetAudit, isOpenHistory]);

    if (!id) {
        return null;
    }

    const CustomHeader = (
        <Flex className="h-[50px] px-3 shadow relative" align="center" justify="center">
            <h1 className={`${Color.text_2A2A2A} font-bold uppercase text-[18px]`}>{title}</h1>
            <Button
                className="absolute right-5"
                icon={<CloseOutlined className="h-4 w-4" />}
                onClick={handleCloseDrawer}
                type="text"
            />
        </Flex>
    );

    return (
        <Drawer
            key={id}
            title={CustomHeader}
            open={isOpenHistory}
            width="1200"
            closable={false}
            styles={{
                header: {
                    padding: 0,
                },
                body: {
                    padding: 30,
                    paddingBottom: 80,
                },
            }}
            onClose={() => setIsOpenHistory(false)}
        >
            <TableHistory data={data ?? []} isLoading={isLoading} />
        </Drawer>
    );
};
