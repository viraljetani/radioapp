KitchenSink.ProgramacionDetail = function (params) { 
    //loadingDetailProgramacion = ko.observable(true);
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
	    	 
             $(".centerContent .dx-scrollview-content").html("");
             //loadingDetailProgramacion(true);
             $.ajax({
                 type: 'get',
                 url : 'http://www.appcycle.me/grupo-grada/app/detallesPrograma.php',
                 dataType : 'jsonp',
                 success : function(data,txt,jqXHR){
                 $(".centerContent .dx-scrollview-content").append('<div class="contentProgramDetail clearfix"><p><span id="programa"><span class="iconprog1">&#8226;</span>'+data[0]["nombre"]+'<span class="iconprog1">&#8226;</span></span></p><div class="contentMasinfo clearfix"><img src="http://www.appcycle.me/grupo-grada/archivos/'+data[0]["imagen"]+'" class="imagenDetail" /><div class="contentDetalles clearfix" ><div class="contentRed clearfix facebook" style="border-bottom: 1px solid #D8D8D8;"><img src="images/facebook-red.png" /><p>/'+data[0]["facebook"]+'</p></div><div class="contentRed clearfix twitter"><img src="images/twitter-red.png" /><p style="margin-top: 8px;">@'+data[0]["twitter"]+'</p></div></div></div></div><div class="textProgram"><p>'+data[0]["descripcion"]+'</p></div>');
                 //loadingDetailProgramacion(false);
                    $(".facebook").click(function(){
                      window.open('https://facebook.com/'+data[0]["facebook"], '_blank', 'location=yes');
                    });
                 $(".twitter").click(function(){
                                      window.open('https://twitter.com/'+data[0]["twitter"], '_blank', 'location=yes');
                                      });
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
	    		 data     : { 'radio' : radioNumber , 'seccion' : 2},
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