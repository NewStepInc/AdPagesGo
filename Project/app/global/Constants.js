/**
 * Created on 7/14/16.
 */

'use strict';

import React from 'react';

import {
    Platform,
    Dimensions,
} from 'react-native';


var IS_ANDROID = Platform.OS === `android`;
var DIMENSION = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height
};

const GAP_SMALL = 10;
const GAP_MEDIUM = 20;
const GAP_LARGE = 30;

module.exports = {
    IS_ANDROID: IS_ANDROID,
    DIMENSION: DIMENSION,

    SORTBY : {
        TYPE : 'type',
        DISTANCE : 'distance',
        ALPHABET : 'alphabet',
    },
    
    SCREENS : {
        BASIC: 'basic',
        SPLASH: 'splash',
        MAIN: 'main',
        OFFER: 'offers',
        OFFER_LIST: 'offers list',
        COUPON: 'coupon',
        MAP: 'map',
        WEB: 'web',
        SETTING: 'setting',
        INFORMATION: 'information',
        ABOUT: 'about',
        HELP: 'help',
        ACKNOWLEDGEMENT: 'acknowledgement',
        BOOKMARK: 'bookmark',
        SEARCH: 'search',
    },

    BACKEND_API_PATH: 'http://adpages.com/api-json.v1.php',//'http://truthsites.org/client/adpages_v2/api-json.v1.php',

    STRINGS : {
        APP_NAME : 'AdPagesGo',

        // main screen
        CITIES : ['DALLAS/FT.WORTH, TX', 'AUSTIN, TX', 'SAN ANTONIO, TX', 'ST.LOUIS, MO', 'HOUSTON, TX'],
        MMS : ['dallasftworth', 'austin', 'sanantonio', 'stlouis', 'houston', 'national'],

        // offers screen
        CATEGORIES : ['FOOD & DRINK', 'BEAUTY & SPA', 'AUTOMOTIVE', 'ENTERTAINMENT', 'HOME SERVICES', 'PROFESSIONAL SERVICES', 'SHOPPING & RETAIL', 'DAILY DEALS', 'HEALTH & MEDICAL'],
        CAT_ID : [199, 192, 197, 189, 221, 223, 224, 0, 202],

        DEALS_URL: 'http://deals.adpages.com',
    },

    COLORS : {
        PRIMARY_COLOR : '#0e3f7b',
        LIGHT_PRIMARY_COLOR : '#3c7ac6',
        TEXT_ICONS : '#9b9c9e',
        PRIMARY_ACCENT_COLOR : '#9ac91c',
        SECONDARY_ACCENT_COLOR : '#94aadd',
        PRIMARY_TEXT : '#2e2e2e',
        SECONDARY_TEXT : '#808080',
        DIVIDER_COLOR : '#f0f0f0',
        BACKGROUND_COLOR : '#ffffff',
        BAR_COLOR : '#f7f7f7',
    },

    DIMENS : {
        GAP_SMALL : GAP_SMALL,
        GAP_MEDIUM : GAP_MEDIUM,
        GAP_LARGE : GAP_LARGE,

        IOS_OFFSET : !IS_ANDROID ? GAP_MEDIUM : 0,
        ANDROID_OFFSET : IS_ANDROID ? GAP_MEDIUM : 0,
        PADDING_HORIZONTAL : GAP_MEDIUM,
        PADDING_VERTICAL : GAP_SMALL,

        ACTIONBAR_HEIGHT : 60,
        ACTIONBAR_ICON_SIZE : 20,

        BOTTOMBAR_HEIGHT : 60,
        BOTTOMBAR_ICON_SIZE : 30,
        
        TITLE_FONT_SIZE: DIMENSION.WIDTH / 20 - 1,
    },

    STORAGE : {
        SETTING : {
            PROXIMITY_TRIGGERING: 'proximity_triggering',
            SEND_DIAGNOSTIC_DATA: 'send_diagnostic_data'
        },

        BOOKMARK : 'bookmark'
    },

    // ADMOB : {
	//
    //     iOS : {
    //         app_id : 'ca-app-pub-5226075387583224~1828654799',
    //         banner_ad_unit_id : `ca-app-pub-5226075387583224/4782121196`,
    //         interstitial_ad_unit_id : `ca-app-pub-5226075387583224/6258854394`
    //     },
	//
    //     Android : {
    //         app_id : 'ca-app-pub-5226075387583224~6119253591',
    //         banner_ad_unit_id : `ca-app-pub-5226075387583224/7595986796`,
    //         interstitial_ad_unit_id : `ca-app-pub-5226075387583224/9072719996`
    //     }
    // }
};