/**
 * Created on 7/15/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
} from 'react-native';


import Constants from "./../global/Constants";
import BasicScreen from './BasicScreen';

class AboutScreen extends BasicScreen {

    _renderContentView() {
        return (
            <ScrollView style={styles.contentView}>
                <View style={styles.aboutTitle}>
                    <Image style={styles.aboutIcon}
                        source={require('image!ic_icon')}/>
                    <Text style={{fontWeight: 'bold', fontSize: 20,}}>About Ad Pages GO</Text>
                </View>
                <Text style={styles.aboutDescription}>
                    Ad Pages was started as a direct mail magazine in Dallas, Texas in February of 1988 by our founder and current president, Bill Squiric. At the time Ad Pages had zero employees, zero capital and zero customers. Ad Pages did have, however, a wonderful idea to offer direct mail coupons within a magazine format. The goal was to create a magazine so attractive and so filled with usable coupons that readers would notice it in the mailbox and then value it enough to keep it around the house for constant use.{'\n'}
                    {'\n'}
                    We succeeded and the concept has worked exceptionally well. Now, over 25 years later, we are mailing over 20 million magazines throughout 80+ individual DFW, Austin, San Antonio, & St. Louis communities and suburban markets every year.{'\n'}
                    {'\n'}
                    In addition, we have coupon, daily deal websites, and mobile apps that market amazing discounts to 1000′s of email subscribers, downloaded apps, and social media followers on a daily basis. We offer many online advertising options, from daily deal email marketing, to self-managed free coupons, to social media campaigns that have helped 100′s of local businesses grow their customer base through low-risk marketing options. We also own and operate a large commercial printing and direct mail operation which services our own companies as well as the general business public.{'\n'}
                    {'\n'}
                    Call us or email us today and let one of our professional Ad Consultants show you how Ad Pages Companies can help your business make more money. Or, simply enjoy the online coupons we have provided for your use.
                </Text>
            </ScrollView>
        );
    }

    _isBottomBarVisible() {
        return false;
    }

    _getScreenName() {
        return Constants.SCREENS.ABOUT;
    }
}

const styles = StyleSheet.create({
    contentView: {
        position: 'absolute',
        left: Constants.DIMENS.GAP_SMALL,
        right: Constants.DIMENS.GAP_SMALL,
        top: Constants.DIMENS.GAP_SMALL,
        bottom: Constants.DIMENS.GAP_SMALL,
        flexDirection: 'column',
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR,
    },
    aboutTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aboutIcon: {
        width: Constants.DIMENS.GAP_MEDIUM * 3,
        height: Constants.DIMENS.GAP_MEDIUM * 3,
        resizeMode: 'contain',
        margin: Constants.DIMENS.GAP_SMALL,
    },
    aboutDescription: {
        flex: 1,
        fontSize: 17,
        fontWeight: '400'
    }
});

module.exports = AboutScreen;