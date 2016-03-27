window.onload = () => {
    'use strict';

    var game = game || {};

    game.main = () => {

        /* =============================================================
        Variables
        */
        var lulaEl = document.getElementById('nyan-lula'),
            scoreEl = document.getElementsByClassName('score')[0],
            enemiesEl,
            moveEnemies,
            gameOver = false,
            animScore,
            animRainbow,
            moveLula,
            timeToSpawn = 1000;

        var moves = {
            movingLeft: false,
            movingRight: false,
            movingUp: false,
            movingDown: false
        };

        /* =============================================================
        Intervals
        */
        // animRainbow = setInterval(() => {
        //     createRainbowPart();
        //     var rainbowParts = document.querySelectorAll('.part'),
        //         rainbowNewLeft;
        //     for (var i = 0, partLength = rainbowParts.length; i < partLength; i++) {
        //         rainbowNewLeft = (rainbowParts[i].style.left.replace('px', '') - 20) + 'px';
        //         rainbowParts[i].style.left = rainbowNewLeft;
        //         if (rainbowParts[i].offsetLeft < -10) {
        //             document.body.removeChild(rainbowParts[i]);
        //         }
        //     }
        // }, 30);

        var spawnEnemyTimer = setTimeout(spawnEnemy, timeToSpawn);

        moveEnemies = setInterval(() => {
            enemiesEl = document.querySelectorAll('.enemy');
            var enemyNewLeft;

            for (var i = 0, enemyLength = enemiesEl.length; i < enemyLength; i++) {
                enemyNewLeft = (enemiesEl[i].style.left.replace('px', '') - 20) + 'px';
                enemiesEl[i].style.left = enemyNewLeft;
                if (enemiesEl[i].offsetLeft < -10) {
                    document.body.removeChild(enemiesEl[i]);
                }
            }
        }, 90);

        animScore = setInterval(() => {
            scoreEl.innerHTML = Number(scoreEl.innerHTML) + 1;

            if (Number(scoreEl.innerHTML) >= 100) {
                timeToSpawn = 700;
            } else if (Number(scoreEl.innerHTML) >= 300) {
                timeToSpawn = 500;
            } else if (Number(scoreEl.innerHTML) >= 400) {
                timeToSpawn = 300;
            } else if (Number(scoreEl.innerHTML) >= 500) {
                timeToSpawn = 200;
            } else if (Number(scoreEl.innerHTML) >= 600) {
                timeToSpawn = 100;
            }
        }, 100);

        moveLula = setInterval(() => {
            var lula = {
                    leftPosClean: Number(lulaEl.style.left.replace('px', '')),
                    topPosClean: Number(lulaEl.style.top.replace('px', '')),
                    pxToMove: 20
                },
                docHeight = document.documentElement.offsetHeight,
                docWidth = document.documentElement.offsetWidth,
                enemiesEl = document.querySelectorAll('.enemy');

            for (var i = 0, enemyLength = enemiesEl.length; i < enemyLength; i++) {
                if (lulaEl.offsetLeft + lulaEl.offsetWidth > enemiesEl[i].offsetLeft &&
                    lulaEl.offsetLeft < enemiesEl[i].offsetLeft + enemiesEl[i].offsetWidth &&
                    lulaEl.offsetTop < enemiesEl[i].offsetTop + enemiesEl[i].offsetHeight &&
                    lulaEl.offsetTop + lulaEl.offsetHeight > enemiesEl[i].offsetTop) {

                    clearInterval(animScore);
                    clearInterval(moveEnemies);
                    clearTimeout(spawnEnemyTimer);
                    gameOver = true;
                    document.body.classList.add('body-gameover');
                }
            }

            if (!gameOver) {
                if (lulaEl.offsetLeft >= 20 && moves.movingLeft) {
                    lulaEl.style.left = (lula.leftPosClean - lula.pxToMove) + 'px';
                }

                if (docWidth - (lulaEl.offsetLeft + lulaEl.offsetWidth) >= 100 &&
                    moves.movingRight) {
                    lulaEl.style.left = (lula.leftPosClean + lula.pxToMove) + 'px';
                }

                if (
                    lulaEl.offsetTop >= 20 && moves.movingUp) {
                    lulaEl.style.top = (lula.topPosClean - lula.pxToMove) + 'px';
                }

                if (
                    docHeight - (lulaEl.offsetTop + lulaEl.offsetHeight) >= 80 &&
                    moves.movingDown
                ) {
                    lulaEl.style.top = (lula.topPosClean + lula.pxToMove) + 'px';
                }
            }
        }, 80);

        /* =============================================================
        Functions
        */
        function createRainbowPart(moveRight) {
            var div = document.createElement('div');
            div.className = 'part';
            div.style.top = (lulaEl.offsetTop + 10) + 'px';
            div.style.left = (lulaEl.offsetLeft + 50) + 'px';
            if (moveRight) {
                //div.style.left = (lulaEl.offsetLeft + 70) + 'px';
            }
            document.body.appendChild(div);
        }

        function createEnemy() {
            var div = document.createElement('div');
            div.className = 'enemy';
            div.style.top = Math.floor(Math.random() * (document.documentElement.offsetHeight - 100) + 1) + 'px';
            div.style.left = document.documentElement.offsetWidth + 'px';
            document.body.appendChild(div);
        }

        function spawnEnemy() {
            createEnemy();
            spawnEnemyTimer = setTimeout(spawnEnemy, timeToSpawn);
        }

        function keyDown(e) {
            switch (e.keyCode) {
                case 37: // Left
                    moves.movingLeft = true;
                    break;
                case 39: // Right
                    moves.movingRight = true;
                    break;
                case 38: // Up
                    moves.movingUp = true;
                    break;
                case 40: // Down
                    moves.movingDown = true;
                    break;
            }
        }

        function keyUp(e) {
            switch (e.keyCode) {
                case 37: // Left
                    moves.movingLeft = false;
                    break;
                case 39: // Right
                    moves.movingRight = false;
                    break;
                case 38: // Up
                    moves.movingUp = false;
                    break;
                case 40: // Down
                    moves.movingDown = false;
                    break;
            }
        }

        function resizeDoc() {
            // TO-DO: Realign rainbow parts on window resize
        }

        return {
            init() {
                this.bindEvents();
            },
            bindEvents() {
                document.addEventListener('keydown', keyDown);
                document.addEventListener('keyup', keyUp);
                window.addEventListener('resize', resizeDoc);
            }
        };
    };

    var gameModule = game.main();
    gameModule.init();

};
