export const useRenderRemainingDaysText = (numberRemainingDays: number) => {
    if (numberRemainingDays > 0) {
        return <span className="ml-1">(còn {numberRemainingDays} ngày)</span>;
    } else if (numberRemainingDays == 0) {
        return <span className="ml-1 text-state-error">(Hết hạn hôm nay)</span>;
    } else {
        return <span className="ml-1 text-state-error">(Đã hết hạn)</span>;
    }
};
