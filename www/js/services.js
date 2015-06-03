angular.module('starter.services', ['ngStorage'])

.service('LoginService', function($q,$http,$localStorage,$cordovaPreferences) {
    return {
        loginUser: function(name, pw, version, imei) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var authStatus = null;
            /*http://www.w3schools.com/website/Customers_JSON.php*/
            $http.get($localStorage.rooturl+'?UserName='+name+'&PasswordHash='+pw+'&IMEINo='+imei+'&Version='+version)
            .success(function(data, status, headers, config){
            	authStatus = data.ValidUserStatus[0].ValidUser;
                if (status == '200') {
                	if(authStatus == 'True'){
                		deferred.resolve('Welcome ' + name + '!');
                		$localStorage.userNameKorchina = name;
                		$localStorage.passwordKorchina = pw;
                		sharedpreferences.getSharedPreferences('KorchinaSharedPref', 'MODE_PRIVATE', successHandler, errorHandler);
                		function successHandler(result){
                			//alert("SUCCESS: \r\n"+result );
                		}
                		function errorHandler(result){
                			//alert("ERORR: \r\n"+result );
                		}
                		sharedpreferences.putString('KorchinaUsername', name, successHandler, errorHandler);
                	}
                	 else {
                         deferred.reject('Please check your Username & Password.');
                     }
                }
                else {
                    deferred.reject('Server error please try again later');
                }
            })
            .error(function(data, status, headers, config) {
            	deferred.reject('Server error please try again later');
            });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('ForgetService', function($q,$http,$localStorage) {
    return {
        forget: function(name) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var authStatus = null;
            /*http://www.w3schools.com/website/Customers_JSON.php*/
            $http.get($localStorage.rooturl+'?UserName='+name)
            .success(function(data, status, headers, config){            	
            	authStatus = data.ForgetPasswordStatus[0].Status;
            	console.log(authStatus);
                if (status == '200') {
                	if(authStatus == 'True'){
                		deferred.resolve('Your password has been sent to your email.');                		
                	}
                	else if(authStatus == 'False'){
                		deferred.resolve('We are unable to send the email. Please check if your email or username is valid');  
                	}
                	 else {
                         deferred.reject('Please enter your Username');
                     }
                }
                else {
                    deferred.reject('Server error please try again later');
                }
            }).
            error(function(data, status, headers, config) {
            	console.log(status);
            	deferred.reject('Server error please try again later');
              });
            
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
