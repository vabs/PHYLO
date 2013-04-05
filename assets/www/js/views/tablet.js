(function() {
	//loads this script if its tablet
	require( ['jquery'],
	function($) {
		$("#tablet-login-template").css({
			width : $(document).width()
		});


		var content = $("#login-box").html();
		$("#login-box").html("");
		$("#tablet-login-box").html(content+"<br><br><div><a class='m_cancel btn btn-danger'>Cancel</a></div>");

		$("#tablet-login-tag").click(function() {

		   window.connectStatus=$.protocal.checkConnection();
           if(window.connectStatus === false){
                 console.log("cannot detect connection");
                 //show warning: TODO, maybe allow regitration or some sudo-account for the tablet user
                 bootbox.dialog(window.lang.body.misc["field 25"],
                 [{
                     "label" : "Retry",
                     "class" : "btn-primary",
                     "callback": function() {
                          $("#tablet-login-tag").trigger('click');
                     }
                 },
                 {   "label" : "Cancel",
                     "class" : "btn-danger"
                 }]);
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


	});
})();
