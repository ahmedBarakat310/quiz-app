const questions=[
    {
        question:"what is my first name",
        answers:[
            {text:"ahmed",correct:true},
            {text:"barakat",correct:false},
            {text:"hassan",correct:false},
            {text:"elzayat",correct:false}
        ]
    },
    {
        question:"what is my second name",
        answers:[
            {text:"ahmed",correct:false},
            {text:"barakat",correct:true},
            {text:"hassan",correct:false},
            {text:"elzayat",correct:false}
        ]
    },
    {
        question:"what is my third name",
        answers:[
            {text:"ahmed",correct:false},
            {text:"barakat",correct:false},
            {text:"hassan",correct:true},
            {text:"elzayat",correct:false}
        ]
    },
    {
        question:"what is my fourth name",
        answers:[
            {text:"ahmed",correct:false},
            {text:"barakat",correct:false},
            {text:"hassan",correct:false},
            {text:"elzayat",correct:true}
        ]
    }
]
const questionElement=document.getElementById('question');
const answerButtons=document.getElementById('answer-buttons');
const nextButton=document.getElementById('next-btn')
let currentQuestionInder=0;
let score=0;
function startQuiz(){
    currentQuestionInder=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionInder];
    let questinNo=currentQuestionInder + 1;
    questionElement.innerHTML=questinNo+ "." +currentQuestion.question;
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer)
    })
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        }
        button.disabled=true;
    });
    nextButton.style.display="block"

}
function showScore(){
    resetState();
    questionElement.innerHTML=`Your Score ${score} Out of ${questions.length}`
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block"
}
function handelNextButton(){
    currentQuestionInder++;
    if(currentQuestionInder <questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener('click',()=>{
if(currentQuestionInder < questions.length){
    handelNextButton();
}else{
    startQuiz();
}
});
startQuiz();