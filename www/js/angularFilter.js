angular.module('appFilter', [])
.filter('escape', function() {
  return window.encodeURIComponent;
})

.filter('enumLoC', function($filter) {
    return function(input, uppercase) {
      switch(input){
        case 'DM':
          return 'Damaged';
        case 'FH':
          return 'Finished';
        case 'OC':
          return 'Order Completed';
        case 'PU':
          return $filter('translate')('Picked_Up');
        case 'R':
          return $filter('translate')('Received');
        case 'RF':
          return 'Refuse';
        case 'RJ':
          return 'Rejected';
        case 'UA':
          return 'Unavailable';
        case 'C':
          return $filter('translate')('Confirmed');        
        default:
          return 'Unavailable'; 
      }
    }
});
