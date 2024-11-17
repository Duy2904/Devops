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
import { ContactDetailDto } from './contact-detail-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TripServiceType } from './trip-service-type';

/**
 * 
 * @export
 * @interface CreateOrUpdateContactCommand
 */
export interface CreateOrUpdateContactCommand {
    /**
     * 
     * @type {string}
     * @memberof CreateOrUpdateContactCommand
     */
    'tripId'?: string;
    /**
     * 
     * @type {TripServiceType}
     * @memberof CreateOrUpdateContactCommand
     */
    'serviceType'?: TripServiceType;
    /**
     * 
     * @type {ContactDetailDto}
     * @memberof CreateOrUpdateContactCommand
     */
    'contact'?: ContactDetailDto;
}



