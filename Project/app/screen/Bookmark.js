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
    ActivityIndicator,
    ListView,
    TouchableOpacity,
} from 'react-native';


import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from './BasicScreen';
import CouponListView from './../base/CouponListView'

class BookmarkScreen extends BasicScreen {

    constructor(props) {
        super(props);

        this.state = {
            sortBy: Constants.SORTBY.ALPHABET,
        };

		this._sortBy = this._sortBy.bind(this);
    }

    _renderContentView() {
		let coupons = Utils.getBookmarkedCoupons();

        return (
            <View style={styles.contentView}>
                <CouponListView
                    style={styles.listView}
                    coupons={coupons}
					sortBy={this.state.sortBy}
                    showGroupTitle={true}
				   {...this.props}
                />
                {this._renderBottomBar()}
            </View>
        );
    }

    _renderBottomBar() {
        let alphabet = this.state.sortBy === Constants.SORTBY.ALPHABET ? {backgroundColor: 'white'} : null;
        let type = this.state.sortBy === Constants.SORTBY.TYPE ? {backgroundColor: 'white'} : null;
        return (
            <View style={styles.bottomBar}>
                <TouchableOpacity style={[styles.bottombar_button, alphabet, {borderRightWidth: 0.5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                                onPress={() => this._sortBy(Constants.SORTBY.ALPHABET)}>
                    <Text style={styles.bottomButtonText}>Alphabetical</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottombar_button, type, {borderLeftWidth: 0.5, borderTopRightRadius: 5, borderBottomRightRadius: 5}]}
                                  onPress={() => this._sortBy(Constants.SORTBY.TYPE)}>
                    <Text style={styles.bottomButtonText}>By Type</Text>
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

    _isBottomBarVisible() {
        return false;
    }

    _getScreenName() {
        return Constants.SCREENS.BOOKMARK;
    }
}

const styles = StyleSheet.create({
    contentView: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'column',
    },
    listView: {
        left: 0,
        top: 0,
        height: Constants.DIMENSION.HEIGHT - (Constants.DIMENS.ACTIONBAR_HEIGHT + Constants.DIMENS.IOS_OFFSET + Constants.DIMENS.ANDROID_OFFSET) - 40,
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR
    },
    bottomBar: {
        height: 40,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Constants.COLORS.BAR_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    bottombar_button: {
        width: Constants.DIMENS.GAP_MEDIUM * 6,
        height: Constants.DIMENS.GAP_SMALL * 3,
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomButtonText: {
        fontSize: 12,
        color: 'gray',
    },

});

module.exports = BookmarkScreen;