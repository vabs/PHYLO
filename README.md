Note
====

This build is an Android port using cordova 2.5.0

----
- Android 4.2.2-17.
- Cordova 2.5.0

#### Notes:
- libs/cordova.2.5.0.jar in libs is custom-build: https://github.com/castleK/cordova-android
    - There is a small modification in InAppBrowser.java of cordova framework to support deletion of cache
  on startUp of InAppBrowser.
    - Please pull from main cordova repository(if you want to change version of cordova),
      add your modification, rebuild the jar and included it in libs if needed.
      It is preferred and less dangerous if you use the 2.5.0 version.
