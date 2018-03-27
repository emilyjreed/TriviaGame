var mainContent = $("#mainContent");

var startScreen = `
<div class="row  justify-content-center">
    <button type="button" class="btn btn-dark btn-lg" id="startGame">Start Game</button>
</div>
`

var questionScreen = `
<div class="row justify-content-center">
    <h3 id="timeRemaining">Time Remaining: 5</h3>
</div>
<div class="row justify-content-center">
    <h3 id="questions">Question:</h3>
</div>
<div class="row justify-content-center">
    <div class="col-xlg-6">
        <button type="button" class="btn btn-dark btn-lg answerButtons" id="answer1">Answer One</button>
    </div>
    <div class="col-xlg-6">
        <button type="button" class="btn btn-dark btn-lg answerButtons" id="answer2">Answer Two</button>
    </div>
</div>
<div class="row justify-content-center">
    <div class="col-xlg-6">
        <button type="button" class="btn btn-dark btn-lg answerButtons" id="answer3">Answer Three</button>
    </div>    
    <div class="col-xlg-6">
        <button type="button" class="btn btn-dark btn-lg answerButtons" id="answer4">Answer Four</button>
    </div>
</div>
`

var correctScreen = `
<div class="row justify-content-center">
    <h1 id="correctAnswer">Correct!</h1>
</div>
<div class="row justify-content-center">
    <img id="correctAnswerImage"></img>
</div>
`

var incorrectScreen = `
<div class="row justify-content-center">
    <h1 id="incorrectAnswer">Incorrect!</h1>
</div>
<div class="row justify-content-center">
    <h3 id="insertCorrectAnswer">The Correct Answer Is: </h3>
</div>
<div class="row justify-content-center">
    <img id="correctAnswerImage"></img>
</div>
`

var timesUpScreen = `
<div class="row justify-content-center">
    <h1 id="timesUp">Out of Time!</h1>
</div>
<div class="row justify-content-center">
    <h3 id="insertCorrectAnswer">The Correct Answer Is: </h3>
</div>
<div class="row justify-content-center">
    <img id="correctAnswerImage"></img>
</div>
`

var gameOverScreen = `
<div class="row justify-content-center">
    <h3 id="rightAnswerNumber">Answers Correct: </h3>
</div>
<div class="row justify-content-center">
    <h3 id="wrongAnswerNumber">Answers Incorrect: </h3>
</div>
<div class="row justify-content-center">
    <h3 id="unansweredNumber">Unanswered: </h3>
</div>
<div class="row  justify-content-center">
    <button type="button" class="btn btn-dark btn-lg" id="startOver">Start Over?</button>
</div>
`

// mainContent.html(gameOverScreen);

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer;
var intervalId;
var currentQuestionObject;
var currentQuestion;
var questionsAnswers;

function gameReset() {
    questionsAnswers = [
        {"Its original name meant \"Bitter Water\" and it was made palatable to Europeans after the Spaniards added Sugar.": {
            "Chocolate": true,
            "Beer": false,
            "Lemonade": false,
            "Coffee": false,
        }},
        {"What flower does vanilla come from?": {
            "Cherry Blossom": false,
            "Rose": false,
            "Chrysanthemum": false,
            "Orchid": true,
        }},
        {"Some people grind the seeds of this tropical fruit and use it like pepper or in salad dressings.": {
            "Pomelo": false,
            "Papaya": true,
            "Mango": false,
            "Dragon Fruit": false,
        }},
        {"Orange-butter sauce doused in Grand Marnier and prepared in a chaffing dish, it's flame on! for this crepe dish.": {
            "Crepes Marie": false,
            "Crepes Louise": false,
            "Crepes Suzette": true,
            "Crepes Francoise": false,
        }},
        {"At 70-is calories, this food packs a lot of protein and nutrients like choline, a memory booster.": {
            "Hard-Boiled Egg": true,
            "Apple": false,
            "Milk": false,
            "Chicken": false,
        }},
        {"In French, this citrus fruit is Un Pamplemousse.": {
            "Tangerine": false,
            "Lemon": false,
            "Clementine": false,
            "Grapefruit": true,
        }},
        {"This pungent spice native to India's Malabar coast is said to be the world's top-selling spice.": {
            "Mustard Seed": false,
            "Pepper": true,
            "Cinnamon": false,
            "Curry": false,
        }},
        {"These so-called \"nuts\" that make a crispy sound are actually marsh vegetables.": {
            "Hazelnut": false,
            "Macadamia Nut": false,
            "Water Chestnut": true,
            "Chestnut": false,
        }},
        {"Names for a comic book character, a Dagwood is a high-calorie one of these.": {
            "Sandwich": true,
            "Cereal": false,
            "Pasta": false,
            "Energy Bar": false,
        }},
        {"The Cajun Holy Trinity of cooking consists of what three vegetables?": {
            "Carrots, Onions, Celery": false,
            "Onions, Celery, Corn": false,
            "Bell Peppers, Corn, Carrots": false,
            "Onions, Bell Peppers, Celery": true,
        }},
        {"This dish, made from crushed durum wheat, is a staple of Western North Africa.": {
            "Pilaf": false,
            "Couscous": true,
            "Farro": false,
            "Quinoa": false,
        }},
        {"Pupusas, handmade this stuffed corn tortillas, are a traditional dish from what country?": {
            "Honduras": false,
            "Ecuador": false,
            "El Salvador": true,
            "Guatemala": false,
        }},
        {"This fruit is the largest edible fruit native to North America.": {
            "Pawpaw": true,
            "Pumpkin": false,
            "Pomelo": false,
            "Pomegranate": false,
        }},
        {"This chemical, found in peppers, is what gives them their heat.": {
            "Canthaxanthin": false,
            "Curcumin": false,
            "Carbohydrate": false,
            "Capsaicin": true,
        }},
        {"This spice comes from the dried stigmas of crocus flowers and is used to flavor and color foods.": {
            "Curry": false,
            "Saffron": true,
            "Tumeric": false,
            "Cayenne Pepper": false,
        }}
    ];
    mainContent.html(startScreen);
    $("#startGame").on("click", function() {
        newQuestion();
    });

    correct = 0;
    incorrect = 0;
    unanswered = 0;
};

function newQuestion() {
    if (questionsAnswers.length > 0) {
        mainContent.html(questionScreen);
        randomQuestionsAnswers();
        timer = 5;
        timerStart();
        $(".answerButtons").on("click", function() {
            stopTimer();
            var answerPicked = $(this).text();
            checkTrueFalse(answerPicked);
        });
    } else {
        stopTimer();
        mainContent.html(gameOverScreen);
        $("#rightAnswerNumber").html("Answers Correct: " + correct);
        $("#wrongAnswerNumber").html("Answers Incorrect: " + incorrect);
        $("#unansweredNumber").html("Unanswered: " + unanswered);
        $("#startOver").on("click", function() {
            gameReset();
        })
    }
};

function timerStart() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
};

function stopTimer() {
    clearInterval(intervalId);
};

function decrement() {
    timer--;
    $("#timeRemaining").html("Time Remaining: " + timer);

    if (timer === 0) {
        unanswered++;
        stopTimer();
        mainContent.html(timesUpScreen);
        $("#insertCorrectAnswer").html("The Correct Answer Is: " + answerTrue());
        var trueAnswer = answerTrue();
        var answerImage = trueAnswer + ".png";
        $("#correctAnswerImage").attr("src", "assets/images/" + answerImage);
        switchQuestionTimer();
    }
};

function switchQuestionTimer() {
    setTimeout(function(){
        mainContent.html(questionScreen);
        newQuestion();
    },3000);
}

function randomQuestionsAnswers() {
    var arrayLength = questionsAnswers.length;
    var x = Math.floor(arrayLength * Math.random());
    currentQuestionObject = questionsAnswers[x];
    currentQuestion = Object.keys(currentQuestionObject)[0];
    $("#questions").text(currentQuestion);

    var answerChoices = Object.keys(currentQuestionObject[currentQuestion]);

    answerChoices.forEach(function(answerChoice, idx) {
        var id = "#answer" + (idx + 1).toString();
        $(id).text(answerChoice);
    });
    questionsAnswers.splice(x, 1);
};

function checkTrueFalse(answer) {
    var trueAnswer = answerTrue();
    var answerImage = trueAnswer + ".png";
    if (currentQuestionObject[currentQuestion][answer] === true) {
        correct++;
        mainContent.html(correctScreen);
        $("#correctAnswerImage").attr("src", "assets/images/" + answerImage);
    } else {
        incorrect++;
        mainContent.html(incorrectScreen);
        $("#insertCorrectAnswer").html("The Correct Answer Is: " + trueAnswer);
        $("#correctAnswerImage").attr("src", "assets/images/" + answerImage);
    }
    switchQuestionTimer();
};

function answerTrue() {
    var questionArray = Object.keys(currentQuestionObject[currentQuestion]);
    var answerArray = Object.values(currentQuestionObject[currentQuestion]);
    var answerIndex = answerArray.indexOf(true);

    return questionArray[answerIndex];
};

document.onload = gameReset();
