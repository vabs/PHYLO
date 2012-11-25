(function() {
	$.sequence.buildRNA = function(seq) {
		var str = "";
			this.posList = [];
			this.posListReverse = [];
			this.nucleotide = [];
			//this.strList = [];
			//this.strListReverse = [];
			//this.struct = [];
			
			for(var i=0, y=10, x = $.phylo.seqLen;i<y*x;i++) {
				this.posList.push(0);
				this.posListReverse.push(0);
				this.nucleotide.push(0);
			}


			for(var i=0;i<seq.length;i++) {
				str+="<div class='boardRow hidden' id='row"+i+"'>";
				var counter = 0;
				for(var j=0;j<seq[i].length;j++) {
					var c = seq[i].charAt(j);
					var d = struc[i].charAt(j);
					if(c !=  "_" && d !="_") {
						seq[i] = seq[i].substr(0, j) + this.nucNew(this.translateRNA(c,d)) + seq[i].substr(j+1,seq[i].length);
						this.posList[i*$.phylo.seqLen+counter] = counter;	
						this.nucleotide[i*$.phylo.seqLen+counter] = seq[i].charAt(j);						
						str+="<div class='sequence "+ this.bcolor(this.translateRNA(c,d)) + "' id='"+(i*25+counter)+"' style='left:"+(this.calcPos(j))+"px;'></div>";
						counter++;
					}
				}	
				for(var k=0;k<counter;k++) {
					this.posListReverse[i*$.phylo.seqLen+k] = counter-k;
				}
				
				str+="<div class='red-line' id='red"+i+"'></div>";
				str+="</div>";
			} 
			$("#gameBoard").append("<div id='movingParts'>"+str+"<div>");
			$.phylo.get.sequenceRNA = seq;
		},
		nucNew : function(x) {
			if(x == 1)
				return "A";
			if(x == 2)
				return "G";
			if(x == 3)
				return "C";
			if(x == 4)
				return "U";
			if(x == 5)
				return "1";//Aright
			if(x == 6)
				return "2";//Gright
			if(x == 7)
				return "3";//Cright
			if(x == 8)
				return "4";//URight
			if(x == 9)
				return "5";//Aleft
			if(x == 10)
				return "6";//Gleft
			if(x == 11)
				return "7";//Cleft
			if(x == 12)
				return "8";//Uleft
			return null;
		},
		//gets the color tag of respected nucleotide 
		bcolor : function(x) {
			if(x == 1)
				return "str-A";
			if(x == 2)
				return "str-G";
			if(x == 3)
				return "str-C";
			if(x == 4)
				return "str-U";
			if(x == 5)
				return "str-ARight";
			if(x == 6)
				return "str-GRight";
			if(x == 7)
				return "str-CRight";
			if(x == 8)
				return "str-URight";
			if(x == 9)
				return "str-ALeft";
			if(x == 10)
				return "str-GLeft";
			if(x == 11)
				return "str-CLeft";
			if(x == 12)
				return "str-ULeft";
			return null;
		},

		translateRNA : function(x,y) {
			if(x == "A" && y == ".") 
				return 1;
			if(x == "G" && y == ".")
				return 2;
			if(x == "C" && y == ".")
				return 3;
			if(x == "U" && y == ".")
				return 4;
			if(x == "A" && y == "(") 
				return 5;
			if(x == "G" && y == "(")
				return 6;
			if(x == "C" && y == "(")
				return 7;
			if(x == "U" && y == "(")
				return 8;
			if(x == "A" && y == ")") 
				return 9;
			if(x == "G" && y == ")")
				return 10;
			if(x == "C" && y == ")")
				return 11;
			if(x == "U" && y == ")")
				return 12;
			return null;
		},

	}
})();
