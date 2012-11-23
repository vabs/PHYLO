/*
Developed By: Alfred Kam (www.cs.mcgill.ca/~akam2/), McGill MCB
Supervisors: Jerome Waldispuhl and Mathieu Blanchette, McGill University
Type: Desktop / Tablet / Mobile Browser Edition
Supported Platforms: Android, iPod, iPhone, iPad, Chrome, Safari, FireFox
About: A McGill Phylo Project - Menu Control

Copyright Alfred Kam and McGill MCB

Version 0.5.0.1
Last Updated Sept 2011
*/

var DEV = true;
var fix = false;
var mobileDEBUG = false;
window.language = [["English","en"],
	//	["Spanish","sp"],
		["French", "fr"]];

(function() {
	//shared Components
	//tablet theme
	(function() {
		function g() {};
		//sets up the tablet menu + initiate events
		g.prototype.theme = function() {
			$(".menu").removeClass("menu");
			$(".nav").removeClass("nav");
			$("#menu").addClass("tabletMenu");
			$("#menu").children().each(function() {
				$(this).addClass("tabletNav");
			});
			$("#log").removeClass("tabletNav");
			$("#log").css("fontSize","150%");
			//theming it
			var href = window.setHref;
			for(var i=0;i<href.length;i++) {
				var color = (i < window.color.length)?window.color[i]:window.color[i-window.color.length]; 	
				$("#"+href[i][1]).html("<pre class='tabletNavBorder' style='background-color:"+color+"'></pre><p class='tabletNavContent'>"+href[i][0]+"</p>");
				$("#"+href[i][1]).mouseover(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					p.className += " addBorder-tablet";
					pre.style.backgroundColor = "";
				});
				$("#"+href[i][1]).mouseout(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					pre.style.backgroundColor = p.style.backgroundColor;
					p.style.backgroundColor = "";
					p.className = $.trim(p.className.replace(/addBorder-tablet/,""));
				});
				$("#"+href[i][1]).click(function() {
				//	window.location.search = "?pid="+this.id;
					window.location.hash = this.id;
					mcb.changePage(this.id);
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					if(pre.style.backgroundColor == "") {
						//restores the rest of the color
						$("nav").children().each(function() {
							if(this.id != "tools") {
								var d = document.getElementById(this.id);
								var npre = d.getElementsByTagName("pre")[0];
								var np = d.getElementsByTagName("p")[0];	
								np.className = $.trim(np.className.replace(/addBorder-tablet/,""));
								if(npre.style.backgroundColor == "") {
									npre.style.backgroundColor = np.style.backgroundColor;
									np.style.backgroundColor = "";	
									$(this).mouseover(function() {
										np.style.backgroundColor = npre.style.backgroundColor;
										np.className += " addBorder-tablet";
										npre.style.backgroundColor = "";					
									});
									$(this).mouseout(function() {
										npre.style.backgroundColor = np.style.backgroundColor;
										np.style.backgroundColor = "";
										np.className = $.trim(np.className.replace(/addBorder-tablet/,""));
									});
								}
							}
						});	
						$(this).unbind("mouseover");
						$(this).unbind("mouseout");
						//now set the color
						p.style.backgroundColor = pre.style.backgroundColor;
						p.className += " addBorder-tablet";
						pre.style.backgroundColor = "";
					}
				}); 
				
			}	
		};

		g.prototype.adjust = function(prev) {
			var f = this;
			if(window.innerWidth > window.innerHeight && prev == true ^ prev == undefined) {
				$(".tabletMenu").css("width",window.innerWidth+"px");
				prev = false;
				$("#log").css("right","2em");
			} else if(window.innerHeight > window.innerWidth && prev == false  ^ prev == undefined){
				$(".tabletMenu").css("width",window.innerWidth+"px");
				prev = true;
				$("#log").css("right",".2em");	
			}
			window.setTimeout(function() {
				f.adjust(prev);
			},1000);		
		};

		//checks for hash to initialize specific page
		g.prototype.hasIncident = function() {
			var hash = mcb.hash();
			var active = false;
			for(var i=0;i<window.setHref.length;i++)
				if(hash.match(window.setHref[i][1])) {
					active = true;
					var x = window.setHref[i][1];
					$("#"+x).unbind("mouseover");
					$("#"+x).unbind("mouseout");
					var pre = document.getElementById(x).getElementsByTagName("pre")[0];
					var p = document.getElementById(x).getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					p.className +=" addBorder-tablet";
					pre.style.backgroundColor = "";
					if(x=="play") {
					//	$("#footer").hide();
					}
					mcb.changePage(x);
					return;	
				}
			if(!active) {
				mcb.changePage(hash.replace(/#/,""));
			}
		};
		
		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("tablet",g,attr);
	})();


	//desktop theme
	(function() {
		function g() {};
		//sets up the desktop menu + initiate events
		g.prototype.theme = function() {
			$("#log").addClass("desktopLog");
			//theming it
			var href = window.setHref;
			for(var i=0;i<href.length;i++) {
				var color = (i < window.color.length)?window.color[i]:window.color[i-window.color.length]; 	
				$("#"+href[i][1]).html("<pre class='navBorder' style='background-color:"+color+"'></pre><p class='navContent'>"+href[i][0]+"</p>");
				$("#"+href[i][1]).mouseover(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					p.className += " addBorder";
					pre.style.backgroundColor = "";
				});
				$("#"+href[i][1]).mouseout(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					pre.style.backgroundColor = p.style.backgroundColor;
					p.className = $.trim(p.className.replace(/addBorder/,""));
					p.style.backgroundColor = "";
				});
				$("#"+href[i][1]).click(function() {
				//	window.location.search = "?pid="+this.id;
					window.location.hash = this.id;
					mcb.changePage(this.id);
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					if(pre.style.backgroundColor == "") {
						//restores the rest of the color
						$("nav").children().children().each(function() {
							console.log(this.id);
							if(this.id != "tools") {
								var d = document.getElementById(this.id);
								var npre = d.getElementsByTagName("pre")[0];
								var np = d.getElementsByTagName("p")[0];	
								np.className = $.trim(np.className.replace(/addBorder/,""));	
								if(npre.style.backgroundColor == "") {
									npre.style.backgroundColor = np.style.backgroundColor;
									np.style.backgroundColor = "";	
									$(this).mouseover(function() {
										np.style.backgroundColor = npre.style.backgroundColor;
										npre.style.backgroundColor = "";					
										np.className += " addBorder";
									});
									$(this).mouseout(function() {
										npre.style.backgroundColor = np.style.backgroundColor;
										np.style.backgroundColor = "";
										np.className = $.trim(np.className.replace(/addBorder/,""));	
									});
								}
							}
						});	
						$(this).unbind("mouseover");
						$(this).unbind("mouseout");
						//now set the color
						p.style.backgroundColor = pre.style.backgroundColor;
						pre.style.backgroundColor = "";
						p.className +=" addBorder";
					}
				}); 
				
			}

		};

		//checks for hash to initialize specific page
		g.prototype.hasIncident = function() {
			var hash = mcb.hash();
			var active = false;
			for(var i=0;i<window.setHref.length;i++)
				if(hash.match(window.setHref[i][1])) {
					active = true;
					var x = window.setHref[i][1];
					$("#"+x).unbind("mouseover");
					$("#"+x).unbind("mouseout");
					var pre = document.getElementById(x).getElementsByTagName("pre")[0];
					var p = document.getElementById(x).getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					pre.style.backgroundColor = "";
					p.className = "navContent addBorder";
					//if(x=="play") {
					//	$("#footer").hide();
					//}
					mcb.changePage(x);
					return;	
				}
			if(!active) {
				mcb.changePage(hash.replace(/#/,""));
			}
		};
		
		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("desktop",g,attr);
	})();
    
	//mobile theme
	(function() {
		function g() { };
		//themes the mobile and set up all the events
		g.prototype.theme = function() {
			
			//remove all desktop menu stuff
	//		$("#"+window.setHref[0][1]).remove();
	//		window.setHref.shift();						
			$("#tools").remove();
			$(".menu").removeClass("menu");
			$(".nav").removeClass("nav");
			
			//set up desktop menu stuff
			$("#menu").addClass("mobMenu");
			$("#menu").children().each(function() {
				$(this).addClass("mobNav");
			});

			//set some extra back navigation for mobile 
			var doc = document;
			var div = doc.createElement("div");
			var f = this;
			div.id ="mobBack";
			div.style.display = "none";
			doc.body.appendChild(div);
			$("#mobBack").html("<a href='#' id='back'>Back</a>");

			$("#mobBack").click(function() {
				$("#sandbox").html("");
				$("#menu").show("fast");
				footer.adjust("mobileMenu");
				f.adjust();
				$("#mobBack").hide();
				window.location.hash = "#menu";
			});

			//set up the forward mobile navigation
			var href = window.setHref;
			for(var i=0;i<href.length;i++) {
				$("#"+href[i][1]).css("backgroundColor",window.color[i]);
				if(i%2 == 0)  { //even
					$("#"+href[i][1]).css("left", 0.4 + "em");
					if(i==0)
						$("#"+href[i][1]).css("top", 5+"em");
					else
						$("#"+href[i][1]).css("top", 3 + "em");
				} else {
					$("#"+href[i][1]).css("left",(1.4*3.3) + "em");
					if(i==1) 
						$("#"+href[i][1]).css("top",  3.15 +"em");
					else
						$("#"+href[i][1]).css("top",  1.15 +"em");
				}
				$("#"+href[i][1]).click(function() {
					$("#mobBack").show();
					$("#menu").hide();
					mcb.changePage(this.id);
					window.location.hash = this.id;
				});
			}	

			$("#menu").append("<img src='http://phylo.cs.mcgill.ca/img/logo.png' class='mobImg'/>");
			$(".mobImg").css("left","2em");
			this.landscape = false;
			this.adjust();
		};
		//adjust the poition of the screen for portrait and landscape
		g.prototype.adjust = function() {
			var f = this;
			var href = window.setHref;
			if(window.innerWidth > window.innerHeight) {
				if(this.landscape == false) { 
					for(var i=0;i<href.length;i++)
						if(i%2 == 0)
							$("#"+href[i][1]).css("left", 4 + "em");
						else
							$("#"+href[i][1]).css("left", (2.5*3.3)+"em");
					$(".mobImg").css("left","9em");
					this.landscape = true;
				}
			} else {
				if(this.landscape == true) {
					for(var i=0;i<href.length;i++)
						if(i%2 == 0)
							$("#"+href[i][1]).css("left", 0.4 + "em");
						else
							$("#"+href[i][1]).css("left", (1.4*3.3)+"em");
					$(".mobImg").css("left","2em");
					this.landscape = false;
				}
			}
			if($("#sandbox").html() == "" || document.getElementById("menu").style.display == "") {
				window.setTimeout(function(){f.adjust();},1000);
			}
		};

		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("mobile",g,attr);
	})();
	//thmeing for footer
	(function() {
		function g() {}
		g.prototype.theme = function(doc,win) {
			var f = doc.createElement("footer");
			f.id = "footer";
			f.style.width = "400px";
			doc.body.appendChild(f);
			$("#footer").html("<p class='footNote' style='padding-bottom: 2em;'> &#169; <a href='http://www.mcgill.ca/mcb/'>McGill MCB</a> & <a href='http://www.alfredkam.com'>Alfred Kam</a><br><span style='font-size:0.6em'><a href='https://github.com/McGill-CSB/PHYLO'>Want to contribute? Click Here</a></span><br><span style='font-size:0.6em'></span></p>");

			if(window.location.pathname.search(/mini/) > -1)
				$("#miniNote").hide();

			$("#notWork").click(function() {
				window.location = "http://phylo.cs.mcgill.ca/mini";
			});	
		};
		//adjust the footer depending on portrait or landscape
		g.prototype.adjust = function(page,opts) {
			console.log(page);
			if(page == "play" ^ page == "home") {
				console.log("here");
				if(common.checkDevice() != "other" ^ common.checkDevice() != "ipad") {
					$("#footer").hide();
					return;
				}
				var gs = opts.gs;
				$("#footer").show();
				$("#footer").css({
					"position" : "absolute",
					"top" : "35em"//(gs.yPx*gs.yMargin+(gs.y+2.0)*gs.yPx)
				});
				if(common.checkDevice() != "other" && common.checkDevice() != "ipad")
					$("#phylo-footer").css({
						position : "relative",
						top : "11em"
					});
			} else if(page == "menu") {
				$("#footer").css({
					"position":"relative",
					"top" : "35em"//(parseInt($("#menu").css("top"))+1) + "em"
				});
			} else if(page == "mobileMenu") {
				$("#footer").css({
					"position":"absolute",
					"top" : "18em"
				});
				$("#phylo-footer").css({
					"position": "relative",
					"top" : "11em"
				});
			} else {
				if(mcb.hash().search(/home/) < 0) {
					$("#footer").hide();	
				} 
				$(".phylo-body").append("<footer id='#phylo-footer'>"+$("#footer").html()+"</footer>");
				$("#phylo-footer").css({
						"position" :"relative",	
						"top" : "35em"//"2em"
				});

			}
			/*
			if(common.checkDevice() != "other" && common.checkDevice() != "ipad")
				$("#footer").show();
			*/
		};

		var proto = g.prototype,
			attr = [["theme",proto.theme],
				["adjust", proto.adjust]];
		common.exportSingleton("footer",g,attr);
		
	})();

	//language selection...
	(function() {
		function g() {}
		g.prototype.theme = function(doc,win) {
			
			var arr = window.language;

			var content = "";
			for( var i=0;i<arr.length;i++)
				if(mcb.GET("lang") == arr[i][1])
					content += "<option selected='selected' value='"+arr[i][1]+"'>"+arr[i][0]+"</option>";
				else
					content += "<option value='"+arr[i][1]+"'>"+arr[i][0]+"</option>";
			
			$("#tools").append("<select class='lang' id='langopt'>"+content+"</selected>");	

			if(common.checkDevice() == "other") { //desktop
				$("#langopt").css({
					"left": "80%",
					"top" : "-2.85em"
				});
			} else { //ipads
				$("#langopt").css( {
					"left" : "77%",
					"top": "-2.4em"
				});
				$("#log").css("top","-.2em");
			}
	
			$("#langopt").change(function() {
				$("#langopt option:selected").each(function() {
					mcb.cookie.erase("phyloLang");
					mcb.cookie.create("phyloLang",$(this).val(),360);
					var search = win.location.search.replace(mcb.GET("lang"),$(this).val());
					win.location.search = search;
					//win.location.search = "?lang="+$(this).val();
				//win.location.hash;
				});		
			});
		};

		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("lang",g,attr);
	})();

	//initiate the interface
	(function() {
		var config = {
			desktop : function(doc,win) {
				if(window.mobileDEBUG)
					window.option = false;
				else
					window.option = true;
				footer.theme(doc,win);
				desktop.theme();
				footer.adjust("menu");
				desktop.hasIncident();
				lang.theme(doc,win);
				
				/* patch for fixing screen ratio */
					//ideal width : 1024 but messed up code in some parts
				var content = function() {
					if(window.innerWidth > 688 & window.innerWidth < 1473) {
						$(".phylo-body").css({
							width: window.innerWidth*.8,
							left: window.innerWidth*.1
						});
						$(".menuSqueezer").css({
							width: "",
							left : ""
						});

					} else if(window.innerWidth < 688) {
						$(".phylo-body").css({
							"left" : "0"
						});
					} else {
						$(".phylo-body").css({
							left : (window.innerWidth - 1473*.8) /2,
							width : 1473*.8
						});
						$(".menuSqueezer").css({
							width: 1473,
							left : (window.innerWidth - 1473)/2	
						});
					}
				}
	
				content();
				window.onhashchange = content;
				$(window).resize(function() { content(); });
				/* end of patch */
				mcb.run("post-menu");
			},
			ipad :  function(doc,win) {
				window.option = true;	
				footer.theme(doc,win);
				tablet.theme();
				footer.adjust("menu");
				tablet.hasIncident();
				lang.theme(doc,win);
				tablet.adjust();
				mcb.run("post-menu");
			},
			mobile : function(doc,win) {
				window.option = false;		
				footer.theme(doc,win);
				mobile.theme();
				footer.adjust("mobileMenu");
			},
			nokia : function(doc,win) {
				window.option = false;
				mobile.theme();
			}
		};
		//Start of Programm!!!
		$(document).ready(function() {
			//settings
			if(mcb.GET("lang") == undefined) {
				if(mcb.cookie.read("phyloLang") == null) {
					if(common.checkDevice() == "ipad" ^ common.checkDevice() == "other") {
						window.location = "http://phylo.cs.mcgill.ca/mobile/splash.html"+window.location.hash;
						return;
					} else {
						mcb.cookie.create("phyloLang","en",360);
						window.location.search = "?lang=en"+window.location.hash;	
					}
				} else {
					mcb.cookie.create("phyloLang",mcb.cookie.read("phyloLang",360));
					window.location.search = "?lang="+mcb.cookie.read("phyloLang")+window.location.hash;
				}
			} else {
				var lang = window.language;
				var isLang = false;
				for(var i=0;i<lang.length;i++)
					if(lang[i][1] == mcb.GET("lang"))
						isLang = true;
				if(!isLang) {
					window.location = "http://phylo.cs.mcgill.ca/mobile/splash.html"+window.location.hash;
					return;
				}
				if(mcb.cookie.read("phyloLang") == null) {
					mcb.cookie.create("phyloLang",mcb.GET("lang"),360);
					//window.location.search = "?lang="mcb.GET("lang")+window.location.hash;	
				}
			}
			if(common.checkDevice() == "other" ^ common.checkDevice() == "ipad")
				if(mcb.hash() == "")
					window.location.hash = "#home";

			mcb.history();	
			mcb.data("0");
			//some settings
			if(mcb.GET("lang") == "en") {
				window.setHref = [["Home","home"],
				//			["Play","play"], 
							["Tutorial","tutorial"],
//							["Slide","slide"],
							["About","about"],
							//["FAQ","faq"],
							["Credits","contact"],
							["Ranking","ranking"]
/*,
							["2011 Ranking", "2011ranking"]*/];
			} else {
				window.setHref = [["Acceuil","home"],
				//			["Play","play"], 
							["Tutoriel", "tutoriel"],
//							["Slide","slide"],
							["A propos","about"],
							//["FAQ","faq"],
							["Cr&eacute;dits","contact"],
							["Classement","ranking"]
/*,
							["Classement 2011", "2011ranking"]*/];

			}
			
			if(common.checkDevice() != "other" && common.checkDevice() != "ipad") {
				window.setHref.shift();
				window.setHref.unshift(["Play","play"]);
				window.setHref.pop();
			}
			//for gmail style instant loading :)

			var init = {
				start : function() {
					window.color = ["#71B2E2","darkOrchid","green","orange"];
					var doc = document,
						win = window;
					var nav = doc.createElement("nav");
					nav.id = "menu";
					nav.className = "menu";
					doc.body.appendChild(nav);
					var div = doc.createElement("div");
					div.id = "sandbox";
					doc.body.appendChild(div);
					var content = mcb.href(win.setHref,{ "className" : "nav" });
					//content += "<div id='tools'><a href='#' id='log'>Log In</a></div>"; 
					content += "<div id='tools'></div>"; 
					
				 	if(common.checkDevice() == "other") {
						content = "<div class='menuSqueezer'>"+content+"</div>";	
					}	
					$("#menu").html(content);
					
				//	config.ipad(doc,win);
						
					if(common.checkDevice() == "ipad")
						config.ipad(doc,win);
					else if(common.checkDevice() == "other")  
						config.desktop(doc,win);
					else if(common.checkDevice() == "qt") 
						config.nokia(doc,win);
					else 
						config.mobile(doc,win);
				}
			};

			var productionMode = true;

			//check for extension and stuff
			if(mcb.GET("pluginID") != undefined) {
				$(document).ready(function() {
					var doc = document;
					var div = doc.createElement("div");
					div.id = "blah"
					div.innerHTML = "<h2>Entering Development Mode, Waiting for plugin to load...</h2>";
					doc.body.appendChild(div);
					//$.post("../s/plugin.php",{"pluginID" : mcb.GET("pluginID") },function(data) {
					$.post("http://crowdsource.alfredkam.com/phpDB/scripts.php",{ mode : 6, "pluginToken" : mcb.GET("pluginID") },function(data) {
						console.log(data);
						var script = document.createElement("script");
						script.src = data;
						script.type = "text/javascript";
						document.body.appendChild(script);
						window.setTimeout(function() {
						$("#blah").remove();
						mcb.init();
						mcb.run("init");
						if(common.checkDevice() == "other" ^ common.checkDevice() == "ipad")
							mcb.run("pre-menu");
							mcb.preFetch(window.setHref,init);
						},500);
					}).error(function() {

					});
				});

			} else {
				mcb.init();
				mcb.run("init");
				if(common.checkDevice() == "other" ^ common.checkDevice() == "ipad")
					mcb.run("pre-menu");
				mcb.preFetch(window.setHref,init);
			}
			//end of checking
		});
	})();
})();


(function() {
	function g(){}
	g.prototype.lightbox = function(msg,opts) {
		$(document).ready(function() {
			var doc = document, win = window;
			if(document.getElementById("warning-lightbox") == undefined) {
				var div = doc.createElement("div");
				div.id = "warning-lightbox";
				doc.body.appendChild(div);
			}
			$("#warning-lightbox").html("<div id='warning-lightbox-shadow'></div><div id='warning-lightbox-content'><div id='warning-lightbox-content-body'></div><div id='warning-lightbox-content-options'></div></div>");
			$("#warning-lightbox").css({
				"position" : "absolute",
				"top" : "0",
				"left" : "0",	
				"width" : "100%",
				"height" : "100%"
			});
			$("#warning-lightbox-shadow").css({ "position" : "absolute",
						"top": "0px",
						"left" :"0px",
						"width" : window.innerWidth,
						"height" : window.innerHeight,
						"background-color":"black",
						"opacity" : "0.8",
						"zIndex" : "200"
					});
			$("#warning-lightbox-content").css({
				"position" : "absolute",
				"top" : win.innerHeight*.21,
				"left" : win.innerWidth*.275,
				"height" : win.innerHeight*.25,
				"width" : win.innerWidth*.4,
				"zIndex":"201",
				"backgroundColor" : "#505050"
			});
			$("#warning-lightbox-content-body").css( {
				"position" : "relative",
				"text-align" : "center",
				"top" : "10%",
				"left" : "5%",
				"width" : "90%",
				"height" : "80%",
				"color" : "#FFFFFF"
			});
			$("#warning-lightbox-content-options").css({
				"position" : "relative",
				"left" : "5%",
				"width" : "90%"
			});
			$("#warning-lightbox-content-options").html("<a class='warning-opts' href='#' id='warning-okay'>Okay</a>");

			$("#warning-okay").click(function() {
				try {
					if(opts.okay != undefined)
						opts.okay();
				} catch(err) {}
				$("#warning-lightbox").remove();
			});
			$(".warning-opts").css({
				"float" : "left",
				"margin-left" : "5%",
				"padding" : "1px 1px 1px 1px",
				"position" : "relative",
				"left" : "40%",
				"backgroundColor" : "#000000"
			});

			try {
				if(opts.cancel != undefined) {
					$("#warning-lightbox-content-options").append("<a class='warning-opts' href='#' id='warning-cancel'>Cancel</a>");
					$("#warning-okay").css( {
						"left" : "25%"
					});
					$("#warning-cancel").css( {
						"float" : "left",
						"left" : "30%",
						"margin-left": "40%",
						"backgroundColor" : "#000000",
						"padding" : "1px 1px 1px 1px"
					});
					$("#warning-cancel").click(function() {
						opts.cancel();
						$("#warning-lightbox").html("");
					});
				}
			} catch(err) {}
			$("#warning-lightbox-content-body").html(msg);
		});
	};
	var proto = g.prototype,
		attr = [["lightbox",proto.lightbox]];
	common.exportSingleton("bug",g,attr);
})();
//usage
// if want to append on click
// options ::: { "cancel" : fn() , "okay" : fn() }
//bug.lightbox("alert test, press okay to continue",{"cancel" : function() { console.log("workeD"); } } );
//bug.lightbox("alert test, press okay to continue");

//loading installation //
(function() {
	function g() { this.im = new Image(); this.im.src = "http://phylo.cs.mcgill.ca/img/loading15.gif"; this.im.id = "loading-gif" }
	g.prototype.install = function() {
		var im = this.im;		
		if(document.getElementById("loading") == undefined) {
			var div = document.createElement("div");
			div.id = "loading";
			document.body.appendChild(div);
		}
		$("#loading").html("<div id='loading-box'></div>");
		document.getElementById("loading").appendChild(im);
		$("#loading-gif").css({
			"position" : "absolute",
			"height" : "40px",	
			"width" : "200px",
			"top" : (window.innerHeight-40)/2,
			"left" : (window.innerWidth-200)/2,
			"zIndex" : "250"
		});
		$("#loading-box").css({
			"position" : "absolute",
			"height" : window.innerHeight,
			"width" : window.innerWidth,
			"background-color" : "#000000",
			"opacity" : "0.8",
			"zIndex" : "249",
			"top" :0,
			"left": 0
		});
	};
	g.prototype.uninstall = function() {
		$("#loading").html("");
	};
	var proto =g.prototype,
		attr = [["install",proto.install],
			["uninstall",proto.uninstall]];
		common.exportSingleton("loading",g,attr);
})();

(function() {
	function g() {}
	g.prototype.init = function() {
		var doc = document, 
			win = window;
		var div = doc.createElement("div");
		div.id = "maintenance";
		doc.body.appendChild(div);
		$("#maintenance").html("Oops! We are updating the site now. There may be glitches here and there!");
		$("body").css({
			"padding-top" : "2em"
		});
		$("#maintenance").css({
				position : "absolute",
				top : "0px",
				left: "35%",
				fontSize: "95%",
				color: "white",
				backgroundColor: "cornflowerBlue"
		});
	}
	var proto = g.prototype,
 		attr = [["init",proto.init]];
	common.exportSingleton("maint",g,attr);
})();
/*
$(document).ready(function() {
	maint.init();
}); */

