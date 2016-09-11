angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('UsuarioTrivia', [function(){
	var userName = '';
	var triviaResults = [];
	var score = 0;

	return{
		login:function(user){
			userName = user;
		},
		startGame:function(length){
			triviaResults = [length];
			score = 0;
		},
		setResult:function(answer,idx,correct){
			triviaResults[idx] = answer;
			if(correct == true){
				score += 100;
			}
		},
		getName:function(){
			return userName;
		},
		getScore:function(){
			return score;
		},
		getTriviaResults:function(){
			return triviaResults;
		}
	};
}])

.service('BlankService', [function(){

}]);