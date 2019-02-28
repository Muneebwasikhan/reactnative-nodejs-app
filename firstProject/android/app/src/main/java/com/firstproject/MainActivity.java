package com.firstproject;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new ReactNativeContacts()); // <------ add this
    }

    @Override
    protected String getMainComponentName() {
        return "firstProject";
    }
}
