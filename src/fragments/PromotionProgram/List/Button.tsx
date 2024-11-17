import { Button } from 'antd';
import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PlusOutlined } from '@ant-design/icons';
import { rootPaths } from '@src/routers/route';
import { typePromote } from '../Feature';
import { useNavigate } from 'react-router-dom';

interface ButtonPromoteProps {
    typePromote: typePromote;
}

export const ButtonPromote: React.FC<ButtonPromoteProps> = props => {
    const { typePromote } = props;
    const navigate = useNavigate();
    return (
        <>
            <Can permissions={[MyPermissions.DiscountCreate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    onClick={() => {
                        navigate(`${typePromote == '1' ? rootPaths.promoteBySeatForm : rootPaths.promoteByGroupForm}`);
                    }}
                    icon={<PlusOutlined />}
                >
                    Thêm mới
                </Button>
            </Can>
        </>
    );
};
