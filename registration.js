

$(document).ready(function () {

	localStorage.setItem("p","p");
	$.validator.addMethod("checkPsw", function(value) {
		let letter = /[a-zA-Z]/; 
		let number = /\d/; 
		return (value.match(letter) && value.match(number)); 
		
	 });

	 $.validator.addMethod("checkName", function(value) {
		let letter = /[a-zA-Z]/; 
		let number = /\d/; 
		return (value.match(letter) && !value.match(number)); 
	 }); 

	// validate signup form on keyup and submit
	$("form[name='signupForm']").validate({
		rules: {
			username: {
				required: true
			},
			firstname: {
				required: true,
				checkName: true
				
			},
			lastname: {
				required: true,
				checkName: true
			},
			password: {
				required: true,
				minlength: 6,
 				checkPsw: true
			},
			email: {
				required: true,
				email: true
			},
			date: {
				required: true,
				date: true
			}
		},
			messages: {
			username: "Please enter a username",
			firstname: {
				required: "This field cannot be empty",
				checkName: "This field cannot be with numbers"
			},
			lastname: {
				required: "This field cannot be empty",
				checkName: "This field cannot be with numbers"
			},
			password: {
				required: "This field cannot be empty",
				minlength: "password must be at least 6 characters",
				checkPsw: "This field have to be with numbers and letters"
			},
			email: {
				required: "This field cannot be empty",
				email: "Please enter a valid email address"
			},
			date: {
				required: "This field cannot be empty"
			}
		},
		submitHandler: function (form) {
			saveNameAndPassword();
			form.submit();
			swapDiv('login');
		}
	
	});

});



/* function swapDiv(newDiv, oldDiv) {

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

function saveNameAndPassword() 
   {
	let username = $('#signupForm').find('input[name="username"]').val();
	let password = $('#signupForm').find('input[name="password"]').val();
	localStorage.setItem(username, password);

//	let username=$('#signupForm').getElementById("username");
//	let password=$('#signupForm').getElementById("password");
//	localStorage.setItem(username.value,password.value);

   }  