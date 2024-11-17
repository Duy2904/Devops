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
import { AirportDtoCity } from './airport-dto-city';
// May contain unused imports in some cases
// @ts-ignore
import { AirportDtoCountry } from './airport-dto-country';
// May contain unused imports in some cases
// @ts-ignore
import { AirportDtoProvince } from './airport-dto-province';
// May contain unused imports in some cases
// @ts-ignore
import { AirportDtoRegion } from './airport-dto-region';
// May contain unused imports in some cases
// @ts-ignore
import { TranslationDto } from './translation-dto';

/**
 * 
 * @export
 * @interface AirportDto
 */
export interface AirportDto {
    /**
     * 
     * @type {string}
     * @memberof AirportDto
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AirportDto
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AirportDto
     */
    'cityCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AirportDto
     */
    'cityName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AirportDto
     */
    'countryCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AirportDto
     */
    'countryName'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof AirportDto
     */
    'highlighted'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof AirportDto
     */
    'regionId'?: string | null;
    /**
     * 
     * @type {Array<TranslationDto>}
     * @memberof AirportDto
     */
    'translatedNames'?: Array<TranslationDto>;
    /**
     * 
     * @type {AirportDtoCity}
     * @memberof AirportDto
     */
    'city'?: AirportDtoCity | null;
    /**
     * 
     * @type {AirportDtoCountry}
     * @memberof AirportDto
     */
    'country'?: AirportDtoCountry | null;
    /**
     * 
     * @type {AirportDtoRegion}
     * @memberof AirportDto
     */
    'region'?: AirportDtoRegion | null;
    /**
     * 
     * @type {AirportDtoProvince}
     * @memberof AirportDto
     */
    'province'?: AirportDtoProvince | null;
}
