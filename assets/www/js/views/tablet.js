(function() {
	//loads this script if its tablet
	require( ['jquery'],
	function($) {
		$("#tablet-login-template").css({
			width : $(document).width()
		});

		$("#tablet-warning-template").css({
			width : $(document).width()
		});

		var content = $("#login-box").html();
		$("#login-box").html("");
		$("#tablet-login-box").html(content+"<br><br><div><a class='m_cancel btn btn-danger'>Cancel</a></div>");

		$("#tablet-login-tag").click(function() {

		   window.connectStatus=$.protocal.checkConnection();
           if(window.connectStatus === false){
                 console.log("cannot detect connection");
                 //show warning
                 var warning = "You are not connected to internet, we cannot verify your account at this time.";
                 $("#tablet-warning-box_p").html(warning);;
                 $("#tablet-warning-box-bg").trigger("ev_tablet_warning");
           }
           else{
			    if(window.guest == "guest") {
				    $("#tablet-login-box-bg").css({
					    height: $(document).height(),
					    width : $(document).width()
				    }).show();
				    $("#tablet-login-box").show();
			    } else {
				    $("#tablet-logout-tag").toggle();
		    	}
			}
		});
		$("#tablet-logout-tag").click(function() {
			$(this).hide();
		});

        //hide login
		$("#tablet-login-box .m_cancel").click(function() {
			$("#tablet-login-box-bg").hide();
			$("#tablet-login-box").hide();
		});

        //hide warning
        $("#tablet-warning-box_cancel").click(function(){
    	    	$("#tablet-warning-box-bg").hide();
    			$("#tablet-warning-box").hide();
        });

        //trigger event
        $("#tablet-warning-box-bg").on("ev_tablet_warning", function(event){
                 $("#tablet-warning-box-bg").css({
                    	height: $(document).height(),
                    	width : $(document).width()
                 }).show();
                 $("#tablet-warning-box_cancel").show();
                 $("#tablet-warning-box").show();
        });
	});
})();
