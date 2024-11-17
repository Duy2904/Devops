export const sliceString = (s?: string | null, maxLength?: number) => {
  if (s && maxLength) {
    return maxLength > s.length ? s : `${s.slice(0, maxLength)}...`;
  }
  return s;
};
