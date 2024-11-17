interface IconArrowDownProps {
    fill?: string;
    fillOpacity?: string;
    width?: number;
    height?: number;
}

export const IconArrowDown = (props: IconArrowDownProps) => {
    return (
        <>
            <svg
                width={props.width ?? '9'}
                height={props.height ?? '6'}
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.61328 0.53125C8.71094 0.609375 8.71094 0.765625 8.61328 0.863281L4.53125 4.94531C4.43359 5.04297 4.29688 5.04297 4.19922 4.94531L0.117188 0.863281C0.0195312 0.765625 0.0195312 0.609375 0.117188 0.53125L0.488281 0.140625C0.585938 0.0429688 0.742188 0.0429688 0.820312 0.140625L4.375 3.67578L7.91016 0.140625C7.98828 0.0429688 8.14453 0.0429688 8.24219 0.140625L8.61328 0.53125Z"
                    fill={props.fill}
                    fillOpacity={props.fillOpacity}
                />
            </svg>
        </>
    );
};
