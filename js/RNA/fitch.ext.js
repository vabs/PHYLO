(function(){
	$.fitch.scoreRNA = function() {
			if($.main.type != "DNA")

			if($.stage.statsRNA == undefined)
			$.stage.statsRNA = {};
			$.stage.statsRNA.match = 0
			$.stage.statsRNA.mismatch = 0;
			$.stage.statsRNA.open = 0; 
			$.stage.statsRNA.extend = 0;
			$.stage.statsRNA.sMatch =0;
			var score = $.fitch.scoreGet($.stage.current);
			return score;
		},
	$.fitch.scoreGetRNA = function(stage) {
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
			var arr2 = [];
			var seq2 = [];
			var counterL = 0;
			var pointer = 0;
			var countP = 0;
			var check1 = [];
			var check2 = [];
			var store = [];
			//new arrays arr2 and seq2 keeps track of pairing number
			//store structure in arr to arr2 by numbering them 0 to x
			for (var ii=0;ii<arr.length;ii++){
				if (arr[ii] == "1"||arr[ii] == "2"||arr[ii] == "3"||arr[ii] == "4"){ //numbering "("
					arr2.push(counterL);
					store.push(counterL);
					counterL++;
				} else if (arr[ii] == "5"||arr[ii] == "6"||arr[ii] == "7"||arr[ii] == "8"){ //numbering ")"
					arr2.push(store.pop());
				} else {
					arr2.push(arr[ii]);
				}
			}
			store = [];
			counterL = 0;
			//store structure in seq to seq2 and number them
			for (var ii=0;ii<seq.length;ii++){
				if (seq[ii] == "1"||seq[ii] == "2"||seq[ii] == "3"||seq[ii] == "4"){ // "("
					seq2.push(counterL);
					store.push(counterL);
					counterL++;
				} else if (seq[ii] == "5"||seq[ii] == "6"||seq[ii] == "7"||seq[ii] == "8"){ //")"
					seq2.push(store.pop());
				} else {
					seq2.push(seq[ii]);
				}
			}
			counterL = 0;
			store = [];
				for(var i=0;i<arr.length;i++) {
					if (arr[i] != "x" || seq[i] != "x") {
						if (arr[i] != "x" && seq[i] != "x") {
							if (seq[i] == arr[i]) {
								log.match++;
								if ((seq[i] == "2" || seq[i] == "3" ||seq[i] == "4" || seq[i] == "1") && (arr[i] == "1" || arr[i] == "2" || arr[i] == "3" ||arr[i] == "4")) {
									check1.push(seq2[i]);	//when "(" match is found, store numbering in arr2 and seq2 into check1 & check2 
									check2.push(arr2[i]);
									store.push(counterL);	//store numbering for pair
									counterL++;
								}
								if ((seq[i] == "5" || seq[i] == "6" ||seq[i] == "7" || seq[i] == "8") && (arr[i] == "5" || arr[i] == "6" || arr[i] == "7" ||arr[i] == "8")) {
									pointer = store.pop();		//when ")" match is found, pop latest numbering from store
									if (check1[pointer] == seq2[i] && check2[pointer] == arr2[i]){ //check for corresponding pair stored in array check1&2
										log.sMatch++;	//if they match, increment structure match
									}
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
									check1.push(seq2[i]);	//same as above
									check2.push(arr2[i]);
									store.push(counterL);
									counterL++;
									log.mismatch++;
								}
								else if ((seq[i] == "5" || seq[i] == "6" ||seq[i] == "7" || seq[i] == "8") && (arr[i] == "5" || arr[i] == "6" || arr[i] == "7" ||arr[i] == "8")) {
									pointer = store.pop();
									if (check1[pointer] == seq2[i] && check2[pointer] == arr2[i]){
										log.sMatch++;
									}
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
				return log;
			};
			var score = 0;
			//score alignments in pair 
			if ($.stage.current == 0){
				var a = $.sequence.nucArray($.sequence.track[0]);
				var b = $.sequence.nucArray($.sequence.track[1]);
				var log = trace(a,b);
				score+=tabulate(log);
				$.stage.statsRNA.match += parseInt(log.match);
				$.stage.statsRNA.mismatch += parseInt(log.mismatch);
				$.stage.statsRNA.open += parseInt(log.open);
				$.stage.statsRNA.sMatch += parseInt(log.sMatch);
				$.stage.statsRNA.extend += parseInt(log.extend);
			} else {
			for (var it=0;it<=$.stage.current;it++){
				var a = $.sequence.nucArray($.sequence.track[it]);
				for (var lt=it+1;lt<=$.stage.current+1;lt++){
					var b = $.sequence.nucArray($.sequence.track[lt]);
					var log = trace(a,b)
					score+=tabulate(log);
					$.stage.statsRNA.match += parseInt(log.match);
					$.stage.statsRNA.sMatch += parseInt(log.sMatch);
					$.stage.statsRNA.mismatch += parseInt(log.mismatch);
					$.stage.statsRNA.open += parseInt(log.open);
					$.stage.statsRNA.extend += parseInt(log.extend);
					}
				}
			}
			return score;
		},
		
	};
})();
