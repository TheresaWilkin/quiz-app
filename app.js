//state object
var state = {
	questions: [
{question: "What is 2 + 2?",
answers: ["2", "5", "4", "8"],
rightAnswer: 2,
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

//dom interactions
	//render question function

	var renderQuestion = function () {
  
  var questionRender = (getQuestion());
  var theQuestion = (questionRender.question);
  var theAnswer = (questionRender.rightAnswer);
   return '<form>'+
			'<p>' +theQuestion+'</p>'+
			'<input type="radio" name="answer1">'+questionRender.answers[0] + '<br>' +
			'<input type="radio" name="answer2">'+ questionRender.answers[1]+ '<br>' +
			'<input type="radio" name="answer3">'+questionRender.answers[2] +'<br>' +
			'<input type="radio" name="answer4">'+questionRender.answers[3]+ '<br>'+
			'<button class="js-next">'+'Next'+'</button>'+
			'<button class="js-restart">'+'Restart'+'</button>'+
		'</form>';

};
		//pull question data from state
		//create html for question
		//put on page
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
		$(".js-question").removeClass("hidden");
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
	$(".js-next").on("click", nextQuestion());

	//when finish dialogue
		//says how many correct out of total number
		//offers to try again
		//can click button to restart quiz



	//when restart button clicked,
		//refreshes number variables to 0
		//loads first question again
	$(".js-restart").on("click", restartQuiz());		
})

