KitchenSink.Home = function (params) { 
	loadingPlay = ko.observable(true);
	var viewModel = {
	     viewShown: function() {
	    	 function redefinir(){
	 			var ancho = $("#playerBackground").css("height");
	 			$(".circle-content").css({"height" : ancho });
	 		}
	 		redefinir();
	    	 clearTimeout(bannerSito);
	    	 
	    	 
	    	 function cambiarBanner(){
	    	 		if(posicionSlider == (totalSlider-1)){
	    	 			$(".bannerActivo").removeClass("bannerActivo").fadeOut("normal",function(){
	    	   	 			$("#ads img:eq(0)").fadeIn("normal").addClass("bannerActivo");
	    	 			});
	    	 			posicionSlider=0;
	    	 		}else{
	    	 			$(".bannerActivo").removeClass("bannerActivo").fadeOut("normal",function(){
	    	 				$("#ads img:eq("+posicionSlider+")").fadeIn("normal").addClass("bannerActivo");
	    	 			});
	    	 			posicionSlider++;
	    	 		}
	    	 		bannerSito = setTimeout(cambiarBanner,10000);
	    	 	}
	    	 
	    	 loadingPlay(false);
	    	 
			 
			 
			 
			 $("#player-twitter,#player-facebook,#player-downvol,#player-play").unbind();
	    	 
	    	 $("#player-share").click(function(){
	    		 window.MainActivity.compartir("Descarga Estereo Azul para tu dispositivo Android en Google Play https://play.google.com/store/apps/details?id=ar.com.newcycle.esteroazul");
	    	 });
	    	 
	    	 //Touch event icons
	    	 //Twitter
	    	 $("#player-twitter").bind("touchstart", function () {
				$(this).css({"background-image":"url('images/player/twitter-hover.png')"});
	    	 }).bind("touchend", function() {
				$(this).css({"background-image":"url('images/player/twitter-normal.png')"});
	    	     window.open('https://twitter.com/estereoazulfm', '_blank', 'location=yes');
	    	 });
	    	 //Facebook
	    	 $("#player-facebook").bind("touchstart", function () {
				$(this).css({"background-image":"url('images/player/facebook-hover.png')"});
	    	 }).bind("touchend", function() {
				$(this).css({"background-image":"url('images/player/facebook-normal.png')"});
	            window.open('https://www.facebook.com/EstereoAzulPanama', '_blank', 'location=yes');
	    	 });
	    	 //Sound Vol
	    	 $("#player-sound").click(function(){
	    		 if(mute){
	    			 mute = false;
					 $(this).css({"background-image":"url('images/player/sound-normal.png')"});
	    		 }else{
	    			 mute = true;
					 $(this).css({"background-image":"url('images/player/sound-hover.png')"});
	    		 }
	    	     window.MainActivity.setearVolumen(0);
	    	 });
	    	 
	    	 function changePlaybutton(){
                 if(!playing){
                     $("#player-play").css({"background-image":"url('images/player/play-button.png')"});
                 }else{
                     $("#player-play").css({"background-image":"url('images/player/pause-button.png')"});
                 }
             }
	    	 
	    	 playing = window.MainActivity.estadoStream();
	    	 //Sound Vol
	    	 $("#player-play").bind("touchend",function(){
	    		 if(playing){
	    			playing = false;
	    		 }else{
	    			playing = true;
	    		 }	    		 
	    		changePlaybutton();
	    		window.MainActivity.reproducir();
	    	 });

	    	 changePlaybutton();
	    	 
	    	 
	    	 ///////////////////////
	    	/*var twitterBtn = document.getElementById("twitter-btn");
	    	twitterBtn.onclick = function(e){
	    		event.preventDefault();
	    	};*/
	    	 
	    	 $.ajax({
	    		 type     : "get",
	    		 dataType : "jsonp",
	    		 url      : "http://www.appcycle.me/grupo-grada/app/listarBanner.php",
	    		 data     : { 'radio' : radioNumber , 'seccion' : 1},
	    		 success  : function(data,txt,jqXHR){
	    			 $("#ads").html("");
	    			 for(var i=0; i < data.length; i++){
	    				 $("#ads").append("<img src='http://appcycle.me/grupo-grada/archivos/"+data[i]["imagen"]+"' data-link='"+data[i]["link"]+"' style='width:100%;'/>");
	    			 }
	    			 $("#ads img").click(function(){
	    				 var bannerUrl = $(this).attr("data-link");
	    				 window.open(bannerUrl, '_blank', 'location=yes');
	    			 });
	    			 
	    			 if(data.length > 1){
	    				 setTimeout(cambiarBanner,10000);
	    			 }
	    		 },
	    		 error : function(jqXHR,txt,error){
                     alert("Se ha producido un error");
                 }
	    	 });
	    	 $('.dx-toolbar-center').html('').append("<img src='images/logo.png' style='width:100px;margin-top:5px;'/>");
	     }
	};
	return viewModel;
};