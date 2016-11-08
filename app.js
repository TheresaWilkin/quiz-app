//state object
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
};



//state modifiers
function addCorrect() {
	state.correct++;
}
function addCurrent() {
	state.current++;
}



//state accessors
function getCorrect() {
	return state.correct;
}

function getCurrent() {
	return state.current;
}

function getQuestion() {
	var index = getCurrent();
	return state.questions[index];
}

function testFinal() {
	return getCurrent() === state.questions.length;
}

function getAnswer() {
	return parseInt($(".js-question-form input:checked").val());
}

function resetVar() {
	state.correct=0;
	state.current=0;
}



//dom interactions

var renderQuestion = function () { 
	var questionRender = (getQuestion());
	var theQuestion = questionRender.question;
	var theAnswer = questionRender.rightAnswer;
	var questionHtml=
	'<p>' +theQuestion+'</p>'+
	'<input type="radio" name="answer" value="0" required>'+questionRender.answers[0] + '<br>' +
	'<input type="radio" name="answer" value="1">'+ questionRender.answers[1]+ '<br>' +
	'<input type="radio" name="answer" value="2">'+questionRender.answers[2] +'<br>' +
	'<input type="radio" name="answer" value="3">'+questionRender.answers[3]+ '<br>'+
	'<button class="next">' + 'Submit' +'</button>'		
	$(".js-question-form").html(questionHtml);
};

function updateHeader() {
	$("#js-correct-answers").text(getCorrect());
	$("#js-total-answers").text(getCurrent());
}

function updateQuestionNumber() {
	var questionNumber = getCurrent();
	questionNumber++;
	$("#js-question-number").text(questionNumber);
}

function setupQuestion() {
	updateHeader();
	updateQuestionNumber();
	renderQuestion();
}

function submitQuiz() {
	$(".js-question").addClass("hidden");
	$(".js-final").removeClass("hidden");
	var text = "You have finished the quiz. You answered " +
	getCorrect() + " out of " + state.questions.length + " questions correctly. " +
	"Would you like to try again?";
	$("#final-text").text(text);
}



//controllers

function checkAnswer() {
	var question = getQuestion();
	var answerChosen = getAnswer();
	if (question.rightAnswer === answerChosen) {
		alert("Good job!");
		addCorrect();
	} else {
		var correct = question.answers[question.rightAnswer]
		alert("Incorrect. The correct answer was " + correct);
	};
}

function nextQuestion() {
	checkAnswer();
	addCurrent();
	updateHeader();
	updateQuestionNumber();
	if (testFinal()) {
		submitQuiz();
	} else {
		renderQuestion();
	};
}

var startTimer =function(){
 window.setTimeout(submitQuiz, 60000);
}

//event listeners

$(function() {
	
	$(".js-start").on("click", function() {
		$(".js-welcome").addClass("hidden");
		$(".js-answer-count").removeClass("hidden");
		$(".js-question").removeClass("hidden");
		$(".header").children().addClass("top")
		setupQuestion();
		startTimer();
	});

	$(".tryAgain").on("click", function() {
		resetVar();
		$(".js-question").removeClass("hidden");
		$(".js-final").addClass("hidden");
		setupQuestion();
	});

	$(".restart").on("click", function (event) {
		event.preventDefault();
		resetVar();
		setupQuestion();
	});

	$(".js-question-form").on("submit", function(e) {
		e.preventDefault();
		nextQuestion();
	});

})

