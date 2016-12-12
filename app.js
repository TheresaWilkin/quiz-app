//state object

"use strict";
const state = {
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








//state accessors



const getCurrentQuestion = (state) =>  state.questions[state.current];

const isQuizComplete = (state) => state.current === state.questions.length;


const getAnswer = (state) => parseInt($(".js-question-form input:checked").val());


const resetVar = (state) => {
	state.correct=0;
	state.current=0;
	state.route = 'start';
}



//dom interactions

const renderApp = (state) =>  {
	switch (state.route){
		case 'start':
			return renderStart(state);
		case 'finish':
			return submitQuiz(state);
		case 'next':
			return renderQuestion(state);
	}
}

const renderStart =  (state) => {
	$(".js-welcome").addClass("hidden");
		$(".js-answer-count").removeClass("hidden");
		$(".js-question").removeClass("hidden");
		$(".header").children().addClass("top");
		updateHeader(state);
		updateQuestionNumber(state);
		renderQuestion(state);
		$(".js-final").addClass("hidden");
		const startTimer = setInterval(timerState(), 99999);
};

 

const renderQuestion = (state) => { //get rid of this and call next question
	let questionRender = state.questions;
	let theQuestion = questionRender[state.current].question;
	let possibleAnswers = state.questions[state.current].answers;
	let questionHtml=`<p>  ${theQuestion}  </p>
		<input type="radio" name="answer" value="0" required> 
		 ${possibleAnswers[0]} <br>  <input type="radio" name="answer" value="1"> 
		 ${possibleAnswers[1]} <br>  <input type="radio" name="answer" value="2"> 
		 ${possibleAnswers[2]} <br>  <input type="radio" name="answer" value="3"> 
		 ${possibleAnswers[3]} <br>  
		 <button class="next">  Submit  </button>`;

	$(".js-question-form").html(questionHtml);
};


const updateQuestionNumber = (state) => $("#js-question-number").text(state.current+1);




const submitQuiz = (state) => {
	$(".js-question").addClass("hidden");
	$(".js-final").removeClass("hidden");
	let text = `You have finished the quiz. You answered 
		${state.correct}  out of  ${ state.questions.length } questions correctly. 
		Would you like to try again?`;

	$("#final-text").text(text);
	clearTimeout(state.timer);

}



//controllers




const startTimer =(state) => {
 if(state.timer){
 	clearTimeout(state.timer);
 } 
 state.timer= setTimeout(submitQuiz, 60000);
};

//event listeners

$(() => {
	
	$(".js-start").on("click", () => {
		state.route = 'start';
		state.current = 0;
		renderApp(state);

		
	});

	$(".tryAgain").on("click", () => {
		resetVar(state);
		renderApp(state);
	
	});

	$(".restart").on("click", (event) => {
		event.preventDefault();
		resetVar(state);
		renderApp(state);
		
	});

	$(".js-question-form").on("submit", (e) => {
		e.preventDefault();
		checkAnswer(state);
		state.current++;
		updateHeader(state);

		updateQuestionNumber(state);

		state.route = isQuizComplete(state) ? 'finish' : 'next'; //if current is the same as the number of questions it's finished otherwise the state is next
		renderApp(state);
		
	});
	
});



const checkAnswer = (state) => {
	let question = state.questions[state.current];
	let answerChosen = getAnswer(state);
	if (question.rightAnswer === answerChosen) {
		alert("Good job!");
		state.correct++;
	} else {
		let correct = question.answers[question.rightAnswer];
		alert("Incorrect. The correct answer was " + correct);
	}
}



const updateHeader = (state) => {
	$("#js-correct-answers").text(state.correct);
	$("#js-total-answers").text(state.current);
}

