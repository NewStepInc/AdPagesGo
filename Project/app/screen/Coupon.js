/**
 * Created on 7/15/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BottomBar from './../base/BottomBar';
import BasicScreen from './BasicScreen';

class CouponScreen extends BasicScreen {

    constructor(props) {
        super(props);

        let coupon = Utils.getSelCoupon();
        this.state = {
            coupon,
            isBookmarked: Utils.isBookmarked(coupon)
        };
    }

    _renderContentView() {
        var coupon = this.state.coupon;
        return (
            <ScrollView style={styles.contentView}
                        automaticallyAdjustContentInsets={false}>
                {this._renderImagePart(coupon)}
                <View style={styles.dotBoundary}>
                    {this._renderTitlePart(coupon)}
                    {this._renderDescriptionPart(coupon)}
                    {this._renderAddressPart(coupon)}
                    {this._renderPhonenumberPart(coupon.phone)}
                    {this._renderWebsitePart(coupon.website)}
                </View>
                {this._renderButtonsPart(coupon)}
            </ScrollView>
        );
    }

    _renderImagePart(coupon) {
        let bookmarkStyle = {};
        if (this.state.isBookmarked)
            bookmarkStyle = {tintColor: 'yellow'};
        return (
            <View
                style={styles.image_bg}>
                <Image
                    style={styles.image}
                    source={{uri: coupon.coupon_image}}/>
                {/*
                <TouchableOpacity
                    activeOpacity={1}
                    style={{position: 'absolute', right: Constants.DIMENS.GAP_SMALL, bottom: Constants.DIMENS.GAP_SMALL}}
                    onPress={() => {
                        Utils.bookmarkCoupon(this.state.coupon);
                        this.setState({isBookmarked: !this.state.isBookmarked})
                    }}>
                    <Image
                        style={[{width: 30, height: 30, resizeMode: 'contain'}, bookmarkStyle]}
                        source={require('image!ic_bottombar_bookmark')}/>
                </TouchableOpacity>
                */}
            </View>
        )
    }

    _renderTitlePart(coupon) {
        return (
            <View style={styles.eachPart}>
                <Text style={styles.primaryText}>{coupon.merchant_title}</Text>
                <Text style={styles.secondaryText}>{coupon.coupon_title}</Text>
            </View>
        )
    }

    _renderDescriptionPart(coupon) {
        return (
            <View style={styles.eachPart}>
                <Text style={[styles.descriptionText, {color: Constants.COLORS.SECONDARY_TEXT}]} >
                    {coupon.description}
                </Text>
            </View>
        )
    }

    _renderAddressPart(coupon) {
        if (!coupon.address || coupon.address === '')
            return null;

        return (
            <TouchableOpacity
                style={styles.eachPart}
                onPress={() => {BottomBar.onMapPress(this.props.navigator, true)}}>
                <Text style={styles.subscription}>Redeem at this location:</Text>
                <Text style={styles.descriptionText}>{coupon.address}</Text>
                <Text style={[styles.subscription, {color: Constants.COLORS.SECONDARY_TEXT}]}>Get Directions {'>'}</Text>
            </TouchableOpacity>
        )
    }

    _renderPhonenumberPart(phone) {
        if (!phone || phone === '')
            return null;

        return (
            <TouchableOpacity
                style={styles.eachPart}
                onPress={BottomBar.onCallPress}>
                <Text style={styles.descriptionText}>{phone}</Text>
            </TouchableOpacity>
        )
    }

    _renderWebsitePart(website) {
        if (!website || website === '')
            return null;

        return (
            <TouchableOpacity
                style={styles.eachPart}
                onPress={() => {BottomBar.onWebsitePress(this.props.navigator)}}>
                <Text style={styles.descriptionText}>{website}</Text>
            </TouchableOpacity>
        )
    }

    _renderButtonsPart(coupon) {
        // let passbook_wallet = null;
        // if (Constants.IS_ANDROID)
        //     passbook_wallet = (
        //         <TouchableOpacity
        //             style={styles.googlePassbookPart}
        //             onPress={() => {BottomBar.onGooglePassbookPress()}}>
        //             <Image source={require('image!ic_google_passbook')} style={{height: 30, resizeMode: 'contain'}}/>
        //         </TouchableOpacity>
        //     );
        // else
        //     passbook_wallet = (
        //         <TouchableOpacity
        //             style={styles.appleWalletPart}
        //             onPress={() => {BottomBar.onAppleWalletPress()}}>
        //             <Image source={require('image!ic_apple_wallet')} style={{height: 30, resizeMode: 'contain'}}/>
        //         </TouchableOpacity>
        //     );

        return (
            <View style={styles.eachPart}>
                <TouchableOpacity
                    style={styles.redeemPart}
                    onPress={() => BottomBar.onRedeemPress(this.props.navigator)}>
                    <Text style={styles.redeemPart_caption}>
                        {coupon.redeemed_date ? 'ALREADY REDEEMED' : 'REDEEM NOW'}
                    </Text>
                </TouchableOpacity>
                {/*passbook_wallet*/}
            </View>
        )
    }

    _getScreenName() {
        return Constants.SCREENS.COUPON;
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR
    },
    image_bg: {
        width: Constants.DIMENSION.WIDTH,
        height: Constants.DIMENSION.WIDTH * 128.0 / 300.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        // resizeMode: 'stretch',
    },
    image: {
        width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_MEDIUM,
        height: Constants.DIMENSION.WIDTH * 128.0 / 300.0 - Constants.DIMENS.GAP_MEDIUM,
        resizeMode: 'contain',
    },
    dotBoundary: {
        margin: Constants.DIMENS.GAP_SMALL,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: Constants.COLORS.DIVIDER_COLOR,
    },
    eachPart: {
        flexDirection: 'column',
        padding: Constants.DIMENS.GAP_SMALL,
        alignItems: 'center',
    },
    primaryText: {
        color: Constants.COLORS.PRIMARY_TEXT,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
    },
    secondaryText: {
        color: Constants.COLORS.SECONDARY_TEXT,
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '500',
    },
    descriptionText: {
        color: Constants.COLORS.PRIMARY_TEXT,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    redeemPart: {
        flexDirection: 'column',
        width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_SMALL * 2,
        height: 38,
        borderRadius: Constants.DIMENS.GAP_SMALL / 3,
        backgroundColor: '#fbbf2f',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Constants.DIMENS.GAP_SMALL,
    },
    redeemPart_caption: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    },
    appleWalletPart: {
        flexDirection: 'column',
        width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_SMALL * 2,
        height: 38,
        borderRadius: Constants.DIMENS.GAP_SMALL / 3,
        backgroundColor: '#1d1e1e',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Constants.DIMENS.GAP_SMALL,
    },
    googlePassbookPart: {
        flexDirection: 'column',
        width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_SMALL * 2,
        height: 38,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: Constants.DIMENS.GAP_SMALL / 3,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Constants.DIMENS.GAP_SMALL,
    },
    subscription: {
        color: 'red',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 2,
    }
});

module.exports = CouponScreen;