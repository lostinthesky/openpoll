'use strict';

/* Controllers */

var openpollControllers = angular.module('openpollControllers', []);




	
openpollControllers.controller('PollListCtrl', ['$scope',  'Page', 'PollServiceAll', 'PollPopular', 'CategoryService', '$routeParams',
  function($scope, Page, PollServiceAll, PollPopular, CategoryService, $routeParams) {

	
	Page.setDefaultTitle();
  
    var startPageIndex = 0;
    if ($routeParams.pageIndex)
	{
		startPageIndex = $routeParams.pageIndex;
	}
    $scope.polls = PollServiceAll.querylist({pageIndex:startPageIndex});
	$scope.populars = PollPopular.popularlist(); //quelli da visualizzare nei box
	$scope.categories = CategoryService.categorylist();
	
	
	$scope.moreIndex = $routeParams.pageIndex;
	
	//funzione che gestisce il caricamento di altri 10 sondaggi
	$scope.loadMore = function(nextPage) {
		   $scope.moreIndex = parseInt(nextPage);
		   $scope.moreIndex += 1;

		  $scope.pollsmore = PollServiceAll.querylist({pageIndex:$scope.moreIndex}, function(moreData) {
				if (moreData.length > 0) {
					$scope.polls = $scope.polls.concat($scope.pollsmore);
				}
			});
		} //fine function loadMore
		
		
		
  }]);
  
  
  
openpollControllers.controller('PollCategoryCtrl', ['$scope',  'Page', 'PollCategoryService', 'CategoryService', '$routeParams',
  function($scope, Page, PollCategoryService, CategoryService,  $routeParams) {
  
  Page.setDefaultTitle();
  
  
    $scope.polls = PollCategoryService.queryByCategory({idCategory:$routeParams.idCategory,pageIndex:$routeParams.pageIndex});
	 $scope.categories = CategoryService.categorylist();
	$scope.moreIndex = $routeParams.pageIndex;
		
		//funzione che gestisce il caricamento di altri 10 sondaggi
		$scope.loadMore = function(nextPage) {
			   $scope.moreIndex = parseInt(nextPage);
			   $scope.moreIndex += 1;

			  $scope.pollsmore = PollServiceAll.querylist({pageIndex:$scope.moreIndex}, function(moreData) {
					if (moreData.length > 0) {
						$scope.polls = $scope.polls.concat($scope.pollsmore);
					}
				});
			} //fine function loadMore
		
  }]);
  
  
  openpollControllers.controller('PollSearchCtrl', ['$scope', 'Page', 'PollSearch', 'CategoryService', '$routeParams',
  function($scope, Page, PollSearch, CategoryService, $routeParams) {

    Page.setDefaultTitle();
	//var searhString = $routeParams.searchString;
	//var pageIndex = $routeParams.pageIndex;
	
	 $scope.polls = PollSearch.searchlist({searchString:$routeParams.searchString,pageIndex:$routeParams.pageIndex});
	 $scope.categories = CategoryService.categorylist();
	 $scope.searchString = $routeParams.searchString;
	 
	$scope.moreIndex = $routeParams.pageIndex;
	
	//funzione che gestisce il caricamento di altri 10 sondaggi
	$scope.loadMore = function(nextPage) {
		   $scope.moreIndex = parseInt(nextPage);
		   $scope.moreIndex += 1;

		  $scope.pollsmore = PollServiceAll.querylist({pageIndex:$scope.moreIndex}, function(moreData) {
				if (moreData.length > 0) {
					$scope.polls = $scope.polls.concat($scope.pollsmore);
				}
			});
		} //fine function loadMore	 
	
  }]);

  
function MainCtrl($scope, Page) {
  $scope.Page = Page;
}



  openpollControllers.controller('PollDetailCtrl', ['$scope', 'Page', 'PollDetail', '$http', '$routeParams',
  function($scope, Page, PollDetail, $http, $routeParams) {
	 $scope.poll = PollDetail.querydetail({pollId:$routeParams.pollId});
	
	 $scope.poll.$promise.then(function(data) {
       Page.setTitle("OpenPoll | " + $scope.poll.title);
   });
	 
	 $scope.msgInviteFriend = "";
	 $scope.msginvitefriendshow = false;
	 
	 //inviteFriend
     $scope.inviteFriend = function(form) {
		 var jsonInviteFriend = {
			"email": $scope.friendEmail,
			"idPoll": $scope.poll.id
		};
		
	
		$http({
            method : 'POST',
            url : 'http://www.openpoll.it/ws/poll/invite',
            data : "jsonInviteFriend="+JSON.stringify(jsonInviteFriend),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status, headers) { 
			if (data == '1'){
				$scope.$parent.msginvitefriendshow = true;
				$scope.$parent.msgInviteFriend = "L'invito e' stato spedito, grazie!";
			}else if (data == '-2'){
				$scope.$parent.msginvitefriendshow = true;
				$scope.$parent.msgInviteFriend = "L'utente ha gia' votato per questo sondaggio.";
			}else if (data == '-1'){
				$scope.$parent.msginvitefriendshow = true;
				$scope.$parent.msgInviteFriend = "Si e' verificato un errore nella spedizione dell'invito.";
			}
			
		}).error(function(data, status, headers) {
			$scope.$parent.msginvitefriendshow = true;
			$scope.$parent.msgInviteFriend = "Errore generico.";		
		});
		return false;	 

	 }
	//fine getToken	 

		//Page.setTitle($scope.poll.title);
	
  }]);
  
  
  
  openpollControllers.controller('PollVotazione', ['$scope', 'Page', '$http', '$timeout', 'PollDetail', 
  function($scope, Page, $http, $timeout, PollDetail) {


    
	//submitVote
     $scope.submitVote = function(form) {
	 //$scope.idRisposta = e' l'id della risposta che ha selezionato
	 //PollDetail.vota({pollId:$scope.poll.id, responseId:$scope.idRisposta});
		 var jsonVotePoll = {
			"idPoll": $scope.poll.id,
			"idResponse": $scope.idRisposta,
			"secretToken" : $scope.secretToken
		};
		
	
		$http({
            method : 'POST',
            url : 'http://www.openpoll.it/ws/poll/vote',
            data : "jsonVotePoll="+JSON.stringify(jsonVotePoll),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status, headers) { 
					
				if (data == '1'){
					$scope.$parent.successmsgshow = true;
					$scope.$parent.successmsg = "Grazie per aver votato.";
				} else if (data == '-1'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Codice segreto non valido! Richiedi un altro codice per accedere alla votazione.";
				} else if (data == '-2'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Codice inutilizzabile.";
				} else if (data == '-3'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Si e' verificato un errore nella votazione, contattare l'amministratore del sito.";
				} else if (data == '-4'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Il sondaggio non e' piu' attivo, non e' possibile votare.";
				}else if (data == '-5'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Sondaggio non valorizzato.";
				}else if (data == '-6'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Risposta non valorizzata.";
				}else if (data == '-7'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Codice segreto non valorizzato.";
				}else if (data == '-8'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Il sondaggio e' chiuso.";
				}else {
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Errore generico.";
					
				}				
				
		}).error(function(data, status, headers) {
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Errore generico.";
		});
		return false;	 

	 }
	 //fine submitVote
	 
	 //getToken
     $scope.getToken = function(form) {
		 var jsonGetToken = {
			"idPoll": $scope.poll.id,
			"email": $scope.email 
		};
		
	
		$http({
            method : 'POST',
            url : 'http://www.openpoll.it/ws/poll/token',
            data : "jsonGetToken="+JSON.stringify(jsonGetToken),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status, headers) { 
			if (data == '1'){
				$scope.$parent.msgtokenshow = true;
				$scope.$parent.msgtoken = "Il codice per votare e' stato spedito alla email indicata.";
			} else if (data == '2'){
				$scope.$parent.msgtokenshow = true;
				$scope.$parent.msgtoken = "Il codice per votare e' stato spedito alla email indicata.";
			}else if (data == '-1'){
				$scope.$parent.msgtokenshow = true;
				$scope.$parent.msgtoken = "Si e' verificato un errore nella generazione del codice.";
			}else if (data == '-3'){
				$scope.$parent.msgtokenshow = true;
				$scope.$parent.msgtoken = "Il sondaggio e' chiuso. Non e' possibile procedere alla votazione.";
			}else if (data == '-4'){
				$scope.$parent.msgtokenshow = true;
				$scope.$parent.msgtoken = "Non e' possibile procedere alla votazione.";
			}else if (data == '-2'){
				$scope.$parent.msgtokenshow = true;
				$scope.$parent.msgtoken = "L'utente associato a questa email ha gia' votato il sondaggio.";
			}
			
		}).error(function(data, status, headers) {
			$scope.$parent.msgtokenshow = true;
			$scope.$parent.msgtoken = "Errore generico.";		
		});
		return false;	 

	 }
	//fine getToken	 

  }]);    
  
  openpollControllers.controller('PollPrevoteCtrl', ['$scope', 'PollDetail', '$routeParams',
  function($scope, PollDetail, $routeParams) {

	 $scope.poll = PollDetail.querydetail({pollId:$routeParams.pollId});
	 $scope.successmsgshow = false;
	 $scope.successmsg = "";
	 $scope.alertmsgshow = false;
	 $scope.alertmsg = "";
	 $scope.msgtokenshow = false;
	 $scope.msgtoken = "";
	 
	 //popolo il codice segreto se provengo dall'email
	 $scope.secretToken = $routeParams.secretCode;
	 
	 $scope.poll.$promise.then(function(data) {
       Page.setTitle("OpenPoll | " + $scope.poll.title);
   });	 

  }]);  
  
  
  openpollControllers.controller('PollConfirmCtrl', ['$scope', 'Page', '$http', 'PollDetailToConfirm', '$routeParams',
  function($scope, Page, $http, PollDetailToConfirm, $routeParams) {

   Page.setDefaultTitle();
   
	 $scope.poll = PollDetailToConfirm.querydetailtoconfirm({pollId:$routeParams.pollId});
	 //popolo il codice segreto se provengo dall'email
	 $scope.secretToken = $routeParams.secretCode;	 
	 
	//submitVote
     $scope.confirmPoll = function(form) {
	

		 var jsonConfirmPoll = {
			"idPoll": $scope.poll.id,
			"secretCode": $scope.secretToken
		};
		
		
		$http({
            method : 'POST',
			data : "jsonConfirmPoll="+JSON.stringify(jsonConfirmPoll),
            url : 'http://www.openpoll.it/ws/poll/confirm',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status, headers) { 
					
				if (data == '1'){
					$scope.$parent.successmsgshow = true;
					$scope.$parent.successmsg = "Complimenti il sondaggio e' stato confermato, ora attendi l'approvazione!";
				} else if (data == '-1'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Si e' verificato un errore nella conferma, contattare l'amministratore.";
				} else if (data == '-2'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Si e' verificato un errore nella conferma, contattare l'amministratore.";
				} else if (data == '-3'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Si e' verificato un errore nella conferma, contattare l'amministratore.";
				}else {
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Errore generico.";
					
				}				
				
		}).error(function(data, status, headers) {
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Errore generico.";
		});
		return false;	 

	 }
	 //fine confirmPoll	 

  }]);   

 


openpollControllers.controller('PollCreateCtrl', ['$scope', 'Page', '$http', 'CategoryService', '$routeParams',
  function($scope, Page, $http, CategoryService, $routeParams) {

 Page.setDefaultTitle();
 
 
	 $scope.successmsgshow = false;
	 $scope.successmsg = "";
	 $scope.alertmsgshow = false;
	 $scope.alertmsg = "";
	 $scope.msgtokenshow = false;
	 $scope.msgtoken = "";
	 $scope.msgValidaAl="";
	 $scope.showFormCreate = true; 
	 

	$scope.choices = [{id: '1'}, {id: '2'}];
	 
	$scope.categories = CategoryService.categorylist();
	
	//$scope.form = {pollCategoryID : $scope.categories[0].id};
	
	$scope.showChoiceLabel = function (choice) {
		return choice.id === $scope.choices[0].id;
	};
	

	$scope.addNewChoice = function() {
	   if ($scope.choices.length < 10)
	   {
		 var newItemNo = $scope.choices.length+1;
		 $scope.choices.push({'id':newItemNo});
	   }
	};
	
	$scope.removeLastChoice = function() {
	      if ($scope.choices.length > 2)
		  {
			var newItemNo = $scope.choices.length;
			$scope.choices.pop();
			//console.log('rimuovo'+newItemNo);
			//$scope.choices.splice({'id':newItemNo},1);
		}
	};	
	
	$scope.showAddChoice = function(choice) {
		return choice.id === $scope.choices[$scope.choices.length-1].id;
	};

	
	
	
     $scope.createPoll = function(form) {
		
	 
	 $scope.opzioni = [];
	  for(var i=0;i<$scope.choices.length;i++){
		$scope.opzioni.push($scope.choices[i].name);
	  }

		 var jsonAddPoll = {
					"owner": $scope.ownerEmail,
					"ownerDescription": $scope.ownerDescription,
					"ownerNickname": $scope.ownerNickname,
					"title": $scope.pollTitle,
					"idCategory":  $scope.pollCategoryID,
					"description": $scope.pollDescription,
					"expirationDate": $scope.pollValidoAl,
					"response" : $scope.opzioni
		};
		
		
		
		$http({
            method : 'POST',
			data : "jsonAddPoll="+JSON.stringify(jsonAddPoll),
            url : 'http://www.openpoll.it/ws/poll/add',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status, headers) { 
					
				if (data == '1'){
					$scope.showFormCreate = false; 
					$scope.$parent.successmsgshow = true;
					$scope.$parent.successmsg = "Complimenti il sondaggio e' stato creato, attendi l'email per confermare la creazione!";
					
				} else if (data == '-1'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Si e' verificato un errore nella conferma, contattare l'amministratore.";
				} else if (data == '-2'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Si e' verificato un errore nella conferma, contattare l'amministratore.";
				} else if (data == '-3'){
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Si e' verificato un errore nella conferma, contattare l'amministratore.";
				}else {
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Errore generico.";
					
				}				
				
		}).error(function(data, status, headers) {
					$scope.$parent.alertmsgshow = true;
					$scope.$parent.alertmsg = "Errore generico.";
		});
		return false;	 

	 }



  }]);      


  



