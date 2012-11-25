(function(){
	$.endGame.completeRNA = function() {
			var self = this;
			if (!document.getElementById('endGame-download')){
				var t = document.createElement('div');
				t.id = "endGame-download";
				$("#endGame-replay").append(t);
				var d = document.createElement('button');
				d.className = 'btn btn-primary';
				d.id = 'dlButton';
				document.getElementById('endGame-download').appendChild(d);
				var a = document.createElement('a');
				a.id = 'Download-solution';
				a.className = 'Download-solution';
				a.style.color = "white";
				a.download = "solution.fa";
				a.innerHTML = 'Download';
				document.getElementById('dlButton').appendChild(a);
				}
			$.multiSelect.deactive();
			$.protocal.sendEndGameScore("completed", function(data) {
				self.eventsRNA();
				self.score("completed",data.best_score);
				//var msg = "<b>Congratulations!</b> You have solved the puzzle";
				var msg = window.lang.body.play.gameselect["end of game"]["field 3"];
				$("#endGame-text").html(msg);
				$("#endGame-learnMore-content").html(self.learnMore(data));
				$("#endGame").fadeIn();
			});

		},
	$.endGame.eventsRNA = function() {
			$("#endGame-learnMore-content").hide();
	
			$("#endGame-learnMore-tag button").unbind().click(function() {
				$("#endGame-learnMore-content").slideToggle("fast",function() {

				});
			});

			$("#endGame-new button").unbind().click(function() {
				//window.location.reload(true);
				$("#game").hide();
				$("#endGame").fadeOut();
				$("#custom_inputfile1").remove();
				$("#store_sequence").remove();
				$("#store_structure").remove();
				$("#store_name").remove();
				interactiveMenu.restart();
				$("#draw").show();
				$("#menu").fadeIn();
				//window.location.hash = "#!play";
			});
				
			$("#endGame-replay button").unbind().click(function(){
				$.main.clear();
				$("#endGame").fadeOut();
				$("#tree").html("");
				$("#gameBoard").html("<img src='img/loading.gif'/>");
				$.protocal.replay();
				$("#countDown-text").html("<img src='img/loading.gif'/>");
				$("#countDown").fadeIn();
			});
			
			$("#endGame-download button").unbind().click(function(){
			    var a = document.getElementById('Download-solution');
				var data = $.board.getJsonAlignmentsRNA();
				var name = $.phylo.get.name;
				var counter = 0;
				for (var i=0;i<data.length;i++){
				data = data.replace('{',"");
				data = data.replace('}',"");
				}
				var str = "";
				var j = eval("[{"+data+"}]")[0];
				for (var i = 0;i < j.alignments.length;i++){
					for(var l=j.alignments[i].length;l>0;l--){
						if (j.alignments[i].charAt(l-1) == "-"){
							j.alignments[i] = j.alignments[i].substring(0,j.alignments[i].length-1);
							j.structure[i] = j.structure[i].substring(0,j.structure[i].length-1);
						} else {
							l = 0;
						}
					}
					if (j.alignments[i] != ""){
					str+=name[i+counter]+"\n"+j.alignments[i]+"\n"+ name[i+counter+1]+ "\n"+j.structure[i]+"\n";
					counter++;
					}
				}
				var v = 'data:text/csv;base64,' + window.btoa(str);
			    $('#Download-solution').attr('href',v);
			});
 
            $("#endGame-share button").unbind().click(function(){
                console.log("Click share event");
                $.endGame.share('test');
            });
		}
		}
})();
