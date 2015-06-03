var options = {
        url: 'http://125.62.198.229/KorchinaWEBAPI/api/KorchinaAPI/', // <-- Android ONLY:  your server url to send locations to
        params: {
            UserName: 'Ericka866'
            GpsLocation: 'VIJAY' 
            latitude: '25.00'
            longitude: '75.00'
            IMEI: '7889'
            mobileno: '77895'                            //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
        },
        /*headers: {                                   // <-- Android ONLY:  Optional HTTP headers sent to your configured #url when persisting locations
            "X-Foo": "BAR"
        },*/
        locationTimeout: 5000,
        desiredAccuracy: 10,
        stationaryRadius: 2,
        distanceFilter: 1,
        notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
        notificationText: 'ENABLED', // <-- android only, customize the text of the notification
        activityType: 'AutomotiveNavigation',
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false 
    
  };

    // `configure` calls `start` internally
    $cordovaBackgroundGeolocation.configure(options)
    .then(
            null, // Background never resolves
            function (err) 
            { 
              // error callback
              console.error(err);
            },
            function (location) 
            { 
              // notify callback for iOS 
              $http.get($localStorage.rooturl+'?UserName=Ericka866&GpsLocation=VIJAY&latitude=25.00&longitude=35.00&IMEI=123456&mobileno=1235')
                      .success(function(data, status, headers, config)
                        {
                          alert('Updte Successful');
                        }).
                        error(function(data, status, headers, config)
                        {
                          var alertPopup = $ionicPopup.alert({
                                          title: '',
                                          template: 'OOps Error : background-geolocation'
                                          });
                        });
            }
        ); 
   

