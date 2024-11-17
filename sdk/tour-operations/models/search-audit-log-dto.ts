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
 * @interface SearchAuditLogDto
 */
export interface SearchAuditLogDto {
    /**
     * 
     * @type {string}
     * @memberof SearchAuditLogDto
     */
    'tableName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchAuditLogDto
     */
    'type'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchAuditLogDto
     */
    'userId'?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchAuditLogDto
     */
    'userName'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchAuditLogDto
     */
    'dateTime'?: Date;
    /**
     * 
     * @type {string}
     * @memberof SearchAuditLogDto
     */
    'oldValues'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchAuditLogDto
     */
    'newValues'?: string | null;
}

