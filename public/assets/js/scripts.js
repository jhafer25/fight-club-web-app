$(document).ready(function(){
  	$('.slider').bxSlider({
  		auto: true,
  	});
  	console.log($('footer').baseURL);
  	if(location.href == "http://localhost:3000/signin" || location.href == "http://localhost:3000/home" || location.href == "http://localhost:3000/fightMatcher"){
  		$('footer').css("position", "absolute");
  		$('footer').css("bottom", "0");
		$('footer').css("width", "100%");
  	}
});