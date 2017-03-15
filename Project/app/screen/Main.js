/**
 * Created on 7/14/16.
 */

'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';

import Constants from "./../global/Constants";
import BasicScreen from './BasicScreen';
import Utils from './../global/Utils';

class MainScreen extends BasicScreen {

    _renderContentView() {
        return (
            <View>
                <Image style={styles.logo_image} source={require('image!main_logo')}/>
                <Text style={styles.logo_title}>MOBILE OFFERS ON YOUR SMARTPHONE</Text>
                <View style={styles.buttons}>
                    <View style={styles.button_row}>
                        <TouchableOpacity
                            onPress={() => {this._onSelCity(0)}}>
                            <Image
                                source={require('image!btn_bg_rect')}
                                style={[styles.button, {marginLeft: 0}]}>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CITIES[0]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelCity(1)}}>
                            <Image
                                source={require('image!btn_bg_rect')}
                                style={styles.button}>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CITIES[1]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button_row}>
                        <TouchableOpacity
                            onPress={() => {this._onSelCity(2)}}>
                            <Image
                                source={require('image!btn_bg_rect')}
                                style={[styles.button, {marginLeft: 0}]}>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CITIES[2]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this._onSelCity(3)}}>
                            <Image
                                source={require('image!btn_bg_rect')}
                                style={styles.button}>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CITIES[3]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button_row}>
                        <TouchableOpacity
                            onPress={() => {this._onSelCity(4)}}>
                            <Image
                                source={require('image!btn_bg_rect')}
                                style={[styles.button, {marginLeft: 0}]}>
                                <Text style={styles.button_label}>
                                    {Constants.STRINGS.CITIES[4]}
                                </Text>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _getBackImage() {
        return require('image!main_bg');
    }

    _onSelCity(cityID) {
        Utils.setSelCityNum(cityID);

        var navigator = this.props.navigator;
        navigator.push({
            id: Constants.SCREENS.OFFER
        });
    }

    _getScreenName() {
        return Constants.SCREENS.MAIN;
    }
}


const CONTENTVIEW_HEIGHT = Constants.DIMENSION.HEIGHT - Constants.DIMENS.ANDROID_OFFSET - Constants.DIMENS.IOS_OFFSET - Constants.DIMENS.ACTIONBAR_HEIGHT - Constants.DIMENS.BOTTOMBAR_HEIGHT;
const BUTTONS_HEIGHT = Math.min(Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_MEDIUM * 2, CONTENTVIEW_HEIGHT * 4 / 7);
const BUTTON_HEIGHT = (BUTTONS_HEIGHT - Constants.DIMENS.GAP_SMALL * 3) / 3;
const BUTTON_WIDTH = BUTTON_HEIGHT * 289.0 / 157.0;

const styles = StyleSheet.create({

    logo_image: {
        position: 'absolute',
        left: Constants.DIMENS.GAP_MEDIUM * 2,
        top: Constants.DIMENS.GAP_SMALL,
        width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_MEDIUM * 4,
        height: CONTENTVIEW_HEIGHT - Constants.DIMENS.GAP_MEDIUM * 2 - BUTTONS_HEIGHT,
        resizeMode: 'contain',
    },

    logo_title: {
        position: 'absolute',
        left: 0,
        top: Constants.DIMENS.GAP_SMALL + CONTENTVIEW_HEIGHT - Constants.DIMENS.GAP_MEDIUM * 2 - BUTTONS_HEIGHT,
        width: Constants.DIMENSION.WIDTH,
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: -1,
    },

    buttons: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        top: CONTENTVIEW_HEIGHT - BUTTONS_HEIGHT,
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
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        marginLeft: Constants.DIMENS.GAP_SMALL,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button_label: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: 'white',
        fontSize: BUTTON_HEIGHT / 6,
        fontWeight: '700',
    }
});

module.exports = MainScreen;