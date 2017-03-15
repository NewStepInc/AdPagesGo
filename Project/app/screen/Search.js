/**
 * Created on 7/15/16.
 */

'use strict';

import React, {Component} from "react";
import {
   StyleSheet,
   View,
   Text,
   TextInput,
   Image,
   TouchableWithoutFeedback,
   Picker,
   TouchableOpacity,
   ActivityIndicator
} from "react-native";

import Constants from "./../global/Constants";
import Utils from "./../global/Utils";
import BasicScreen from "./BasicScreen";

class SearchScreen extends BasicScreen {

    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            mm: Utils.getSelMMName(),
        };
    }

	_renderContentView() {
		return (
		   <View style={styles.contentView}>
			   <View style={styles.searchInputBox}>
				   <TextInput
					  style={styles.searchText}
					  ref='searchTextInput'
					  autoCapitalize='none'
					  autoCorrect={false}
					  autoFocus={true}
					  onChangeText={(text) => this.setState({searchText: text})}
					  value={this.state.searchText}
					  returnKeyType='done'
					  returnKeyLabel='done'
				   />
				   {this._renderPlaceHolderOfSearchText.bind(this)()}
			   </View>
			   <Picker
				  style={styles.picker}
				  selectedValue={this.state.mm}
				  onValueChange={(mm) => this.setState({mm: mm})}>
				   <Picker.Item label="DALLAS/FT.WORTH, TX" value="dallasftworth" />
				   <Picker.Item label="AUSTIN, TX" value="austin" />
				   <Picker.Item label="SAN ANTONIO, TX" value="sanantonio" />
				   <Picker.Item label="ST.LOUIS, MO" value="stlouis" />
				   <Picker.Item label="HOUSTON, TX" value="houston" />
				   <Picker.Item label="NATIONAL" value="national" />
			   </Picker>
			   <TouchableOpacity
				  style={styles.searchButton}
				  onPress={this._onSearch.bind(this)}>
				   <Text style={{fontSize: 20}}>Search</Text>
			   </TouchableOpacity>
		   </View>
		);
	}

    _onSearch() {
		this.props.navigator.push({
			id: Constants.SCREENS.OFFER_LIST,
			getCouponParams: '?action=search_coupons&mm=' + this.state.mm + '&search_text=' + this.state.searchText,
		})
	}

    _renderPlaceHolderOfSearchText() {
        if (this.state.searchText !== '')
            return null;
        return (
            <TouchableWithoutFeedback onPress={() => this.refs['searchTextInput'].focus()}>
                <View style={styles.placeHolder}>
                    <Image style={styles.placeHolderIcon} source={require('image!ic_actionbar_search')}/>
                    <Text style={styles.placeHolderText}>Enter Search Text</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _isBottomBarVisible() {
        return false;
    }

    _getScreenName() {
        return Constants.SCREENS.SEARCH;
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Constants.COLORS.BACKGROUND_COLOR,
		justifyContent: 'space-between',
		paddingVertical: Constants.DIMENS.GAP_LARGE * 2,
    },
	searchInputBox: {
		left: Constants.DIMENS.GAP_LARGE,
		width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_LARGE * 2,
		height: 40,
		borderColor: 'gray',
		borderWidth: 2,
		borderRadius: 3,
	},
    searchText: {
		left: 0,
		top: 0,
		width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_LARGE * 2,
		height: 40,
        fontSize: 15,
        paddingHorizontal: Constants.DIMENS.GAP_SMALL,
		textAlignVertical: 'center'
    },
    placeHolder: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: 40,
        paddingLeft: Constants.DIMENS.GAP_SMALL + 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    placeHolderIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    placeHolderText: {
        fontSize: 15,
        color: 'gray',
    },
	picker: {
		left: Constants.DIMENS.GAP_LARGE,
		width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_LARGE * 2,
	},
	searchButton: {
		left: Constants.DIMENS.GAP_LARGE,
		width: Constants.DIMENSION.WIDTH - Constants.DIMENS.GAP_LARGE * 2,
		height: 40,
		backgroundColor: 'lightcyan',
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	listView: {
		flex: 1,
	},
});

module.exports = SearchScreen;