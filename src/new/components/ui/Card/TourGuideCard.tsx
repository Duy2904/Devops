import { Avatar } from 'antd';

import VietnamFlag from '@assets/images/vietnam-flag.png';
import { GenderType } from '@sdk/tour-operations';

import { Color } from '../Color/CustomColor';

interface TourGuideCardProps {
    avatar?: string;
    name?: string;
    country?: string;
    gender?: GenderType | null;
    age?: number;
}

const TourGuideCard = ({ avatar, name, country, gender, age }: TourGuideCardProps) => {
    return (
        <div
            className={`${Color.border_DBDBDB} w-[240px] rounded-lg border border-solid p-[6px] gap-2 flex items-center`}
        >
            <Avatar src={avatar} size={32} shape="circle">
                {name?.trim()?.charAt(0).toUpperCase()}
            </Avatar>
            <div>
                <p className={`${Color.text_141417} font-bold text-xs/[16px]`}>{name}</p>
                <div className={`${Color.text_black_88} flex items-center gap-2 mt-1 text-[10px]`}>
                    <div className="flex items-center gap-1">
                        <img src={VietnamFlag} alt="Vietnam flag" className="w-4 h-3" />
                        <span>{country}</span>
                    </div>
                    {!!gender && <p>{gender === GenderType.Male ? 'Nam' : GenderType.Female ? 'Nữ' : 'Khác'}</p>}
                    {!!age && <p>{age} tuổi</p>}
                </div>
            </div>
        </div>
    );
};

export default TourGuideCard;
