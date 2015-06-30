'use strict';

/* Services */

var openpollServices = angular.module('openpollServices', ['ngResource']);


openpollServices.factory('Page', function(){
  var title = 'OpenPoll | Crea Vota Condividi sondaggi anonimi';
  var default_title = 'OpenPoll | Crea Vota Condividi sondaggi anonimi';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; },
	setDefaultTitle: function() { title = default_title; }
  };
});


/* tutti i sondaggi approvati di una categoria categorie*/
openpollServices.factory('PollService', ['$resource',
  function($resource){
    return $resource('http://www.openpoll.it/ws/poll/recent/1/0', {}, {
       querylist: {method:'GET', isArray:true }
    });
	}
]);

/* da visualizzare nella home nei box popular*/
openpollServices.factory('PollPopular', ['$resource',
  function($resource){
    return $resource('http://www.openpoll.it/ws/poll/popular', {}, {
       popularlist: {method:'GET', isArray:true, cache:false }
    });
	}
]);


/* tutti i sondaggi approvati di tutte le categorie*/
openpollServices.factory('PollServiceAll', ['$resource',
  function($resource){
    return $resource('http://www.openpoll.it/ws/poll/allrecent/:pageIndex', {}, {
       querylist: {method:'GET', isArray:true, cache:false }
    });
}]);


/* tutti i sondaggi approvati di tutte le categorie*/
openpollServices.factory('PollCategoryService', ['$resource',
  function($resource){
    return $resource('http://www.openpoll.it/ws/poll/category/:idCategory/:pageIndex', {}, {
       queryByCategory: {method:'GET', isArray:true }
    });
}]);



openpollServices.factory('PollSearch', ['$resource',
  function($resource){
    return $resource('http://www.openpoll.it/ws/poll/search/:searchString/:pageIndex', {}, {
       searchlist: {method:'GET', isArray:true }
    });
}]);
  

 

openpollServices.factory('PollDetail', ['$resource',
  function($resource){
    var singlePoll = $resource('http://www.openpoll.it/ws/poll/get/:pollId', {}, {
    querydetail: {method:'GET', isArray:false, cache:false}
	});

 return singlePoll;
  }]);  

  
//recupera i sondaggi da confermare
openpollServices.factory('PollDetailToConfirm', ['$resource',
  function($resource){
    var singlePoll = $resource('http://www.openpoll.it/ws/poll/getnc/:pollId', {}, {
    querydetailtoconfirm: {method:'GET', isArray:false}
    })

	return singlePoll;
  }]);   
  
  
openpollServices.factory('CategoryService', ['$resource',
  function($resource){
    return $resource('http://www.openpoll.it/ws/poll/categories', {}, {
       categorylist: {method:'GET', isArray:true }
    });
}]);  
 
  
/*  
openpollServices.factory('VoteDetail', ['$resource',
  function($resource){
    var singlePoll = $resource('http://www.openpoll.it/ws/poll/get/:pollId', {}, {
      querydetail: {method:'GET', isArray:false}
    })

	return singlePoll;
  }]);   
*/

  
