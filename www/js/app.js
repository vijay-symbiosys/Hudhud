// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular
		.module(
				'starter',
				[ 'ionic', 'starter.controllers', 'ngStorage',
						'starter.services', 'appFilter', 'timer', 'ngCordova',
						'pascalprecht.translate' ])

		.run(
				function($ionicPlatform, $cordovaPush, $rootScope,
						$localStorage, $http, $state, $translate,
						$cordovaNetwork, $cordovaGeolocation) {
					$ionicPlatform
							.ready(function() {
								// Hide the accessory bar by default (remove
								// this to show the accessory bar above the
								// keyboard
								// for form inputs)
								// $localStorage.rooturl =
								// 'http://125.62.198.229/KorchinaWEBAPI/api/korchinaapi/';
								$localStorage.rooturl = 'http://125.62.198.229/KorchinaWEBAPI/api/KorchinaAPI/';
								console.log($localStorage.rooturl);

								$translate.use($localStorage.language);



								// THIS APPROACH FAILED......

								document.addEventListener("deviceready", onDeviceReady, false);

								function onDeviceReady() 
								{
									navigator.geolocation.getCurrentPosition(onSuccess, onError);
					            }

							    // onSuccess Geolocation
							    
							    function onSuccess(position) 
							    {
							        
						        				 alert('AppLatitude: '+ position.coords.latitude);             
						                            // 'Longitude: '          + position.coords.longitude             + '<br />' +
						                            // 'Altitude: '           + position.coords.altitude              + '<br />' +
						                            // 'Accuracy: '           + position.coords.accuracy              + '<br />' +
						                            // 'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
						                            // 'Heading: '            + position.coords.heading               + '<br />' +
						                            // 'Speed: '              + position.coords.speed                 + '<br />' +
						                            // 'Timestamp: '          + position.timestamp          		  + '<br />';
							    }

							    // onError Callback receives a PositionError object
							    
							    function onError(error) 
							    {
							        alert('code: '    + error.code    + '\n' +
							              'message: ' + error.message + '\n');
							    }



								// THIS APPROACH FAILED......

								// Background Geolocation	
								// var geoOptions = {
								// 	                url: 'http://125.62.198.229/KorchinaWEBAPI/api/KorchinaAPI/', // <-- Android ONLY:  your server url to send locations to
								// 	                params: {
								// 	                          UserName: 'Ericka866'
								// 	                          GpsLocation: 'VIJAY' 
								// 	                          latitude: '25.00'
								// 	                          longitude: '75.00'
								// 	                          IMEI: '7889'
								// 	                          mobileno: '77895'                            //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
								// 	                        },
								// 	                /*headers: {                                   // <-- Android ONLY:  Optional HTTP headers sent to your configured #url when persisting locations
								// 	                    "X-Foo": "BAR"
								// 	                },*/
								// 	                locationTimeout: 5000,
								// 	                desiredAccuracy: 10,
								// 	                stationaryRadius: 2,
								// 	                distanceFilter: 1,
								// 	                notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
								// 	                notificationText: 'ENABLED', // <-- android only, customize the text of the notification
								// 	                activityType: 'AutomotiveNavigation',
								// 	                debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
								// 	                stopOnTerminate: false    
        						//  				 };

								 //    configure calls start internally
								 //    $cordovaBackgroundGeolocation.configure(geoOptions)
								 //    .then(
								 //            null, // Background never resolves
								 //            function (err) 
								 //            { 
								 //              // error callback
								 //              alert(err);
								 //            },
								 //            function (location) 
								 //            { 
								 //              // notify callback for iOS 
								 //              $http.get($localStorage.rooturl+'?UserName=Ericka866&GpsLocation=VIJAY&latitude=25.00&longitude=35.00&IMEI=123456&mobileno=1235')
								 //                      .success(function(data, status, headers, config)
								 //                        {
								 //                          alert(' Geo Update Successful');
								 //                        }).
								 //                        error(function(data, status, headers, config)
								 //                        {
								 //                          var alertPopup = $ionicPopup.alert({
								 //                                          title: '',
								 //                                          template: 'OOps Error : background-geolocation'
								 //                                          });
								 //                        });
								 //            }
								 //         ); 
   	
								  



								if (window.cordova
										&& window.cordova.plugins.Keyboard) {
									cordova.plugins.Keyboard
											.hideKeyboardAccessoryBar(true);
								}
								if (window.StatusBar) {
									// org.apache.cordova.statusbar required
									StatusBar.styleDefault();
								}
								if (window.Connection) {
									if (navigator.connection.type == Connection.NONE) {
										alert('The internet is disconnected on your device.');
									}
								}
								var success = function(message) {
									/* alert(message); */
									$localStorage.imei = message;
								}

								var failure = function() {
									alert("Error calling Hello Plugin");
								}
								var suc = function(message) {
									alert(message);
								}

								var fai = function() {
									alert("Error calling Hello Plugin");
								}

								hello.greet("World", success, failure);
								cordova.getAppVersion(function(version) {
									/* alert(version); */
									$localStorage.version = version;
								});
								var config = {
									"senderID" : "345346127260",
								};
								$cordovaPush.register(config).then(
										function(result) {
										}, function(err) {
											alert(err);
										})
								/*
								 * if(ionic.Platform.isAndroid()){ var config = {
								 * "senderID": "345346127260", };
								 * if(($localStorage.userNameKorchina != '') ||
								 * ($localStorage.userNameKorchina !=
								 * undefined)){
								 * $cordovaPush.register(config).then(function(result) { },
								 * function(err) { alert(err); }) } }
								 */
								$rootScope.sendRegId = function(regid) {
									if (regid.length > 0) {
										$localStorage.gcmregid = regid;
										$http
												.get(
														$localStorage.rooturl
																+ '?UserName='
																+ $localStorage.userNameKorchina
																+ '&RegId='
																+ regid
																+ '&dummy=1')
												.success(
														function(data, status,
																headers, config) {
														})
									}
								}
								$rootScope
										.$on(
												'$cordovaPush:notificationReceived',
												function(event, notification) {
													switch (notification.event) {
													case 'registered':
														// alert('g');
														$rootScope
																.sendRegId(notification.regid);
														break;

													case 'message':
														// this is the actual
														// push notification.
														// its format depends on
														// the data model from
														// the push server
														// alert('message = ' +
														// notification.message
														// + ' msgCount = ' +
														// notification.msgcnt);
														$rootScope
																.setMsg(notification.message);
														break;

													case 'error':
														alert('GCM error = '
																+ notification.msg);
														break;

													default:
														alert('An unknown GCM event has occurred');
														break;
													}
												});

								function convertDate(date) {
									var elem = date.split(' ');
									var stSplit = elem[1].split(":");
									var dtstr = elem[0].split('-');
									var mo = dtstr[1];
									var dt = dtstr[0];
									var yr = dtstr[2];
									var stHour = stSplit[0];
									var stMin = stSplit[1];
									var stSec = stSplit[2];
									var stAmPm = elem[2];
									var newhr = 0;
									var ampm = '';
									var newtime = '';
									if (stAmPm == 'PM') {
										if (stHour != 12) {
											stHour = stHour * 1 + 12;
										}

									} else if (stAmPm == 'AM' && stHour == '12') {
										stHour = stHour - 12;
										if (stHour < 10) {
											stHour = 0 + '' + stHour;
										}
									} else {
										stHour = stHour;
									}
									return yr + '-' + mo + '-' + dt + 'T'
											+ stHour + ':' + stMin + ':'
											+ stSec;
								}

								$rootScope.setMsg = function(mids) {
									// alert(mids);
									var str = mids;
									var manifest = str.indexOf("manifest");
									var at = str.indexOf("at");
									var res = str.substring(manifest + 8, at)
											.trim();
									var time = str.substring(at + 2, at + 25)
											.trim();
									var fin = convertDate(time
											.replace('.', ' '));
									var tleft = ((1800 - ((new Date() - new Date(
											fin)) / 1000)) - 19800);
									if (tleft > 0) {
										$rootScope
												.$broadcast('newManifest', '');
										/*
										 * $http.get($localStorage.rooturl+'?ManifestId='+res+'&status=R&opcode=OR')
										 * .success(function(data, status,
										 * headers, config){
										 * $state.go('tab.dash');
										 * console.log(mids +' '+data);
										 * $rootScope.$broadcast('newManifest',
										 * ''); })
										 */
									} else {
										$rootScope.$broadcast(
												'newManifestExpire', res);
									}

								}

								/*
								 * // WARNING: dangerous to unregister (results
								 * in loss of tokenID)
								 * $cordovaPush.unregister(options).then(function(result) { //
								 * Success! }, function(err) { // Error })
								 */




							});
				})

		.config(
				function($stateProvider, $urlRouterProvider, $httpProvider,
						$ionicConfigProvider, $translateProvider) {
					$ionicConfigProvider.platform.ios.tabs.style('standard');
					$ionicConfigProvider.platform.ios.tabs.position('top');
					$ionicConfigProvider.platform.android.tabs
							.style('standard');
					$ionicConfigProvider.platform.android.tabs
							.position('standard');
					$httpProvider.defaults.useXDomain = true;
					delete $httpProvider.defaults.headers.common['X-Requested-With'];

					$translateProvider
							.translations(
									'en',
									{
										PU : 'pu en',
										Order : 'Order',
										Orders : 'Orders',
										Report : 'Report',
										Account : 'Account',
										From : 'From',
										To : 'To',
										Address : 'Address',
										Name : 'Name',
										Tele : 'Tele',
										Totalorder : 'Total Order',
										Quantity : 'Quantity',
										Moneycollection : 'Money Collection',
										youhavestill : 'You have still',
										con_or_rej : 'To Confirm or Reject',
										TITLE : 'Hello',
										SignIN : 'Sign in',
										ForgotPassword : 'Forgot Password',
										Manifest : 'Manifest',
										Confirmed : 'Confirmed',
										Rejected : 'Rejected',
										Total : 'Total',
										Orders_Received : 'Orders Received',
										Confirmed_Orders : 'Confirmed Orders',
										Picked_Up : 'Picked Up',
										Delivery_Finished : 'Delivery Finished',
										Return : 'Return',
										PickWarehouse : 'Picking Warehouse',
										News : 'News',
										Terms_of_Use : 'Terms of Use',
										FAQ : 'FAQs',
										Settings : 'Settings',
										Contact_Us : 'Contact Us',
										About_Us : 'About Us',
										Version : 'Version',
										Received : 'Received',
										Ware_House : 'WareHouse',
										Internet_Disconnected : 'Internet Disconnected',
										User_Information : 'User Information',
										Please_wait : 'Please wait',
										Please_enter_Username_and_Password : 'Please enter Username and Password',
										Please_enter_Username : 'Please enter Username',
										Please_enter_Password : 'Please enter Password',
										Manifest_Created_Date : 'Manifest Created Date'
									});
					$translateProvider
							.translations(
									'mc',
									{
										PU : 'pu ch',
										Order : '訂單',
										Orders : '訂單',
										Report : '報告',
										Account : '賬戶',
										From : '由',
										To : '到',
										Address : '地址',
										Name : '名稱',
										Tele : '電話',
										Totalorder : '訂單總數',
										Quantity : '數量',
										Moneycollection : '代收貨款',
										youhavestill : '你仍然',
										con_or_rej : '要確認或拒絕',
										SignIN : '登錄',
										ForgotPassword : '忘記密碼',
										Manifest : '貨單',
										Confirmed : '確認',
										Rejected : '拒絕',
										Total : '總數',
										Orders_Received : '已接收訂單',
										Confirmed_Orders : '已確認訂單',
										Picked_Up : '提貨',
										Delivery_Finished : '完成運送',
										Return : '返',
										News : '新聞',
										Terms_of_Use : '使用條款',
										FAQ : '常見問題解答',
										Settings : '設置',
										Contact_Us : '聯繫我們',
										About_Us : '關於我們',
										Version : '版本',
										Received : '已接收',
										Ware_House : 'WAREHOUSE',
										Internet_Disconnected : 'Internet Disconnected',
										User_Information : 'User Information',
										Please_wait : 'Please wait',
										Please_enter_Username_and_Password : 'Please enter Username and Password',
										Please_enter_Username : 'Please enter Username',
										Please_enter_Password : 'Please enter Password',
										Manifest_Created_Date : 'Manifest Created Date'
									});

					$translateProvider.preferredLanguage('en');

					/*
					 * $httpProvider.defaults.useXDomain = true;
					 * $httpProvider.defaults.withCredentials = true; delete
					 * $httpProvider.defaults.headers.common["X-Requested-With"];
					 * $httpProvider.defaults.headers.common["Accept"] =
					 * "application/json";
					 * $httpProvider.defaults.headers.common["Content-Type"] =
					 * "application/json";
					 */
					// $httpProvider.defaults.headers.post["Content-Type"] =
					// "application/x-www-form-urlencoded";
					// Ionic uses AngularUI Router which uses the concept of
					// states
					// Learn more here: https://github.com/angular-ui/ui-router
					// Set up the various states which the app can be in.
					// Each state's controller can be found in controllers.js
					$stateProvider

							.state('splash', {
								url : '/splash',
								templateUrl : 'templates/splash.html',
								controller : 'splashCtrl'
							})
							.state('login', {
								url : '/login',
								templateUrl : 'templates/login.html',
								controller : 'LoginCtrl'
							})
							.state('tnc', {
								url : '/tnc',

								templateUrl : 'templates/tnc.html',
								controller : 'Tnc'

							})

							// setup an abstract state for the tabs directive
							.state('tab', {
								url : "/tab",
								abstract : true,
								templateUrl : "templates/tabs.html"
							})

							// Each tab has its own nav history stack:

							.state(
									'tab.order',
									{
										url : '/order',
										views : {
											'tab-order' : {
												templateUrl : 'templates/tab-order.html',
												controller : 'OrderCtrl'
											}
										}
									})

							.state(
									'tab.report',
									{
										url : '/report',
										views : {
											'tab-report' : {
												templateUrl : 'templates/tab-report.html',
												controller : 'reportCtrl'
											}
										}
									})
							.state(
									'tab.report-detail',
									{
										url : '/report/detail',
										views : {
											'tab-report' : {
												templateUrl : 'templates/report-detail.html',
												controller : 'reportDetailCtrl'
											}
										}
									})
							.state(
									'tab.report-manifestDetail',
									{
										url : '/report/manifestDetail',
										views : {
											'tab-report' : {
												templateUrl : 'templates/report-manifestDetail.html',
												controller : 'manifestDetailCtrl'
											}
										}
									})

							.state(
									'tab.account',
									{
										url : '/account',
										views : {
											'tab-account' : {
												templateUrl : 'templates/tab-account.html',
												controller : 'AccountCtrl'
											}
										}
									})
							.state(
									'tab.account-settings',
									{
										url : '/account-settings',
										views : {
											'tab-account' : {
												templateUrl : 'templates/account-settings.html',
												controller : 'account-settingsCtrl'
											}
										}
									})
							.state(
									'tab.user-information',
									{
										url : '/user-information',
										views : {
											'tab-account' : {
												templateUrl : 'templates/user-information.html',
												controller : 'user-informationCtrl'
											}
										}
									})
							.state(
									'tab.account-version',
									{
										url : '/account-version',
										views : {
											'tab-account' : {
												templateUrl : 'templates/account-version.html',
												controller : 'account-versionCtrl'
											}
										}
									})
							.state(
									'tab.account-news',
									{
										url : '/account-news',
										views : {
											'tab-account' : {
												templateUrl : 'templates/account-news.html',
												controller : 'account-newsCtrl'
											}
										}
									})
							.state(
									'tab.account-termsofuse',
									{
										url : '/account-termsofuse',
										views : {
											'tab-account' : {
												templateUrl : 'templates/account-termsofuse.html',
												controller : 'account-termsofuseCtrl'
											}
										}
									})
							.state(
									'tab.account-faq',
									{
										url : '/account-faq',
										views : {
											'tab-account' : {
												templateUrl : 'templates/account-faq.html',
												controller : 'account-faqCtrl'
											}
										}
									})
							.state(
									'tab.account-contactUs',
									{
										url : '/account-contactUs',
										views : {
											'tab-account' : {
												templateUrl : 'templates/account-contactUs.html',
												controller : 'account-contactUsCtrl'
											}
										}
									})
							.state(
									'tab.account-aboutUs',
									{
										url : '/account-aboutUs',
										views : {
											'tab-account' : {
												templateUrl : 'templates/account-aboutUs.html',
												controller : 'account-aboutUsCtrl'
											}
										}
									});

					// if none of the above states are matched, use this as the
					// fallback
					$urlRouterProvider.otherwise('/splash');

				});
