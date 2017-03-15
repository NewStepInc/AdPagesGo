/**
 * Created on 7/15/16.
 */

'use strict';

import React from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity, Linking, Alert} from "react-native";
import request from "superagent";
import Constants from "./../global/Constants";
import Utils from "./../global/Utils";

var _onInfoPress = function (navigator) {
    navigator.push({
        id: Constants.SCREENS.INFORMATION
    });
};

var _onSettingPress = function(navigator) {
    navigator.push({
        id: Constants.SCREENS.SETTING
    });
};

var _onBookmarkPress = function(navigator) {
    // navigator.push({
    //     id: Constants.SCREENS.BOOKMARK
    // });
};

var _showCouponOnMap = function (navigator) {
    var coupon = Utils.getSelCoupon();

    if (!coupon.lat || !coupon.lng ||
        Number(coupon.lat) == 0  || Number(coupon.lng) == 0) {
        alert('No position info.');
        return;
    }

    navigator.push({
        id: Constants.SCREENS.MAP,
        isFromCouponPage: true,
        coupons: [coupon],
        initialPos: {lat: coupon.lat, lng: coupon.lng}
    });
};

var _showDirection = function () {
    var coupon = Utils.getSelCoupon();

    if (!coupon.lat || !coupon.lng ||
        Number(coupon.lat) == 0  || Number(coupon.lng) == 0) {
        alert('No position info.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            // alert(JSON.stringify(position));
            var saddr = position.coords.longitude + "," + position.coords.latitude;
            var daddr = coupon.lat + "," + coupon.lng;
            var url = "https://www.google.com/maps/dir/" + saddr + "/" + daddr;
            // alert(url);
            Linking.openURL(url);
        },
        (error) => alert(error),
        {enableHighAccuracy: true, timeout: 100000, maximumAge: 2000}
    );
};

var _onMapPress = function(nav, isFromCouponPage) {
    if (isFromCouponPage) {
        Alert.alert(
            'Show on map or direction?',
            'Press Show to see this location on map. Or press Direction to see driving directions.',
            [
                {text: 'Show', onPress: () => _showCouponOnMap(nav)},
                {text: 'Direction', onPress: () => _showDirection()},
                {text: 'Cancel'},
            ]
        )


    } else if (Utils.getProximityTriggering()) {
        navigator.geolocation.getCurrentPosition(
            (position) => {

                nav.push({
                    id: Constants.SCREENS.MAP,
                    isFromCouponPage: false,
                    initialPos: {lat: position.coords.latitude, lng: position.coords.longitude}
                });

            },
            (error) => alert(error),
            {enableHighAccuracy: true, timeout: 3000, maximumAge: 2000}
        )
    } else
        Alert.alert('Proximity Triggering Disabled', 'To receive notifications about nearby things, enable Proximity Triggering in the app settings.');
};

var _render = function(navigator, screenName) {
    if (screenName !== Constants.SCREENS.COUPON)
        return (
            <View style={styles.bottombar_container}>
                <TouchableOpacity
                    style={styles.bottombar_icon_info_touchable}
                    onPress={() => {_onInfoPress(navigator)}}>
                    <Image
                        source={require('image!ic_bottombar_info')}
                        style={styles.bottombar_icon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottombar_icon_setting_touchable}
                    onPress={() => {_onSettingPress(navigator)}}>
                    <Image
                        source={require('image!ic_bottombar_setting')}
                        style={styles.bottombar_icon}/>
                </TouchableOpacity>
                {/*
                <TouchableOpacity
                    style={styles.bottombar_icon_bookmark_touchable}
                    onPress={() => {_onBookmarkPress(navigator)}}>
                    <Image
                        source={require('image!ic_bottombar_bookmark')}
                        style={styles.bottombar_icon}/>
                </TouchableOpacity>
                */}
                <TouchableOpacity
                    style={styles.bottombar_icon_map_touchable}
                    onPress={() => {_onMapPress(navigator, false)}}>
                    <Image
                        source={require('image!ic_bottombar_map')}
                        style={styles.bottombar_icon}/>
                </TouchableOpacity>
            </View>
        );
    else
        return (
            <View style={styles.bottombar_container}>
                <View style={styles.bottombar_coupon_cell}>
                    <TouchableOpacity
                        style={styles.bottombar_coupon_cell_touchable}
                        onPress={() => _onRedeemPress(navigator)}>
                        <Image
                            style={styles.bottombar_coupon_cell_icon}
                            source={require('image!ic_bottombar_redeem')}/>
                        <Text style={styles.bottombar_coupon_cell_label}>
                            Redeem
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottombar_coupon_cell}>
                    <TouchableOpacity
                        style={styles.bottombar_coupon_cell_touchable}
                        onPress={() => {_onMapPress(navigator, true)}}>
                        <Image
                            style={styles.bottombar_coupon_cell_icon}
                            source={require('image!ic_bottombar_direction')}/>
                        <Text style={styles.bottombar_coupon_cell_label}>
                            Map
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottombar_coupon_cell}>
                    <TouchableOpacity
                        style={styles.bottombar_coupon_cell_touchable}
                        onPress={_onCallPress}>
                        <Image
                            style={styles.bottombar_coupon_cell_icon}
                            source={require('image!ic_bottombar_call')}/>
                        <Text style={styles.bottombar_coupon_cell_label}>
                            Call
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottombar_coupon_cell}>
                    <TouchableOpacity
                        style={styles.bottombar_coupon_cell_touchable}
                        onPress={() => {_onWebsitePress(navigator)}}>
                        <Image
                            style={styles.bottombar_coupon_cell_icon}
                            source={require('image!ic_bottombar_website')}/>
                        <Text style={styles.bottombar_coupon_cell_label}>
                            Website
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
};

var _onRedeemPress = function(navigator) {
    if (Utils.getSelCoupon().redeemed_date)
       return;

    Alert.alert(
        'Redeem',
        'Redeeming will mark this offer as used and it will no longer be valid. This should only be done at time of purchase while presenting to the merchant. Do you want to continue?',
        [
            {text: 'Cancel'},
            {text: 'Redeem', onPress: () => _redeemCoupon(navigator)},
        ]
    );
};

var _redeemCoupon = function (navigator) {
    var coupon = Utils.getSelCoupon();
    // alert(coupon.coupon_id);
    request('POST', Constants.BACKEND_API_PATH)
        .send({action: 'redeem_coupon', coupon_id: coupon.coupon_id})
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end(function(err, res) {
            var success = false;
            if (!err) {
                // alert(res.text);
                var ret = JSON.parse(res.text);
                if (ret.redeem_code) {
                    success = true;
                    coupon.redeem_code = ret.redeem_code;
                    coupon.redeemed_date = 'today';
                    Utils.setSelCoupon(coupon);

                    alert('Redeemed: ' + coupon.merchant_title + '\n\nCode: ' + ret.redeem_code);

                    navigator.replace({
                        id: Constants.SCREENS.COUPON
                    });
                }
            }

            if (!success) {
                alert('Failed to redeem.');
            }
        });
};

var _onCallPress = function() {
    var phone = Utils.getSelCoupon().phone;

    if (!phone || phone === '') {
        alert('No phone number info.');
        return;
    }

    Alert.alert(
       '',
       'Call phone number, ' + phone + '? Please Call to close this application and dial the phone number.',
       [
           {text: 'Cancel'},
           {text: 'Call', onPress: () => {
               var url = 'tel:' + phone;
               Linking.canOpenURL(url).then(supported => {
                   if(supported) {
                       return Linking.openURL(url);
                   } else {
                       alert(phone + ' cannot be called because this device cannot make phone calls.');
                   }
               }).catch(err => console.error('An unexpected error happened', err));
           }},
       ]
    );
};

var _onWebsitePress = function(navigator) {
    var website = Utils.getSelCoupon().website;

    if (!website || website == '') {
        alert('No website info.');
        return;
    }

    Alert.alert(
       '',
       'Visit website, ' + website + '? Please Visit to close this application and go to the url.',
       [
           {text: 'Cancel'},
           {text: 'Visit', onPress: () => {
               Linking.canOpenURL(website).then(supported => {
                   if(supported) {
                       navigator.push({
                           id: Constants.SCREENS.WEB,
                           url: website,
                       });
                   } else {
                       alert('Invalid website addresss.\n' + website);
                   }
               }).catch(err => console.error('An unexpected error happened', err));
           }},
       ]
    );
};

// var _onAppleWalletPress = function () {
//     alert('You pressed "add to apple wallet" button.');
// };
//
// var _onGooglePassbookPress = function () {
//     alert('You pressed "add to passbook" button.');
// };

const styles = StyleSheet.create({
    bottombar_container: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: Constants.COLORS.BAR_COLOR,
        top: Constants.DIMENSION.HEIGHT - Constants.DIMENS.BOTTOMBAR_HEIGHT - Constants.DIMENS.ANDROID_OFFSET,
        width: Constants.DIMENSION.WIDTH,
        height: Constants.DIMENS.BOTTOMBAR_HEIGHT,
    },

    bottombar_coupon_cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: Constants.COLORS.DIVIDER_COLOR,
    },

    bottombar_coupon_cell_touchable: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    bottombar_coupon_cell_icon: {
        width: Constants.DIMENS.BOTTOMBAR_ICON_SIZE,
        height: Constants.DIMENS.BOTTOMBAR_ICON_SIZE,
        resizeMode: 'contain',
    },

    bottombar_coupon_cell_label: {
        color: Constants.COLORS.SECONDARY_TEXT,
        fontSize: 15,
        fontWeight: '800',
    },

    bottombar_icon_info_touchable: {
        position: 'absolute',
        left: Constants.DIMENS.PADDING_HORIZONTAL,
        top: (Constants.DIMENS.BOTTOMBAR_HEIGHT - Constants.DIMENS.BOTTOMBAR_ICON_SIZE) / 2,
    },

    bottombar_icon_setting_touchable: {
        position: 'absolute',
        left: Constants.DIMENS.PADDING_HORIZONTAL + Constants.DIMENS.BOTTOMBAR_ICON_SIZE + Constants.DIMENS.GAP_SMALL,
        top: (Constants.DIMENS.BOTTOMBAR_HEIGHT - Constants.DIMENS.BOTTOMBAR_ICON_SIZE) / 2,
    },

    bottombar_icon_bookmark_touchable: {
        position: 'absolute',
        left: Constants.DIMENSION.WIDTH - Constants.DIMENS.PADDING_HORIZONTAL - Constants.DIMENS.BOTTOMBAR_ICON_SIZE * 2 - Constants.DIMENS.GAP_SMALL,
        top: (Constants.DIMENS.BOTTOMBAR_HEIGHT - Constants.DIMENS.BOTTOMBAR_ICON_SIZE) / 2,
    },

    bottombar_icon_map_touchable: {
        position: 'absolute',
        left: Constants.DIMENSION.WIDTH - Constants.DIMENS.PADDING_HORIZONTAL - Constants.DIMENS.BOTTOMBAR_ICON_SIZE,
        top: (Constants.DIMENS.BOTTOMBAR_HEIGHT - Constants.DIMENS.BOTTOMBAR_ICON_SIZE) / 2,
    },

    bottombar_icon: {
        width: Constants.DIMENS.BOTTOMBAR_ICON_SIZE,
        height: Constants.DIMENS.BOTTOMBAR_ICON_SIZE,
        resizeMode: 'contain',
    }
});

module.exports = {
    render: _render,

    onRedeemPress: _onRedeemPress,
    onMapPress: _onMapPress,
    onCallPress: _onCallPress,
    onWebsitePress: _onWebsitePress,
    // onAppleWalletPress: _onAppleWalletPress,
    // onGooglePassbookPress: _onGooglePassbookPress,
};