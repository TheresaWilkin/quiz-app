//state object
var state = { [
{question: "What is 2 + 2?", answers: ["2", "1", "4", "8"], rightAnswer: 2 },
  
{question: "What is 2 + 3?", answers: ["3", "5", "6", "1"], rightAnswer: 1 }, 

{question: "What is 1 + 2?", answers: ["1", "8", "0", "3"], rightAnswer: 3 }, 

{question: "What is 1 + 0?", answers: ["6", "7", "2", "1"], rightAnswer: 3 }, 

{question: "What is 1 + 1?", answers: ["3", "2", "6", "0"], rightAnswer: 1 } ],
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

	//check if answer is correct
	function getAnswer() {
		return $(".js-question-form input:checked").val();
	}

	function checkAnswer() {
		var question = getQuestion();
		var answerChosen = parseInt(getAnswer());
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

	function testFinal() {
		return getCurrent() === state.questions.length;
	}

	function submitQuiz() {
		$(".js-question").addClass("hidden");
		$(".js-final").removeClass("hidden");
		var text = "You have finished the quiz. You answered " +
		getCorrect() + " out of " + getCurrent() + " questions correctly. " +
		"Would you like to try again?";
		$("#final-text").text(text);
	}

	function restartQuiz() {

	}

//dom interactions
	//render question function
var renderQuestion = function () {
  
  var questionRender = (getQuestion());
  var theQuestion = (questionRender.question);
  var theAnswer = (questionRender.rightAnswer);
  var questionHtml=
		'<p>' +theQuestion+'</p>'+
		'<input type="radio" name="answer" value="0" required>'+questionRender.answers[0] + '<br>' +
		'<input type="radio" name="answer" value="1">'+ questionRender.answers[1]+ '<br>' +
		'<input type="radio" name="answer" value="2">'+questionRender.answers[2] +'<br>' +
		'<input type="radio" name="answer" value="3">'+questionRender.answers[3]+ '<br>'+
		'<button class="next">' + 'Submit' +'</button>'
		
	$(".js-question-form").html(questionHtml);
};

	//remove question from DOM function

	//edit header bar for correctAnswers & totalAnswers var
	function updateHeader() {
		$("#js-correct-answers").text(getCorrect());
		$("#js-total-answers").text(getCurrent());
	}

	//tell user they are on question #?? (currentQuestion + 1)
	function updateQuestionNumber() {
		var questionNumber = getCurrent();
		questionNumber++;
		$("#js-question-number").text(questionNumber);
	}

//event listeners

$(function() {
	
	//when click on start button,
		//hide "start" dialogue
		//and render first question
	$(".js-start").on("click", function() {
		$(".js-welcome").addClass("hidden");
		$(".js-answer-count").removeClass("hidden");
		$(".js-question").removeClass("hidden");
		$(".header").children().addClass("top")
		updateHeader();
		updateQuestionNumber();
		renderQuestion();
	});

	$(".tryAgain").on("click", function() {
  	state.correct=0;
  	state.current=0;
  	console.log(state.current);
  	$(".js-question").removeClass("hidden");
		$(".js-final").addClass("hidden");
		updateHeader();
		updateQuestionNumber();
		renderQuestion();
  });

$(".restart").on("click", function (event) {
event.preventDefault();
state.correct=0;
 state.current=0;
updateHeader();
		updateQuestionNumber();
		renderQuestion();
});


	//when "next" button clicked,
		//check if there IS an answer, possible error dialogue
		//check answer (????????? how to mark correct answer when rendering? 
				//how to remember user answer????)
		//tell user correct answer
		//and tell if answered correctly
		//update "questions answered" var
		//update "questions correct" var
		//remove current question from page
		//update CurrentQuestion var
		//render next question OR if last question,
		//needs to render finish dialogue
	$(".js-question-form").on("submit", function(e) {
		e.preventDefault();
		nextQuestion();
	});

	//when finish dialogue
		//says how many correct out of total number
		//offers to try again
		//can click button to restart quiz



	//when restart button clicked,
		//refreshes number variables to 0
		//loads first question again
	$(".js-restart").on("click", restartQuiz());		
})

