export const localeCompare = (left: string | null | undefined, right: string | null | undefined) => {
    return left?.localeCompare(right ?? '') ?? 0;
};
