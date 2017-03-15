/**
 * Created on 7/15/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';


import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from './BasicScreen';

var WEBVIEW_REF = 'webview';

class WebScreen extends BasicScreen {

    constructor(props) {
        super(props);

        this.state = {
            url: this.props.route.url,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };

        this.onShouldStartLoadWithRequest = this.onShouldStartLoadWithRequest.bind(this);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.reload = this.reload.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.action = this.action.bind(this);
    }

    _renderContentView() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    style={styles.webview}
                    ref={WEBVIEW_REF}
                    source={{uri: this.state.url}}
                    automaticallyAdjustContentInsets={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    // startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                    // renderLoading={() => {return (<View style={{position: 'absolute', width: Constants.DIMENSION.WIDTH, height: CONTENTVIEW_HEIGHT - 40, alignItems:'center', justifyContent:'center'}}><ActivityIndicator size="large" /></View>)}}
                    // renderLoading={() => {return null}}
                />
                {this.renderLoading()}
                {this._renderBottomBar()}
            </View>
        );
    }

    renderLoading() {
        if (!this.state.loading)
            return null;

        return (
            <View style={{position: 'absolute', left:0, top: 0, width: Constants.DIMENSION.WIDTH, height: CONTENTVIEW_HEIGHT - 40, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    onShouldStartLoadWithRequest(event) {
        return true;
    }


    onNavigationStateChange(navState) {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    }

    goBack() {
        this.refs[WEBVIEW_REF].goBack();
    }

    goForward() {
        this.refs[WEBVIEW_REF].goForward();
    }

    reload() {
        this.refs[WEBVIEW_REF].reload();
    }

    action() {
        let options = ['Open in web browser', 'Cancel'];
        let cancelButtonIndex = 1;
        Utils.loadActionSheet().showActionSheetWithOptions({
                options,
                cancelButtonIndex
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    Utils.showWebBrowser(this.state.url);
                }
            });
    }

    stopLoading() {
        this.refs[WEBVIEW_REF].stopLoading();

        this.setState({loading: false});
    }

    _renderBottomBar() {
        var tintColor = 'lightgray';
        var backButonStyle;
        if (!this.state.backButtonEnabled) backButonStyle = {tintColor: tintColor};
        var forwardButonStyle;
        if (!this.state.forwardButtonEnabled) forwardButonStyle = {tintColor: tintColor};
        var stopButonStyle;
        if (!this.state.loading) stopButonStyle = {tintColor: tintColor};

        return (
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.bottombar_touchable}
                    disabled={!this.state.backButtonEnabled}
                    onPress={this.goBack}>
                    <Image
                        style={[styles.bottombar_icon, backButonStyle]}
                        source={require('image!ic_webview_backward')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottombar_touchable}
                    disabled={!this.state.forwardButtonEnabled}
                    onPress={this.goForward}>
                    <Image
                        style={[styles.bottombar_icon, forwardButonStyle]}
                        source={require('image!ic_webview_forward')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottombar_touchable}
                    onPress={this.action}>
                    <Image
                        style={styles.bottombar_icon}
                        source={require('image!ic_webview_action')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottombar_touchable}
                    onPress={this.reload}>
                    <Image
                        style={styles.bottombar_icon}
                        source={require('image!ic_webview_reload')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottombar_touchable}
                    disabled={!this.state.loading}
                    onPress={this.stopLoading}>
                    <Image
                        style={[styles.bottombar_icon, stopButonStyle]}
                        source={require('image!ic_webview_cross')}/>
                </TouchableOpacity>
            </View>
        )
    }

    _getScreenName() {
        return Constants.SCREENS.WEB;
    }

    _isBottomBarVisible() {
        return false;
    }
}

var CONTENTVIEW_HEIGHT = Constants.DIMENSION.HEIGHT - (Constants.DIMENS.ACTIONBAR_HEIGHT + Constants.DIMENS.IOS_OFFSET + Constants.DIMENS.ANDROID_OFFSET);
var BOTTOMBAR_HEIGHT = 50;

const styles = StyleSheet.create({
    webview: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Constants.DIMENSION.WIDTH,
        height: CONTENTVIEW_HEIGHT - BOTTOMBAR_HEIGHT,
    },
    bottomBar: {
        position: 'absolute',
        flexDirection: 'row',
        left: 0,
        top: CONTENTVIEW_HEIGHT - BOTTOMBAR_HEIGHT,
        width: Constants.DIMENSION.WIDTH,
        height: BOTTOMBAR_HEIGHT,
        backgroundColor: Constants.COLORS.BAR_COLOR
    },
    bottombar_touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottombar_icon: {
        tintColor: 'gray',
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
});

module.exports = WebScreen;