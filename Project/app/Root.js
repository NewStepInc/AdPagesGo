/**
 * Created on 7/14/16.
 */

'use strict';
import React, {Component} from 'react';

import {
    Navigator,
    PropTypes,
} from 'react-native';

import ActionSheet from '@exponent/react-native-action-sheet';

import Constants from "./global/Constants";
import Utils from "./global/Utils";

import OneSignal from 'react-native-onesignal';
// import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';

// var pendingNotifications = [];
// var _navigator; // If applicable, declare a variable for accessing your navigator object to handle payload.
// function handleNotification (notification) { // If you want to handle the notifiaction with a payload.
// 	_navigator.to('main.post', notification.data.title, {
// 	 article: {
// 	   title: notification.data.title,
// 	   link: notification.data.url,
// 	   action: notification.data.actionSelected
// 	 }
// 	});
// }

OneSignal.configure({
    onIdsAvailable: function(device) {
        console.log('UserId = ', device.userId);
        console.log('PushToken = ', device.pushToken);
        // debugger;
    },
    onNotificationOpened: function(message, data, isActive) {
        var notification = {message: message, data: data, isActive: isActive};
        console.log('Notification Opened: ', notification);
        // debugger;
        // alert(JSON.stringify(notification));
        //if (!_navigator) { // Check if there is a navigator object. If not, waiting with the notification.
        //    console.log('Navigator is null, adding notification to pending list...');
        // pendingNotifications.push(notification);
        //    return;
        // }
        // handleNotification(notification);
    }
});


class Root extends Component {

    componentWillMount() {
        console.log = function () {};

        // AdMobInterstitial.setTestDeviceID('EMULATOR');
        // AdMobInterstitial.setAdUnitID(Utils.getInterstitialAdUnitId());

        // AdMobInterstitial.addEventListener('interstitialDidLoad',
        //    this.showInterstital);//() => console.log('interstitialDidLoad event'));
        // AdMobInterstitial.addEventListener('interstitialDidClose',
        //    () => console.log('interstitialDidClose event'));
        // AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
        //    () => console.log('interstitialDidFailToLoad event'));
        // AdMobInterstitial.addEventListener('interstitialDidOpen',
        //    () => console.log('interstitialDidOpen event'));
        // AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
        //    () => console.log('interstitalWillLeaveApplication event'));
    }

    // showInterstital() {
    //     AdMobInterstitial.showAd((error) => error && console.log(error));
    // }

    render() {
        return (
            <ActionSheet ref={component => Utils.saveActionSheet(component)}>
                <Navigator
                    initialRoute={{id: Constants.SCREENS.SPLASH}}
                    renderScene={this._renderScene}
                    configureScene={(route, routeStack) => {
                        switch (route.id) {
                            case Constants.SCREENS.INFORMATION:
                            case Constants.SCREENS.SETTING:
                            case Constants.SCREENS.BOOKMARK:
                            case Constants.SCREENS.SEARCH:
                                return Navigator.SceneConfigs.FloatFromBottom;

                            default:
                                return Navigator.SceneConfigs.PushFromRight
                        }
                    }}
                />
            </ActionSheet>
        );
    }

    _renderScene(route, navigator) {
        var routeId = route.id;
        // console.log(route, navigator);

        var Screen = null;
        if (routeId === Constants.SCREENS.SPLASH)
            Screen = require("./screen/Splash");
        else if (routeId === Constants.SCREENS.MAIN)
            Screen = require("./screen/Main");
        else if (routeId === Constants.SCREENS.OFFER)
            Screen = require("./screen/Offer");
        else if (routeId === Constants.SCREENS.WEB)
            Screen = require("./screen/Web");
        else if (routeId === Constants.SCREENS.OFFER_LIST)
            Screen = require("./screen/OfferList");
        else if (routeId === Constants.SCREENS.COUPON)
            Screen = require("./screen/Coupon");
        else if (routeId === Constants.SCREENS.MAP)
            Screen = require("./screen/Map");
        else if (routeId === Constants.SCREENS.SETTING)
            Screen = require("./screen/Setting");
        else if (routeId === Constants.SCREENS.INFORMATION)
            Screen = require("./screen/Information");
        else if (routeId === Constants.SCREENS.ABOUT)
            Screen = require("./screen/About");
        else if (routeId === Constants.SCREENS.HELP)
            Screen = require("./screen/Help");
        else if (routeId === Constants.SCREENS.ACKNOWLEDGEMENT)
            Screen = require("./screen/Acknowledgement");
        else if (routeId === Constants.SCREENS.BOOKMARK)
            Screen = require("./screen/Bookmark");
        else if (routeId === Constants.SCREENS.SEARCH)
            Screen = require("./screen/Search");

        if (Screen === null)
            return null;

        return (
            <Screen route={route} navigator={navigator}/>
        );
    }
}

module.exports = Root;