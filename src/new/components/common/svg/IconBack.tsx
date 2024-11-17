interface IconBackProps {
    fill?: string;
    fillOpacity?: string;
    width?: number;
    height?: number;
}

export const IconBack = (props: IconBackProps) => {
    return (
        <svg
            width={props.width ?? '6'}
            height={props.height ?? '10'}
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.539062 4.9375L4.32812 1.12891C4.52344 0.953125 4.81641 0.953125 4.99219 1.12891L5.44141 1.57812C5.61719 1.75391 5.61719 2.04688 5.44141 2.24219L2.43359 5.25L5.44141 8.27734C5.61719 8.47266 5.61719 8.76562 5.44141 8.94141L4.99219 9.39062C4.81641 9.56641 4.52344 9.56641 4.32812 9.39062L0.539062 5.58203C0.363281 5.40625 0.363281 5.11328 0.539062 4.9375Z"
                fill={props.fill}
                fillOpacity={props.fillOpacity}
            />
        </svg>
    );
};
