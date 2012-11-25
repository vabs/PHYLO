(function() {
	$(document).ready(function() {
		$.rna = {
			clear : function() {
				$.timer.stop();
				$.stage.current = -1;
			//	$("#countDown-text").html(3);
				$("#countDown-text").html('<img src="img/loading.gif>');
				$("#countDown").show();
				$("#endGame").hide();
				/*
				$("#tree").html();
				var canvas  = document.getElementById("score");
				var c = canvas.getContext("2d");
				c.clearRect(0,0,$.html5.score.settings.wBox, $.html5.score.settings.hBox);
				*/
			},
			//configuration
			init : function(setting) {
				$.main.type = "RNA";
				this.clear();
				if($("#tree").css("height") == undefined) {
					height = 178;
				} else {
					height = $("#tree").css("height").replace(/px/,"");
				}
				$.endGameRNA.runAway();
				$.phylo = {
					seqLen : 25,
					x : 34,
					offSet : 0,//$("#gameBoard").css("left").replace(/px/,""),
					height : height,//$("#tree").css("height").replace(/px/,""),
					rows : 10,
				};
				$.lang.init(function() {
					$("#game").show();
					$.protocal.read(setting);
					$.protocal.requestRNA();
					//$.endGame.init("lose");
				});
			},
			//call back on protocal complete
			//sets the layout and activates the game
			callBack : function() {
				//sets the gameBoard to be nonMovable on touch devices.
				$.events.touch("#gameBoard",{
					start: function(e) {
					}, move : function(e) {
					}, end : function(e) {
					}
				});
				var mouseMove = "onmousemove" in document.documentElement;

				if(DEBUG)
					console.log($.phylo);
				//$.phylo.tree = $.tree.build($.phylo.get.tree);
				$.board.build();
				$.sequence.buildRNA($.phylo.get.RNAsequence, $.phylo.get.structure);
				//alert("work2");
				$.sequence.prepareTracking($.phylo.get.sequenceRNA);

				$.phylo.origin = [];
				for(var i=0;i<8;i++){
					var t = [];
					for(var j=0;j<25;j++) {
						t.push(0);		
					}
					$.phylo.origin.push(t);
				}

				$.helper.copy($.phylo.origin, $.sequence.track);
				//$.phylo.origin = $.sequence.track.slice(0);
				if(DEBUG) {
					console.log("Before Random");
					console.log($.sequence.track);
				}
				var random = $.sequence.randomize($.sequence.track);
				$.sequence.prepareTracking(random);
				if(DEBUG) {
					console.log("Randomized Sequence");
					console.log(random);
				}
				$.phylo.domCache = $.sequence.createCache();
				$.physics.snapRandom();

				if(DEBUG) {
					console.log("original")
					console.log($.phylo.origin);
					console.log("tracked");
					console.log($.sequence.track);
					//console.log($.phylo.tree);
				}
				$.stage.last = ($.phylo.get.RNAsequence.length-2);
				$.customize.default();

				if(window.DEV.disableSplash) {
					$("#countDown").hide();
					$.stage.end = false;
					$.stage.roundRNA();	
					if(DEBUG)
						$.helper.dump($.sequence.track);
					if(mouseMove) {
						$.multiSelect.active();
					}
				} else {
					$("#countDown").show();
					$.splash.countDown(function() {
						//start game
						$.stage.end = false;
						$.stage.roundRNA();	
						if(DEBUG)
							$.helper.dump($.sequence.track);
						if(mouseMove) {
							$.multiSelect.active();
						}
					});
				}
				$.sequence.checkEachRowLength();
				$.board.startListener();
			},
		};

	//	$.main.init();
	});
})();
