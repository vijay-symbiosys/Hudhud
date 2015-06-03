angular.module('starter.controllers', [ 'ngStorage','ngCordova','ja.qr','720kb.datepicker'])

.controller('splashCtrl', function($scope,$localStorage,LoginService,$ionicPopup,$state,$ionicHistory,$filter) {
	if($localStorage.userNameKorchina != '' && $localStorage.passwordKorchina != ''){

		LoginService.loginUser($localStorage.userNameKorchina, $localStorage.passwordKorchina, $localStorage.version, $localStorage.imei).success(function(data) {
        	$ionicHistory.nextViewOptions({
        	    disableAnimate: false,
        	    disableBack: true
        	});
        	
            $state.go('tab.order');
        }).error(function(data) {
        	$ionicHistory.nextViewOptions({
        	    disableAnimate: false,
        	    disableBack: true
        	});
        	$state.go('login');
        });
	}
	else{
		$ionicHistory.nextViewOptions({
    	    disableAnimate: false,
    	    disableBack: true
    	});
		$state.go('login');
		/*var alertPopup = $ionicPopup.alert({
            title: '',
            template: $filter('translate')('Internet_Disconnected')
        });*/
	}
})
.controller('LoginCtrl', function($scope,$localStorage,$cordovaPush, LoginService, ForgetService, $ionicPopup, $state, $ionicHistory,$filter, $translate) {
    $scope.data = {};
    //$localStorage.message = "Hello World";
   /* cordova.getAppVersion(function(version) {
        alert(version);        
    });*/

    if(($localStorage.userNameKorchina != '') && ($localStorage.passwordKorchina != '') && ($localStorage.userNameKorchina != undefined) && ($localStorage.passwordKorchina != undefined)){
    	$scope.data.username = $localStorage.userNameKorchina;
    	$scope.data.password = $localStorage.passwordKorchina;
    }
    $scope.login = function() {
    	if(($scope.data.username != undefined) && ($scope.data.username != '') && ($scope.data.password != undefined) && ($scope.data.password != '')){
    		var alertPopup = $ionicPopup.show({
                title: '',
                template: '<style>p{margin:0;}</style><p style="text-align:center !important;">'+$filter('translate')('Please_wait')+'</p>'
            });
    		$scope.nclose = function(){
    			alertPopup.close();
			}
    		LoginService.loginUser($scope.data.username, $scope.data.password, $localStorage.version, $localStorage.imei).success(function(data) {
            	$ionicHistory.nextViewOptions({
            	    disableAnimate: false,
            	    disableBack: true
            	});
            	$scope.nclose();
            	$localStorage.userNameKorchina = $scope.data.username;
        		$localStorage.passwordKorchina = $scope.data.password;
        		if(ionic.Platform.isAndroid()){
        			var config = {
            	    	    "senderID": "345346127260",
            	    	  };
            	    if(($localStorage.gcmregid == '') || ($localStorage.gcmregid == undefined)){
            	    	$cordovaPush.register(config).then(function(result) {
            	  	    }, function(err) {
            	  	      alert(err);
            	  	    })
            	    }
        		}
        	    
                $state.go('tab.order');
            }).error(function(data) {
            	$scope.nclose();
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: data
                });
            });
    	}
    	else{
    		
    		$scope.msg = '';
    		if((($scope.data.username == undefined) || ($scope.data.username == '')) && (($scope.data.password == undefined) || ($scope.data.password == ''))){
    			$scope.msg = $filter('translate')('Please_enter_Username_and_Password');
    			console.log($scope.msg);
    		}
    		else if(($scope.data.username == undefined) || ($scope.data.username == '')){
    			$scope.msg = $filter('translate')('Please_enter_Username');
    			console.log($scope.msg);
    		}
    		else if(($scope.data.password == undefined) || ($scope.data.password == '')){
    			$scope.msg = $filter('translate')('Please_enter_Password');
    			console.log($scope.msg);
    		}
    			var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: $scope.msg
                });
    	}
    }
    $scope.forget = function(){  	
    	if($scope.data.username != undefined && $scope.data.username != ''){
    		var alertPopup = $ionicPopup.show({
                title: '',
                template: '<style>p{margin:0;}</style><p style="text-align:center !important;">'+$filter('translate')('Please_wait')+'</p>'
            });
    		$scope.nclose = function(){
    			alertPopup.close();
			}
    		ForgetService.forget($scope.data.username).success(function(data) {
    			$scope.data.username = '';
    			$scope.data.password = '';
    			$scope.nclose();
            	var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: data
                });
            	$scope.data.username = '';
    			$scope.data.password = '';
            }).error(function(data) {
            	$scope.data.username = '';
    			$scope.data.password = '';
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: data
                });
                $scope.data.username = '';
    			$scope.data.password = '';
            });
    	}
    	else{
    		$scope.data.username = '';
			$scope.data.password = '';
    		var alertPopup = $ionicPopup.alert({
                title: '',
                template: 'Please enter your Username.'
            });
    		$scope.data.username = '';
			$scope.data.password = '';
    	}
    }
    $scope.changeLanguage = function (key) {
        $translate.use(key);
      };
/*    $scope.init = function(){
    	console.log(device.uuid);

    	navigator.geolocation.getCurrentPosition(function(pos) {
            console.log(pos.coords.latitude, pos.coords.longitude);
            //alert($cordovaDevice.getUUID());
            var alertPopup = $ionicPopup.alert({
                title: '',
                template: pos.coords.latitude +' '+ pos.coords.longitude
            });
        });
    }*/
})
		.controller('OrderCtrl',	function($scope,$interval,$http,$cordovaCamera,$ionicScrollDelegate,$cordovaFileTransfer,$localStorage, $ionicPopup, $ionicScrollDelegate,$cordovaBarcodeScanner,$ionicModal,$timeout,$ionicPlatform) {
			  $ionicPlatform.onHardwareBackButton(function() {
				     //e.stopPropagation();
				  });
			$scope.checkState = function(){
/*						if(navigator.connection.type == Connection.NONE) {
				            return true;
				        }
						else{
							return false;
						}*/
				//console.log('Message : '+CryptoJS.SHA1("123"));
						return true;
					}
			
					$scope.item = '';
					$scope.orderItem = '';
					$scope.getOrders = function(mid,indexM,whcode,discode){
						if($scope.checkState() == true){
						if($scope.item[indexM].showDetails == false){
		            		$scope.item[indexM].showDetails = true;
		            		$http.get($localStorage.rooturl+'?ManifestId='+mid+'&status=kk')
				            .success(function(data, status, headers, config){
				            	$scope.orderItem = data.Orders;
				            	$scope.item[indexM].Orders=data.Orders;
				            	/*for(i=0;i<$scope.item[indexM].Orders.length;i++){
				            		$scope.item[indexM].Orders[i].showDetails = false;
				            	}*/
				            	$scope.item[indexM].isShown= 'false';
				            	console.log($scope.item);
				            }).
				            error(function(data, status, headers, config) {
				            	var alertPopup = $ionicPopup.alert({
				                    title: '',
				                    template: 'Server error please try again later!'
				                });
				              });
		            	}
		            	else{
		            		$scope.item[indexM].showDetails = false;
		            		$scope.cleardata();
		            	}
					}
						else{
							
						}
					}
		            /*--------------------------------Event Listeners--------------------------------*/
		            $scope.$on('newManifest', function(event, msg) {
						$http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&flag=0')
			            .success(function(data, status, headers, config){
			            	$scope.item = data.Manifest;
			            	$ionicScrollDelegate.scrollTop();
			            	//alert(new Date().getTimezoneOffset())
			            	for(k=0;k<$scope.item.length;k++){
			            		$scope.item[k].showDetails = false;

			            		if($scope.item[k].ArrangeStatus == 'I'){
					            		$scope.item[k].cImg = imgs;
					            		if(ionic.Platform.isAndroid()){
					            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000))-19800);				            			
					            		}
					            		else{
					            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000)));
					            		}
				            	}
			            	}
			            })
		            });
		            $scope.$on('newManifestExpire', function(event, msg) {
		            	var npopup=	$ionicPopup.show({
							  template: "<a class=\"button button-icon icon-right icon ion-android-close\" style=\"position: absolute; float:right; top: -4px; left:257px\" ng-click=\"nclose()\"></a><style>.popup-sub-title{color:#fff;font-size:18px;} .popup-sub-title > m{color:yellow;} .popup-title{font-size:23px;font-weight:bold;padding:5px; color: rgb(255, 255, 255) !important;} .popup { width:300px !important; background-color:#9E0C0F !important; border:none; } .popup-container.active .popup{border:none !important;}</style>",
							  title: '<p>Notice</p>',
							  subTitle: '<i>Manifest</i> '+msg+' was shutdown due to system timeout.',
							  scope: $scope
							});
						$scope.nclose = function(){
							npopup.close();
						}
		            });
		            $scope.$on('msgid', function(event, msg) {
		            	for(i=0;i<$scope.item.length;i++){
		            		if($scope.item[i].ManifestID == msg){
		            			$scope.item[i].cImg = imgs1;
		            		}
		            	}
		            });
					$scope.$on('msgidEx', function(event, msg) {
						if($scope.checkState() == true){
			            	for(i=0;i<$scope.item.length;i++){
			            		if($scope.item[i].ManifestID == msg){
			            			$http.get($localStorage.rooturl+'?ManifestId='+$scope.item[i].ManifestID+'&status=R&opcode=MN')
						            .success(function(data, status, headers, config){
						            	$http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&flag=0')
							            .success(function(data, status, headers, config){
							            	$scope.item = data.Manifest;
							            	$ionicScrollDelegate.scrollTop();
											var npopup=	$ionicPopup.show({
												  template: "<a class=\"button button-icon icon-right icon ion-android-close\" style=\"position: absolute; float:right; top: -4px; left:257px\" ng-click=\"nclose()\"></a><style>.popup-sub-title{color:#fff;font-size:18px;} .popup-sub-title > m{color:yellow;} .popup-title{font-size:23px;font-weight:bold;padding:5px; color: rgb(255, 255, 255) !important;} .popup { width:300px !important; background-color:#9E0C0F !important; border:none; } .popup-container.active .popup{border:none !important;}</style>",
												  title: '<p>Notice</p>',
												  subTitle: '<i>Manifest</i> '+$scope.item[i].ManifestID+' was shutdown due to system timeout.',
												  scope: $scope
												});
											$scope.nclose = function(){
												npopup.close();
											}
							            })
						            })	
			            		}
			            	}
						}
						else{
							
						}
		            });
					/*--------------------------------Event Listeners--------------------------------*/

/*					$scope.setOrderId = function(id,mindex,oindex,ostatus){
						$scope.activeItem = id;
						$scope.mindexV = mindex;
						$scope.oindexV = oindex;
						$scope.oindexS = ostatus;
						console.log(id);
					}*/
					if($scope.checkState() == true){
						
					}
					else{
						
					}
					$http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&flag=0')
		            .success(function(data, status, headers, config){
		            	console.log(data);
		            	$scope.item = data.Manifest;
		            	//alert(new Date().getTimezoneOffset())
		            	for(k=0;k<$scope.item.length;k++){
		            		$scope.item[k].showDetails = false;
		            		if($scope.item[k].ArrangeStatus == 'I'){
				            		$scope.item[k].cImg = imgs;
				            		if(ionic.Platform.isAndroid()){
				            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000))-19800);				            			
				            		}
				            		else{
				            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000)));
				            		}
			            	}
		            	}
		            })
		            $scope.activeItem = '';
					$scope.mindexV = '';
					$scope.oindexV = '';
					$scope.oindexS = '';
		            $scope.toggleGroup = function(group,id,mindex,oindex,ostatus) {
				    if ($scope.isGroupShown(group)) {
				      $scope.shownGroup = null;
				      $scope.activeItem = '';
						$scope.mindexV = '';
						$scope.oindexV = '';
						$scope.oindexS = '';
				    } else {
				      $scope.shownGroup = group;
				      	$scope.activeItem = id;
						$scope.mindexV = mindex;
						$scope.oindexV = oindex;
						$scope.oindexS = ostatus;
				    }
				  };
				  $scope.isGroupShown = function(group) {
				    return $scope.shownGroup === group;
				  };

					var imgs = 'img/count.png';
					var imgs1 = 'img/count_warn.png';
					 
					 $scope.changeImg = function(){
						 $scope.countImg = imgs;
					 }
				    var success = function(message) {
				        alert(message);
				    }

				    var failure = function() {
				        alert("Error calling Hello Plugin");
				    }

				    /*--------------- Barcode Scanner ---------------------------------------------------*/
				    $scope.scanBarcode = function() {
				    	if($scope.checkState() == true) {
				    		$cordovaBarcodeScanner.scan().then(function(imageData) {
				    			// If the Scanning is not cancelled
				    			if(imageData.cancelled != true) {
				    				// Store the barcode value from the scanned text
				    				$scope.orderNum = imageData.text;
				    				
				    				// Loop through all the manifests
				    				for(var i=0;i<$scope.item.length;i++) {
				    					// What is this for ?
				    					var x = i;
				    					
				    					// If the manifest is not expanded, then get the orders for this manifest
				    					if($scope.item[i].Orders == undefined) {
				    						// Make a synchronous call to the Web API for fetching the orders
				    						// `false` in request.open() makes the request synchronous
				    						var request = new XMLHttpRequest();
				    						request.open('GET', $localStorage.rooturl+'?ManifestId='+$scope.item[i].ManifestID+'&status=kk', false);
				    						request.send(null);
				    						
				    						// If there is a valid response from Web API
				    						if (request.status === 200) {
				    							var resp = JSON.parse(request.responseText);
				    							$scope.item[x].Orders=resp.Orders;
				    						}
				    					} // All the orders of the collapsed manifest are fetched
				    					
				    					console.log($scope.item[x]);
				    				} // All the manifests are looped through and each manifest's orders are fetched
				    				
				    				// Flag for whether the scanned order found
				    				var s = false;
				    				
				    				// Loop through all the manifests
				    				for(var i=0;i<$scope.item.length;i++) {
				    					
				    					// Loop through the orders of the current manifest
				    					for(var j=0;j<$scope.item[i].Orders.length;j++) {
				    						
				    						// if the current order number matches to the one scanned value
				    						if($scope.item[i].Orders[j].OrderNumber == $scope.orderNum) {
				    							// Set to scanner order found flag to true
				    							s = true;
				    							
				    							// Set show details of the manifest and of the order to true
				    							$scope.item[i].showDetails = true;
				    							$scope.item[i].Orders[j].showDetails = true;
				    							
				    							// if the order status is Picked Up
				    							if($scope.item[i].Orders[j].OrderStatus == 'PU') {
				    								$scope.hello($scope.item[i].Orders[j].Address,$scope.item[i].Orders[j].ZipCode,$scope.item[i].Orders[j].CityCode,$scope.item[i].Orders[j].OrderNumber,$scope.item[i].ManifestID,i);
				    								console.log('OK');
				    								
				    								// break out of order looping
				    								break;
				    							}
				    							// If the order status is either Confirmed or Refused
				    							else if(($scope.item[i].Orders[j].OrderStatus == 'C') || ($scope.item[i].Orders[j].OrderStatus == 'R')) {
				    								// Create a popup message to the user
				    								var alertPopup = $ionicPopup.alert({title: '', template: 'Please select an Order in Picked Up status.'});
				    								console.log('NO');
													
				    								// break out of order looping
				    								break;
				    							}
				    						}
											// If the current order number does match to the scanned value
				    						else {
				    							console.log(i+' '+$scope.item[i].Orders[j].OrderNumber);
				    							
				    							// If the the manifest loop and order loop are closed and order found flag is false
				    							if((i == ($scope.item.length - 1)) && (j == ($scope.item[i].Orders.length - 1)) && (s == false)) {
				    								// Create a popup message to the user
				    								var alertPopup = $ionicPopup.alert({title: '', template: 'No order exists matching the barcode.'});
				    							}
				    						}
				    					} // end of order loop
				    				} // end of manifest loop
				    			} // end of if for scanning not cancelled
				    			// If the scanning is cancelled
				    			else {
				    				// Create a popup message to the user
				    				var npopup=	$ionicPopup.show({template: "Scan Cancelled", title: '', scope: $scope});
				    				
				    				//close the popup after 1.5 seconds for some reason
				    				$timeout(function() {npopup.close();}, 1500);
				    			} // end of if for scanning cancelled
				    			
				    			console.log("Barcode Format -> " + imageData.format);
				    			console.log("Cancelled -> " + imageData.cancelled);
				    		}, function(error) {
				    			console.log("An error happened -> " + error);
						        });
				    	}
						else{
						// Do nothing;	
						}
				    };
				    /*---------------------------------------------- Barcode Scanner ------------------------------------*/
				    $scope.cleardata = function(){
				    	$scope.activeItem = '';
						$scope.mindexV = '';
						$scope.oindexV = '';
						$scope.oindexS = '';
				    }
					$scope.scrollResize = function() {
						$ionicScrollDelegate.resize();
						console.log('resize');
					};
					$scope.accept = function(mid,ind,whcode,discode) {
						if($scope.checkState() == true){
							$scope.item[ind].showDetails = true;
							console.log(decodeURIComponent(mid),ind,whcode,discode);
							$http.get($localStorage.rooturl+'?ManifestId='+mid+'&status=C&opcode=MN')
				            .success(function(data, status, headers, config){
				            	$http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&flag=0')
					            .success(function(data, status, headers, config){
					            	$scope.item = data.Manifest;
					            	console.log($scope.item);
					            	$scope.item[ind].showDetails = true;
					            	$ionicScrollDelegate.scrollTop();
					            	for(k=0;k<$scope.item.length;k++){
					            		//$scope.item[k].showDetails = false;
					            		if($scope.item[k].ArrangeStatus == 'I'){
							            		$scope.item[k].cImg = imgs;
							            		if(ionic.Platform.isAndroid()){
							            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000))-19800);				            			
							            		}
							            		else{
							            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000)));
							            		}
						            	}				            		
					            	}
				            		$http.get($localStorage.rooturl+'?ManifestId='+mid+'&status=kk')
						            .success(function(data, status, headers, config){
						            	$scope.orderItem = data.Orders;
						            	$scope.item[ind].Orders=data.Orders;
						            	$scope.item[ind].isShown= 'false';
						            	console.log($scope.item);
						            })
					            })
				            })
						}
						else{
							
						}
					};
					$scope.reject = function(mid,ind,whcode,discode){
						if($scope.checkState() == true){
							$http.get($localStorage.rooturl+'?ManifestId='+mid+'&status=R&opcode=MN')
				            .success(function(data, status, headers, config){
				            	$http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&flag=0')
					            .success(function(data, status, headers, config){
					            	$scope.item = data.Manifest;
					            	for(k=0;k<$scope.item.length;k++){
					            		if($scope.item[k].ArrangeStatus == 'I'){
							            		$scope.item[k].cImg = imgs;
							            		if(ionic.Platform.isAndroid()){
							            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000))-19800);				            			
							            		}
							            		else{
							            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000)));
							            		}
						            	}				            		
					            	}
					            })
				            })
						}
						else{
							
						}
					  };
					  $interval(function(){
						  var accordianArray = [];
						  for(var i=0;i<$scope.item.length;i++){
							  accordianArray.push($scope.item[i].showDetails);
						  }
							if($scope.checkState() == true){
								  $http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&flag=0')
						            .success(function(data, status, headers, config){
						            	$scope.item = data.Manifest;
						            	//console.log($scope.item);
						            	$ionicScrollDelegate.scrollTop();
						            	for(k=0;k<$scope.item.length;k++){
						            		//$scope.item[k].showDetails = true;
						            		if($scope.item[k].ArrangeStatus == 'I'){
								            		$scope.item[k].cImg = imgs;
								            		if(ionic.Platform.isAndroid()){
								            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000))-19800);				            			
								            		}
								            		else{
								            			$scope.item[k].timeLeft = ((1800-((new Date() - new Date($scope.item[k].ModifiedDate))/1000)));
								            		}
							            	}
						            	}
						            	for(j=0;j<$scope.item.length;j++){
						            		if(accordianArray[j] == true){
						            			var index = j;
						            			console.log($scope.item[j]);
						            			$scope.item[j].showDetails = true;
						            			$http.get($localStorage.rooturl+'?ManifestId='+$scope.item[j].ManifestID+'&status=kk')
									            .success(function(data, status, headers, config){
									            	//$scope.orderItem = data.Orders;
									            	console.log(index);
									            	$scope.item[index].Orders=data.Orders;
									            	$scope.item[index].isShown= 'false';
									            })
						            		}						            		
						            	}
						            })
							}
							else{
								
							}

				    		},300000);
/*					  $interval(function(){
						  navigator.geolocation.getCurrentPosition(function(pos) {
					            $http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&GpsLocation=&latitude='+pos.coords.latitude+'&longitude='+pos.coords.longitude+'&IMEI='+$localStorage.imei+'&mobileno=1235')
					            .success(function(data, status, headers, config){
					            })
					        });
				    		},900000);*/



					$scope.showOrderMessage = function(msg,ind){
						var npopup=	$ionicPopup.show({
							  template: "<a class=\"button button-icon icon-right icon ion-android-close\" style=\"position: absolute; float:right; top: -4px; left:257px\" ng-click=\"nclose()\"></a><style>.popup-sub-title{color:#fff;font-size:18px;} .popup-sub-title > m{color:yellow;} .popup-title{font-size:23px;font-weight:bold;padding:5px; color: #fff !important;} .popup { width:300px !important; background-color:black !important; border:none; } .popup-container.active .popup{border:none !important;}</style>",
							  title: '<p>Order Finished</p>',
							  subTitle: '<i>The order</i> '+ind+' is transfered from \"Order\" to \"Report\".',
							  scope: $scope
							});
						$scope.nclose = function(){
							npopup.close();
						}
						$timeout(function() {
							npopup.close(); //close the popup after 3 seconds for some reason
						   }, 5000);
					}
					$scope.hello = function(addr,zip,cc,ind,mid,index) {
						if($scope.checkState() == true){
							
						}
						else{
							
						}
						$scope.data = {}
						$scope.inde = ind;
						console.log(mid+' '+index);
						var myPopup = $ionicPopup
								.show({
									template : '<div><a class="button button-icon icon-right icon ion-android-close" style="float:right; top: -10px;" ng-click="close()"></a><div class="row"><div class="col"><p style="text-align:center;">Order No.<br>'
											+ ind
											+ '<br>Address<br>'
											+ addr+' '+zip+' '+cc
											+ '<br>Location<br>'+cc+'</p></div></div></div>',
									title : '',
									subTitle : '',
									scope : $scope,
									buttons : [ {
										text : 'Finish Delivery',
										onTap :function(e) {
											console.log('finished'+$scope.inde);
											$http.get($localStorage.rooturl+'?ManifestId='+ind+'&status=FH&opcode=OR')
								            .success(function(data, status, headers, config){
								            	 //($scope.item[index].TotalCount -1);
								            	$http.get($localStorage.rooturl+'?ManifestId='+mid+'&status=true')
									            .success(function(data, status, headers, config){
									            	$scope.orderItem = data.Orders;
									            	$scope.item[index].TotalCount = data.Orders.length;
									            	$scope.item[index].Orders=data.Orders;
									            	$scope.item[index].isAccepted= 'true';
									            	console.log($scope.item);
									            	console.log(mid+' '+index);
									            	$scope.cleardata();
									            	$scope.showOrderMessage('Finished',ind);
									            })
								            })
										}
									}, {
										text : '<b>Refuse</b>',
										type : 'button-positive',
										onTap : function(e) {
											myPopup.close();
											$scope.pop2(addr, index,mid,ind);
										}
									}, ]
								});
						/*myPopup.then(function(res) {
							console.log('Tapped!', res);
						});*/
						$scope.close = function() { 
							myPopup.close();
						}
					};
					$scope.pop2 = function(addr, index,mid,ind)
					{
						if($scope.checkState() == true)
						{
							$scope.imgDisabled = true;
							$scope.refuseType = '';
							$scope.imgFileUri  = '';
							$scope.remarks = '';
							$scope.value = '';
							var options = {
											 quality : 75,
											 destinationType: Camera.DestinationType.FILE_URI,
										     sourceType: Camera.PictureSourceType.CAMERA,
											 allowEdit : false,
											 targetWidth: 1280,
											 targetHeight: 720,
											 saveToPhotoAlbum: false
										  };
							
							$scope.setrefuseType = function(refvalue)
							{
								$scope.value = refvalue;
								$scope.refuseType = refvalue;								
							};

							$scope.captureImage = function()
							{								
								$cordovaCamera.getPicture(options).then(function(imageURI) 
							    {
							    	$scope.imgFileUri = imageURI;
						            $scope.data = {};
								  	var myPopup = $ionicPopup.show(
								  	{
										template : '<input type="text" ng-model="data.remarksId" style="border:1px solid #01e0ff;width:100% !important;">',
										title : 'Please enter remarks',
										subTitle : '',
										scope : $scope,
										buttons : [ {
														text : 'OK',
														onTap :function(e) 
														{
															if (!$scope.data.remarksId) 
															{
																console.log($scope.data.remarksId);
													            //don't allow the user to close unless he enters wifi password
													            e.preventDefault();
													            var alertPopup = $ionicPopup.show({
												                    title: '',
												                    template: '<div style="text-align:center;">Please enter Remarks.</div>'
												                });
													            $timeout(function() 
													            {
													            	alertPopup.close(); //close the popup after 3 seconds for some reason
																}, 1500);
													        } 
													        else 
													        {
													        	$scope.remarks = $scope.data.remarksId;
													        	console.log($scope.data.remarksId);
																myPopup.close();
																$scope.uploadstatus = '';
																var options = new FileUploadOptions();
																options.fileKey = "file";
																options.fileName = "order.png";
																options.params = {};
																options.params.UserName = $localStorage.userNameKorchina;
																options.params.OrderNumber = ind;
																options.params.Remark = $scope.remarks;
																options.params.orderStatus = 'DM';
																if($scope.imgFileUri != '')
																  {
																	  $cordovaFileTransfer.upload($localStorage.rooturl, $scope.imgFileUri, options).then(function(result) 
																	  {
																            //$scope.close2();
																		  $scope.cleardata();																            
																	  }, function(err) 
																	  {
																            console.log("ERROR: " + JSON.stringify(err));
																      }, function (progressEvent) 
																      {
																           if (progressEvent.lengthComputable) 
																           {
																            	$scope.uploadstatus = (progressEvent.loaded / progressEvent.total);
																            	console.log($scope.uploadstatus);
																           } 
																           else 
																           {
																                //loadingStatus.increment();
																           }							            
																       });
																  }
																  else
																  {
																	  var alertPopup = $ionicPopup.alert({
														                    title: '',
														                    template: 'Please take a picture.'
														                });
																  }
													        }
														}
												  } ]
									});
						        }, function(err) 
						        {
						            // An error occured. Show a message to the user
						        });	
							};

							$scope.submitRefuse = function()
							{								
								if($scope.checkState() == true)
								{
									if($scope.refuseType == '')
									{
										var alertPopup = $ionicPopup.alert({
						                    title: '',
						                    template: 'Please select Reject Reason.'
						                });
									}									
									else
									{
										$scope.close2();
										$http.get($localStorage.rooturl+'?ManifestId='+ind+'&status='+$scope.refuseType+'&opcode=OR')
							            .success(function(data, status, headers, config){
							            	$http.get($localStorage.rooturl+'?ManifestId='+mid+'&status=true')
								            .success(function(data, status, headers, config){
								            	$scope.orderItem = data.Orders;
								            	console.log(data.Orders);
								            	$scope.item[index].TotalCount = data.Orders.length;
								            	$scope.item[index].Orders=data.Orders;
								            	$scope.item[index].isAccepted= 'true';
								            	$scope.showOrderMessage('Refused',ind);
								            	$scope.cleardata();
								            })
							            })
							            
									}
								}
								else
								{
									
								}

							};

							var myPopup2 = $ionicPopup
							.show({
								templateUrl: 'templates/myPopup2.html',
								title : '',
								subTitle : '',
								scope : $scope,
							});

							$scope.close2 = function() 
							{
								myPopup2.close();
							};

						}
						else
						{
							
						}						
					};

					$scope.sendImg = function()
					{
						 console.log($scope.item);
						var or = 'HKG20150218102155';
						for(var i=0;i<$scope.item.length;i++)
						{
							for(var j=0;j<$scope.item[i].Orders.length;j++)
							{
								if($scope.item[i].Orders[j].OrderNumber == or)
								{
									$scope.item[i].showDetails = true;
									$scope.item[i].Orders[j].showDetails = true;
									console.log($scope.item[i]);
								}
							}
						}						 
					
					 }

				})

		.controller('reportCtrl', function($scope,$localStorage,$ionicPopup,$rootScope,$http, Chats) {
			$scope.reportdata = {};
			$scope.setReportType = function(type){
				$rootScope.reportData = $scope.reportdata;
				$rootScope.reportType = type;
			}
			$scope.arrowIg = 'img/reportV2_15.png';
			$scope.Received_Order_Count = '';
			$scope.Confirmed_Order_Count = '';
			$scope.PickedUp_Order_Count = '';
			$scope.Finished_Order_Count = '';
			$scope.Return_Order_Count = '';
			$scope.Order_total = '';
			$scope.Manifest_Confirmed_Count = '';
			$scope.Manifest_Reject_Count = '';
			$scope.Manifest_Total = '';
			$scope.getReports = function(){
				if(($scope.reportdata.from != undefined) && ($scope.reportdata.to != undefined)){
					$http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&fromdt='+$scope.reportdata.from+'&todt='+$scope.reportdata.to)
					.success(function(data, status, headers, config){
						if(data.UpdateStatus == 'Success'){
							var rData = data.OrderSummaryReport[0];
							$scope.Received_Order_Count = rData.Received_Order_Count;
							$scope.Confirmed_Order_Count = rData.Confirmed_Order_Count;
							$scope.PickedUp_Order_Count = rData.PickedUp_Order_Count;
							$scope.Finished_Order_Count = rData.Finished_Order_Count;
							$scope.Return_Order_Count = rData.Return_Order_Count;
							$scope.Order_total = rData.Order_total;
							$scope.Manifest_Confirmed_Count = rData.Manifest_Confirmed_Count;
							$scope.Manifest_Reject_Count = rData.Manifest_Reject_Count;
							$scope.Manifest_Total = rData.Manifest_Total;	            		
						}
						else{
							var myPopup = $ionicPopup
							.show({
								template : 'No Reports found',
								title : '',
								subTitle : '',
								scope : $scope,
								buttons : [ {
									text : 'OK',
									onTap :function(e) {
										myPopup.close();
									}
								} ]
							});
						}
					})
				}
			}
			/*$localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&fromdt=2012-10-01&todt=2015-10-01
			$http.get($localStorage.rooturl+'?ManifestId='+mid+'&status=true')
            .success(function(data, status, headers, config){
            	$scope.orderItem = data.Orders;
            	$scope.item[index].Orders=data.Orders;
            	$scope.item[index].isAccepted= 'true';
            })*/

		})

		.controller('reportDetailCtrl',function($scope, $stateParams,$ionicHistory,$http,$rootScope,$localStorage, Chats) {
			$scope.reportData = '';
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
			  $scope.reportData = $rootScope.reportData;
			  if($scope.reportData != undefined){
				  ///http://125.62.198.229/KorchinaWEBAPI/api/KorchinaAPI/?UserName=Ericka866&fromdt=2012-10-01&todt=2015-10-01&opcode=PU&Manifest=dummy&dummy=abc
				  $http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&fromdt='+$scope.reportData.from+'&todt='+$scope.reportData.to+'&opcode='+$rootScope.reportType+'&Manifest=dummy&dummy=abc')
		           .success(function(data, status, headers, config){
		            	$scope.Orders = data.ReturnOrderReport;
		            })
			  }

		})
		.controller('manifestDetailCtrl',function($scope, $stateParams,$ionicHistory,$http,$rootScope,$localStorage, Chats) {
			$scope.reportData = '';
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
			  $scope.reportData = $rootScope.reportData;
			  if($scope.reportData != undefined){
				  ///?UserName=Ericka866&fromdt=2012-10-01&todt=2015-10-01&opcode=R
				  $http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&fromdt='+$scope.reportData.from+'&todt='+$scope.reportData.to+'&opcode='+$rootScope.reportType)
		           .success(function(data, status, headers, config){
		            	$scope.Manifests = data.ReturnManifestReport;
		            })
		            $scope.setOrderId = function(id,index){
					  $http.get($localStorage.rooturl+'?UserName='+$localStorage.userNameKorchina+'&fromdt='+$scope.reportData.from+'&todt='+$scope.reportData.to+'&opcode=MN&Manifest='+id+'&dummy=abc')
			           .success(function(data, status, headers, config){
			            	$scope.Manifests[index].Orders = data.ReturnOrderReport;
			            })
				  }
			  }

		})
		.controller('Tnc', function($scope, $stateParams, $ionicHistory) {
				  $scope.myGoBack = function() {
				    $ionicHistory.goBack();
				  };
		})
		
		.controller('AccountCtrl', function($scope) {
			$scope.settings = {
				enableFriends : true
			};
		})
		.controller('account-settingsCtrl', function($scope, $ionicHistory, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
			$scope.setExisting = function(){
				if($localStorage.language != '' && $localStorage.language != undefined){
					$scope.value = $localStorage.language;	
				}
				else{
					$scope.value = 'en';
				}
			}
			$scope.setExisting();
			$scope.setLanguage = function(langpref) {
				$localStorage.language = langpref;
				$translate.use($localStorage.language);
			  };
		})
		.controller('user-informationCtrl', function($scope, $ionicHistory,$http, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
			  $scope.user = '';
			  $scope.qrcodeString = '';
			  $http.get($localStorage.rooturl+'?Username='+$localStorage.userNameKorchina+'&dummy1=0&dummy2=1')
	           .success(function(data, status, headers, config){
	            	$scope.user = data.UserInformation[0];
	            	$scope.qrcodeString = JSON.stringify(data.UserInformation[0]);
	            })
		})
		.controller('account-versionCtrl', function($scope, $ionicHistory,$http, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
			  $scope.version = $localStorage.version;
		})
		.controller('account-aboutUsCtrl', function($scope, $ionicHistory,$http, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
		})
		.controller('account-contactUsCtrl', function($scope, $ionicHistory,$http, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
		})
		.controller('account-faqCtrl', function($scope, $ionicHistory,$http, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
		})
		.controller('account-termsofuseCtrl', function($scope, $ionicHistory,$http, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
		})
		.controller('account-newsCtrl', function($scope, $ionicHistory,$http, $translate, $localStorage) {
			$scope.myGoBack = function() {
			    $ionicHistory.goBack();
			  };
		})
		.controller('PollingController', ['$rootScope','$scope', '$timeout', function ($rootScope,$scope, $timeout) {
                    $scope.timerRunning = true;
                    $scope.timerConsole = '';

                    $scope.timerType = '';

                    $scope.startTimer = function (){
                        $scope.$broadcast('timer-start');
                        $scope.timerRunning = true;
                    };

                    $scope.stopTimer = function (){
                        $scope.$broadcast('timer-stop');
                        $scope.timerRunning = false;
                    };

                    $scope.$on('timer-tick', function (event, args) {
                        $timeout(function (){
                        	//console.log($scope.timerType  + ' - event.name = '+ event.name + ', timeoutId = ' + args.timeoutId + ', millis = ' + args.millis);
                        	
                        	if((args.millis/1000) == 0){
                        		$rootScope.$broadcast('msgidEx', $scope.timerType);
                        	}/* */
                        	else if((args.millis/1000) < 11){
                        		$rootScope.$broadcast('msgid', $scope.timerType);
                        		/*var imgs1 = 'img/count_warn.png';
                        		$scope.countImg = imgs1;*/                        		
                        	}
                        	
                        	
                        });
                    });
                }]);

