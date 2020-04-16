function swapDiv(newDiv, oldDiv) {

	document.getElementById(newDiv).style.display = "block";
	document.getElementById(oldDiv).style.display = "none";

}
document.getElementById("myForm").onsubmit = function() {submitFunc()};
function submitFunc(){

	alert( "hi" );

}