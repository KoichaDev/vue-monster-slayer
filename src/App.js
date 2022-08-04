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
        dmgHistoryLog: [],
        dmgSpecialHistoryLog: [],
        healHistoryLog: [],
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
            const playerOneDmg = (this.playerOne.health -= this.playerTwo.attack);
            this.dmgHistoryLog.push(playerOneDmg);
        },
        playerTwoAttack() {
            const playerTwoDmg = (this.playerTwo.health -= this.playerOne.attack);
            this.dmgHistoryLog.push(playerTwoDmg);
        },
        specialAttack() {
            const playerOneSpecialDmg = (this.playerOne.health -= this.playerTwo.specialAttack);
            const playerTwoSpecialDmg = (this.playerTwo.health -= this.playerOne.specialAttack);

            this.dmgSpecialHistoryLog.push(playerOneSpecialDmg, playerTwoSpecialDmg);
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

            this.healHistoryLog.push(playerOneHealingPower, playerTwoHealingPower);
        },
        giveUp() {
            this.gameIsRunning = false;
            this.playerOne.health = 100;
            this.playerTwo.health = 100;
        },
    },
});
