(function(){
	$.endGame = {
		new_init : function(status) {
			console.log(status);	
			$("#endGame").show();
			
			var msg = "";
			
			if(status == "win") {
				msg = "You have solved the puzzle";
			} else {
				msg = "Sucks you couldnt sove it.";
			}

			$("#endGame-text").html(msg);
				
			$("#endGame-learnMore-content").html("This disease is related to diseases etc, you are helping...etc");

		},
	}
})();