import { Color } from '@src/new/components/ui/Color/CustomColor';
import Format from '@src/new/shared/utils/format';
import { PriceList } from '../../types';

interface PriceListContentProps {
    data: PriceList[];
}

const PriceListContent = ({ data }: PriceListContentProps) => {
    return (
        <div className={`w-full rounded-xl overflow-hidden ${Color.border_DCDCDC} border border-solid`}>
            <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead>
                    <tr className={`${Color.bg_F6F7FA} h-[54px]`}>
                        {data.map((column, index) => (
                            <th
                                key={index}
                                className={`${Color.text_black_88} max-w-[100px] px-4 py-2 text-center ${Color.border_DCDCDC} border-0 border-r border-solid last:border-r-0`}
                            >
                                <div className="text-sm/[22px] font-bold uppercase">{column.title}</div>
                                <div className="mt-[2px] text-xs font-normal">{column.description}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-[72px]">
                        {data.map((column, index) => (
                            <td
                                key={index}
                                className={`${Color.text_3E5BE0} text-center text-[18px] font-extrabold ${Color.border_DCDCDC} border-0 border-r border-solid last:border-r-0`}
                            >
                                {Format.formatNumber(column.price)}₫
                            </td>
                        ))}
                    </tr>
                </tbody>
                <tfoot className={`${Color.bg_F6F7FA}`}>
                    <tr className="h-[44px]">
                        <td
                            colSpan={data.length}
                            className={`${Color.text_black_88} text-center text-[15px] font-bold uppercase`}
                        >
                            Giá bán chưa bao gồm VAT
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default PriceListContent;
