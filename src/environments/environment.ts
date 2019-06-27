// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  STREAM_URL: 'ws://echo.websocket.org/',
firebase: {
  apiKey: "AIzaSyC6B9PVcmcGilb33m2wT6_GQMuP_VrTcaU",
    authDomain: "untube-dbe67.firebaseapp.com",
    databaseURL: "https://untube-dbe67.firebaseio.com",
    projectId: "untube-dbe67",
    storageBucket: "untube-dbe67.appspot.com",
    messagingSenderId: "81114080195",
    appId: "1:81114080195:web:ac95228940739f46"
}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
