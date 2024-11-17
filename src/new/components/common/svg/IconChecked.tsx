interface IconCheckedProps {
    fill?: string;
    fillOpacity?: string;
    width?: number;
    height?: number;
}

export const IconChecked = (props: IconCheckedProps) => {
    return (
        <svg
            width={props.width ?? '12'}
            height={props.height ?? '9'}
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.4297 0.65625C10.5469 0.5625 10.7109 0.5625 10.8281 0.65625L11.0859 0.9375C11.2031 1.03125 11.2031 1.21875 11.0859 1.33594L4.05469 8.36719C3.96094 8.46094 3.77344 8.46094 3.67969 8.36719L0.890625 5.57812C0.773438 5.46094 0.773438 5.27344 0.890625 5.17969L1.14844 4.89844C1.26562 4.80469 1.42969 4.80469 1.54688 4.89844L3.86719 7.21875L10.4297 0.65625Z"
                fill="#3E5BE0"
                fillOpacity={props.fillOpacity}
            />
        </svg>
    );
};
