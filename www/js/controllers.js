angular.module('app.controllers', [])
  
.controller('authorCtrl', ['$scope', '$stateParams','$cordovaInAppBrowser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$cordovaInAppBrowser) {

	var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

	$scope.OpenGitHub=function(){
		$cordovaInAppBrowser.open('https://github.com/marcosmurcia92/', '_self', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });
	};

	$scope.OpenMail=function(){
		
	};
}])
   
.controller('gameCtrl', ['$scope', '$state', '$stateParams','$ionicHistory', '$timeout','$cordovaVibration','$cordovaNativeAudio' ,'UsuarioTrivia', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams,$ionicHistory, $timeout,$cordovaVibration,$cordovaNativeAudio,UsuarioTrivia) {
$scope.PreguntasTrivia = [];
	
	$scope.init= function(){
   		 $ionicHistory.clearHistory();
		console.info("NOMBRE DE USUARIO", UsuarioTrivia.getName());
			var VariableFireBase = new Firebase('https://tp-trivia-pps.firebaseio.com/TriviaData/');
		  VariableFireBase.on('child_added', function (snapshot) {
		    $timeout(function(){
		      var preg = snapshot.val();
		      $scope.PreguntasTrivia.push(preg);
		      console.log(preg.id);
		  console.log($scope.PreguntasTrivia.length);
		    });
		  });
	};

  $scope.Jugar = function(){
  $cordovaVibration.vibrate(500);
  $cordovaNativeAudio.play('menu');
  	UsuarioTrivia.startGame($scope.PreguntasTrivia.length);
  	$state.go('mainTabs.trivia',{pregId: $scope.PreguntasTrivia[0].id});
  };

  $scope.Jugar = function(){
  $cordovaVibration.vibrate(500);
  $cordovaNativeAudio.play('menu');
  	$state.go('login');
  };

}])
   
.controller('leaderBoardsCtrl', ['$scope', '$stateParams', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$timeout) {
	$scope.ListaUsuarios = [];
	var VariableFireBase = new Firebase('https://tp-trivia-pps.firebaseio.com/Usuarios/');
  VariableFireBase.on('child_added', function (snapshot) {
    $timeout(function(){
      var user = snapshot.val();
      $scope.ListaUsuarios.push(user);
      
      //console.log($scope.ListaUsuarios);
    });
  });

}])
      
.controller('loginCtrl', ['$scope', '$state', '$stateParams','$ionicHistory','$cordovaVibration','$cordovaNativeAudio','UsuarioTrivia', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams,$ionicHistory,$cordovaVibration,$cordovaNativeAudio,UsuarioTrivia) {

  $scope.Login = function(name){
      $cordovaVibration.vibrate(500);
      $cordovaNativeAudio.play('menu');
  	console.log(name);
        $ionicHistory.clearHistory();
  	UsuarioTrivia.login(name);
  	$state.go('mainTabs.game');
  };
}])
   
.controller('triviaCtrl', ['$scope','$state', '$stateParams','$ionicHistory','$cordovaVibration','$cordovaNativeAudio', '$timeout','UsuarioTrivia',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams,$ionicHistory,$cordovaVibration,$cordovaNativeAudio, $timeout,UsuarioTrivia) {
	$scope.PreguntasTrivia = [];
	$scope.IdxActual;
	$scope.TotalPregs;
	$scope.TextoPregunta;
	$scope.OpcionA;
	$scope.OpcionB;
	$scope.OpcionC;
	$scope.OpcAStyle = 'button-royal';
	$scope.OpcBStyle = 'button-royal';
	$scope.OpcCStyle = 'button-royal';
	$scope.OpcCorrecta;
	$scope.CanInteract = true;

	$scope.init= function(){
        $ionicHistory.clearHistory();
		var VariableFireBase = new Firebase('https://tp-trivia-pps.firebaseio.com/TriviaData/');
	  VariableFireBase.on('child_added', function (snapshot) {
	    $timeout(function(){
	      var preg = snapshot.val();
	      $scope.PreguntasTrivia.push(preg);
	      $scope.TotalPregs = $scope.PreguntasTrivia.length;
	      console.log(preg.id);
	      if(preg.id == $stateParams.pregId){
	      	$scope.IdxActual = $scope.PreguntasTrivia.length;
	      	$scope.TextoPregunta = preg.pregunta;
	      	$scope.OpcionA = preg.opcA;
	      	$scope.OpcionB = preg.opcB;
	      	$scope.OpcionC = preg.opcC;
	      	$scope.OpcCorrecta = preg.correcta;
	      	if(UsuarioTrivia.getTriviaResults.length < $scope.IdxActual){
				$scope.CanInteract = true;
				$scope.OpcAStyle = 'button-royal';
				$scope.OpcBStyle = 'button-royal';
				$scope.OpcCStyle = 'button-royal';
			}
	      }
	    });
	  });
	};

  	$scope.Answer = function($answer){
  		if($scope.CanInteract){
  			$scope.CanInteract = false;
	  		if ($answer == $scope.OpcCorrecta) {
		      $cordovaVibration.vibrate(800);
		      $cordovaNativeAudio.play('ok');
	  			UsuarioTrivia.setResult($answer,$scope.IdxActual,true,$scope.PreguntasTrivia[$scope.IdxActual-1]);
	  			if($answer == 'A'){
	  				$scope.OpcAStyle = 'button-balanced';
	  			}else if($answer == 'B'){
	  				$scope.OpcBStyle = 'button-balanced';
	  			}else if($answer == 'C'){
	  				$scope.OpcCStyle = 'button-balanced';
	  			}
	  		}else{
		      $cordovaVibration.vibrate(800);
		      $cordovaNativeAudio.play('wrong');
	  			UsuarioTrivia.setResult($answer,$scope.IdxActual,false,$scope.PreguntasTrivia[$scope.IdxActual-1]);
	  			if($answer == 'A'){
	  				$scope.OpcAStyle = 'button-assertive';
	  			}else if($answer == 'B'){
	  				$scope.OpcBStyle = 'button-assertive';
	  			}else if($answer == 'C'){
	  				$scope.OpcCStyle = 'button-assertive';
	  			}


	  			if($scope.OpcCorrecta == 'A'){
	  				$scope.OpcAStyle = 'button-balanced';
	  			}else if($scope.OpcCorrecta == 'B'){
	  				$scope.OpcBStyle = 'button-balanced';
	  			}else if($scope.OpcCorrecta == 'C'){
	  				$scope.OpcCStyle = 'button-balanced';
	  			}
	  		}

	  		
	  		$timeout(function(){
	  			if(($scope.IdxActual + 1) > $scope.TotalPregs){
	  				$state.go('results');
	  			}else{
					// $scope.OpcAStyle = 'button-royal';
					// $scope.OpcBStyle = 'button-royal';
					// $scope.OpcCStyle = 'button-royal';
	  				$state.go('mainTabs.trivia',{pregId: $scope.PreguntasTrivia[$scope.IdxActual].id});
	  			}
	  		},1000);
  		}else{
  			$state.go('mainTabs.trivia',{pregId: $scope.PreguntasTrivia[$scope.IdxActual].id});
  		}		
  	};

}])
   
.controller('resultsCtrl', ['$scope', '$stateParams','$ionicHistory','$cordovaVibration','$cordovaNativeAudio', 'UsuarioTrivia',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicHistory,$cordovaVibration,$cordovaNativeAudio, UsuarioTrivia) {

    $ionicHistory.clearHistory();
	var VariableFireBase = new Firebase('https://tp-trivia-pps.firebaseio.com/Usuarios/');
    var name = UsuarioTrivia.getName();
    var results = UsuarioTrivia.getTriviaResults();
    var score = UsuarioTrivia.getScore();
    $scope.puntajeTotal = score;
    console.log(name);
	  $cordovaNativeAudio.play('end');
    VariableFireBase.push({usuario:name, puntaje:score, resultados:results},function(error){
    	if(error){
    		console.info("ERROR:",error);
    	}else{
    		console.log("EXITOSO");
    	}
    });

    $scope.VolverAlMenu=function(){
      $cordovaVibration.vibrate(500);
      $cordovaNativeAudio.play('menu');
      $state.go('mainTabs.trivia');
    };
}])
 