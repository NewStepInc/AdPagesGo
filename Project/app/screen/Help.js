/**
 * Created on 7/15/16.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';


import Constants from "./../global/Constants";
import BasicScreen from './BasicScreen';

class HelpScreen extends BasicScreen {
    _renderContentView() {
        return (
            <ScrollView style={styles.contentView}>
                <Text style={styles.helpTitle}>Ad Pages GO Free Local Coupons Help</Text>
                {HelpScreen._renderSubTitle('Main Home Page')}
                {HelpScreen._renderDescription('Choose a selection from the Home Page by tapping on the associated button.')}

                {HelpScreen._renderSubTitle('Top Navigation Bar')}
                {HelpScreen._renderDescription('The content of the navigation bar may vary depending upon which page is being visited.')}
                {HelpScreen._renderTwoColumns('"Back" Button', 'Tap to go back to the previous page.')}
                {HelpScreen._renderTwoColumns('"Magnifying Glass" Button', 'Tap to search by text or tags/keywords. The function will search the content of the entire app.')}
                {HelpScreen._renderTwoColumns('"Action" Button', 'Tap to access functions such as sharing information in the app via Facebook, Twitter, or email, bookmarking items, or stamping the passport. Login credentials and access permission may be required in order to use social media features.')}

                {HelpScreen._renderSubTitle('Search')}
                {HelpScreen._renderDotTwoColumn('Tap the Magnifying Glass icon to search for items of interest within the app.')}
                {HelpScreen._renderDotTwoColumn('The app will search the name, display address and description field of the items to match the provided text. ')}
                {HelpScreen._renderDotTwoColumn('Items may contain one or more "Categories" to assist with classifying and organizing the items. Tap the "plus" button to select categories from a list.')}
                {HelpScreen._renderDotTwoColumn('Provide text, categories, or both to search. Search results will only return items that match all of the provided search criteria.')}

                {HelpScreen._renderSubTitle('Bottom Toolbar')}
                {HelpScreen._renderDescription('The toolbar contents may vary depending upon which page is being visited and the features included in the app.')}
                {HelpScreen._renderTwoColumns('"i" Icon', 'Tap to access the info page for details such as the About page, feedback email address, Privacy Policy and social media login/out.')}
                {HelpScreen._renderTwoColumns('"Gear" Icon', 'Tap to access app settings, including registering or logging into the account, downloading app content, and configuring how the app works.')}
                {HelpScreen._renderTwoColumns('"Bookmark" Icon', 'Tap to access bookmarked items that were saved previously.')}
                {HelpScreen._renderTwoColumns('"Photo/Postcard" Icon', 'Tap to access the photo or postcard feature, if available in the app.')}
                {HelpScreen._renderTwoColumns('"Compass" Icon', 'Tap to view nearby items. Based on user position and movement, locations will trigger automatically. Once triggered, the icon will update, indicating the number of triggered items. (Note: Location Services must be enabled in the device Settings to utilize this feature.) If location services are disabled the icon will display an "X"')}

                {HelpScreen._renderSubTitle('Photo / Postcard')}
                {HelpScreen._renderDescription('The app may contain a "photo" or "postcard" feature to enable customizing and sharing photos of your visit. To use the feature:')}
                {HelpScreen._renderNumberTwoColumns(1, 'Tap the photo/postcard button or icon.')}
                {HelpScreen._renderNumberTwoColumns(2, 'Take, load, or choose a stock picture if available. Tap the "Library" button to access stock photos or photos stored on the device.')}
                {HelpScreen._renderNumberTwoColumns(3, 'Customize the photo or postcard.')}
                {HelpScreen._renderNumberTwoColumns(4, 'Save and/or share via Facebook, Twitter, or email.')}

                {HelpScreen._renderSubTitle('Registration Form')}
                {HelpScreen._renderTwoColumns('Email', 'Enter a valid email address.')}
                {HelpScreen._renderTwoColumns('Password', 'Enter a minimum of 6 characters. Does not require any special combinations.')}
                {HelpScreen._renderTwoColumns('PW Confirmation', 'Reenter the password.')}
                {HelpScreen._renderTwoColumns('Register', 'Tap to accept the Rules and Terms & Conditions to finish registration.')}

                {HelpScreen._renderSubTitle('Login Form')}
                {HelpScreen._renderDescription('Complete with valid registered email address and password.')}

                {HelpScreen._renderSubTitle('\'View By\' Buttons (Within List Views)')}
                {HelpScreen._renderDescription('Tap the button at the lower left corner to show the list of viewing options:')}
                {HelpScreen._renderTwoColumns('"A-Z" Icon', 'Tap this option to sort items alphabetically.')}
                {HelpScreen._renderTwoColumns('"Cards" Icon', 'Tap this option to sort items by type.')}
                {HelpScreen._renderTwoColumns('"Dice" Icon', 'Tap this option to sort items randomly.')}
                {HelpScreen._renderTwoColumns('"Signpost" Icon', 'Tap this option to sort items by proximity. (Location Services must be enabled to utilize this feature.)')}
                {HelpScreen._renderTwoColumns('"Globe" Icon', 'Tap this option to display items by their locations on a map.')}
                {HelpScreen._renderTwoColumns('"Calendar" Icon', 'Tap this option to sort items by date and time. (Only available for Deal, Event, and Game sorting.)')}
                {HelpScreen._renderTwoColumns('"Whistle" Icon', 'Tap this option to sort items by the game status.(Only available for Game sorting.)')}
                {HelpScreen._renderTwoColumns('"Trophy" Icon', 'Tap this option to display the Passport \'book\'.(Only available within the Passport.)')}
                {HelpScreen._renderTwoColumns('"Winners" Icon', 'Tap this option to sort items by their contest winner status (if available).')}

                {HelpScreen._renderSubTitle('Individual Listing Details')}
                {HelpScreen._renderDescription('When viewing an item, the following options may be available:')}
                {HelpScreen._renderTwoColumns('Image Gallery', 'Swipe the image to access additional gallery images (when available); tap the image to be viewed in full-screen mode.')}
                {HelpScreen._renderTwoColumns('Video/Audio files', 'When available, a green "Play" icon will display in the item title bar for video or display an audio player beneath the title bar; tap the icon to play the associated media file.')}
                {HelpScreen._renderTwoColumns('Like on Facebook / Follow on Twitter', 'Tap to connect with the location\'s Facebook or Twitter account. (Note: network connectivity is required to connect to social media; login and permission may be required; standard data service charges will apply.)')}
                {HelpScreen._renderTwoColumns('Map/Route', 'Tap the Map/Route bar to view the item on a map or to access turn-by-turn direction to this location. (Note: Location Services must be enabled to utilize the routing feature.)')}
                {HelpScreen._renderTwoColumns('Phone', 'Tap to auto-dial the phone number listed. (Note: standard calling charges will apply.)')}
                {HelpScreen._renderTwoColumns('Website', 'Tap to access the website. (Note: network connectivity is required to access websites; standard data service charges will apply.)')}
                {HelpScreen._renderTwoColumns('Email', '	Tap to email the address listed from default email account. (Note: network connectivity is required to send emails; standard data service charges will apply.)')}

                {HelpScreen._renderSubTitle('Game Details')}
                {HelpScreen._renderDescription('When viewing details regarding a game, user can tap the score table to see full details about the game.')}

                {HelpScreen._renderSubTitle('Campaign/Category Details')}
                {HelpScreen._renderDescription('When viewing details regarding a campaign or category, user can tap the description area to see full detail about the campaign or category.')}

                {HelpScreen._renderSubTitle('Voting')}
                {HelpScreen._renderDescription('Voting is subject to the voting rules found in the information section (i icon). Votes will be recorded automatically depending on voting frequency allowed. User must be logged in to vote.')}

                {HelpScreen._renderSubTitle('Nominations')}
                {HelpScreen._renderDescription('Nominations are subject to the nomination rules found in the information section (iicon). User must be logged in to nominate.')}
                {HelpScreen._renderTwoColumns('Choose Nominee', 'Allows selection of existing nominees found in other contests within the app or Nearby Results generated from Google Places.')}
                {HelpScreen._renderTwoColumns('Write-in', 'Allows email submission of nominees not listed in "Choose Nominee".')}

                {HelpScreen._renderSubTitle('App Usage Tips')}
                {HelpScreen._renderDotTwoColumn('To refresh the app data, exit and return to the app. Upon return, the app will contact the server to retrieve the latest information. This requires an active network connection (will not work in Airplane mode).')}

            </ScrollView>
        );
    }

    static _renderSubTitle(subTitle) {
        return (
            <Text style={styles.helpSubTitle}>{subTitle}</Text>
        );
    }

    static _renderSubTitleFromTwoColumn(subTitle) {
        return (
            <Text style={styles.helpSubTitleFromTwoColumn}>{subTitle}</Text>
        );
    }

    static _renderDescription(description) {
        return (
            <Text style={styles.helpDescription}>{description}</Text>
        );
    }

    static _renderTwoColumns(text1, text2) {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: Constants.DIMENS.GAP_SMALL / 2}}>
                <View style={{flex: 2, marginLeft: Constants.DIMENS.GAP_SMALL}}>{HelpScreen._renderSubTitleFromTwoColumn(text1)}</View>
                <View style={{flex: 3}}>{HelpScreen._renderDescription(text2)}</View>
            </View>
        )
    }

    static _renderNumberTwoColumns(num, text) {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.helpDescription, {marginLeft: Constants.DIMENS.GAP_MEDIUM, marginRight: Constants.DIMENS.GAP_SMALL}]}>{num + '.'}</Text>
                <View style={{flex: 1}}>{HelpScreen._renderDescription(text)}</View>
            </View>
        )
    }

    static _renderDotTwoColumn(text) {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: Constants.DIMENS.GAP_SMALL * 3 / 2, marginLeft: Constants.DIMENS.GAP_MEDIUM, marginRight: Constants.DIMENS.GAP_SMALL, width: 6, height: 6, borderRadius: 3, backgroundColor: 'black'}}/>
                <View style={{flex: 1}}>{HelpScreen._renderDescription(text)}</View>
            </View>
        )
    }

    _isBottomBarVisible() {
        return false;
    }

    _getScreenName() {
        return Constants.SCREENS.HELP;
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
    helpTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginVertical: Constants.DIMENS.GAP_SMALL,
    },
    helpSubTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: Constants.DIMENS.GAP_SMALL,
    },
    helpSubTitleFromTwoColumn: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: Constants.DIMENS.GAP_SMALL,
    },
    helpDescription: {
        fontSize: 14,
        marginVertical: Constants.DIMENS.GAP_SMALL / 2,
    },
});

module.exports = HelpScreen;