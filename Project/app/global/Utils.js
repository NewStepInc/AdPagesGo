/**
 * Created by nick on 7/26/16.
 */

'use strict';
import React from 'react';

import {
    Linking,
    AsyncStorage,
} from 'react-native';

import Constants from './Constants';

var sel_city_num = 5;
var getSelCityNum = function () {
    return sel_city_num;
};
var setSelCityNum = function (cityNum) {
    sel_city_num = cityNum;
};
var getSelCityName = function () {
    var cityName = Constants.STRINGS.CITIES[getSelCityNum()];
    return cityName.substring(0, cityName.indexOf(','));
};
var getSelMMName = function () {
    return Constants.STRINGS.MMS[getSelCityNum()];
};


var sel_cat_num = 2;
var getSelCatNum = function () {
    return sel_cat_num;
};
var setSelCatNum = function (catNum) {
    sel_cat_num = catNum;
};


var sel_coupon = {};
var getSelCoupon = function () {
    return sel_coupon;
};
var setSelCoupon = function (coupon) {
    sel_coupon = coupon;
};

var actionSheet = null;
var saveActionSheet = function (componet) {
    actionSheet = componet;
};
var loadActionSheet = function () {
    return actionSheet;
};

var proximity_triggering = true;
var send_diagnostic_data = true;
var loadSetting = async function () {
    let p, s;
    try {
        p = await AsyncStorage.getItem(Constants.STORAGE.SETTING.PROXIMITY_TRIGGERING);
    } catch (error) {
        // Error retrieving data
        p = "true";
    }
    try {
        s = await AsyncStorage.getItem(Constants.STORAGE.SETTING.SEND_DIAGNOSTIC_DATA);
    } catch (error) {
        // Error retrieving data
        s = "true";
    }
    proximity_triggering = (p == null || !p || p === 'true');
    send_diagnostic_data = (s == null || !s || s === 'true');
};

var getProximityTriggering = function () {
    return proximity_triggering;
};
var getSendDiagnosticData = function () {
    return send_diagnostic_data;
};
var setProximityTriggering = async function (val) {
    proximity_triggering = val;
    try {
        await AsyncStorage.setItem(Constants.STORAGE.SETTING.PROXIMITY_TRIGGERING, proximity_triggering.toString());
    } catch (error) {
        // Error saving data
    }
};
var setSendDiagnosticData = async function (val) {
    send_diagnostic_data = val;
    try {
        await AsyncStorage.setItem(Constants.STORAGE.SETTING.SEND_DIAGNOSTIC_DATA, send_diagnostic_data.toString());
    } catch (error) {
        // Error saving data
    }
};

var bookmarked_coupons = [];
var loadBookmarkedCoupons = async function () {
    let data;
    try {
        data = await AsyncStorage.getItem(Constants.STORAGE.BOOKMARK);
    } catch (error) {
        // Error retrieving data
    }
    if (!data)
        data = '[]';
    bookmarked_coupons = JSON.parse(data);
};
var getBookmarkedCoupons = function () {
    return bookmarked_coupons;
};
var isBookmarked = function (coupon) {
    var ret = false;
    bookmarked_coupons.forEach((cp) => {
        if (cp.coupon_id === coupon.coupon_id) {
            ret = true;
            return false;
        }
    });
    return ret;
};
var bookmarkCoupon = async function (coupon) {
    if (isBookmarked(coupon)) {
        let index = bookmarked_coupons.indexOf(coupon);
        if (index != -1)
            bookmarked_coupons.splice(index, 1);
    } else
        bookmarked_coupons.push(coupon);
    try {
        await AsyncStorage.setItem(Constants.STORAGE.BOOKMARK, JSON.stringify(bookmarked_coupons));
    } catch (error) {
        // Error saving data
    }
};



var showWebBrowser = function (url) {
    Linking.canOpenURL(url).then(supported => {
        if(supported) {
            Linking.openURL(url);
        } else {
            Alert.alert('', 'Invalid website addresss.\n' + url);
        }
    }).catch(err => console.error('An unexpected error happened', err));
};

var calcDistance = function (lat1, lng1, lat2, lng2, unit = 'M') {
	if (!lat1 || !lng1 || !lat2 || !lng2)
	   return null;

	var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lng1-lng2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
};

// var getBannerAdUnitId = function () {
//     if (Constants.IS_ANDROID)
//         return Constants.ADMOB.Android.banner_ad_unit_id;
//
//     return Constants.ADMOB.iOS.banner_ad_unit_id;
// };
//
// var getInterstitialAdUnitId = function () {
//     if (Constants.IS_ANDROID)
//         return Constants.ADMOB.Android.interstitial_ad_unit_id;
//
//     return Constants.ADMOB.iOS.interstitial_ad_unit_id;
// };



module.exports = {
    getSelCityNum: getSelCityNum,
    setSelCityNum: setSelCityNum,
    getSelCityName: getSelCityName,
    getSelMMName: getSelMMName,

    getSelCatNum: getSelCatNum,
    setSelCatNum: setSelCatNum,

    getSelCoupon: getSelCoupon,
    setSelCoupon: setSelCoupon,

    saveActionSheet: saveActionSheet,
    loadActionSheet: loadActionSheet,

    showWebBrowser: showWebBrowser,

    loadSetting: loadSetting,
    getProximityTriggering: getProximityTriggering,
    getSendDiagnosticData: getSendDiagnosticData,
    setProximityTriggering: setProximityTriggering,
    setSendDiagnosticData: setSendDiagnosticData,

    loadBookmarkedCoupons: loadBookmarkedCoupons,
    getBookmarkedCoupons: getBookmarkedCoupons,
    isBookmarked: isBookmarked,
    bookmarkCoupon: bookmarkCoupon,

	calcDistance: calcDistance,

    // getBannerAdUnitId: getBannerAdUnitId,
    // getInterstitialAdUnitId: getInterstitialAdUnitId,
};