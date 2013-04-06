/**
 First timer
 puzzle set db name : phyloPuzzle
 puzzle set db version : 1.0
 $.storage is init at navbar.view.js navbar init
**/
(function() {
    var userCache = window.localStorage;

    //web sql functions
	$.storage = {
	    filename: "puzzle1.json",
        dbname: "phyloPuzzle_storage",
        dbDisplay: "phyloDB",
        version :"1.0",
        path:"../www/js/models/puzzles/",
        commandF:"command.json",
        request: "",/*request for puzzles*/

		init: function(version){
		   console.log("LOG_storage: initializing ...");
		    //create progress loading bar
           var self = $.storage;
           if(userCache.getItem("puzzleDB_name") === null ){
                 // show the loading screen
                 var progressBarHTML=window.lang.body.misc["field 2"]+"<br><div class ='progress progress-striped active'><div class='bar' style='width: 5%'></div></div>";
                 bootbox.dialog(progressBarHTML,[]);
                 //self.command = $.parseJson();

                 $.getJSON(self.path+self.commandF)
                 .done(function(data){
                    self.commands=data;
                 })
                 .fail(function(){
                    console.log("error reading file:"+self.path+self.commandF)});

                 //request file access
                 this.version=version;
                 this.db = window.openDatabase(this.dbname,this.version,this.dbDisplay,  4 * 1024 * 1024);
                 this.db.transaction(this.populateDB,this.errorDB,this.successPopulateDB);
            }else{

               this.dbname = userCache.getItem("puzzleDB_name");
               this.version = userCache.getItem("puzzleDB_version")
               console.log("LOG_storage:opening exisiting db:"+this.dbname+" and version:"+this.version);
               if(!this.db){
                    this.db = window.openDatabase(this.dbname, this.version,
                                             this.dbDisplay,  4 * 1024 * 1024);
               }


		   }

		},

        populateDB: function(tx){
               var self = $.storage;
               tx.executeSql(self.commands.createTable["drop 1"]);
               //tx.executeSql(self.commands.createTable["drop 2"]);
               tx.executeSql(self.commands.createTable["create 1"]);
        },

        errorDB: function(err){
            console.log("error processing sql");
        },
        successPopulateDB: function(){
                    var self = $.storage;
                    //loaded inital puzzle and import it into websql
                    $.get(self.path+self.filename)
                      .done(function(data){
                           var lines = data.split("\n");
                           $.each(lines,function(n,elem){
                               var query=self.commands.createTable["insert 1"]+elem;
                               self.db.transaction( function (tx){
                                    tx.executeSql(query);
                                    var progress=Math.floor((n/lines.length*(100-5))+5).toString();
                                    $('.bar').css({width:progress+"%"});
                                    if(n==lines.length-1){
                                        userCache.setItem("puzzleDB_name",self.dbname);
                                        userCache.setItem("puzzleDB_version",self.version);
                                        bootbox.hideAll();

                                    }
                               }, function(err) {
                                     console.log("problem in query"+query+"--"+err.message);
                               });

                           });
                      })
                      .fail(function(){
                              console.log("LOG_storage: failed to load file: "+self.filename);
                    });

        },

        queryPuzzle: function(){
            //build both the query and the ajax request
            var self = $.storage;
            var type = $.protocal.tp;
            var score = $.protocal.score;
            var query = "SELECT * FROM Levels WHERE ";

            if(type == "random") {
                self.request+= "mode=1&diff="+score;
                query+="difficulty=?";
                self.db.transaction(function(tx){
                    tx.executeSql(query,[score],self.querySuccess,self.errorDB);
                },self.errorDB);


            } else if(type == "level") {
                console.log("received request");
                self.request+= "mode=2&id="+score;
                query+="level_id=?"
                self.db.transaction(function(tx){
                    tx.executeSql(query,[score],self.querySuccess,self.errorDB);
                },self.errorDB);

            } else if(type == "disease") {
                self.request+= "mode=2&id="+score;
                //query different....TODO
            }
        },

        querySuccess:function(tx,results){
            var self = $.storage;
            var len = results.rows.length;
            var index = ($.protocal.tp=="level_id")?0:Math.floor((Math.random()*results.rows.length));
            if(len>=1){
                var puzzle = results.rows.item(index);
                if(puzzle.in_XML=="true"){
                    puzzle.json= $.xml2json(puzzle.level_xml);
                }else{
                    puzzle.json= $.parseJson(puzzle.level_xml);
                }
                    self.processPuzzleJson(puzzle.json);

            }else{
                if($.protocal.checkConnection()!=false){
                    if(DEV.logging) {
                        devTools.prompts.notify({title : "LOG_Storage", text :"cannot find in local puzzle,requesting:"+ $.storage.request});
                    }
                    $.protocal.request(self.request);
                }else{
                    //pick from local
                    self.getLocalPuzzle();
                }
            }
        },


        //processPuzzleJson from boh request and local
        processPuzzleJson:function(json){
            $.phylo.id = json.id;
            for(var i =0;i<json.sequence.length;i++) {
                json.sequence[i] = (json.sequence[i].replace(/-/g,"_")).toUpperCase();
            }
            //Detect backend error
            var numOfSeq = json.sequence.length;
            var numOfNodes = json.tree.replace(/(\(|\)|\;)/,"").split(",").length;

            if(DEV.logging) {
                devTools.prompts.notify({ title : "Puzzle Id", text : $.phylo.id});
            }
            if(numOfSeq != numOfNodes) {
                console.log(">> Detected Error -> Puzzle ("+$.phylo.id+") Sequence given ("+numOfSeq+") != phylo tree nodes ("+numOfNodes+")");
                if(DEV.logging)
                    devTools.prompts.notify({ type:"error", title:"warning", text: "Puzzle: "+$.phylo.id +"<br> #Seq("+numOfSeq+") / #Nodes("+numOfNodes+") mismatch"});
            }
            if(DEBUG) {
                json.sequence;
                json.tree;
            }
            $.phylo.get = {};
            $.phylo.get.sequence = json.sequence;
            $.phylo.get.treeString = json.tree;
            var tree = $.newick.parse(json.tree);
            $.phylo.get.tree = tree;
            $.main.callBack();
        },

        //TODO pick a random local puzzle when both local and request failed --> should probably notify user
        getLocalPuzzle:function(){
           /* self.db.transaction(function(tx){
                tx.executeSql(query,[score],self.queryRandom,self.errorDB);
            },self.errorDB);
           */
        },

        //add new json puzzle to storage
		updatePuzzle:function(json){

		},

	};
})();
