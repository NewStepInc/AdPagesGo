/**
 * Created on 7/14/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    // InteractionManager,
} from 'react-native';

// import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from './BasicScreen';

class OfferScreen extends BasicScreen {

    constructor(props) {
        super(props);
        
        
    }

    _renderContentView() {
        return (
            <View>
                <Text style={styles.title}>
                    {Utils.getSelCityName() + " OFFERS"}
                </Text>
                <View style={styles.buttons}>
                    <View style={styles.button_row}>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(0)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={[styles.button, {marginLeft: 0}]}>
                                <Image source={require('image!ic_cityoffer_fooddrink')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[0]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(1)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={styles.button}>
                                <Image source={require('image!ic_cityoffer_beautyspa')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[1]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(2)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={styles.button}>
                                <Image source={require('image!ic_cityoffer_automotive')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[2]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button_row}>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(3)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={[styles.button, {marginLeft: 0}]}>
                                <Image source={require('image!ic_cityoffer_entertainment')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[3]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(4)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={styles.button}>
                                <Image source={require('image!ic_cityoffer_homeservice')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[4]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(5)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={styles.button}>
                                <Image source={require('image!ic_cityoffer_professionalservice')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[5]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button_row}>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(6)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={[styles.button, {marginLeft: 0}]}>
                                <Image source={require('image!ic_cityoffer_shoppingretail')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[6]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(7)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={styles.button}>
                                <Image source={require('image!ic_cityoffer_dailydeals')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[7]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelOffer(8)}}>
                            <Image
                                source={require('image!btn_bg_square')}
                                style={styles.button}>
                                <Image source={require('image!ic_cityoffer_healthmedical')}
                                       style={styles.button_image}/>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CATEGORIES[8]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*
                <AdMobBanner
                   style={styles.banner}
                   // bannerSize="smartBannerPortrait"
                   testDeviceID="EMULATOR"
                   adUnitID={Utils.getBannerAdUnitId()}
                    />
                    */}
            </View>
        );
    }

    _getBackImage() {
        return require('image!cityoffer_bg');
    }

    _onSelOffer(catNum) {
        Utils.setSelCatNum(catNum);

        var navigator = this.props.navigator;
        if (catNum === 7) { // Daily Deals
            navigator.push({
                id: Constants.SCREENS.WEB,
                url: Constants.STRINGS.DEALS_URL,
            });
        } else {
            // InteractionManager.runAfterInteractions(() => {
            //     requestAnimationFrame(function () {
                    navigator.push({
                        id: Constants.SCREENS.OFFER_LIST
                    });
                // });
            // });
        }
    }

    _getScreenName() {
        return Constants.SCREENS.OFFER;
    }
}

const CONTENTVIEW_HEIGHT = Constants.DIMENSION.HEIGHT - Constants.DIMENS.ANDROID_OFFSET - Constants.DIMENS.IOS_OFFSET - Constants.DIMENS.ACTIONBAR_HEIGHT - Constants.DIMENS.BOTTOMBAR_HEIGHT;
const BUTTONS_HEIGHT = Math.min(Constants.DIMENSION.WIDTH, CONTENTVIEW_HEIGHT - Constants.DIMENS.GAP_SMALL * 7);
const BUTTON_HEIGHT = (BUTTONS_HEIGHT - Constants.DIMENS.GAP_MEDIUM * 2) / 3;
const BUTTON_WIDTH = BUTTON_HEIGHT * 91.0 / 101.0;

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        width: Constants.DIMENSION.WIDTH,
        top : Constants.DIMENS.GAP_LARGE,
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: 'white',
        fontSize: Constants.DIMENS.TITLE_FONT_SIZE,
        fontWeight: '800',
    },

    buttons: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        top: Constants.DIMENS.GAP_SMALL * 7,
        width: Constants.DIMENSION.WIDTH,
        height: BUTTONS_HEIGHT,
    },

    button_row: {
        flexDirection: 'row',
        width: Constants.DIMENSION.WIDTH,
        height: BUTTON_HEIGHT,
        justifyContent: 'center',
        marginBottom: Constants.DIMENS.GAP_SMALL,
    },

    button: {
        flex: 1,
        flexDirection: 'column',
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        marginLeft: Constants.DIMENS.GAP_SMALL,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button_image: {
        top: -Constants.DIMENS.GAP_SMALL / 2,
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT - Constants.DIMENS.GAP_SMALL * 5,
        resizeMode: 'contain',
    },

    button_label: {
        top: Constants.DIMENS.GAP_SMALL / 2,
        width: BUTTON_WIDTH,
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: 'white',
        fontSize: BUTTON_HEIGHT / 11,
        fontWeight: '700',
    },

    banner: {
        position: 'absolute',
        left: 0,
        top: CONTENTVIEW_HEIGHT - 50,
    }
});

module.exports = OfferScreen;