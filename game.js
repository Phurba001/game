var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var score = 0;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;

}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}

function btnClick() {
	var start = document.getElementsByClassName('start');
	start[0].addEventListener('click', loadGame);
}


//game loads in webpage when start button is clicked.
function loadGame() {
	var start = document.getElementsByClassName('start');
	start[0].firstChild.nodeValue = 'Launch';
	setTimeout(function(){start[0].style.opacity = '0.8'; }, 200);
	setTimeout(function(){start[0].style.opacity = '0.6'; }, 400);
	setTimeout(function(){start[0].style.opacity = '0.2'; }, 600);
	setTimeout(function(){start[0].style.display = 'none'; }, 800);
	shipsInterval = setInterval(spaceShipOnTop, 1125);
	setInterval(function(){
		if (score >= 4 && score <=6){
			setInterval(releaseBomb, 40);   //enhance the bomb's speed
		}
	}, 2000);
	bombFalls = setInterval(releaseBomb, 20);
	myLoadFunction();
}


//players can see spaceships and bombs falling from it on the screen.
function spaceShipOnTop() {
	var body = document.getElementsByTagName('body')[0];
	var spaceShip = document.getElementById('alien');
	spaceShip.style.top = 10 + 'px';
	var randNumber = Math.ceil(Math.random()* 60);
	spaceShip.style.left = (randNumber * 20) + 'px';
	spaceShip.style.backgroundSize = 'cover';
	var spaceShipL = parseInt(spaceShip.style.left);
	var bomb = document.createElement('div');
	bomb.className = 'bomb';
	body.appendChild(bomb);
	bomb.style.top = 50 + 'px';  // bomb creating on basis of spaceship top position.
	bomb.style.left =  (spaceShipL + 9) + 'px'; // bomb creating on basis of spaceship left position.
}

// bombs falls and explode on green area.
function releaseBomb() {
	var player = document.getElementById('player');
	var manyBombs = document.getElementsByClassName('bomb');
	for (var i = 0; manyBombs.length > i; i++) {
		var bomb = manyBombs[i];
		var bombTop = parseInt(bomb.style.top);
		var bombLeft = parseInt(bomb.style.left);
		var playerOnLeft = parseInt(player.offsetLeft)
		bomb.style.top = bombTop + 1 + 'px';
		if (score >= 5 && score<=7 && bombLeft > playerOnLeft) {
			bomb.style.left = bombLeft - 1 + 'px';
		}

		if (score >= 12 && score<=15 && bombLeft < playerOnLeft) {
			bomb.style.left = bombLeft + 1 + 'px';
		}
	}
	bombAndPlayerCollide();
}



//if character is hit by bomb, it loses a health & the bomb explodes.
function bombAndPlayerCollide(){
	var body = document.getElementsByTagName('body')[0];
	var player = document.getElementById('player');
	var playerLeft = parseInt(player.offsetLeft);
	var playerTop = parseInt(player.offsetTop);
	var manyBombs = document.getElementsByClassName('bomb');
	for (var i = 0; manyBombs.length > i; i++) {
		var bomb = manyBombs[i];
		bombTop = parseInt(bomb.style.top);
		var bombLeft = parseInt(bomb.style.left);
		if (bombTop == playerTop) {
			if (bombLeft >= (playerLeft - 40) 
						&&
			 	bombLeft <= (playerLeft + 40)){
					lifeLosses();
					bomb.className = 'explosion';
					setTimeout(function(){
						var explosion = document.getElementsByClassName('explosion');
						for (var i = 0; i < explosion.length; i++) {
							body.removeChild(explosion[i]);
						}
					}, 500);
				}
			crackBomb();
		}
	}
}


// bomb explodes in different height on green area.
function crackBomb(){
	var body = document.getElementsByTagName('body')[0];
	var manyBombs = document.getElementsByClassName('bomb');
	var player = document.getElementById('player');
	var playerTop = parseInt(player.offsetTop);
	for (var i = 0; manyBombs.length > i; i++) {
		var bomb = manyBombs[i];
		bombTop = parseInt(bomb.style.top);
		bombLeft = parseInt(bomb.style.left);
		if (bombTop == playerTop) { // bomb explodes a/c to player top position.
			bomb.className = 'explosion';
			setTimeout(function () {
				var explosion = document.getElementsByClassName('explosion');
				for (var i = 0; i < explosion.length; i++) {
					body.removeChild(explosion[i]);
					score += 1;
				}
			}, 500);
		}
	}
}


function lifeLosses(){
	var player = document.getElementById('player');
	var manyLives = document.getElementsByTagName('ul')[0];
	var aLife = document.getElementsByTagName('li');
	if (aLife.length > 1) {
		manyLives.removeChild(aLife[0]);
		player.className = 'character hit left';
	} 
	else {
		manyLives.removeChild(aLife[0]);
		player.className = 'character dead head body';
		finishTheGame();
	}
}

// when character dies, the game stops and shows restart button for restarting the game.
function finishTheGame() {
	var start = document.getElementsByClassName('start')[0];
	start.style.display = 'block';
	start.style.opacity = '1';
	start.firstChild.nodeValue = 'PLAY AGAIN?';

	// player cannot move after dying
	document.removeEventListener('keydown', keydown);
	document.removeEventListener('keyup', keyup);
	clearInterval(timeout);

	//spaceships stops
	clearInterval(shipsInterval);

	//bomb stops
	clearInterval(bombFalls);

	// reloads the game
	start.addEventListener('click', function(){location.reload();
	});

	// input feild for player's name.
	setTimeout(function () {
		var chrName = prompt("Please Enter Your Name", "");
		window.localStorage.setItem("chrName", chrName);
		alert("Player Name: "+localStorage.getItem("chrName") + "\nScore: " + score);
							// alerts player name and score.
	}, 1500);
}


document.addEventListener('DOMContentLoaded', btnClick);