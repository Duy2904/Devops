/* tslint:disable */
/* eslint-disable */
/**
 * TripOTA TMC WebAPI
 * The TripOTA TMC WebApi built with Multitenancy Support.
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
import { CorporationType } from './corporation-type';
// May contain unused imports in some cases
// @ts-ignore
import { SignInType } from './sign-in-type';

/**
 * 
 * @export
 * @interface CreateCorporationModel
 */
export interface CreateCorporationModel {
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'code': string;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'description'?: string | null;
    /**
     * 
     * @type {SignInType}
     * @memberof CreateCorporationModel
     */
    'signInType'?: SignInType;
    /**
     * 
     * @type {CorporationType}
     * @memberof CreateCorporationModel
     */
    'type': CorporationType;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'agentId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'accounting'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'logo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'email'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'taxCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateCorporationModel
     */
    'address'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof CreateCorporationModel
     */
    'airlineCAs': Array<string>;
    /**
     * 
     * @type {Date}
     * @memberof CreateCorporationModel
     */
    'startDate': Date;
    /**
     * 
     * @type {Date}
     * @memberof CreateCorporationModel
     */
    'endDate': Date;
}



