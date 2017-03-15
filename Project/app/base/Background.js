/**
 * Created on 7/15/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';

import Constants from "./../global/Constants";

var _render = function(image) {
    if (image === null)
        return null;
    
    return (
        <Image
            style={styles.backgroundImage}
            source={image}
        />
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        top: Constants.DIMENS.IOS_OFFSET,
        width: Constants.DIMENSION.WIDTH,
        height: Constants.DIMENSION.HEIGHT - Constants.DIMENS.IOS_OFFSET - Constants.DIMENS.ANDROID_OFFSET,
        resizeMode: 'stretch',
    }
});

module.exports = {
    render: _render
};