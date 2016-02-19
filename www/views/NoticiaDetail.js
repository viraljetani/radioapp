KitchenSink.NoticiaDetail = function (params) { 
    loadingNoticiaDetail = ko.observable(true);
	var viewModel = {
	     viewShown: function() {
	    	 
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
	    	 
	    	 
             loadingNoticiaDetail(true);
             $(".centerContent .dx-scrollview-content").html('');$.ajax({
                 type: 'get',
                 url : 'http://www.appcycle.me/grupo-grada/app/detallesNoticia.php',
                 dataType : 'jsonp',
                 success : function(data,txt,jqXHR){
                 $(".centerContent .dx-scrollview-content").append('<div class="contentNoticiasList clearfix" data-id="1"><img src="http://www.appcycle.me/grupo-grada/archivos/'+data[0]["imagen"]+'" /><h3>'+data[0]["titulo"]+'</h3></div><div class="contentNoticiaTexto">'+data[0]["nota"]+'</div>');
                 loadingNoticiaDetail(false);
                 
                 
                 link = "http://antena8.com/noticias/"+data[0]["id"];
                 },
                 error : function(jqXHR,txt,error){
                 alert("Se ha producido un error");
                 },
                 data : { 'id' : params.id }
                 });
             $.ajax({
	    		 type     : "get",
	    		 dataType : "jsonp",
	    		 url      : "http://www.appcycle.me/grupo-grada/app/listarBanner.php",
	    		 data     : { 'radio' : radioNumber , 'seccion' : 3},
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
	     }
	};
	return viewModel;
};