import clsx from 'clsx';

import { Color } from '../Color/CustomColor';

interface TagTourIDProps {
    text: string;
    className?: string;
}
export const TagTourID: React.FC<TagTourIDProps> = ({ text, className }) => {
    return (
        <p
            className={clsx(
                `inline-block py-[2px] px-[6px] rounded-[5px] font-bold bg-white border border-solid`,
                Color.text_2A2A2A_80,
                Color.border_DBDBDB,
                className,
            )}
        >
            {text}
        </p>
    );
};
