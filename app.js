//state object

"use strict";
var state = {
	questions: [
	{question: "What is 2 + 2?",
	answers: ["2", "1", "4", "8"],
	rightAnswer: 2,
	},
	{question: "What is 2 + 3?",
	answers: ["3", "5", "6", "1"],
	rightAnswer: 1,
	},
	{question: "What is 1 + 2?",
	answers: ["1", "8", "0", "3"],
	rightAnswer: 3,
	},
	{question: "What is 1 + 0?",
	answers: ["6", "7", "2", "1"],
	rightAnswer: 3,
	},
	{question: "What is 1 + 1?",
	answers: ["3", "2", "6", "0"],
	rightAnswer: 1,
	}],
	correct: 0,
	current: 0,
	route: 'start',
	timerstate: "Blank"

};

var timerState = function(start,reset)  { 
  if (start === true) {
    state .timerState = 'Started';
		 console.log('timer started') ;
  }	 
  if (reset === true) {
    clearInterval(startTimer) ;
    console.log('timerreset') ;
  }
};






//state accessors



function getCurrentQuestion (state) {
	return state.questions[state.current];}

function isQuizComplete(state) {//query function
	return state.current === state.questions.length;
}

function getAnswer(state) {
	return parseInt($(".js-question-form input:checked").val());
}

function resetVar(state) {
	state.correct=0;
	state.current=0;
	state.route = 'start';
}



//dom interactions

function renderApp (state)  {
	switch (state.route){
		case 'start':
			return renderStart(state);
		case 'finish':
			return submitQuiz(state);
		case 'next':
			return renderQuestion(state);
	}
}

var renderStart = function (state) {
	$(".js-welcome").addClass("hidden");
		$(".js-answer-count").removeClass("hidden");
		$(".js-question").removeClass("hidden");
		$(".header").children().addClass("top");
		updateHeader(state);
		updateQuestionNumber(state);
		renderQuestion(state);
		$(".js-final").addClass("hidden");
		var startTimer = setInterval(timerState(), 99999);
};

 

var renderQuestion = function (state) { //get rid of this and call next question
	var questionRender = state.questions;
	var theQuestion = questionRender[state.current].question;
	var possibleAnswers = state.questions[state.current].answers;
	var questionHtml='<p>' + theQuestion + '</p>' + '<input type="radio" name="answer" value="0" required>'+
     possibleAnswers[0] + '<br>' + '<input type="radio" name="answer" value="1">' +
		 possibleAnswers[1] + '<br>' + '<input type="radio" name="answer" value="2">' +
		 possibleAnswers[2] +'<br>'  + '<input type="radio" name="answer" value="3">' +
		 possibleAnswers[3] + '<br>' + '<button class="next">' + 'Submit' + '</button>';
	$(".js-question-form").html(questionHtml);
};


function updateQuestionNumber(state) {
	
	$("#js-question-number").text(state.current+1);
}



function submitQuiz(state) {
	$(".js-question").addClass("hidden");
	$(".js-final").removeClass("hidden");
	var text = "You have finished the quiz. You answered " +
	state.correct + " out of " + state.questions.length + " questions correctly. " +
	"Would you like to try again?";
	$("#final-text").text(text);
	clearTimeout(state.timer);

}



//controllers




var startTimer =function(state){
 if(state.timer){
 	clearTimeout(state.timer);
 } 
 state.timer= setTimeout(submitQuiz, 60000);
};

//event listeners

$(function() {
	
	$(".js-start").on("click", function() {
		state.route = 'start';
		state.current = 0;
		renderApp(state);

		
	});

	$(".tryAgain").on("click", function() {
		resetVar(state);
		renderApp(state);
	
	});

	$(".restart").on("click", function (event) {
		event.preventDefault();
		resetVar(state);
		renderApp(state);
		
	});

	$(".js-question-form").on("submit", function(e) {
		e.preventDefault();
		checkAnswer(state);
		state.current++;
		updateHeader(state);

		updateQuestionNumber(state);

		state.route = isQuizComplete(state) ? 'finish' : 'next'; //if current is the same as the number of questions it's finished otherwise the state is next
		renderApp(state);
		
	});
	
});



function checkAnswer(state) {
	var question = state.questions[state.current];
	var answerChosen = getAnswer(state);
	if (question.rightAnswer === answerChosen) {
		alert("Good job!");
		state.correct++;
	} else {
		var correct = question.answers[question.rightAnswer];
		alert("Incorrect. The correct answer was " + correct);
	}
}



function updateHeader(state) {
	$("#js-correct-answers").text(state.correct);
	$("#js-total-answers").text(state.current);
}

