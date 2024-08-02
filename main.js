document.addEventListener("DOMContentLoaded", () => {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            const questions = data.questions;
            let playerName = '';
            let isPlayerTurn = Math.random() < 0.5;
            let timerInterval;

            const startGameButton = document.getElementById("startGameButton");
            const generateQuestionButton = document.getElementById("generateQuestionButton");
            const skipQuestionButton = document.getElementById("skipQuestionButton");
            const playerNameInput = document.getElementById("playerNameInput");
            const questionContainer = document.getElementById("questionContainer");
            const questionText = document.getElementById("questionText");
            const timerText = document.getElementById("timerText");

            startGameButton.addEventListener("click", () => {
                playerName = playerNameInput.value.trim();
                generateQuestionButton.innerHTML = `Próxima pergunta`;
                if (playerName === '') {
                    alert("Por favor, digite seu nome.");
                } else {
                    playerNameInput.style.display = 'none';
                    startGameButton.style.display = 'none';
                    generateQuestionButton.style.display = 'block';
                    skipQuestionButton.style.display = 'block';
                    questionContainer.style.display = "flex";
                    generateNewQuestion();
                }
            });

            generateQuestionButton.addEventListener("click", () => {
                isPlayerTurn = !isPlayerTurn;
                generateNewQuestion();
            });

            skipQuestionButton.addEventListener("click", () => {
                generateNewQuestion();
            });

            function generateNewQuestion() {
                clearInterval(timerInterval);
                const randomIndex = Math.floor(Math.random() * questions.length);
                const question = questions[randomIndex];
                questionText.innerHTML = (isPlayerTurn ? "<strong>" + playerName + ":</strong> " : "<strong>Ernesto:</strong> ") + question;
                startTimer();
            }

            function startTimer() {
                let timeLeft = 60;
                timerText.innerHTML = `Tempo restante: ${timeLeft}s`;

                timerInterval = setInterval(() => {
                    timeLeft--;
                    timerText.innerHTML = `Tempo restante: ${timeLeft}s`;

                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        isPlayerTurn = !isPlayerTurn;
                        generateNewQuestion();
                    }
                }, 1000);
            }
        })
        .catch(error => {
            console.log(error);
        });
});
