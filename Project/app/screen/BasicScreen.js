/**
 * Created on 7/16/16.
 */


'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import ActionBar from './../base/ActionBar';
import BottomBar from './../base/BottomBar';
import Background from './../base/Background';


var DEFAULT_CONTENTVIEW_HEIGHT = Constants.DIMENSION.HEIGHT - Constants.DIMENS.ACTIONBAR_HEIGHT - Constants.DIMENS.IOS_OFFSET - Constants.DIMENS.ANDROID_OFFSET - Constants.DIMENS.BOTTOMBAR_HEIGHT;
var DEFAULT_CONTENTVIEW_TOP = Constants.DIMENS.ACTIONBAR_HEIGHT + Constants.DIMENS.IOS_OFFSET;

class BasicScreen extends Component {

    render() {
        var extraStyles = {top: DEFAULT_CONTENTVIEW_TOP, height: DEFAULT_CONTENTVIEW_HEIGHT};

        let actionBar = null;
        if (this._isActionBarVisible())
            actionBar = ActionBar.render(this.props.navigator, this._getScreenName());
        else {
            extraStyles.top -= Constants.DIMENS.ACTIONBAR_HEIGHT;
            extraStyles.height += Constants.DIMENS.ACTIONBAR_HEIGHT;
        }

        let bottomBar = null;
        if (this._isBottomBarVisible())
            bottomBar = BottomBar.render(this.props.navigator, this._getScreenName());
        else
            extraStyles.height += Constants.DIMENS.BOTTOMBAR_HEIGHT;

		if (!this._getBackImage())
			extraStyles.backgroundColor = 'white';

        let contentView = null;
        if (this._isContentViewVisible()) {

            contentView = (
                <View style={[styles.contentContainer, extraStyles]}>
                    {this._renderContentView()}
                </View>
            );
        }

        return (
            <View>
                {Background.render(this._getBackImage())}

                {actionBar}

                {contentView}

                {bottomBar}
            </View>
        );
    }

    _isActionBarVisible() {
        return true;
    }

    _isBottomBarVisible() {
        return true;
    }

    _isContentViewVisible() {
        return true;
    }

    _getBackImage() {
        return null;
    }

    _renderContentView() {
        return null;
    }

    _getScreenName() {
        return Constants.SCREENS.BASIC;
    }
}

const styles = StyleSheet.create({
    placeHolder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR,
    },
    contentContainer: {
        position: 'absolute',
        top: DEFAULT_CONTENTVIEW_TOP,
        width: Constants.DIMENSION.WIDTH,
        height: DEFAULT_CONTENTVIEW_HEIGHT,
    }
});

module.exports = BasicScreen;