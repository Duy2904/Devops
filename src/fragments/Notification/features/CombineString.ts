export const combineString = (listString: string[]) => {
    let string = '';
    listString?.forEach(item => {
        if (item == '') return;
        string += item + ' ';
    });
    return string.trim();
};
