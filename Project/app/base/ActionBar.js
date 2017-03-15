/**
 * Created on 7/15/16.
 */


'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Constants from "./../global/Constants";


var _onSearchPress = function(navigator) {
    navigator.push({
        id: Constants.SCREENS.SEARCH
    });
};

var _onBackPress = function(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
};

var _render = function (navigator, screenName) {
    return (
        <View style={styles.actionbar_container}>
            <Image
                style={styles.actionbar_logo}
                source={require('image!logo')}
            />

            {_renderBackImage(navigator, screenName)}

            {_renderSearchButton(navigator, screenName)}
        </View>
    );
};

var _renderBackImage = function(navigator, screenName) {
    if (navigator.getCurrentRoutes().length > 1 && screenName != Constants.SCREENS.MAIN) {
        let extraStyle = null;
        if (screenName === Constants.SCREENS.INFORMATION ||
                screenName === Constants.SCREENS.SETTING ||
                screenName === Constants.SCREENS.BOOKMARK ||
                screenName === Constants.SCREENS.SEARCH)
            extraStyle = {transform: [{rotateZ: '-90deg'}]};
        return (
            <TouchableOpacity
                style={styles.actionbar_icon_back_touchable}
                onPress={() => {_onBackPress(navigator)}}>
                <Image
                    source={require('image!ic_actionbar_back')}
                    style={[styles.actionbar_icon, extraStyle]}/>
            </TouchableOpacity>
        );
    } else
        return null;
};

var _renderSearchButton = function (navigator, screenName) {
    if (screenName !== Constants.SCREENS.SEARCH)
        return (
            <TouchableOpacity
                style={styles.actionbar_icon_search_touchable}
                onPress={() => {_onSearchPress(navigator)}}>
                <Image
                    source={require('image!ic_actionbar_search')}
                    style={[styles.actionbar_icon, {tintColor: 'white'}]}/>
            </TouchableOpacity>
        );
    else
        return null;
};

const styles = StyleSheet.create({
    actionbar_container: {
        position: 'absolute',
        backgroundColor: Constants.COLORS.BAR_COLOR,
        top: 0,
        paddingTop: Constants.DIMENS.PADDING_VERTICAL + Constants.DIMENS.IOS_OFFSET,
        paddingBottom: Constants.DIMENS.PADDING_VERTICAL,
        paddingLeft: Constants.DIMENS.PADDING_HORIZONTAL,
        paddingRight: Constants.DIMENS.PADDING_HORIZONTAL,
        width: Constants.DIMENSION.WIDTH,
        height: Constants.DIMENS.ACTIONBAR_HEIGHT + Constants.DIMENS.IOS_OFFSET,
    },

    actionbar_logo: {
        alignSelf: 'center',
        width: Constants.DIMENSION.WIDTH / 2,
        height: Constants.DIMENS.ACTIONBAR_HEIGHT * 4 / 5,
        resizeMode: 'contain'
    },

    actionbar_icon_back_touchable: {
        position: 'absolute',
        left: 0,
        top: Constants.DIMENS.IOS_OFFSET,
        paddingHorizontal: Constants.DIMENS.PADDING_HORIZONTAL,
        paddingVertical: (Constants.DIMENS.ACTIONBAR_HEIGHT - Constants.DIMENS.ACTIONBAR_ICON_SIZE) / 2,
    },

    actionbar_icon_search_touchable: {
        position: 'absolute',
        left: Constants.DIMENSION.WIDTH - Constants.DIMENS.PADDING_HORIZONTAL - Constants.DIMENS.ACTIONBAR_ICON_SIZE - Constants.DIMENS.GAP_SMALL * 2,
        top: (Constants.DIMENS.ACTIONBAR_HEIGHT - Constants.DIMENS.ACTIONBAR_ICON_SIZE - Constants.DIMENS.GAP_SMALL * 2) / 2 + Constants.DIMENS.IOS_OFFSET,
        width: Constants.DIMENS.ACTIONBAR_ICON_SIZE + Constants.DIMENS.GAP_SMALL * 2,
        height: Constants.DIMENS.ACTIONBAR_ICON_SIZE + Constants.DIMENS.GAP_SMALL * 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fec107',
        borderRadius: 3,
    },

    actionbar_icon: {
        width: Constants.DIMENS.ACTIONBAR_ICON_SIZE,
        height: Constants.DIMENS.ACTIONBAR_ICON_SIZE,
        resizeMode: 'contain',
    }
});

module.exports = {
    render: _render,
    onBackPress: _onBackPress
};