package com.adpagesgo;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
//import com.google.android.gms.ads.MobileAds;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AdPagesGo";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

//        MobileAds.initialize(getApplicationContext(), "ca-app-pub-5226075387583224~6119253591");
    }
}
