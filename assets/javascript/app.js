$(document).ready(function() {
console.log( "Program is compiled and ready" );
    
        // track which question we are on
        var questionCounter = 0;
        // initial time of 15 seconds for each question
        var time = 15;
        // will keep tally of right guesses for end game
        var correctGuesses = 0;
        //will keep tally of wrong guesses for end game
        var incorrectGuesses = 0;




        // question & answer array
        var questions = [
          {
            question: "What does CPU stand for?",
            choices: ["Central Process Unit","Computer Personal Unit","Central Processor Unit","Central Processing Unit"],
            correctAnswer: "Central Processing Unit"
          }, 
          {
            question: "When Gmail first launched, how much storage did it provide for your email?",
            choices: ["1GB","512MB","5GB","Unlimited"],
            correctAnswer: "1GB"
          }, 
          {
            question: "What does GHz stand for?",
            choices: ["Gigahotz","Gigahetz","Gigahatz","Gigahertz"],
            correctAnswer: "Gigahertz"
          }, 
          {
            question: "The programming language &#039;Swift&#039; was created to replace what other programming language?",
            choices: ["C#","Ruby","C++","Objective-C"],
            correctAnswer: "Objective-C"
          },
          {
            question: "HTML is what type of language?",
            choices: ["Macro Language","Programming Language","Scripting Language", "Markup Language"],
            correctAnswer: "Markup Language"
          },
          {
            question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
            choices: ["Static","Private","Public","Final"],
            correctAnswer: "Final"
          },
          {
            question: "What is the most preferred image format used for logos in the Wikimedia database?",
            choices: [".png",".jpeg",".gif",".svg"],
            correctAnswer:".svg"
          },
          {
            question: "What is the code name for the mobile operating system Android 7.0?",
            choices: ["Ice Cream Sandwich","Jelly Bean","Marshmallow","Nougat"],
            correctAnswer: "Nougat"
          },
          {
            question: "This mobile OS held the largest market share in 2012.",
            choices: ["Android","BlackBerry","Symbian","iOS"],
            correctAnswer: "iOS"
          },
          {
            question: "Which programming language shares its name with an island in Indonesia?",
            choices: ["Python","C","Jakarta","Java"],
            correctAnswer: "Java"
          }];
          
    
        // create question contents according to question count
        function questionContent() {
            // a for loop would be cool here...
            $("#gameScreen").append("<p><strong>" + 
                questions[questionCounter].question + 
                "</p><p class='choices'>" + 
                questions[questionCounter].choices[0] + 
                "</p><p class='choices'>" + 
                questions[questionCounter].choices[1] + 
                "</p><p class='choices'>" + 
                questions[questionCounter].choices[2] + 
                "</p><p class='choices'>" + 
                questions[questionCounter].choices[3] + 
                "</strong></p>");

        }
    
        // user guessed correctly
        function userWin() {
            $("#gameScreen").html("<p>Correct!</p>");
            correctGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
                correctAnswer + 
                "</span></p>");
            setTimeout(nextQuestion, 500);
            questionCounter++;
        }
    
        // user guessed incorrectly
        function userLoss() {
            $("#gameScreen").html("<p>You guessed wrong,</p>");
            incorrectGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
                correctAnswer + 
                "</span></p>");
            setTimeout(nextQuestion, 500);
            questionCounter++;
        }
    
        // user ran out of time
        function userTimeout() {
            if (time === 0) {
                $("#gameScreen").html("<p>You ran out of time!</p>");
                incorrectGuesses++;
                var correctAnswer = questions[questionCounter].correctAnswer;
                $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
                    correctAnswer + 
                    "</span></p>");
                setTimeout(nextQuestion, 500);
                questionCounter++;
            }
        }
    
        // Final Record Screen
        function resultsScreen() {
            $("#gameScreen").html( "<p>You got <strong>" + 
                correctGuesses + "</strong> answers correct.</p>" + 
                "<p>You got <strong>" + incorrectGuesses + "</strong> answers incorrect.</p>");
            $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
            gameReset();
            $("#start").click(nextQuestion);
        }
    
        // game clock currently set to 15 seconds
        function timer() {
            clock = setInterval(countDown, 1000);
            function countDown() {
                if (time < 1) {
                    clearInterval(clock);
                    userTimeout();
                }
                if (time > 0) {
                    time--;
                }
                $("#timer").html("<strong>" + time + "</strong>");
            }
        }
    
        // moves question counter forward to show next question
        function nextQuestion() {
            if (questionCounter < questions.length - 8) {
                time = 15;
                $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
                questionContent();
                timer();
                userTimeout();
            }
            else {
                resultsScreen();
            }
        // console.log(questionCounter);
        // console.log(questions[questionCounter].correctAnswer);
        }
    
        // reboot to zero
        function gameReset() {
            questionCounter = 0;
            correctGuesses = 0;
            incorrectGuesses = 0;
        }
    
        function startGame() {
            $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
            $("#start").hide();
            questionContent();
            timer();
            userTimeout();
        }
    
        // this starts the game
        $("#start").click(nextQuestion);
    
        // click function to trigger right or wrong screen
        $("#gameScreen").on("click", ".choices", (function() {
            // alert("clicked!");
            var userGuess = $(this).text();
            if (userGuess === questions[questionCounter].correctAnswer) {
                clearInterval(clock);
                userWin();
            }
            else {
                clearInterval(clock);
                userLoss();
            }
        }));




});