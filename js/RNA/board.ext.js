(function() {
			$.board.getJsonAlignmentsRNA = function() {
			var self = this;
			var track = $.sequence.track;
			var st = "[";
			var st2 = "[";
			for(var i=0;i<track.length;i++) {
				st2+='{"';
				st+='{"';
				for(var j=0;j<track[i].length;j++) {
					if(track[i][j] == "x"){
						st2+="-";
						st+="-";
					} else if(i!=0 && track[i][j] == 0) {
						st2+="";
						st+="";
					} else {
						st2+=self.convertColorRNA($("#"+track[i][j]).css("border-color")).charAt(0);
						st+=self.convertColorRNA($("#"+track[i][j]).css("border-color")).charAt(1);
					}
				}
				st2+='"}';
				st+='"}';
				if(i<track.length-1) {
					st2+=',';
					st+=',';
				}
			}
			return '{"alignments" : '+st2+'],"structure" : '+st+']}';
		},
		//translates the grid color to its respected nucletide
		$.board.convertColorRNA = function(color) {
			if(color == $(".str-A").css("border-color"))
			{	return "A.";}
			if(color == $(".str-G").css("border-color"))
			{	return "G.";}
			if(color == $(".str-C").css("border-color"))	
			{	return "C.";}
			if(color == $(".str-U").css("border-color"))
			{	return "U.";}
			if(color == $(".str-ARight").css("border-color"))
			{	return "A(";}
			if(color == $(".str-GRight").css("border-color"))
			{	return "G(";}
			if(color == $(".str-CRight").css("border-color"))
			{	return "C(";}
			if(color == $(".str-URight").css("border-color"))
			{	return "U(";}
			if(color == $(".str-ALeft").css("border-color"))
			{	return "A)";}
			if(color == $(".str-GLeft").css("border-color"))
			{	return "G)";}
			if(color == $(".str-CLeft").css("border-color"))
			{	return "C)";}
			if(color == $(".str-ULeft").css("border-color"))
			{	return "U)";}
			return null;
		},
	};	
})();
