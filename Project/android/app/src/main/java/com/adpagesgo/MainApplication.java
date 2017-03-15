package com.adpagesgo;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.chirag.RNMail.RNMail;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.geektime.reactnativeonesignal.ReactNativeOneSignalPackage;
import com.onesignal.OneSignal;

import java.util.Arrays;
import java.util.List;

import cl.json.RNSharePackage;
//import com.sbugert.rnadmob.RNAdMobPackage;

//import com.slowpath.actionsheet.ActionSheetPackage;

//import xyz.plan.android.pptmapview.PPTGoogleMapPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RNMail(),
//                new RCTCameraPackage(),
//                new BarcodeScanner(),
                new MapsPackage(),
                new RNSharePackage(),
                new ReactNativeOneSignalPackage()
//                new RNAdMobPackage()
//                new PPTGoogleMapPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

    @Override
    public void onCreate() {
        super.onCreate();

        OneSignal.startInit(this).init();
    }
}
