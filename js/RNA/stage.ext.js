(function() {
	$.stage.roundRNA = function()  {	
			if(this.current < this.last){
				this.current+=1;
				this.setRNA(this.current);
			} else if(this.current === this.last) {
				this.end = true;
				$.timer.stop();
				$.endGame.completeRNA();  //completeRNA
				return "end game";
			} 
	},
	$.stage.setRNA = function(x) {	
			if(x == 0)
				$.timer.start();
			$.engine.deActive();
			$(".boardRow").removeClass("current").removeClass("blocked");
			var addClass = function(n) {
				var g = n+1;
				for(var i=g;i>=0;i--) { //increment by 1 each stage
					$("#row"+i).removeClass("hidden").addClass("current");
				}
			}
			this.splash(x);
			addClass(x);
			if(x == 0) {
				$("#bg").show("slide",{direction : "left"},400);
			}
			$(".boardRow").each(function() {
				if($(this).hasClass("hidden") == false && $(this).hasClass("current") == false) {
					$(this).addClass("blocked");
				}
			});
			$.engine.active();
			var tmp = [];
			$.phylo.bestTrack = [];
			for(var i=0;i<8;i++) {
				var t = [];
				for(var j=0;j<$.phylo.seqLen;j++) 
					t.push(0);
				tmp.push(t);
				$.phylo.bestTrack.push(t);
			}
					
			$.helper.copy(tmp, $.sequence.track);
			//var tmp = $.sequence.track.slice(0);
			$.helper.copy($.sequence.track, $.phylo.origin);
			//$.sequence.track = $.phylo.origin.slice(0);
			//set par score
			var par = $.fitch.scoreRNA();
			$.helper.copy($.sequence.track, tmp);
			//$.sequence.track = tmp.slice(0);
			$.sequence.par = par;
			$.board.par(par);
			var score = $.fitch.scoreRNA();
			$.phylo.bestScore = score;
			$.board.score(score);
			//
			$.helper.copy($.phylo.bestTrack, $.sequence.track);
			//$.phylo.bestTrack = $.sequence.track.slice(0);
			$.board.bestScore(score);
			if(score >= par) {
				$.board.approve();
			} else {
				$.board.unapprove();
			}
			$.board.stats();
		},
		//to tell if the game ended yet
		end : false,
		//the next stage splash notification
		splash: function(x) {
			$("#splash").html("Stage "+(x+1)).show();
			window.setTimeout(function(){
				$("#splash").fadeOut("fast");
			},800);
			
		}
	};
})();
