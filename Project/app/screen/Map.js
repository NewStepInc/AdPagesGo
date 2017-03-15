/**
 * Created on 7/14/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';

import request from 'superagent';

import MapView from 'react-native-maps';

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from './BasicScreen';

class MapScreen extends BasicScreen {

    constructor(props) {
        super(props);

        var isFromCouponPage = props.route.isFromCouponPage;
        var isActionBar = props.route.isActionBar;
        this.state = {
            loaded: isFromCouponPage,
            isActionBar: isActionBar !== false,
            coupons: props.route.coupons,
            region: {
                latitude: Number(props.route.initialPos.lat),
                longitude: Number(props.route.initialPos.lng),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        };

        this._onMarkerPress = this._onMarkerPress.bind(this);
        this._onRegionChange = this._onRegionChange.bind(this);
        this._onCalloutPress = this._onCalloutPress.bind(this);

        if (!isFromCouponPage) {
            setTimeout (() => {
                this._loadCouponData.bind(this)();
            }, 500);
        }
    }

    _isActionBarVisible() {
        return this.state.isActionBar;
    }

    async _loadCouponData() {
        var $this = this;
        request.get(Constants.BACKEND_API_PATH + '?action=get_coupons&lat=' + this.state.region.latitude + '&lng=' + this.state.region.longitude)
          .set('Accept', 'application/json')
          .end(function(err, res) {
              if (!err) {
                  try {
                      var coupons = JSON.parse(res.text).coupons;
                      return new Promise((resolve) => {
                          $this.setState({loaded: true, coupons: coupons}, resolve);
                      });
                  } catch (e) {
                      alert('The response is unrecognizable.');
                  }
              }
              alert('No nearby locations have triggered.');

              return new Promise((resolve) => {
                  $this.setState({loaded: true, coupons: []}, resolve);
              });
          });
    }

    _renderContentView() {
        if (!this.state.loaded) {
            return (
                <View style={styles.viewContainer}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <MapView
                style={styles.viewContainer}
                region={this.state.region}
                showsUserLocation={true}
                onRegionChange={this._onRegionChange}>
                {this.state.coupons.map(coupon => {
                    if (!coupon.lat || !coupon.lng ||
                        Number(coupon.lat) == 0  || Number(coupon.lng) == 0)
                        return null;
                    return (
                        <MapView.Marker
                            ref={coupon.coupon_id}
                            key={coupon.coupon_id}
                            coordinate={{latitude: Number(coupon.lat), longitude: Number(coupon.lng)}}
                            title={coupon.merchant_title}
                            description={coupon.coupon_title}
                            centerOffset={{x: 0, y: -23}}
                            anchor={{x: 0.5, y: 1}}
                            image={require('image!ic_pin')}

                            onPress={(e) => this._onMarkerPress(e, coupon)}
                            onCalloutPress={(e) => this._onCalloutPress(e, coupon)}>
                        </MapView.Marker>
                    )
                })}
            </MapView>
        );
    }

    _onCalloutPress(event, coupon) {
        Utils.setSelCoupon(coupon);

        this.props.navigator.push({
            id: Constants.SCREENS.COUPON,
        });
    }

    _onMarkerPress(event, coupon) {
        var region = this.state.region;
        region.latitude = event.nativeEvent.coordinate.latitude;
        region.longitude = event.nativeEvent.coordinate.longitude;
        this.setState({region});

        // if (Constants.IS_ANDROID) {
            var $this = this;
            setTimeout(() => {
                $this.refs[coupon.coupon_id].showCallout();
            }, 300);
        // } else {
        //     this.refs[coupon.coupon_id].showCallout();
        // }
    }

    _onRegionChange(region) {
        this.setState({ region });
    }

    _getScreenName() {
        return Constants.SCREENS.MAP;
    }

    _isBottomBarVisible() {
        return false;
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

module.exports = MapScreen;