(function() {
	$.protocal.requestRNA = function(setting) {
			var str ="";
			var type = this.tp;
			var score = this.score;
			if (type == "custom"){
				var seqStore = document.createElement('p');
				seqStore.id = 'store_sequence';
				seqStore.innerHTML = "readySeq";
				$("body").append(seqStore);
				var strStore = document.createElement('p');
				strStore.id = 'store_structure';
				strStore.innerHTML = "readyStr";			
				$('body').append(strStore);
				var nameStore = document.createElement('p');
				nameStore.id = 'store_name';
				nameStore.innerHTML = "readyName";
				$('body').append(nameStore);
			    var hseq = document.getElementById('custom_inputfile1');
			    if (!hseq.files[0]) {
			    	alert("file input is not found");
			    }
				
				function send(){
			    	alert("entered");
					    var sequenceData = document.getElementById('store_sequence').innerHTML;
					    var streData = document.getElementById('store_structure').innerHTML;
					    var nameData = document.getElementById('store_name').innerHTML;
					    var structureData = streData.replace("/\n/g","");
					    var dummy2 = '{"level":{"attributes":{"id":"1462"},"sequence":['+ sequenceData + '],"structure":[' + structureData + '],"name":['+nameData+']}}';
					   // var dummy = '{"level":{"attributes":{"id":"1462"},"sequence":["UGGCUAGU","UGGCUGGUGA"],"structure":[".((..)).","...((..))."],"tree":"(((hg19,rheMac2),mm9),(bosTau4,canFam2));"}}';
						$.protocal.previousData = dummy2;
						try {
							var j = eval("["+dummy2+"]")[0].level;
						} catch(err) {
							if(DEBUG)
								alert(err);
								console.log(err);
							return;
						}
						$.phylo.id = j.attributes.id;
						for(var i =0;i<j.sequence.length;i++) {
							j.sequence[i] = (j.sequence[i].replace(/-/g,"_")).toUpperCase();
						}	
						for(var i =0;i<j.structure.length;i++) {
							j.structure[i] = j.structure[i].replace(/-/g,"_");
						}	
						for(var i =0;i<j.name.length;i++) {
							j.name[i] = j.name[i].replace('&gt;',">");
						}	
						for(var i = 0; i < j.sequence.length;i++) {
							if (j.sequence[i].length != j.structure[i].length){
								alert("Incorrect file format");
								return;
							}
						}
						$.phylo.get = {};
						$.phylo.get.RNAsequence = j.sequence;
				    	$.phylo.get.structure = j.structure;
				    	$.phylo.get.name = j.name;
						if(DEBUG) {
							j.sequence;
						}
						check = 0;
						document.getElementById('store_structure').innerHTML = "readyStr";
						document.getElementById('store_sequence').innerHTML = "readySeq";
						document.getElementById('store_name').innerHTML = "readyName";
						$.rna.callBack();
			    }
				
			    function handleFileSelect2(evt) {
			        var file = evt.files[0]; 
			        var countline = 0;
			        	var reader = new FileReader();
			          	reader.onloadend = function rSeq(e) {
			          		var f2 = e.target.result.split("\r\n");
			          		if (f2[0].charAt(0) != ">"){
			          			alert("Incorrect file format")
			          			return;
			          		}
						for (var i = 0;i < f2.length;i++){
							if (f2[i].charAt(0) == ">") {
								if (f2[i+1] == ""){
									alert("Incorrect file format");
									return;
								}
								if (document.getElementById('store_name').innerHTML == "readyName") {
									document.getElementById('store_name').innerHTML = '"'+f2[i]+'"';
								} else {
									document.getElementById('store_name').innerHTML += ',"'+f2[i]+'"';
								}
								if ((countline%2) == 0 || countline == 0) {
									if (document.getElementById('store_sequence').innerHTML == "readySeq"){
										document.getElementById('store_sequence').innerHTML = '"'+ f2[i+1] + '"';
									} else {
										document.getElementById('store_sequence').innerHTML += ',"'+f2[i+1] + '"';
									}
									countline++;
								} else {
									if (document.getElementById('store_structure').innerHTML == "readyStr"){
										document.getElementById('store_structure').innerHTML = '"' + f2[i+1]+ '"';
									} else {
										document.getElementById('store_structure').innerHTML += ',"' + f2[i+1] + '"';
									}
									countline++;
								}
								
							}
						}
						send();
					}
			          reader.readAsText(file);
			       }
				   
			    handleFileSelect2(hseq);		 //calls function to handle input file
			    return;							//function halts until read is done
			   }
			if(type == "random") {
				str+= "mode=1&diff="+score;

			} else if(type == "disease") {
				mode = 2;
				str+= "mode=2&id="+score;

			} else if(type == "level") {
				mode = 2;
				str+= "mode=2&id="+score;
			}

			//console.log(str);

			$.ajax({
				url : url,
				data : str,
				type : "POST",
			}).done(function(data) {
				console.log(data);
				data = data.replace("@","");
				$.protocal.previousData = data;
				if(DEBUG)
					console.log(data);
				try {
					var j = eval("["+data+"]")[0].level;
				} catch(err) {
					if(DEBUG)
						console.log(err);
					return;
				}
				$.phylo.id = j.attributes.id;
				for(var i =0;i<j.sequence.length;i++) {
					j.sequence[i] = (j.sequence[i].replace(/-/g,"_")).toUpperCase();
				}	
				$.phylo.get = {};
				$.phylo.get.RNAsequence = j.sequence;
				
				if(DEBUG) {
					j.sequence;
				}
				$.main.callBack();

			}).fail(function() {
			/* this part runs the dummy data */
			//	var dummy = '{"level":{"attributes":{"id":"3071"},"sequence":["-----GAGGATCCAGC-----","-----GAGGCTCAAGC-----","TTTTGAAAACTAGATA-----","-----GGAGTCTAAAA-----","-----AGGCGCTAAAAACAAA","------GGAACTCCAA-----","-----AGGGCGAAAAC-----","-----AGGCTCCAATG-----"],"tree":"((((hg19,rheMac2),mm9),(bosTau4,(canFam2,pteVam1))),(loxAfr3,dasNov2));"}}';
				//var dummy = '{"level":{"attributes":{"id":"1926"},"sequence":["---agagtgactcccag----","----gagagatatagag----","---GGGTGAAGGGGTGG----","-TCGAGATTCCCCCGAAGACA","---agagtgacccccag----"],"tree":"((((hg19,rheMac2),mm9),canFam2),loxAfr3);"}} ';
				//var dummy = '{"level":{"attributes":{"id":"1462"},"sequence":["CCTT-CGAAG-----TAAGAA","CCTT-CGAAG-----TGAGAA","CCC--TGGTG-----TAAGAT","GAGG-CAGGC-----------","gcag-cgggc---agcgggcg"],"tree":"(((hg19,rheMac2),mm9),(bosTau4,canFam2));"}}';
				//var dummy = '{"level":{"attributes":{"id":"1354"},"sequence":["CAGA-------------TGCG","CGGG-------------AG--","GGGTTCCAccccgcccccggg","GGGG-------------CGGG","GGCC-------------TACG","--GC-------------TTGG"],"tree":"(((hg19,mm9),(canFam2,pteVam1)),(loxAfr3,dasNov2));"}}';
				//var dummy = '{"level":{"attributes":{"id":"172"},"sequence":["----AGCGG---GG---AGTG","----TGAGA---GG---TGTA","----GGTGG---AG-------","----GAAAG---AG---CGAG","----GGGGA---TG---CGGG","GGGACCCCG---GG---AGGC","GGGTCCCAG---AG-------"],"tree":"(((hg19,mm9),(bosTau4,(canFam2,pteVam1))),(loxAfr3,dasNov2));"}}';
				//var dummy = '{"level":{"attributes":{"id":"513"},"sequence":["------CTC-ATGCAGTGAAA","------CCC-ATGCAG-----","------GCT-CCGAGG-----","-AGCTCTCT-GCCGGG-----"],"tree":"(((hg19,rheMac2),mm9),loxAfr3);"}}';
				//var dummy = '{"level":{"attributes":{"id":"1505"},"sequence":["---TCC----CAG-----CTG","CCCTCC----CAA-----CTC","---CCT----CAGCGGGCCC-","-----------------AGCC","---Tctgccctcacggaacac"],"tree":"(((hg19,rheMac2),(bosTau4,canFam2)),loxAfr3);"}}';
				//var dummy = '{"level":{"attributes":{"id":"3394"},"sequence":["----A-----------CTTCT","----A-----------CTTCT","----G----AGTGGGCCTGGG","----GTACCTGCGCGTCCAGG"],"tree":"((hg19,rheMac2),(bosTau4,canFam2));"}}';
				//var dummy = '{"level":{"attributes":{"id":"18"},"sequence":["cggcgcgcgccg---------","tggtgtgtgtgt---------","AGCCGCCAGCGC---------","AGGAGCCCATCT---------","TTGGGC-CTCTC---------","gTGCGCGCACTC---------","ACACACACACGCAGGgggagg"],"tree":"(((hg19,(galGal3,taeGut1)),xenTro2),((tetNig2,fr2),gasAcu1));"}}';
				var dummy = '{"level":{"attributes":{"id":"1505"},"structure":["---(((----......","((()))----...-----...","---(((----)))....","-----------------((((","---.................."],"sequence":["---UCC----CAGCUG","CCCUCC----CAA-----CUC","---CCU----CAGCGGG","-----------------AGCC","---UcUgcccucacggaacac"]}}';

				console.log(">> Cannnot connect to database");
				console.log(">> loading dummy data");
				$.protocal.previousData = dummy;
				try {
					var j = eval("["+dummy+"]")[0].level;
				} catch(err) {
					if(DEBUG)
						console.log(err);
					return;
				}
				$.phylo.id = j.attributes.id;
				for(var i =0;i<j.sequence.length;i++) {
					j.sequence[i] = (j.sequence[i].replace(/-/g,"_")).toUpperCase();
				}	
				for(var i =0;i<j.structure.length;i++) {
					j.structure[i] = j.structure[i].replace(/-/g,"_");
				}	
				$.phylo.get = {};
				$.phylo.get.RNAsequence = j.sequence;
				$.phylo.get.structure = j.structure;
				if(j.sequence.length != j.structure.length){
					alert("# mismatch");
				}
				for(var i=0;i<j.sequence.length;i++) {
					if(j.sequence[i].length != j.structure[i].length){
						alert("length mismatch");
					}
				}
				if(DEBUG) {
					j.sequence;
				}
				$.phylo.get.name = [">1",">2",">3",">4",">5",">6",">7",">8",">9",">10"];
				$.rna.callBack();
			});
		},
	};
})();
