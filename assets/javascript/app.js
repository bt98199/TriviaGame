$(document).ready(function() {
console.log( "Program is compiled and ready" );
    
        // track which question we are on
        var questionCounter = 0;
        // initial time of 15 seconds for each question
        var time = 15;
        //counts wins
        var correctGuesses = 0;
        //counts losses
        var incorrectGuesses = 0;

        // An array of objects I got from a trivia API.  The format was pretty much the same but I couldn't figure out how to do the ajax to get fresh questions each tame
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

          // fills in the question screen, most of which is erased each click
        function questionContent() {
          $("#game-screen").append("<div>" + 
              questions[questionCounter].question + 
              "</p><span id='choices'><button type='button' class='btn btn-outline-primary'>" +
              questions[questionCounter].choices[0] + "</button>" + 
              "</span><span id='choices'><button type='button' class='btn btn-outline-secondary'>" +
              questions[questionCounter].choices[1] + "</button>" +
              "</span><span id='choices'><button type='button' class='btn btn-outline-primary'>" +
              questions[questionCounter].choices[2] + "</button>" +
              "</span><span id='choices'><button type='button' class='btn btn-outline-secondary'>" +
                                          questions[questionCounter].choices[3] + "</button>" +
              "</span></div>");
               }
        // At the bottom of the code there is an on click event that compares "this" with the correct answer.  If the answer is correct, irt calls userWin(), if not, userLoss.
        function userWin() {
          correctGuesses++;
          var trivDiv = $("<div class='data-y'>");
          trivDiv.append("<p><strong>Correct!</strong> ++++++++++++++++++++++++++++++ Your record is: " + correctGuesses + " - " + incorrectGuesses + "</p>");
          $("#game-screen").html("<p>Correct!</p>");
          var correctAnswer = questions[questionCounter].correctAnswer;
          trivDiv.append("<p>The answer was <span class='answer'>" + 
          correctAnswer + 
          "</span></p>");
          $("#game-screen").prepend("<p>The answer was <span class='answer'>" + 
              correctAnswer + 
              "</span></p>");
          setTimeout(nextQuestion, 1000);
          $(".data").prepend(trivDiv);
          questionCounter++;
      }

      function userLoss() {
        incorrectGuesses++;
        var trivDiv = $("<div class='data-n'>");
        trivDiv.append("<p><strong>Not Correct.</strong> +++++++++++++++++++++++++++ Your record is: " + correctGuesses + " - " + incorrectGuesses + "</p>");
        $("#game-screen").html("<p>||Not Correct||</p>");
        var correctAnswer = questions[questionCounter].correctAnswer;
        trivDiv.append("<p>The answer was <span class='answer'>" + 
        correctAnswer + 
        "</span></p>");
        $("#game-screen").prepend("<p>The answer was <span class='answer'>" + 
            correctAnswer + 
            "</span></p>");
        setTimeout(nextQuestion, 1000);
        $(".data").prepend(trivDiv);
        questionCounter++;
    }
        // timer reaches zero with no guess, it is handled like userLoss(), for the most part
        function userTimeout() {
            if (time === 0) {
                $("#game-screen").html("<p>You ran out of time!</p>");
                incorrectGuesses++;
                var correctAnswer = questions[questionCounter].correctAnswer;
                $("#game-screen").append("<p>The answer was <span class='answer'>" + 
                    correctAnswer + 
                    "</span></p>");
                var trivDiv = $("<div class='data-n'>");
                trivDiv.append("<p><strong>Timed Out!</strong> +++++++++++++++++++++++++++ Your record is: " + correctGuesses + " - " + incorrectGuesses + "</p>");
                trivDiv.append("<p>The answer was <span class='answer'>" + 
                correctAnswer + 
                "</span></p>");
                setTimeout(nextQuestion, 1000);
                questionCounter++;
                $(".data").prepend(trivDiv);
            }
        }
    
        // Final Record Screen, the tweak of #restart-game is needed to clear out the answer history of the previous game.
        function resultsScreen() {
            $("#game-screen").html( "<p>You got <strong>" + 
                correctGuesses + "</strong> answers correct.</p>" + 
                "<p>You got <strong>" + incorrectGuesses + "</strong> answers incorrect.</p>");
            $("#game-screen").append(" <button type='button' class='btn btn-primary btn-lg' id='restart-game'>Play Again?</button>");
            gameReset();
            $("#restart-game").click(restartGame); 
        }
    
        // sets timer to a var called time.  Probably not good form to call the function timer as opposed to startTimer, but, it works fine.
        function timer() {
            clock = setInterval(countDown, 1000);
            function countDown() {
                if (time < 1) {
                    clearInterval(clock);
                    userTimeout();
                }
                if (time > 0) {
                    time--;
                    console.log(time);
                }
                $("#timer").html("<strong>" + time + "</strong>");
            }
        }
    
        // moves question counter forward to show next question
        function nextQuestion() {
            if (questionCounter < questions.length /*- 8 for debugging purposes */) {
                time = 15;
                $("#game-screen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
                questionContent();
                timer();
                userTimeout();
            }
            else {
                resultsScreen();
            }
        }
    
        // reboot to zero
        function gameReset() {
            questionCounter = 0;
            correctGuesses = 0;
            incorrectGuesses = 0;
        }
    
        function startGame() {
            $("#game-screen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
            $("#start-game").hide();
            questionContent();
            timer();
            userTimeout();
        }
        
        function restartGame() {
          $(".data").empty();
          nextQuestion();
        }
      
        // check if the user picked the right or wrong answer
        $("#game-screen").on("click", "#choices", (function() {
            // alert("clicked!");
            var userGuess = $(this).text();
            if (userGuess === questions[questionCounter].correctAnswer) {
                clearInterval(clock);
                userWin();
            }
            else {
                clearInterval(clock);
                console.log(userGuess);
                userLoss();
            }
        }));

  // this starts the game
  $("#start-game").click(nextQuestion);
});