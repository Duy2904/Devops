interface IconWordProps {
    fill?: string;
    fillOpacity?: string;
    width?: number;
    height?: number;
}

export const IconWord = (props: IconWordProps) => {
    return (
        <svg
            width={props.width ?? '10'}
            height={props.height ?? '12'}
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.01484 3.38203L6.49297 0.860156C6.42266 0.789844 6.32773 0.75 6.22812 0.75H1.25C1.04258 0.75 0.875 0.917578 0.875 1.125V10.875C0.875 11.0824 1.04258 11.25 1.25 11.25H8.75C8.95742 11.25 9.125 11.0824 9.125 10.875V3.64805C9.125 3.54844 9.08516 3.45234 9.01484 3.38203ZM8.26016 3.82031H6.05469V1.61484L8.26016 3.82031ZM8.28125 10.4062H1.71875V1.59375H5.25781V4.125C5.25781 4.25554 5.30967 4.38073 5.40197 4.47303C5.49427 4.56533 5.61946 4.61719 5.75 4.61719H8.28125V10.4062ZM5.18867 5.53125H4.81133C4.74687 5.53125 4.69062 5.57461 4.67539 5.63789L4.09297 7.96875L3.55273 5.64023C3.5375 5.57695 3.48125 5.53125 3.41562 5.53125H3.00078C2.97923 5.53128 2.95796 5.53626 2.93864 5.54581C2.91931 5.55535 2.90243 5.5692 2.8893 5.5863C2.87616 5.60339 2.86713 5.62327 2.86289 5.64441C2.85865 5.66554 2.85932 5.68737 2.86484 5.7082L3.73438 8.94258C3.75078 9.00352 3.80703 9.04688 3.87031 9.04688H4.24531C4.30859 9.04688 4.36484 9.00469 4.38125 8.94258L5 6.63398L5.61875 8.94258C5.63516 9.00352 5.69141 9.04688 5.75469 9.04688H6.12734C6.19063 9.04688 6.24687 9.00469 6.26328 8.94258L7.13516 5.7082C7.14063 5.68737 7.14126 5.66556 7.137 5.64444C7.13274 5.62333 7.12371 5.60347 7.11059 5.58639C7.09746 5.56931 7.0806 5.55546 7.0613 5.5459C7.042 5.53634 7.02076 5.53133 6.99922 5.53125H6.58203C6.51641 5.53125 6.46016 5.57695 6.44492 5.64023L5.9082 7.97344L5.32461 5.63789C5.30938 5.57461 5.25312 5.53125 5.18867 5.53125Z"
                fill={props.fill}
                fillOpacity={props.fillOpacity}
            />
        </svg>
    );
};