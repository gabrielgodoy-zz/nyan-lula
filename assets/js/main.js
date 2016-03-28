window.onload = () => {
    'use strict';

    var game = game || {};

    game.main = () => {

        /* =============================================================
        Variables
        */
        var container = document.getElementsByClassName('container')[0],
            startPopup = document.getElementsByClassName('start-popup')[0],
            restartPopup = document.getElementsByClassName('restart-popup')[0],
            mask = document.getElementsByClassName('mask')[0],
            lulaEl = document.getElementById('nyan-lula'),
            scoreEl = document.getElementsByClassName('score')[0],
            nyanMusic = document.getElementById('nyan-music'),
            sadMusic = document.getElementById('sad-music'),
            urlApp = 'http://gabrielgodoy.com/nyan-lula/',
            moveStars,
            starsEl,
            enemiesEl,
            createStar,
            spawnEnemyTimer,
            moveEnemies,
            gameOver = false,
            animScore,
            animRainbow,
            animScoreTimer,
            finalScore,
            moveLula,
            timeToSpawn = 1000,
            enemySpeed = 50;

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

        function restartGame() {
            startGame();
            sadMusic.pause();
            nyanMusic.play();
            gameOver = false;
            timeToSpawn = 1000;
            enemySpeed = 50;
            finalScore = 0;

            document.getElementsByClassName('final-score')[0].innerHTML = 0;
            document.getElementsByClassName('score')[0].innerHTML = 0;

            container.classList.remove('body-gameover');
            mask.classList.remove('active');
            restartPopup.classList.remove('active-popup');

            lulaEl.style.left = '';
            lulaEl.style.top = '';

            var enemies = document.body.querySelectorAll('.enemy');
            for (var i = 0, enemiesLength = enemies.length; i < enemiesLength; i++) {
                container.removeChild(enemies[i]);
            }

            var stars = document.body.querySelectorAll('.star');
            for (var j = 0, starsLength = stars.length; j < starsLength; j++) {
                container.removeChild(stars[j]);
            }

        }

        function startGame() {
            mask.classList.remove('active');
            startPopup.classList.remove('active-popup');
            startPopup.classList.add('hide-popup');

            spawnEnemyTimer = setTimeout(spawnEnemy, timeToSpawn);

            moveEnemies = setInterval(() => {
                enemiesEl = document.querySelectorAll('.enemy');
                var enemyNewLeft;
                for (var i = 0, enemyLength = enemiesEl.length; i < enemyLength; i++) {
                    enemyNewLeft = (enemiesEl[i].style.left.replace('px', '') - enemySpeed) + 'px';
                    enemiesEl[i].style.left = enemyNewLeft;
                    if (enemiesEl[i].offsetLeft < -170) {
                        container.removeChild(enemiesEl[i]);
                    }
                }
            }, 90);

            moveStars = setInterval(() => {
                starsEl = document.querySelectorAll('.star');
                var starNewLeft;

                for (var i = 0, starsLength = starsEl.length; i < starsLength; i++) {
                    starNewLeft = (starsEl[i].style.left.replace('px', '') - 10) + 'px';
                    starsEl[i].style.left = starNewLeft;
                    if (starsEl[i].offsetLeft < -7) {
                        container.removeChild(starsEl[i]);
                    }
                }
            }, 100);

            createStar = setInterval(() => {
                createElement('star');
            }, 1000);

            animScoreTimer = setTimeout(animScoreFunc, 100);

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

                        clearInterval(moveStars);
                        clearInterval(moveLula);
                        clearInterval(createStar);
                        clearInterval(moveEnemies);
                        clearTimeout(animScoreTimer);
                        clearTimeout(spawnEnemyTimer);

                        gameOver = true;

                        finalScore = document.getElementsByClassName('score')[0].innerHTML;
                        document.getElementsByClassName('final-score')[0].innerHTML = finalScore + ' pontos';
                        document.getElementsByClassName('container')[0].classList.add('body-gameover');

                        // Twitter
                        var twitterMsg = 'https://twitter.com/intent/tweet?text=Fiz ' + finalScore + ' pontos no Nyan Lula. Tente me superar =) http://goo.gl/lUhxkD';
                        document.getElementsByClassName('link-tw')[0].setAttribute('href', twitterMsg);

                        mask.classList.add('active');
                        restartPopup.classList.add('active-popup');
                        nyanMusic.pause();
                        sadMusic.play();
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
        }

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

        function createElement(elClass) {
            var div = document.createElement('div');
            div.className = elClass;
            div.style.top = Math.floor(Math.random() * (document.documentElement.offsetHeight - 100) + 1) + 'px';
            div.style.left = document.documentElement.offsetWidth + 'px';
            container.appendChild(div);
        }


        function spawnEnemy() {
            createElement('enemy');
            spawnEnemyTimer = setTimeout(spawnEnemy, timeToSpawn);
        }

        function animScoreFunc() {
            scoreEl = document.getElementsByClassName('score')[0];
            scoreEl.innerHTML = Number(scoreEl.innerHTML) + 1;
            if (Number(scoreEl.innerHTML) >= 100 && Number(scoreEl.innerHTML) < 200) {
                timeToSpawn = 700;
                enemySpeed = 55;
            } else if (Number(scoreEl.innerHTML) >= 200 && Number(scoreEl.innerHTML) < 300) {
                timeToSpawn = 600;
                enemySpeed = 60;
            } else if (Number(scoreEl.innerHTML) >= 300 && Number(scoreEl.innerHTML) < 400) {
                timeToSpawn = 600;
                enemySpeed = 70;
            } else if (Number(scoreEl.innerHTML) >= 400 && Number(scoreEl.innerHTML) < 500) {
                timeToSpawn = 500;
                enemySpeed = 80;
            } else if (Number(scoreEl.innerHTML) >= 500 && Number(scoreEl.innerHTML) < 800) {
                timeToSpawn = 440;
                enemySpeed = 90;
            } else if (Number(scoreEl.innerHTML) >= 800 && Number(scoreEl.innerHTML) < 1000) {
                timeToSpawn = 350;
                enemySpeed = 100;
            } else if (Number(scoreEl.innerHTML) >= 1000) {
                timeToSpawn = 300;
                enemySpeed = 140;
            }
            animScoreTimer = setTimeout(animScoreFunc, 100);
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

        // Popup Twitter
        function popupwindow(url, title, w, h) {
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        }

        function resizeDoc() {
            // TO-DO: Realign rainbow parts on window resize
        }

        function shareTw(e) {
            e.preventDefault();
            popupwindow(this.href, 'Twitter', 600, 300);
        }

        function shareFb(e) {
            e.preventDefault();
            FB.ui({
                method: 'feed',
                link: urlApp,
                name: 'Nyan Lula',
                picture: 'https://raw.githubusercontent.com/gabrielgodoy/nyan-lula/gh-pages/assets/images/img-share.jpg',
                description: 'Veja quando tempo você consegue fugir do Sérgio Moro!',
                message: 'Mensagem'
            });
        }

        return {
            init() {
                this.bindEvents();
            },
            bindEvents() {
                document.addEventListener('keydown', keyDown);
                document.addEventListener('keyup', keyUp);
                document.getElementsByClassName('start-bt')[0].addEventListener('click', startGame);
                document.getElementsByClassName('restart-bt')[0].addEventListener('click', restartGame);
                window.addEventListener('resize', resizeDoc);

                document.getElementsByClassName('link-fb')[0].addEventListener('click', shareFb);
                document.getElementsByClassName('link-tw')[0].addEventListener('click', shareTw);
            }
        };
    };

    var gameModule = game.main();
    gameModule.init();

};
