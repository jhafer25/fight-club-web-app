$(document).ready(function(){
  	$('.slider').bxSlider({
  		auto: true,
  	});
  	console.log($('footer').baseURL);
  	if(location.href == "https://fight-club-web-app.herokuapp.com/signin" || location.href == "https://fight-club-web-app.herokuapp.com/home" || location.href == "https://fight-club-web-app.herokuapp.com/fightMatcher"){
  		$('footer').css("position", "absolute");
  		$('footer').css("bottom", "0");
		$('footer').css("width", "100%");
  	}
});