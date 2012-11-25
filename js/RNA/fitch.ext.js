(function(){
	$.fitchRNA = {
		//calls to get the score
		score : function() {

			if($.main.type != "DNA")

			if($.stage.stats == undefined)
				$.stage.stats = {};
			$.stage.stats.match = 0
			$.stage.stats.mismatch = 0;
			$.stage.stats.open = 0; 
			$.stage.stats.extend = 0;
			$.stage.stats.sMatch =0;

			var score = $.fitch.scoreGet($.stage.current);
			return score;
		},
		//gets the sequence length
		getLen : function() {
			return $.phylo.seqLen;
		},
		scoreGet : function(stage) {

			function tabulate(a) {
				var weight = {
					match : 1,
					mismatch : -1,
					open : -4,
					sMatch : 1,
					extend : -1
				};
				return (a.match		*	weight.match	+
						a.mismatch	*	weight.mismatch	+
						a.sMatch    *   weight.sMatch   +
						a.open		*	weight.open		+
						a.extend	*	weight.extend);
			}
			
			function trace(arr,seq) {
				var log = {
					match : 0,
					mismatch : 0,
					open : 0,
					sMatch : 0,
					extend : 0
				};
				
			function isGap(nucleotide) {
				return nucleotide == "x";
				};

			var sizeArr = arr.length - arr.filter(isGap).length;
			var sizeSeq = seq.length - seq.filter(isGap).length;
			var countArr = 0;
			var countSeq = 0;
			var gapMemory = 0;

				for(var i=0;i<arr.length;i++) {
					if (arr[i] != "x" || seq[i] != "x") {
						if (arr[i] != "x" && seq[i] != "x") {
							if (seq[i] == arr[i]) {
								log.match++;
								if(seq[i] != "A"&&seq[i] != "G"&&seq[i]!="C"&&seq[i]!="U"){
								log.sMatch++;
								}
							} else {
								if ((seq[i] == "A" || seq[i] == "1" || seq[i] == "5") && (arr[i] == "A" || arr[i] == "1" ||arr[i] == "5")){
									log.match++;
								}
								else if ((seq[i] == "2" || seq[i] == "6" || seq[i] == "G") && (arr[i] == "G" || arr[i] == "2" ||arr[i] == "6")){
									log.match++;
								}
								else if ((seq[i] == "3" || seq[i] == "7" || seq[i] == "C") && (arr[i] == "C" || arr[i] == "3" ||arr[i] == "7")){
									log.match++;
								}
								else if ((seq[i] == "U"||seq[i] == "4" || seq[i] == "8") && (arr[i] == "U" || arr[i] == "4" ||arr[i] == "8")){
									log.match++;
								}
								else if ((seq[i] == "2" || seq[i] == "3" ||seq[i] == "4" || seq[i] == "1") && (arr[i] == "1" || arr[i] == "2" || arr[i] == "3" ||arr[i] == "4")) {
									log.sMatch++;
									log.mismatch++;
								}
								else if ((seq[i] == "5" || seq[i] == "6" ||seq[i] == "7" || seq[i] == "8") && (arr[i] == "5" || arr[i] == "6" || arr[i] == "7" ||arr[i] == "8")) {
									log.sMatch++;
									log.mismatch++;
								} else {
								log.mismatch++;
								}
							}
							countArr++;
							countSeq++;
							gapMemory = 0;
						} else if (arr[i] != "x" && seq[i] == "x") {
							if (countSeq > 0 && countSeq < sizeSeq) {
								if (gapMemory == 1) {
									log.extend++;
								} else {
									log.open++;
									gapMemory = 1;
								}
							}
							countArr++;
						} else if (arr[i] == "x" && seq[i] != "x") {
							if (countArr > 0 && countArr < sizeArr) {
								if (gapMemory == 2) {
									log.extend++;
								} else {
									log.open++;
									gapMemory = 2;
								}
							}
							countSeq++;
						}
					}
				}
/*
				for(var i=0;i<arr.length;i++) {
					if (arr[i] == "x") {
						if (seq[i] != "x") {
							if (i != 0 && arr[i-1] == "x" && seq[i-1] == "x") {
								log.extend++;
							}
							else {
								log.open++;
							}
						}
							
					}
					else if (seq[i] == "x") {
						if (i != 0 && (seq[i-1] == "x" && arr[i-1] != "x")) {
							log.extend++;
						}
						else {
							log.open++;
						}
					}
					else if (seq[i] == arr[i] || seq[i] == arr[i]) {
						log.match++;
					}
					else {
						log.mismatch++;
					}
				}
*/
				return log;
			};
			var score = 0;
			//alert($.stage.current);
			if ($.stage.current == 0){
				var a = $.sequence.nucArray($.sequence.track[0]);
				var b = $.sequence.nucArray($.sequence.track[1]);
				alert(a);
				alert(b);
				var log = trace(a,b);
				score+=tabulate(log);
				$.stage.stats.match += parseInt(log.match);
				$.stage.stats.mismatch += parseInt(log.mismatch);
				$.stage.stats.open += parseInt(log.open);
				$.stage.stats.extend += parseInt(log.extend);
			} else {
			for (var it=0;it<=$.stage.current;it++){
				//alert(it);
				//alert($.stage.current);
				//alert($.sequence.nucArray($.sequence.track[it]));
				var a = $.sequence.nucArray($.sequence.track[it]);
				//alert(a);
				for (var lt=it+1;lt<=$.stage.current+1;lt++){
					var b = $.sequence.nucArray($.sequence.track[lt]);
					alert(lt);
					alert(b);
					var log = trace(a,b)
					score+=tabulate(log);
					$.stage.stats.match += parseInt(log.match);
					$.stage.stats.mismatch += parseInt(log.mismatch);
					$.stage.stats.open += parseInt(log.open);
					$.stage.stats.extend += parseInt(log.extend);
					}
				}
			}

			return score;
		},
		
	};
})();
