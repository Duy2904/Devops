import { ButtonPromote } from '../Button';
import { HeaderPromoteComponent } from '../Header';
import { PromotionProgramSearch } from '../Search';
import { TableDataPromotionProgram } from '../TableData';
import i18n from '@src/i18n';
import { slugGroup } from '@fragments/PromotionProgram/Feature';

export const IndexPromoteGroup: React.FC = () => {
    return (
        <div>
            <HeaderPromoteComponent
                slug={slugGroup}
                title={`${i18n.t('Danh sách')} ${i18n.t('menu.promoteFromGroup')}`}
                buttonList={<ButtonPromote typePromote={'2'} />}
            />
            <div className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <PromotionProgramSearch />
                <TableDataPromotionProgram typePromote="2" />
            </div>
        </div>
    );
};
