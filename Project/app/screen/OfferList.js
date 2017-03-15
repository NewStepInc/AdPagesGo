/**
 * Created on 7/14/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    View,
    ActivityIndicator,
	TouchableOpacity,
	Text,
} from 'react-native';

import request from 'superagent';
// import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from './BasicScreen';
import CouponListView from './../base/CouponListView';
import Map from './Map';

class OfferListScreen extends BasicScreen {
    constructor(props) {
        super(props);

		var getCouponParams = '';
		if (props.route.getCouponParams)
			getCouponParams = props.route.getCouponParams;
		else
			getCouponParams = '?action=get_coupons&' +
			   					'cat_id=' + Constants.STRINGS.CAT_ID[Utils.getSelCatNum()] + '&' +
			   					'mm=' + Utils.getSelMMName();


        this.state = {
            loaded: false,
			sortBy: Constants.SORTBY.DISTANCE,
            coupons: [],
        };

        this._loadCouponData = this._loadCouponData.bind(this);
		this._renderCoupons = this._renderCoupons.bind(this);
		this._renderSortBar = this._renderSortBar.bind(this);

        setTimeout (() => {
            this._loadCouponData(getCouponParams);
        }, 500);
    }

	componentDidMount() {
		// Display an interstitial
		// AdMobInterstitial.requestAd((error) => error && console.log(error));
	}

    async _loadCouponData(getCouponParams) {
        var $this = this;

        request.get(Constants.BACKEND_API_PATH + getCouponParams)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (!err) {
                    try {
                        var jsonObject = JSON.parse(res.text);

						if (jsonObject && jsonObject.coupons) {
							return new Promise((resolve) => {
								$this.setState({loaded: true, coupons: jsonObject.coupons}, resolve);
							});
						}
                    } catch (e) {

                    }
                }
                alert('Cannot load coupons from server!');

                return new Promise((resolve) => {
                    $this.setState({loaded: true}, resolve);
                });
            });
    }

    _renderContentView() {
        if (!this.state.loaded)
            return (
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            );
		else if (!this.state.coupons || this.state.coupons.length == 0)
			return null;

        return (
			<View style={{flex: 1}}>
				{this._renderSortBar()}
				{this._renderCoupons()}
		   	</View>
        );
    }

	_renderCoupons() {
		if (this.state.sortBy === Constants.SORTBY.DISTANCE) {
			return (
			   <CouponListView
				  style={styles.listView}
				  coupons={this.state.coupons}
				  sortBy={this.state.sortBy}
				  showGroupTitle={false}
				  {...this.props}
			   />
			);
		} else {
			let initialLat = 0;
			let initialLng = 0;
			if (this.state.coupons.length > 0) {
				initialLat = this.state.coupons[0].lat;
				initialLng = this.state.coupons[0].lng;
			}

			return (
			   <Map
				   style={styles.listView}
				  {...this.props}
				   route={{
				   		isActionBar: false,
						isFromCouponPage: true,
						coupons: this.state.coupons,
						initialPos: {lat: initialLat, lng: initialLng}
				   }}
				/>
			);
		}
	}

	_renderSortBar() {
		let distance = {backgroundColor: this.state.sortBy === Constants.SORTBY.DISTANCE ? 'white' : '#f7f7f7'};
		let alphabet = {backgroundColor: this.state.sortBy === Constants.SORTBY.ALPHABET ? 'white' : '#f7f7f7'};
		return (
		   <View style={styles.sortBar}>
			   <TouchableOpacity style={[styles.sortbar_button, distance, {borderRightWidth: 0.5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
								 onPress={() => this._sortBy(Constants.SORTBY.DISTANCE)}>
				   <Text style={styles.sortButtonText}>Sort by Distance</Text>
			   </TouchableOpacity>
			   <TouchableOpacity style={[styles.sortbar_button, alphabet, {borderLeftWidth: 0.5, borderTopRightRadius: 5, borderBottomRightRadius: 5}]}
								 onPress={() => this._sortBy(Constants.SORTBY.ALPHABET)}>
				   <Text style={styles.sortButtonText}>View on Map</Text>
			   </TouchableOpacity>
		   </View>
		);
	}

	_sortBy(sortBy) {
		var $this = this;
		new Promise((resolve) => {
			$this.setState({sortBy: sortBy}, resolve);
		});
	}

    _getScreenName() {
        return Constants.SCREENS.OFFER_LIST;
    }
}

const styles = StyleSheet.create({
    listView: {
        position: 'absolute',
		top: 40,
        width: Constants.DIMENSION.WIDTH,
        height: Constants.DIMENSION.HEIGHT - (Constants.DIMENS.ACTIONBAR_HEIGHT + Constants.DIMENS.IOS_OFFSET) - Constants.DIMENS.BOTTOMBAR_HEIGHT - 40,
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR,
    },
	sortBar: {
		height: 40,
		left: 0,
		right: 0,
		top: 0,
		backgroundColor: Constants.COLORS.BACKGROUND_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	sortbar_button: {
		width: Constants.DIMENSION.WIDTH / 2 - Constants.DIMENS.GAP_SMALL,
		height: Constants.DIMENS.GAP_SMALL * 3,
		borderWidth: 1,
		borderColor: 'lightgray',
		alignItems: 'center',
		justifyContent: 'center',
	},
	sortButtonText: {
		fontSize: 12,
		color: 'gray',
	},
});

module.exports = OfferListScreen;