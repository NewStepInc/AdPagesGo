/**
 * Created on 8/18/16.
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
   ListView,
} from 'react-native';

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";

class CouponListView extends Component {
	constructor(props) {
		super(props);

		this._updateUI = this._updateUI.bind(this);
		this._calcDistance = this._calcDistance.bind(this);
		this._sortCoupons = this._sortCoupons.bind(this);
		this._renderCouponGroup = this._renderCouponGroup.bind(this);

		let dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});
		this.state = {loaded: false, sortBy: Constants.SORTBY.ALPHABET, dataSource};

		this._updateUI(props.sortBy);
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.sortBy !== this.props.sortBy) {
			this._updateUI(nextProps.sortBy);
		}
	}

	async _updateUI(sortBy) {
		navigator.geolocation.getCurrentPosition(
		   (position) => {
			   var distanceCoupons = this._calcDistance(this.props.coupons, position.coords);
			   var sortedCouponGroups = this._sortCoupons(distanceCoupons, sortBy);

			   let dataSource = this.state.dataSource.cloneWithRows(sortedCouponGroups);

			   var $this = this;
			   new Promise((resolve) => {
				   $this.setState({loaded: true, sortBy: sortBy, dataSource}, resolve);
			   });
		   },
		   (error) => {
			   alert(error);

			   var sortedCouponGroups = this._sortCoupons(this.props.coupons, sortBy);

			   let dataSource = this.state.dataSource.cloneWithRows(sortedCouponGroups);

			   var $this = this;
			   new Promise((resolve) => {
				   $this.setState({loaded: true, sortBy: sortBy, dataSource}, resolve);
			   });
		   },
		   {enableHighAccuracy: true, timeout: 100000, maximumAge: 2000}
		);
	}

	_calcDistance(coupons, position) {
		let ret = coupons;

		for (var i = ret.length - 1; i >= 0; i--) {
			ret[i].distance = Utils.calcDistance(position.latitude, position.longitude, ret[i].lat, ret[i].lng);
		}

		return ret;
	}

	_sortCoupons(coupons, sortBy) {
		let ret = [];
		// sort coupons
		if (sortBy === Constants.SORTBY.ALPHABET) {
			let alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			alphabets.forEach((title) => {
				ret.push({title: title, coupons: []});
			});

			coupons.forEach((coupon) => {
				let firstLetter = coupon.merchant_title.toUpperCase().substring(0, 1);
				let group = null;
				ret.forEach((item) => {
					if (item.title === firstLetter)
						group = item;
				});
				if (group === null) {
					group = {title: firstLetter, coupons: []};
					ret.push(group);
				}
				group.coupons.push(coupon);
			});

		} else if (sortBy === Constants.SORTBY.TYPE) {
			ret.push({title: 'Deals', coupons: []});
			ret.push({title: 'Services', coupons: []});
			coupons.forEach((coupon) => {
				if (coupon.service === 'y')
					ret[1].coupons.push(coupon);
				else
					ret[0].coupons.push(coupon);
			});
		} else if (sortBy == Constants.SORTBY.DISTANCE) {
			for (var k = 0; k < coupons.length - 1; k++) {
				for (var j = k + 1; j < coupons.length; j++) {
					if (!coupons[k].distance ||
					   (coupons[j].distance && coupons[k].distance > coupons[j].distance)) {
						var temp = coupons[k];
						coupons[k] = coupons[j];
						coupons[j] = temp;
					}
				}
			}

			ret.push({
				title: 'test',
				coupons: coupons,
			});
		}

		for (var i = ret.length - 1; i >= 0; i--) {
			if (ret[i].coupons.length == 0)
				ret.splice(i, 1);
		}

		return ret;
	}

	render() {
		if (!this.state.loaded)
		   return <View style={this.props.style}/>;

		return (
		   <ListView
			  style={this.props.style}
			  dataSource={this.state.dataSource}
			  renderRow={(item, rowID)=> this._renderCouponGroup(item)}
		   />
		);
	}

	_renderCouponGroup(group) {
		let ret = [];

		if (this.props.showGroupTitle)
			ret.push(this._renderTitle(group.title));
		group.coupons.forEach((coupon) => ret.push(this._renderCoupon(coupon)));

		return (
		   <View style={{left: 0, right: 0, top: 0}}>
			   {ret}
		   </View>
		);
	}

	_renderTitle(title) {
		return (
		   <View key={title+'1'}
				 style={styles.separatorTitleContainer}>
			   <Text key={title+'2'}
					 style={styles.separatorTitle}>
				   {title}
			   </Text>
		   </View>
		);
	}


	_renderCoupon(coupon) {
		var merchant_title = coupon.merchant_title;
		if (merchant_title.length > 20)
			merchant_title = merchant_title.substring(0, 17) + '...';

		var coupon_title = coupon.coupon_title;
		if (coupon_title.length > 25)
			coupon_title = coupon_title.substring(0, 22) + '...';


		var subscription = '';
		var distance = coupon.distance;
		if (distance)
			subscription += Math.round(distance * 100) / 100 + ' miles away / ';

		var expiration_date = coupon.expiration_date;
		if (expiration_date)
			expiration_date = 'Until ' + expiration_date.substring(0, 12).trim();
		else
			expiration_date = 'Never expired';
		subscription += expiration_date;

		return (
		   <TouchableOpacity style={styles.couponItem} key={coupon.coupon_id} onPress={() => {this._onSelCoupon(coupon)}}>
			   <Image style={styles.couponLogo}
					  source={{uri: coupon.coupon_image}} />
			   <Image style={styles.dollar}
					  source={require('image!ic_dollar')}/>
			   <View style={styles.couponContent}>
				   <Text style={styles.couponContentTitle}>
					   {merchant_title}
				   </Text>
				   <Text style={styles.couponContentSubtitle}>
					   {coupon_title}
				   </Text>
				   <Text style={styles.couponContentDeadline}>
					   {subscription}
				   </Text>
			   </View>
			   <Image style={styles.couponArrow}
					  source={require('image!ic_actionbar_back')}/>
		   </TouchableOpacity>
		);
	}

	_onSelCoupon(coupon) {
		Utils.setSelCoupon(coupon);

		this.props.navigator.push({
			id: Constants.SCREENS.COUPON,
		});
	}
}

const styles = StyleSheet.create({
	separatorTitleContainer: {
		flex: 1,
		width: Constants.DIMENSION.WIDTH,
		paddingLeft: Constants.DIMENS.GAP_MEDIUM,
		paddingVertical: Constants.DIMENS.GAP_SMALL,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: 'lightgray',
	},
	separatorTitle: {
		backgroundColor: 'transparent',
		fontSize: 18,
		fontWeight: '600',
	},
	couponItem: {
		borderColor: Constants.COLORS.DIVIDER_COLOR,
		borderWidth: 1,
		padding: Constants.DIMENS.GAP_SMALL,
		height: Constants.DIMENS.GAP_MEDIUM * 6,
		flexDirection: 'row',
	},
	couponLogo: {
		flex: 1,
		resizeMode: 'contain',
	},
	dollar: {
		position: 'absolute',
		left: Constants.DIMENSION.WIDTH / 5,
		top: Constants.DIMENS.GAP_MEDIUM * 3.5,
		width: Constants.DIMENS.GAP_MEDIUM,
		height: Constants.DIMENS.GAP_MEDIUM,
	},
	couponContent: {
		flex: 3,
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginLeft: Constants.DIMENS.GAP_SMALL,
		marginRight: Constants.DIMENS.GAP_SMALL,
	},
	couponContentTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: Constants.COLORS.PRIMARY_TEXT
	},
	couponContentSubtitle: {
		marginTop: 2,
		fontSize: 15,
		fontWeight: '500',
		color: '#333'
	},
	couponContentDeadline: {
		fontSize: 13,
		fontWeight: '600',
		color: Constants.COLORS.SECONDARY_TEXT,
		marginTop: Constants.DIMENS.GAP_SMALL
	},
	couponArrow: {
		width: Constants.DIMENS.ACTIONBAR_ICON_SIZE * 2 / 3,
		height: null,
		transform: [{
			rotateZ: '180deg',
		}],
		resizeMode: 'contain',
	}
});

module.exports = CouponListView;