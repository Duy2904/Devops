interface TitleHeaderProps {
    title: string;
}

export const TitleHeader = (_props: TitleHeaderProps) => {
    return <p className="text-2xl font-bold uppercase text-blackColor-second">{_props.title}</p>;
};
