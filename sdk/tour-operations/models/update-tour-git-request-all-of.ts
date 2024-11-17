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
import { UpdateTourGitRequestAllOfCreateTravellerRequest } from './update-tour-git-request-all-of-create-traveller-request';

/**
 * 
 * @export
 * @interface UpdateTourGitRequestAllOf
 */
export interface UpdateTourGitRequestAllOf {
    /**
     * 
     * @type {string}
     * @memberof UpdateTourGitRequestAllOf
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateTourGitRequestAllOf
     */
    'groupName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateTourGitRequestAllOf
     */
    'travellerId'?: string | null;
    /**
     * 
     * @type {UpdateTourGitRequestAllOfCreateTravellerRequest}
     * @memberof UpdateTourGitRequestAllOf
     */
    'createTravellerRequest'?: UpdateTourGitRequestAllOfCreateTravellerRequest | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateTourGitRequestAllOf
     */
    'tourCode'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof UpdateTourGitRequestAllOf
     */
    'offset'?: number;
}

