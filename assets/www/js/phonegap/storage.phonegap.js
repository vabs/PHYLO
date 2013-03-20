(function() {

	$.storage = {
		init: function(){
             this.db = window.openDatabase("phyloStorage", "1.0", "phyloDB", 1000000);
		}
		,

	}

})();
