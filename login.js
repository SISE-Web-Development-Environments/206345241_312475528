$(document).ready(function () {
	$('#loginForm').submit(function () {
		checkUser();


});
});

function checkUser() 
   {

	let username = $('#loginForm').find('input[name="username"]').val();
	let password = $('#loginForm').find('input[name="password"]').val()
	
	if(localStorage.getItem(username) == password){
		swapDiv( 'game','login');
		alert("good");

		return false;
	}
	alert("wrong");
	return false;

	
   }

/* 
function swapDiv(newDiv, oldDiv) {

	document.getElementById(newDiv).style.display = "block";
	document.getElementById(oldDiv).style.display = "none";
} */

function swapDiv(newDiv) {
	var i, content;
	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.display = "none";
	}
	document.getElementById(newDiv).style.display = "block";
  
  }
