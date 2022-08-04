const setAttackDmg = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const setHealingPower = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

new Vue({
    el: '#app',
    data: {
        playerOne: {
            health: 100,
            attack: setAttackDmg(1, 10),
            specialAttack: setAttackDmg(10, 20),
            heal: setHealingPower(5, 15),
        },
        playerTwo: {
            health: 100,
            attack: setAttackDmg(1, 10),
            specialAttack: setAttackDmg(10, 20),
            heal: setHealingPower(5, 15),
        },
        gameIsRunning: false,
        historyLog: [],
        gameOverMessage: (message) => alert(message),
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
        },
        gameOver() {
            let gameOverMessage = ''

            if (this.playerOne.health < 0) {
                this.historyLog = [];
                this.gameIsRunning = false;
                gameOverMessage = 'Player Two Wins!';
            }

            if (this.playerTwo.health < 0) {
                this.historyLog = [];
                this.gameIsRunning = false;
                gameOverMessage = 'Player One Wins!';

            }

            if (this.gameIsRunning === false) {
                this.playerOne.health = 100;
                this.playerTwo.health = 100;
                this.gameOverMessage(gameOverMessage)
            }
        },
        attack() {
            this.playerOneAttack();
            this.playerTwoAttack();
            this.gameOver();
        },
        playerOneAttack() {
            const attackDmg = (this.playerOne.health -= this.playerTwo.attack);

            this.historyLog.unshift({
                isPlayerOne: true,
                message: `PLAYER HITS MONSTER FOR ${100 - attackDmg} DAMAGE`,
            });
        },
        playerTwoAttack() {
            const attackDmg = (this.playerTwo.health -= this.playerOne.attack);

            this.historyLog.unshift({
                isPlayerTwo: true,
                message: `MONSTER HITS PLAYER FOR ${100 - attackDmg} DAMAGE`,
            });
        },
        specialAttack() {
            const playerOneSpecialDmg = (this.playerOne.health -= this.playerTwo.specialAttack);
            const playerTwoSpecialDmg = (this.playerTwo.health -= this.playerOne.specialAttack);

            this.historyLog.unshift({
                isPlayerOne: true,
                message: `PLAYER HITS SPECIAL ATTACK ON MONSTER FOR ${100 - playerOneSpecialDmg} DAMAGE`,
            });

            this.historyLog.unshift({
                isPlayerTwo: true,
                message: `PLAYER HITS SPECIAL ATTACK ON MONSTER FOR ${100 - playerTwoSpecialDmg} DAMAGE`,
            });

            this.gameOver();
        },
        heal() {
            let healingPower = 0;

            if (this.playerOne.health < 100) {
                healingPower = this.playerOne.health += this.playerOne.heal;
                this.historyLog.unshift({
                    isPlayerOne: true,
                    message: `PLAYER HEALS HIMSELF ${100 - healingPower}`,
                });
            }

            if (this.playerTwo.health < 100) {
                healingPower = this.playerTwo.health += this.playerTwo.heal;
                this.historyLog.unshift({
                    isPlayerTwo: true,
                    message: `MONSTER HEALS ITSELF FOR ${100 - healingPower}`,
                });
            }
        },
        giveUp() {
            this.gameIsRunning = false;
            this.playerOne.health = 100;
            this.playerTwo.health = 100;
            this.historyLog = [];
        },
    },
});
