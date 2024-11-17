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


// May contain unused imports in some cases
// @ts-ignore
import { ApproveCancelRequestApproveCancelStatus } from './approve-cancel-request-approve-cancel-status';

/**
 * 
 * @export
 * @interface ApproveCancelRequest
 */
export interface ApproveCancelRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof ApproveCancelRequest
     */
    'ids'?: Array<string>;
    /**
     * 
     * @type {ApproveCancelRequestApproveCancelStatus}
     * @memberof ApproveCancelRequest
     */
    'approveCancelStatus'?: ApproveCancelRequestApproveCancelStatus | null;
    /**
     * 
     * @type {string}
     * @memberof ApproveCancelRequest
     */
    'approveCancelReason'?: string | null;
}
