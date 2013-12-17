$(document).ready(function() {

	$("#search_field").keypress(function(e) {
		if(e.keyCode == 13) {
			window.location.href = "/pin/search?q=" + $("#search_field").val();
		}
	});

});

clickpin = function ()
{
window.location.href = "/pin/search?q=" + window.location.search.substring(1).split('=')[1];
}

clickuser = function ()
{
window.location.href = "/user/search?q=" + window.location.search.substring(1).split('=')[1];
}

clickboard = function ()
{
window.location.href = "/board/search?q=" + window.location.search.substring(1).split('=')[1];
}

clickbing = function ()
{
window.location.href = "/bing/search?q=" + window.location.search.substring(1).split('=')[1];
}