window.onload = () => {
    'use strict';

    var game = game || {};

    game.main = () => {

        /* =============================================================
        Variables
        */
        var lulaEl = document.getElementById('nyan-lula'),
            scoreEl = document.getElementsByClassName('score')[0],
            gameOver = false,
            animRainbow,
            animScore,
            moveLula;

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

        var moveEnemy = setInterval(() => {
            createEnemy();
            var enemyEl = document.querySelectorAll('.enemy')[0];

            var enemyNewLeft = (enemyEl.style.left.replace('px', '') - 20) + 'px';
            enemyEl.style.left = enemyNewLeft;

            if (enemyEl.offsetLeft < -10) {
                document.body.removeChild(enemyEl);
            }
        }, 100);

        animScore = setInterval(() => {
            scoreEl.innerHTML = Number(scoreEl.innerHTML) + 1;
        }, 100);

        moveLula = setInterval(() => {
            var lula = {
                    leftPosClean: Number(lulaEl.style.left.replace('px', '')),
                    topPosClean: Number(lulaEl.style.top.replace('px', '')),
                    pxToMove: 20
                },
                docHeight = document.documentElement.offsetHeight,
                docWidth = document.documentElement.offsetWidth,
                enemies = document.querySelectorAll('.enemy')[0];

            if (lulaEl.offsetLeft + lulaEl.offsetWidth > enemies.offsetLeft &&
                lulaEl.offsetLeft < enemies.offsetLeft + enemies.offsetWidth &&
                lulaEl.offsetTop < enemies.offsetTop + enemies.offsetHeight &&
                lulaEl.offsetTop + lulaEl.offsetHeight > enemies.offsetTop) {

                clearInterval(animScore);
                clearInterval(moveEnemy);
                gameOver = true;
                document.body.classList.add('body-gameover');
            }
            if (!gameOver) {
                if (lulaEl.offsetLeft >= 20 && moves.movingLeft) {
                    lulaEl.style.left = (lula.leftPosClean - lula.pxToMove) + 'px';
                }

                if (docWidth - (lulaEl.offsetLeft + lulaEl.offsetWidth) >= 100 && moves.movingRight) {
                    lulaEl.style.left = (lula.leftPosClean + lula.pxToMove) + 'px';
                }

                if (lulaEl.offsetTop >= 20 && moves.movingUp) {
                    lulaEl.style.top = (lula.topPosClean - lula.pxToMove) + 'px';
                }

                if (docHeight - (lulaEl.offsetTop + lulaEl.offsetHeight) >= 100 && moves.movingDown) {
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
            div.style.top = 100 + 'px';
            div.style.left = document.documentElement.offsetWidth + 'px';
            document.body.appendChild(div);
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
