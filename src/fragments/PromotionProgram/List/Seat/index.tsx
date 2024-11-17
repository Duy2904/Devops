import { ButtonPromote } from '../Button';
import { HeaderPromoteComponent } from '../Header';
import { PromotionProgramSearch } from '../Search';
import { TableDataPromotionProgram } from '../TableData';
import i18n from '@src/i18n';
import { slugSeat } from '@fragments/PromotionProgram/Feature';

export const IndexPromoteSeat: React.FC = () => {
    return (
        <div>
            <HeaderPromoteComponent
                slug={slugSeat}
                title={`${i18n.t('Danh sách')} ${i18n.t('menu.promoteFromSeat')}`}
                buttonList={<ButtonPromote typePromote="1" />}
            />
            <div className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <PromotionProgramSearch />
                <TableDataPromotionProgram typePromote="1" />
            </div>
        </div>
    );
};
