var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalMonsters;
var intervalExtraFifty;
var up;
var down;
var left;
var right;
var foodAmount;
var fivepointsColor;
var fifteenpointsColor;
var twenyfivepointsColor;
var time;
var monstersAmount;
var rand = false;
var oldKeyPressedNum;
var monsters;
var life;
var extraFifty = new Object();
var medications;
var clock = new Object();
var flag;
var timeGame;
var song;
var clockImage = new Image();
var medicineImage = new Image();
var extraFiftyImage = new Image();
var monsterImage= new Image();



$(document).ready(function () {
	context = canvas.getContext("2d");
	oldKeyPressedNum = 4;
	initDeails();


});

function initDeails() {

	$.validator.addMethod("checkfoodAmount", function(value) {
		return (value <= 90 && value >= 50); 
		
	 });
	 $.validator.addMethod("checkTime", function(value) {
		return (value >= 60 ); 
		
	 });
	 $.validator.addMethod("checkMonsters", function(value) {
		return (value <= 4 && value >= 1); 
		
	 });

	$("form[name='settingsForm']").validate({
		rules: {
			up: "required",
			down: "required",
			left: "required",
			right: "required",
			food: {
				required: true,
				checkfoodAmount: true
			},
			fivepointsColor: "required",
			fifteenpointsColor: "required",
			twentyfivepointsColor: "required",
			time: {
				required: true,
				checkTime: true
			},
			monsters: {
				required: true,
				checkMonsters: true
			}
		},
		messages: {
			up: "required",
			down: "required",
			left: "required",
			right: "required",
			food: {
				required: "This field cannot be empty",
				checkfoodAmount: "the amount should be between 50 to 90"
			},			
			fivepointsColor: "required",
			fifteenpointsColor: "required",
			twentyfivepointsColor: "required",
			time: {
				required: "This field cannot be empty",
				checkTime: "the amount should be above 60"
			},	
			monsters: {
				required: "This field cannot be empty",
				checkMonsters:  "the amount should be between 1 to 4"
			}
		},
		submitHandler: function (form) {

		//	saveDetails();

			flag = saveDetails();
			if(!flag)
			{
				return false;
			}

/* 			if (!rand) {
 
				flag = saveDetails();
				if(!flag)
				{
					return false;
				}
				//form.submit();

			} */

		}

	});
}
function saveDetails() {
	foodAmount = $('#settingsForm').find('input[name="food"]').val();
	fivepointsColor = $('#settingsForm').find('input[name="fivepointsColor"]').val();
	fifteenpointsColor = $('#settingsForm').find('input[name="fifteenpointsColor"]').val();
	twenyfivepointsColor = $('#settingsForm').find('input[name="twentyfivepointsColor"]').val();
	if(fivepointsColor==fifteenpointsColor || fivepointsColor==twenyfivepointsColor || fifteenpointsColor==twenyfivepointsColor){
		document.getElementById("differentColors").style.display = "block";
		return false;
	}
		time = $('#settingsForm').find('input[name="time"]').val();
		monstersAmount = $('#settingsForm').find('input[name="monsters"]').val();
		start_time = new Date();
		swapDiv('game');
		Start();
	
}

function setUp() {
	up = event.keyCode;//init the result
	document.getElementById("up").value = event.key;//present the result
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

	/* foodAmount =  Math.floor(randomNumberInRange(50,91)); 

	fivepointsColor = 	"#"+((1<<24)*Math.random()|0).toString(16);
	fifteenpointsColor = 	"#"+((1<<24)*Math.random()|0).toString(16);
	twenyfivepointsColor = 	"#"+((1<<24)*Math.random()|0).toString(16);
	time = randomNumberInRange(60,10000); 
	//time = 50;
	monstersAmount = Math.floor(randomNumberInRange(1, 5));
	//monstersAmount = 2;
	up = 38;
	down = 40;
	left = 37;
	right = 39;
	rand = true;
	start_time = new Date();
	swapDiv('game');
	Start(); */
	document.getElementById("food").value = Math.floor(randomNumberInRange(50,91));
	document.getElementById("fivepointsColor").value = "#"+((1<<24)*Math.random()|0).toString(16);
	document.getElementById("fifteenpointsColor").value = "#"+((1<<24)*Math.random()|0).toString(16);
	document.getElementById("twentyfivepointsColor").value = "#"+((1<<24)*Math.random()|0).toString(16);
	document.getElementById("time").value =  randomNumberInRange(60,1000); 
	document.getElementById("monsters").value = Math.floor(randomNumberInRange(1, 5)); 
	document.getElementById("up").value = "ArrowUp";
	document.getElementById("down").value =  "ArrowDown";
	document.getElementById("left").value = "ArrowLeft";
	document.getElementById("right").value = "ArrowRight";
	up = 38;
	down = 40;
	left = 37;
	right = 39;

}
function swapDiv(newDiv) {
	var i, content;
	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.display = "none";
	}
	document.getElementById(newDiv).style.display = "block";

}
function initMonsters() {
	monsters = new Array();
	if (monstersAmount > 0) {
/* 		if (board[0][0] != 0 && board[0][0] != 5) { // there was food or pacman there
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = board[0][0];
		} */
		monsters[0] = new Object();
		monsters[0].i = 0;
		monsters[0].j = 0;

		monsters[0].x = 0;
		monsters[0].y = 0;
		monsters[0].z = board[0][0];
		board[0][0] = 5;
	}
	if (monstersAmount > 1) {
/* 		if (board[9][0] != 0 && board[9][0] != 5) {
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = board[9][0];
		} */
		monsters[1] = new Object();
		monsters[1].i = 9;
		monsters[1].j = 0;

		monsters[1].x = 9;
		monsters[1].y = 0;
		monsters[1].z = board[9][0];
		board[9][0] = 5;
	}
	if (monstersAmount > 2) {
/* 		if (board[0][9] != 0 && board[0][9] != 5) {
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = board[0][9];
		} */
		monsters[2] = new Object();
		monsters[2].i = 0;
		monsters[2].j = 9;

		monsters[2].x = 0;
		monsters[2].y = 9;
		monsters[2].z = board[0][9];
		board[0][9] = 5;
	}
	if (monstersAmount > 3) {
/* 		if (board[9][9] != 0 && board[9][9] != 5) {
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = board[9][9];
		} */
		monsters[3] = new Object();
		monsters[3].i = 9;
		monsters[3].j = 9;

		monsters[3].x = 9;
		monsters[3].y = 9;
		monsters[3].z = board[9][9];
		board[9][9] = 5;
	}
}

function initMedications(){
	medications = new Array();	
	var medicationsAmount = Math.floor(randomNumberInRange(1,3));
	for(let k=0; k<medicationsAmount; k++){
		medications[k] = new Object();
		var emptyCell = findRandomCell(board);
		medications[k].z = board[emptyCell[0]][emptyCell[1]];
		board[emptyCell[0]][emptyCell[1]] = 2.5;
		medications[k].i = emptyCell[0];
		medications[k].j = emptyCell[1];
	}
}
function showSettings(){

	if(rand){
		lblup.value= "ArrowUp";
		lbldown.value = "ArrowDown";
		lblleft.value =  "ArrowLeft";
		lblright.value =  "ArrowRight";
	}
	else{
		lblup.value = document.getElementById("up").value;
		lbldown.value = document.getElementById("down").value;
		lblleft.value = document.getElementById("left").value;
		lblright.value = document.getElementById("right").value;
	}

	lblfoodAmount.value = foodAmount;
/* 	lblfivepointsColor.value = fivepointsColor;
	lblfifteenpointsColor.value = fifteenpointsColor;
	lbltwenyfivepointsColor.value = twenyfivepointsColor; */

/* 	document.getElementById("lblfivepointsColor").style.color = fivepointsColor;
 	document.getElementById("lblfivepointsColor").style.fontSize = "larger";
	document.getElementById("lblfivepointsColor").style.fontStyle = "bold";
	
	document.getElementById("lblfifteenpointsColor").style.color = fifteenpointsColor;
	document.getElementById("lblfifteenpointsColor").style.fontSize = "larger";
	document.getElementById("lblfifteenpointsColor").style.fontStyle = "bold";

	document.getElementById("lbltwenyfivepointsColor").style.color = twenyfivepointsColor;
	document.getElementById("lbltwenyfivepointsColor").style.fontSize = "larger";
	document.getElementById("lbltwenyfivepointsColor").style.fontStyle = "bold"; */


	document.getElementById("lblfivepointsColor").style.backgroundColor = fivepointsColor;
	document.getElementById("lblfifteenpointsColor").style.backgroundColor = fifteenpointsColor;
	document.getElementById("lbltwenyfivepointsColor").style.backgroundColor = twenyfivepointsColor;




	lbltimesettings.value = timeGame;
	lblmonstersSettings.value = monstersAmount;

	

}


function playAudio() { 
  song.play(); 
} 

function pauseAudio() { 
  song.pause(); 
} 

function Start() {
	song = document.getElementById("myAudio");
	clockImage = document.getElementById("myClockImage");
	extraFiftyImage = document.getElementById("myExtraFiftyImage");
	medicineImage = document.getElementById("myMedicineImage");
	monsterImage = document.getElementById("myMonsterImage");
	playAudio();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = foodAmount;
	var fivepoints = Math.floor(foodAmount * 0.6);
	var fifteenpoints = Math.floor(foodAmount * 0.3);
	var twentyfivepoints = Math.floor(foodAmount * 0.1);//?????????????
	var pacman_remain = 1;
	life = 5;
	timeGame = time;
	start_time = new Date();
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
	initMonsters();
	initMedications();
	//extraFifty
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 3; //extreFifty
	extraFifty.i = emptyCell[0];
	extraFifty.j = emptyCell[1];
	extraFifty.z = 3; 

	//clock
	var cell = findRandomCell(board);
	clock.z = board[cell[0]][cell[1]] ; 
	board[cell[0]][cell[1]] = 2.6; //clock
	clock.i = cell[0];
	clock.j = cell[1];
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

	interval = setInterval(UpdatePosition, 250);
	intervalMonsters = setInterval(moveMonsters, 550);
	intervalExtraFifty = setInterval(moveExtraFifty, 400);

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
function findRandomCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] == 4 || board[i][j] == 2) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up]) {//up
		return 1;
	}
	if (keysDown[down]) {//down
		return 2;
	}
	if (keysDown[left]) {//left
		return 3;
	}
	if (keysDown[right]) {//right
		return 4;
	}
}

function Draw(direction) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = Math.floor(time_elapsed);
	lblLife.value = life;
	lblUsername.value = $('#loginForm').find('input[name="username"]').val();

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
				context.arc(center.x, center.y, 11, 0, 2 * Math.PI); // circle
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
				context.arc(center.x, center.y, 19, 0, 2 * Math.PI); // circle
				context.fillStyle = twenyfivepointsColor; //color
				context.fill();
			}
			/*else if (board[i][j] == 2.5) {//Medication
				context.beginPath();
				context.arc(center.x, center.y, 35, 0, 2 * Math.PI); // circle
				context.fillStyle = "pink"; //color
				context.fill();
			}*/
			else if (board[i][j] == 2.5) {//Medication
				context.drawImage(medicineImage,center.x-30,center.y-30, canvas.width/10, canvas.width/10);

			}
			/*else if (board[i][j] == 2.6) {//clock
				context.beginPath();
				context.arc(center.x, center.y, 35, 0, 2 * Math.PI); // circle
				context.fillStyle = "grey"; //color
				context.fill();
			}
			*/

			else if (board[i][j] == 2.6) {//clock
				
				context.drawImage(clockImage,center.x-30,center.y-30, canvas.width/10, canvas.width/10);
			}

			/*else if (board[i][j] == 3) {//extraFifty
				context.beginPath();
				context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = "gold"; //color
				context.fill();
			}
			*/
			else if (board[i][j] == 3) {//extraFifty
				context.drawImage(extraFiftyImage,center.x-30,center.y-30, canvas.width/10, canvas.width/10);

			}

			else if (board[i][j] == 4) { //walls
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}

			/*
			else if (board[i][j] == 5) { //monster
				context.beginPath();
				context.arc(center.x, center.y, 30, 0, 2 * Math.PI); //  circle
				context.fillStyle = "red"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);//eye
				context.fillStyle = "black"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI);//eye
				context.fillStyle = "black"; //color
				context.fill();
			}*/

			else if (board[i][j] == 5) { //monster
				
				context.drawImage(monsterImage,center.x-30,center.y-30, canvas.width/10, canvas.width/10);
			}
		}
	}
}

function UpdatePosition() {
	showSettings();
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
	if (board[shape.i][shape.j] == 2.5) {
		life ++;
		for(var k=0;k<medications.length;k++){
			if(medications[k].i==shape.i && medications[k].j==shape.j){
				board[shape.i][shape.j]=medications[k].z;
			}
		}
	}
	if (board[shape.i][shape.j] == 2.6) {
		timeGame += 30;
		board[clock.i][clock.j] = clock.z; //update the prev values
	}

	if (board[shape.i][shape.j] == 3) {
		score += 50;
		board[extraFifty.i][extraFifty.j] = extraFifty.z; //update the prev values
		window.clearInterval(intervalExtraFifty);
	}
	if (board[shape.i][shape.j] == 5) {//pacman meet monster
		board[shape.i][shape.j] = 0;
		deleteMonsters();
		initMonsters();
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2; //pacmam
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		score -= 10;
		life--;
	}
	else {
		board[shape.i][shape.j] = 2; //pacman
	}
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 100 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 500) {
		window.clearInterval(interval);
		window.clearInterval(intervalMonsters);
		window.alert("Game completed");
		pauseAudio();

	}
	if (life == 0) {//lose
		window.clearInterval(interval);
		window.clearInterval(intervalMonsters);
		window.alert("Loser!");
		pauseAudio();
	}
	if (time_elapsed == timeGame) {//lose
		if (score < 100) {
			window.clearInterval(interval);
			window.clearInterval(intervalMonsters);
			window.alert("You are better than " + score + " points!");
			pauseAudio();
		}
		else {
			window.clearInterval(interval);
			window.clearInterval(intervalMonsters);
			window.alert("Winner!!!");
			pauseAudio();
		}

	}
	else {
		Draw(oldKeyPressedNum);
	}

}

function moveMonsters(){

	for(var k=0; k<monsters.length; k++){
		if( monsters[k].z == 1.1 ||  monsters[k].z == 1.2 ||  monsters[k].z == 1.3 
			|| monsters[k].z == 2.5 || monsters[k].z == 2.6 ){//there was food or medication before

			board[monsters[k].i][monsters[k].j] = monsters[k].z; //update the prev values
		}else
			board[monsters[k].i][monsters[k].j] = 0; //update the prev values

		//monsters[k].x = monsters[k].i;//keep the col where the monster was
		//monsters[k].y = monsters[k].j;//keep the row where the monster was

		if(monsters[k].j < shape.j ){ //monster above pacman
			if(board[monsters[k].i][monsters[k].j+1] < 3){ // no wall or monster or 50
				
				monsters[k].z = board[monsters[k].i][monsters[k].j+1];//keep the value

				monsters[k].j++; 	//go down
			}
			else{ //wall

				if(monsters[k].i < shape.i ){ //monster left to pacman
					if(board[monsters[k].i+1][monsters[k].j] < 3){ // no wall or monster or 50

						monsters[k].z = board[monsters[k].i+1][monsters[k].j];//keep the value

						monsters[k].i++; //go right
					}

				}
				
				else { // //monster right to pacman
					if(board[monsters[k].i-1][monsters[k].j] < 3){ // no wall or monster or 50

						monsters[k].z = board[monsters[k].i-1][monsters[k].j];//keep the value 

						monsters[k].i--; // go left
					}
				}
			}
		}
		
		else if(monsters[k].j > shape.j ){ //monster under pacman
			if(board[monsters[k].i][monsters[k].j-1] < 3){ //no wall or monster or 50

				monsters[k].z = board[monsters[k].i][monsters[k].j-1];//keep the value

				monsters[k].j--; 	//go up

			}
			else{//wall

				if(monsters[k].i < shape.i ){ //monster left to pacman
					if(board[monsters[k].i+1][monsters[k].j] < 3){ // no wall or monster or 50
						
						monsters[k].z = board[monsters[k].i+1][monsters[k].j];//keep the value

						monsters[k].i++;//go right
					}

				}
				
				else { // //monster right to pacman
					if(board[monsters[k].i-1][monsters[k].j] < 3){ // no wall or monster or 50

						monsters[k].z = board[monsters[k].i-1][monsters[k].j];//keep the value

						monsters[k].i--;//go left
					}

				}
			}
		}
		else{ // same row

			if(monsters[k].i < shape.i ){ //monster left to pacman
				if(board[monsters[k].i+1][monsters[k].j] < 3){ //no wall or monster or 50

					monsters[k].z = board[monsters[k].i+1][monsters[k].j];//keep the value

					monsters[k].i++; 	//go right
	
				}
				else{//wall
	
					if(monsters[k].j > 0 ){ //monster not at the first row
						if(board[monsters[k].i][monsters[k].j-1] < 3){ // no wall or monster or 50
					
							monsters[k].z = board[monsters[k].i][monsters[k].j-1];//keep the value

							monsters[k].j--;//go up
						}
					}
					
					else { //monster at first row
						if(board[monsters[k].i][monsters[k].j+1] < 3){ // no wall or monster or 50

							monsters[k].z = board[monsters[k].i][monsters[k].j+1];//keep the value

							monsters[k].j++;//go down
						}

					}
				}
			}
			
			else if(monsters[k].i > shape.i ){ //monster right to pacman
				if(board[monsters[k].i-1][monsters[k].j] < 3){ //no wall or monster or 50

					monsters[k].z = board[monsters[k].i-1][monsters[k].j];//keep the value

					monsters[k].i--; 	//go left
	
				}
				else{
	
					if(monsters[k].j > 0 ){ //monster not at the first row
						if(board[monsters[k].i][monsters[k].j-1] < 3){ // no wall or monster or 50
					
							monsters[k].z = board[monsters[k].i][monsters[k].j-1];//keep the value

							monsters[k].j--;//go up
						}


					}
					
					else { //monster at first row
						if(board[monsters[k].i][monsters[k].j+1] < 3){ // no wall or monster or 50
						
							monsters[k].z = board[monsters[k].i][monsters[k].j+1];//keep the value

							monsters[k].j++;//go down
						}


					}
				}
			}
			/*else{ //same plase -> monsters[k].i == shape.i && monsters[k].j == shape.j
				monsters[k].z = board[monsters[k].i][monsters[k].j];//keep the value
			} */
		}

		if(monsters[k].i == shape.i && monsters[k].j == shape.j){ //same plase after the move of the monster
			deleteMonsters();
			board[shape.i][shape.j] = 0;
			initMonsters();
			var emptyCell = findRandomEmptyCell(board);
			board[emptyCell[0]][emptyCell[1]] = 2; //pacmam
			shape.i = emptyCell[0];
			shape.j = emptyCell[1];
			score -= 10;
			life--;
		}

		board[monsters[k].i][monsters[k].j] = 5;
	}
}

function deleteMonsters(){

	for(var k=0; k<monsters.length; k++){

		if(board[monsters[k].i][monsters[k].j] == 5){//monster was there
			if( monsters[k].z != 2){  //no pacman was there
				board[monsters[k].i][monsters[k].j] = monsters[k].z; //update the prev values --> to keep the food
			}
			else{ // there was pacman --> clean it
				board[monsters[k].i][monsters[k].j] = 0;
			}

		}
	}
}

function moveExtraFifty(){

	if( extraFifty.z == 1.1 ||  extraFifty.z == 1.2 ||  extraFifty.z == 1.3 
		||  extraFifty.z == 2.5 ||  extraFifty.z == 2.6 ){//there was food before

		board[extraFifty.i][extraFifty.j] = extraFifty.z; //update the prev values
	}else{
		board[extraFifty.i][extraFifty.j] = 0; //reset
	}


	let num = Math.floor(randomNumberInRange(1,5));

	if( num == 1){ // up
		if( board[extraFifty.i][extraFifty.j-1] < 4  &&  extraFifty.j > 0 ){ // can go up
			extraFifty.z = board[extraFifty.i][extraFifty.j-1];//keep the value
			extraFifty.j--;
		}
	}
	if( num == 2){ // down
		if( board[extraFifty.i][extraFifty.j+1] < 4  &&  extraFifty.j < 9 ){ // can go up
			extraFifty.z = board[extraFifty.i][extraFifty.j+1];//keep the value
			extraFifty.j++;
		}
	}
	if( num == 3){ // left
		if( board[extraFifty.i-1][extraFifty.j] < 4  &&  extraFifty.i > 0 ){ // can go up
			extraFifty.z = board[extraFifty.i-1][extraFifty.j];//keep the value
			extraFifty.i--;
		}
	}
	if( num == 4){ // right
		if( board[extraFifty.i+1][extraFifty.j] < 4  &&  extraFifty.i < 9 ){ // can go up
			extraFifty.z = board[extraFifty.i+1][extraFifty.j];//keep the value
			extraFifty.i++;
		}
	}
	board[extraFifty.i][extraFifty.j] = 3;
}


function newGame(){
	window.clearInterval(interval);
	window.clearInterval(intervalMonsters);
	window.clearInterval(intervalExtraFifty);
	//start_time = new Date();
	Start();
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