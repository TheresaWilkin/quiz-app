//state object
var state = (function() return {
	questions: [
{question: "What is 2 + 2?",
wrongAnswers: [2, 5, 8],
rightAnswer: 4,
},],
correctAnswers: 0,
totalAnswers: 0,
currentQuestion: 0,
}())

//state modifiers
	//add to correctAnswers
	//add to totalAnswers
	//get question
	//add to currentQuestion


//dom interactor
	//render question function
		//pull question data from state
		//create html for question
		//put on page
	//remove question from DOM function
	//edit header bar for correctAnswers & totalAnswers var
	//tell user they are on question #?? (currentQuestion + 1)


//event listeners

	//when click on start button,
		//hide "start" dialogue
		//and render first question

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

	//when finish dialogue
		//says how many correct out of total number
		//offers to try again
		//can click button to restart quiz

	//when restart button clicked,
		//refreshes number variables to 0
		//loads first question again