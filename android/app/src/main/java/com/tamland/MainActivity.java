package com.tamland;
import com.reactnativenavigation.NavigationActivity;

import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends NavigationActivity {

  @Override
        public void onConfigurationChanged(Configuration newConfig) {
          super.onConfigurationChanged(newConfig);
          Intent intent = new Intent("onConfigurationChanged");
          intent.putExtra("newConfig", newConfig);
          this.sendBroadcast(intent);
      }

@Override
public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    intent.putExtras(this.getIntent());
}
}
