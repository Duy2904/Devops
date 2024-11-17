// define types that library can not provide
export type NoUndefinedRangeValueType<DateType> = [start: DateType | null, end: DateType | null];
export type RangeValueType<DateType> = [start: DateType | null | undefined, end: DateType | null | undefined];
