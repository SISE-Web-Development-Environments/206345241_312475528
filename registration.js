$.validator.setDefaults({
	submitHandler: function() {
		alert("submitted!");
	}
});
$(document).ready(function () {

	// validate signup form on keyup and submit
	$("#signupForm").validate({
		rules: {
			username: {
				required: true
			},
			firstname: {
				required: true,
				regexp: "^[a-zA-Z]*$"
			},
			lastname: {
				required: true,
				regexp: "^[a-zA-Z]*$"
			},
			password: {
				required: true,
				minlength: 6,
				regexp: "^[a-zA-Z0-9]*$"
			},
			email: {
				required: true,
				email: true
			},
			date: {
				required: true
			},
			messages: {
				username: "Please enter a username",
				firstname: {
					required: "This field cannot be empty",
					regexp: "first name must contains only letters"
				},
				lastname: {
					required: "This field cannot be empty",
					regexp: "last name must contains only letters"
				},
				password: {
					required: "This field cannot be empty",
					minlength: "password must be at least 6 characters",
					regexp: "password must contain only numbers and letters"
				},
				email: {
					required: "This field cannot be empty",
					email: "Please enter a valid email address"
				},
				date: {
					required: "This field cannot be empty"
				}			}
		}
	});
});






function swapDiv(newDiv, oldDiv) {

	$(newDiv).hide();
	$(oldDiv).show();
	document.getElementById(newDiv).style.display = "block";
	document.getElementById(oldDiv).style.display = "none";
}