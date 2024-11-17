/* tslint:disable */
/* eslint-disable */
/**
 * TripOTA Identity Next
 * TripOTA Identity Next built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: touch@tripota.com.vn
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { LiteAgentDto } from './lite-agent-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfLiteAgentDto
 */
export interface PaginationResponseOfLiteAgentDto {
    /**
     * 
     * @type {Array<LiteAgentDto>}
     * @memberof PaginationResponseOfLiteAgentDto
     */
    'data'?: Array<LiteAgentDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfLiteAgentDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfLiteAgentDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfLiteAgentDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfLiteAgentDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfLiteAgentDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfLiteAgentDto
     */
    'hasNextPage'?: boolean;
}

