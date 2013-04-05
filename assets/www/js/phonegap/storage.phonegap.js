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
               }//test
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
                               var query='INSERT INTO Levels VALUES '+elem;
                               //console.log(query);
                               self.db.transaction( function (tx){
                                    tx.executeSql(query);
                                    var progress=Math.floor((n/lines.length*(100-5))+5).toString();
                                    $('.bar').css({width:progress+"%"});
                                    if(n==lines.length-1){
                                        console.log(lines.length);
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

        queryPuzzle: function(puzzleOpts){
            //{level_id:,difficulty:,disease}

        /*self.db.transaction(function(tx){
                             tx.executeSql("SELECT * FROM Levels where level_id=?", [1220],function(tx,results){
                             var len = results.rows.length;
                             console.log("Levels table: " + len + " rows found.");
                             for (var i=0; i<len; i++){
                                    console.log("Row = " + i + " ID = " + results.rows.item(i).level_id + " Data =  " + results.rows.item(i).level_xml);
                             }
                             },self.errorDB);
                        },self.errorDB);*/
		},
        //update file storage of puzzle
		updatePuzzle:function(){
		},

	};
})();
