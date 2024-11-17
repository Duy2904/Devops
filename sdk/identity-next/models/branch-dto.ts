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
import { DocumentDto } from './document-dto';

/**
 * 
 * @export
 * @interface BranchDto
 */
export interface BranchDto {
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'systemId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'email'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'taxCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'bankAccount'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'bankName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'website'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'address'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'shortName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'representative'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof BranchDto
     */
    'isActive'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'description'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'logo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'parentId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'branchState'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof BranchDto
     */
    'permissions'?: Array<string>;
    /**
     * 
     * @type {Array<DocumentDto>}
     * @memberof BranchDto
     */
    'documents'?: Array<DocumentDto>;
    /**
     * 
     * @type {boolean}
     * @memberof BranchDto
     */
    'inUse'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof BranchDto
     */
    'personInChargeId'?: string | null;
}
