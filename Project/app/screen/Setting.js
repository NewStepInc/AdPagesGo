/**
 * Created on 7/15/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Switch,
} from 'react-native';


import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from './BasicScreen';

class SettingScreen extends BasicScreen {

    constructor(props) {
        super(props);

        this.state = {
            proximity: Utils.getProximityTriggering(),
            sendData: Utils.getSendDiagnosticData(),
        };

        this._onProximityChanged = this._onProximityChanged.bind(this);
        this._onSendDataChanged = this._onSendDataChanged.bind(this);
    }

    _renderContentView() {
        return (
            <View style={styles.contentView}>
                {this._renderTitlePart()}
                {this._renderProximityPart()}
                {this._renderSendDataPart()}
            </View>
        );
    }

    _renderTitlePart() {
        return (
            <Image style={styles.titlePart}
                   source={require('image!setting_bg')}>
                <Text style={styles.titleText}>SETTINGS</Text>
            </Image>
        );
    }

    _renderProximityPart() {
        return (
            <View style={styles.eachPart}>
                <View style={styles.eachHeadLine}>
                    <Text style={styles.eachTitle}>
                        Proximity Triggering
                    </Text>
                    <Switch
                        onValueChange={this._onProximityChanged}
                        value={this.state.proximity} />
                </View>
                <View style={styles.eachDescriptionLine}>
                    <Text style={styles.eachDescription}>
                        Alerts when location based content is nearby{'\n'}
                        (location services must be enabled)
                    </Text>
                </View>
            </View>
        );
    }

    _renderSendDataPart() {
        return (
            <View style={styles.eachPart}>
                <View style={styles.eachHeadLine}>
                    <Text style={styles.eachTitle}>
                        Send Diagnostic Data
                    </Text>
                    <Switch
                        onValueChange={this._onSendDataChanged}
                        value={this.state.sendData} />
                </View>
                <View style={styles.eachDescriptionLine}>
                    <Text style={styles.eachDescription}>
                        Help improve the product by allowing it to automatically send information from time to time about how it's working and how you use it.
                    </Text>
                </View>
            </View>
        );
    }

    _onProximityChanged(value) {
        this.setState({proximity: value});
        Utils.setProximityTriggering(value);
    }

    _onSendDataChanged(value) {
        this.setState({sendData: value});
        Utils.setSendDiagnosticData(value);
    }

    _isBottomBarVisible() {
        return false;
    }

    _getScreenName() {
        return Constants.SCREENS.SETTING;
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR
    },
    titlePart: {
        left: 0,
        top: 0,
        width: Constants.DIMENSION.WIDTH,
        height: Constants.DIMENSION.WIDTH * 58 / 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    eachPart: {
        left: 0,
        right: 0,
        top: 0,
        flexDirection: 'column',
    },
    eachHeadLine: {
        flexDirection: 'row',
        left:0,
        right:0,
        top:0,
        height: Constants.DIMENS.GAP_LARGE * 3,
        alignItems: 'center',
        paddingHorizontal: Constants.DIMENS.GAP_MEDIUM,
    },
    eachTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    eachDescriptionLine: {
        left:0,
        right:0,
        top:0,
        alignItems: 'center',
        padding: Constants.DIMENS.GAP_MEDIUM,
        backgroundColor: '#f7f7f7'
    },
    eachDescription: {
        fontSize: 13,
        color: 'black',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },

});

module.exports = SettingScreen;