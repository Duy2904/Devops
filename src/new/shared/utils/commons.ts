import _ from 'lodash';

export const filterOptions = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const combineArrays = (...arrays: string[][]): string[][] => {
    // Flatten the input arrays
    const flattenedArrays = _.flatten(arrays);

    // Generate combinations of one element from each input array
    const combinations = _.flatMap(arrays[0], item1 => {
        return _.map(arrays[1], item2 => {
            return [item1, item2]; // Return an array containing both items
        });
    });

    // Map each item to an array containing that item
    const result = flattenedArrays.map(item => [item]);

    // Concatenate the mapped items with the combinations
    return _.concat(result, combinations);
};
