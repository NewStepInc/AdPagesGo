/**
 * Created on 7/15/16.
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
import BasicScreen from './BasicScreen';

class AcknowledgementScreen extends BasicScreen {
    _renderContentView() {
        return (
            <View style={styles.contentView}>
            </View>
        );
    }

    _isBottomBarVisible() {
        return false;
    }

    _getScreenName() {
        return Constants.SCREENS.ACKNOWLEDGEMENT;
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR
    },

});

module.exports = AcknowledgementScreen;