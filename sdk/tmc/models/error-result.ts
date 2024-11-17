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



/**
 * 
 * @export
 * @interface ErrorResult
 */
export interface ErrorResult {
    /**
     * 
     * @type {Array<string>}
     * @memberof ErrorResult
     */
    'messages'?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ErrorResult
     */
    'source'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ErrorResult
     */
    'exception'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ErrorResult
     */
    'errorId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ErrorResult
     */
    'supportMessage'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ErrorResult
     */
    'statusCode'?: number;
}
