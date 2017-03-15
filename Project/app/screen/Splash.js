/**
 * Created on 7/14/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    BackAndroid,
} from 'react-native';

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from './BasicScreen';

class SplashScreen extends BasicScreen {

    componentWillMount() {
        // super.componentWillMount();  // do not use. it makes an error.
        
        var navigator = this.props.navigator;
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return require('./../base/ActionBar').onBackPress(navigator);
        });
    }
    
    componentDidMount() {
        // super.componentDidMount(); // do not use. it makes an error.


        Utils.loadSetting();
        Utils.loadBookmarkedCoupons();

        var navigator = this.props.navigator;
        setTimeout (() => {
            navigator.replace({
                id: Constants.SCREENS.MAIN
            });
        }, 2000);
    }

    _getBackImage() {
        return require('image!splash');
    }

    _isActionBarVisible() {
        return false;
    }

    _isBottomBarVisible() {
        return false;
    }

    _isContentViewVisible() {
        return false;
    }

    _getScreenName() {
        return Constants.SCREENS.SPLASH;
    }


}

module.exports = SplashScreen;