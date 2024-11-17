/* tslint:disable */
/* eslint-disable */
/**
 * WebAPI - Tour Operation
 * Clean Architecture Tour Operation for .NET 7 WebApi built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface HistoryDetailDto
 */
export interface HistoryDetailDto {
    /**
     * 
     * @type {string}
     * @memberof HistoryDetailDto
     */
    'id'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof HistoryDetailDto
     */
    'tableName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof HistoryDetailDto
     */
    'type'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof HistoryDetailDto
     */
    'userName'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof HistoryDetailDto
     */
    'dateTime'?: Date;
    /**
     * 
     * @type {any}
     * @memberof HistoryDetailDto
     */
    'from'?: any | null;
    /**
     * 
     * @type {any}
     * @memberof HistoryDetailDto
     */
    'to'?: any | null;
}
