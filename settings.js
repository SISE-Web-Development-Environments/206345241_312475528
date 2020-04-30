

$(document).ready(function () {

	// validate signup form on keyup and submit
	$("form[name='settingsForm']").validate({
		rules: {
			up: {
				required: true
			},
			down: {
				required: true				
			},
			left: {
				required: true
			},
			right: {
				required: true
			},
			food: {
				required: true
			},
			fivepoints: {
				required: true
			},
			fifteenpoints: {
				required: true
			},
			twentyfivepoints: {
				required: true
			},
			time: {
				required: true
			},
			monsters: {
				required: true
			}

		},
			messages: {

		},
		submitHandler: function (form) {
			saveDetails();
			form.submit();

		}
	});


});


function swapDiv(newDiv) {
	var i, content;
	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.display = "none";
	}
	document.getElementById(newDiv).style.display = "block";
  
  }

function saveDetails() 
   {
	let details = new Array();
	details[0] = $('#settingsForm').find('input[name="up"]').val();
	details[1] = $('#settingsForm').find('input[name="down"]').val();
	localStorage.setItem("det", details);

   }  