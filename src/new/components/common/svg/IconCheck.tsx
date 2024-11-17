interface IconCheckProps {
    fill?: string;
    fillOpacity?: string;
    width?: number;
    height?: number;
}

export const IconCheck = (props: IconCheckProps) => {
    return (
        <svg
            width={props.width ?? '16'}
            height={props.height ?? '12'}
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.73047 10.7812L1.19141 6.24219C0.917969 5.96875 0.917969 5.50391 1.19141 5.23047L2.17578 4.24609C2.44922 3.97266 2.88672 3.97266 3.16016 4.24609L6.25 7.30859L12.8125 0.746094C13.0859 0.472656 13.5234 0.472656 13.7969 0.746094L14.7812 1.73047C15.0547 2.00391 15.0547 2.46875 14.7812 2.74219L6.74219 10.7812C6.46875 11.0547 6.00391 11.0547 5.73047 10.7812Z"
                fill={props.fill}
                fillOpacity={props.fillOpacity}
            />
        </svg>
    );
};
