var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var up;
var down;
var left;
var right;
var foodAmount;
var fivepointsColor;
var fifteenpointsColor;
var twenyfivepointsColor;
var time;
var monsters;
var rand=false;
var oldKeyPressedNum;


$(document).ready(function () {
	context = canvas.getContext("2d");
	oldKeyPressedNum = 4;
		initDeails();


});

function initDeails() {

	$("form[name='settingsForm']").validate({
		rules: {
			up: "required",
			down: "required",
			left: "required",
			right: "required",
			food: "required",
			fivepointsColor: "required",
			fifteenpointsColor: "required",
			twentyfivepointsColor: "required",
			time: "required",
			monsters: "required"
		},
		messages: {
			up: "required",
			down: "required",
			left: "required",
			right: "required",
			food: "required",
			fivepointsColor: "required",
			fifteenpointsColor: "required",
			twentyfivepointsColor: "required",
			time: "required",
			monsters: "required"

		},
		submitHandler: function (form) {
		if(!rand){

			saveDetails();
			form.submit();

		}

		}

	});
}
function saveDetails() {

	foodAmount = $('#settingsForm').find('input[name="food"]').val();
	fivepoints = $('#settingsForm').find('input[name="fivepoints"]').val();
	fifteenpoints = $('#settingsForm').find('input[name="fifteenpoints"]').val();
	twenyfivepoints = $('#settingsForm').find('input[name="twentyfivepoints"]').val();
	time = $('#settingsForm').find('input[name="time"]').val();
	monsters = $('#settingsForm').find('input[name="monsters"]').val();
	start_time = new Date();
	swapDiv('game');
	Start();

}

function setUp() {
	up = event.keyCode;//init the result
	document.getElementById("up").value = event.key;//present thr result
}
function setDown() {
	down = event.keyCode;//init the result
	document.getElementById("down").value = event.key;//present thr result
}
function setLeft() {
	left = event.keyCode;//init the result
	document.getElementById("left").value = event.key;//present thr result
}
function setRight() {
	right = event.keyCode;//init the result
	document.getElementById("right").value = event.key;//present thr result
}
function randomNumberInRange(min, max) {
	return Math.random() * (max - min) + min;
}

function randomDetails() {

	foodAmount = randomNumberInRange(50, 90);
	fivepointsColor = "blue";
	fifteenpointsColor = "red";
	twenyfivepointsColor = "green";//?????????????????????
	/* time = randomNumberInRange(60,10000); */
	time = 50;
	monsters = randomNumberInRange(1, 4);
	up = 38;
	down = 40;
	left = 37;
	right = 39;
	rand = true;
	start_time = new Date();
	swapDiv('game');
	Start();
}
function swapDiv(newDiv) {
	var i, content;
	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.display = "none";
	}
	document.getElementById(newDiv).style.display = "block";

}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = foodAmount;
	var fivepoints = Math.floor(foodAmount * 0.6) - 1;
	var fifteenpoints = Math.floor(foodAmount * 0.3) - 1;
	var twentyfivepoints = Math.floor(foodAmount * 0.1) - 1;//?????????????
	var pacman_remain = 1;
	//fistart_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4; //walls
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * fivepoints) / cnt) {
					fivepoints--;
					board[i][j] = 1.1;//food
				} else if (randomNum < (1.0 * (pacman_remain + fivepoints)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2; //pacman
				} else {
					board[i][j] = 0; //empty
				}
				cnt--;
			}
		}
	}
	while (fivepoints > 0) { // insert the rest of the food
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.1;
		fivepoints--;
	}
	while (fifteenpoints > 0) { // insert the rest of the food
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.2;
		fifteenpoints--;
	}
	while (twentyfivepoints > 0) { // insert the rest of the food
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.3;
		twentyfivepoints--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 200);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {//up
		return 1;
	}
	if (keysDown[40]) {//down
		return 2;
	}
	if (keysDown[37]) {//left
		return 3;
	}
	if (keysDown[39]) {//right
		return 4;
	}
}

function Draw(direction) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblUsername.value =  $('#loginForm').find('input[name="username"]').val();

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {//pacman
				if (direction == 1) {//up
					pacmanUp(center);
				}
				if (direction == 2) {//down
					pacmanDown(center);
				}

				if (direction == 3) {//left
					pacmanLeft(center);
				}
				if (direction == 4) {//right
					pacmanRight(center);
				}
			} else if (board[i][j] == 1.1) {//food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = fivepointsColor; //color
				context.fill();
			}
			else if (board[i][j] == 1.2) {//food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteenpointsColor; //color
				context.fill();
			}
			else if (board[i][j] == 1.3) {//food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = twenyfivepointsColor; //color
				context.fill();
			}

			else if (board[i][j] == 4) { //walls
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if ((x == 1 || x == 2 || x == 3 || x == 4) && x != oldKeyPressedNum) {
		oldKeyPressedNum = x;
	}
	if (x == 1) {//up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {//down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {//left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {//right
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1.1) {
		score += 5;
	}
	if (board[shape.i][shape.j] == 1.2) {
		score += 15;
	}
	if (board[shape.i][shape.j] == 1.3) {
		score += 25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 100 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	else {
		if (x == 1 || x == 2 || x == 3 || x == 4)
			Draw(x);
		else {
			Draw(oldKeyPressedNum);
		}
	}
}


function pacmanRight(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle - right
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle right 
	context.fillStyle = "blue"; //color
	context.fill();
}

function pacmanDown(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle - down
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle down - finish 
	context.fillStyle = "blue"; //color
	context.fill();
}

function pacmanLeft(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle - left
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle left - finish
	context.fillStyle = "blue"; //color
	context.fill();

}

function pacmanUp(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle - up
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle up - finish
	context.fillStyle = "blue"; //color
	context.fill();

}