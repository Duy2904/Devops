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
import { MembershipDto } from './membership-dto';
// May contain unused imports in some cases
// @ts-ignore
import { ProfileDtoAllOfPassport } from './profile-dto-all-of-passport';

/**
 * 
 * @export
 * @interface UpdateProfileCommand
 */
export interface UpdateProfileCommand {
    /**
     * 
     * @type {ProfileDtoAllOfPassport}
     * @memberof UpdateProfileCommand
     */
    'passport'?: ProfileDtoAllOfPassport | null;
    /**
     * 
     * @type {Array<MembershipDto>}
     * @memberof UpdateProfileCommand
     */
    'memberships'?: Array<MembershipDto> | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateProfileCommand
     */
    'areaCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateProfileCommand
     */
    'phoneNumber'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateProfileCommand
     */
    'gender'?: boolean | null;
    /**
     * 
     * @type {Date}
     * @memberof UpdateProfileCommand
     */
    'birthday'?: Date | null;
}

