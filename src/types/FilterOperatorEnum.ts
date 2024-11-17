/* eslint-disable no-unused-vars */
export enum FilterOperatorEnum {
    eq = 'eq', // equal
    neq = 'neq', // not equal
    lt = 'lt', // less than
    lte = 'lte', //less than or equal
    gt = 'gt', // greater than
    gte = 'gte', // greater than or equal
    startswith = 'startswith',
    endswith = 'endswith',
    contains = 'contains',
}

export enum FilterLogicEnum {
    and = 'and',
    or = 'or',
}
