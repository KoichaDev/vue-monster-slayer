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
            if (this.playerOne.health < 0) {
                this.gameIsRunning = false;
            }

            if (this.playerTwo.health < 0) {
                this.gameIsRunning = false;
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
                message: `PLAYER HITS MONSTER FOR ${100 - attackDmg} DAMAGE`
            });
        },
        playerTwoAttack() {
            const attackDmg = (this.playerTwo.health -= this.playerOne.attack);

            this.historyLog.unshift({
                isPlayerTwo: true,
                message: `MONSTER HITS PLAYER FOR ${100 - attackDmg} DAMAGE`
            });
        },
        specialAttack() {
            const playerOneSpecialDmg = (this.playerOne.health -= this.playerTwo.specialAttack);
            const playerTwoSpecialDmg = (this.playerTwo.health -= this.playerOne.specialAttack);

            this.historyLog.unshift({
                isPlayerOne: true,
                message: `PLAYER HITS SPECIAL ATTACK ON MONSTER FOR ${100 - playerOneSpecialDmg} DAMAGE`
            });

            this.historyLog.unshift({
                isPlayerTwo: true,
                message: `PLAYER HITS SPECIAL ATTACK ON MONSTER FOR ${100 - playerTwoSpecialDmg} DAMAGE`
            });

            // this.historyLog.push(playerOneSpecialDmg, playerTwoSpecialDmg);
            this.gameOver();
        },
        heal() {
            let playerOneHealingPower = 0;
            let playerTwoHealingPower = 0;

            if (this.playerOne.health < 100) {
                playerOneHealingPower = (this.playerOne.health += this.playerOne.heal);
            }

            if (this.playerTwo.health < 100) {
                playerTwoHealingPower = (this.playerTwo.health += this.playerTwo.heal);
            }

            this.historyLog.push(playerOneHealingPower, playerTwoHealingPower);
        },
        giveUp() {
            this.gameIsRunning = false;
            this.playerOne.health = 100;
            this.playerTwo.health = 100;
        },
    },
});
