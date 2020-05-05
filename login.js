$(document).ready(function () {
	$('#loginForm').submit(function () {
	let b=checkUser();
		if(b==true){
			swapDiv('settings');
			return false;
		}
		if(b==false){
			//swapDiv('welcome');
			window.alert("Error: check user or password");
			return false;
		}

	});
});

function checkUser() 
   {

	let username = $('#loginForm').find('input[name="username"]').val();
	let password = $('#loginForm').find('input[name="password"]').val()
	
	if(localStorage.getItem(username) == password){
		//alert("good! go to the game");
		return true;
	}
	//alert("wrong user name or password, try agein");
	return false;
	
   }
   function swapDiv(newDiv) {
	var i, content;
	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.display = "none";
	}
	document.getElementById(newDiv).style.display = "block";
  
  }