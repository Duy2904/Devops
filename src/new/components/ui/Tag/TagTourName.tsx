import clsx from 'clsx';

import { Color } from '../Color/CustomColor';

interface TagTourNameProps {
    text: string;
    className?: string;
}
export const TagTourName: React.FC<TagTourNameProps> = ({ text, className }) => {
    return (
        <p className={clsx('py-1 px-2 rounded-md text-white font-bold inline-block', Color.bg_9B59B6, className)}>
            {text}
        </p>
    );
};
