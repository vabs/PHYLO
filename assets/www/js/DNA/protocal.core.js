(function() {

    var doc = document, win = window;
    var url = "http://phylo.cs.mcgill.ca/phpdb/phyloExpertDB.php"

    $.protocal = {
	    //check for connection
	    checkConnection : function(){
            var networkState = navigator.connection.type;
            if(networkState===Connection.NONE){
                console.log("LOG_protocal.core: no internet connection detected");
                return false;
            }
            else
               return networkState;
        }
        ,
		//for login
		login : function(username, password, fn) {
			var mode = 7;
			var data = "mode="+mode+"&user="+username+"&pass="+password;
			$.ajax({
				type: "POST",
				url : url,
				data : data,
			}).done(function(re) {
                console.log("login success");
				fn(re);		
			}).fail(function() {
			    console.log("login failed");
				$("div.login-warning").show().html("Could not connect to server, please try again later");
			});
		},

		//for register
		register : function(username, displayname, password, email,network,network_id, fn) {
			var mode = 6;
            var data = "mode="+mode+"&user="+username+"&displayname="+displayname+"&pass="+password+"&email="+email+"&network="+network+"&network_id="+network_id;
			$.ajax({
				type: "POST",
				url : url,
				data : data,
			}).done(function(re) {
				fn(re);		
			}).fail(function() {
				$("div.login-warning").show().html("Could not connect to server, please try again later");
			});
		},
		//sends end game score
		sendEndGameScore : function(status,fn) {
			var self= $.protocal;
            var mode = 3;
			if(status == "completed") {
				mode = 4;
			}
			var data = "mode="+mode+"&id="+$.phylo.id+"&user="+window.guest+"&align="+$.board.getJsonAlignments()+"&score="+$.phylo.currentScore;
            if(self.checkConnection()==false){
                //check local to see if duplicate
                //TODO save data to local storage if it beat the score
                var dbData = "()";
                //check if it is in the local db,get puzzle infor from there

                return;
            }

            $.ajax({
				type: "POST",
				url : url,
				data : data,
			}).done(function(re) {
				var json = eval("["+re+"]")[0];
                //update local db
                fn(json);
			}).fail(function() {
				console.log(">> failed to connect to database to submit end game score");
				console.log(">> loading end game dummy data");
				if(DEV.logging)  {
					devTools.prompts.notify({ type:"error", title:"warning", text: "failed to connect to database to submit end game score"});
					devTools.prompts.notify({ type:"error", title:"warning", text: "loading end game dummy data"});
				}
				//fail to connect
				var dummy = '{"0":"CONGENITAL PTOSIS","disease_link":"CONGENITAL PTOSIS","1":"67","play_count":"67","2":"13","fail_count":"13","3":"42","best_score":"42","4":"1375","running_score":"1375","5":"unki2aut","highscore_user":"unki2aut"}';
				var json = eval("["+dummy+"]")[0];
				fn(json);
			});
			
		},
		//sends highscore to server
		sendHighScore : function() {
			//this function is currently turned off.
			return;
            //save high score on local db
			var self = this;
			var data = "mode=4&id="+$.phylo.id+"&user="+window.guest+"&align="+$.board.getJsonAlignments()+"&score="+$.phylo.bestScore;
			$.ajax({
				type : "POST",
				url : url,
				data : data 

			}).done(function() {

			}).fail(function() {
				//if fail, should set up some protocal to resnd
				console.log(">> failed to send highscore");
			});	
		},
		//gets puzzle info
		getPuzzleInfo : function() {
			var data = "mode=3&id="+$.phylo.id;

			$.ajax({
				type : "POST",
				url : url,
				data : data	
			}).done(function(re) {
				var json = {};
				try {
					json = eval("["+re+"]")[0];
				} catch (err) {
					if(DEBUG)
						console.log("@getPuzzleInfo error parsing");
					return;
				}
			}).fail(function() {

			});
		},
		//reads the settings
		read : function(setting) {
			if(setting == undefined) {
				this.type = $.helper.get("type");
				this.score = $.helper.get(this.type);
			} else {
				var type = setting.type;
				this.tp = 0;
				this.score = setting.num;
				this.tp = type;
            }

		},
		//replay with the previous puzzle
		replay : function() {
			var data = $.protocal.previousData;
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
			$.phylo.get.sequence = j.sequence;
			
			if(DEBUG) {
				j.sequence;
				j.tree;
			}
			$.phylo.get.treeString = j.tree;
			var tree = $.newick.parse(j.tree); 
			$.phylo.get.tree = tree;
			$.main.callBack();
		},

        request : function(str,invalidCallback,succCalback,failCallback) {
            $.ajax({
				url : url,
				data : str,
				type : "POST",
			}).done(function(data) {
				data = data.replace("@","");
				$.protocal.previousData = data;
                if (data == ""){
                    if(invalidCallback!=null)invalidCallback();
                    return;
                }
                if(DEBUG ^ DEV.logging)
					console.log(data);
				try {
					var j = eval("["+data+"]")[0].level;
				} catch(err) {
					if(DEBUG)
						console.log(err);
					return;
				}
                if(succCalback!=null) succCalback();//mostly UI trigger
                $.storage.updatePuzzle(j)
                console.log("Protocal.request:");
                $.storage.processPuzzleJson(j);
			}).fail(function() {
			/* ask local again for random puzzle*/
               console.log(">> Cannnot connect to database");
               console.log(">> loading dummy data");
  			   if(DEV.logging)  {
					devTools.prompts.notify({ type:"error", title:"warning", text: "Cannot connect to database"});
					devTools.prompts.notify({ type:"error", title:"warning", text: "loading dummy data"});
			   }
               if(failCallback!=null){
                    failCallback();
               }
			});//end failed
		    },//end request function
	    };

})();
