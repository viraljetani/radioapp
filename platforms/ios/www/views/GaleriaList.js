KitchenSink.GaleriaList = function (params) { 
    loadingGaleriaDetail = ko.observable(true);
	var viewModel = {
	     viewShown: function() {
	    	 
	    	 clearTimeout(bannerSito);
	    	 
	    	 loadingGaleriaDetail(true);
	    	 
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
	    	 
	    	 
             $(".centerContent .dx-scrollview-content").html('');
             function buscar(){
                 var texto = $("#searchinput").dxTextBox('option','value');
                 if(texto != ""){
                     $.ajax({
                            type : "get",
                            url   : "http://www.appcycle.me/grupo-grada/app/buscarMultimedia.php",
                            data : { palabras : texto /* radio : 1 */},
                            dataType : "jsonp",
                            success : function(data,txt,jqXHR){
                            if(data.length == 0){
                            window.location = "noresultado:nada";
                            }else{
                            $(".centerContent .dx-scrollview-content").html('');
                            for(var i = 0; i < data.length; i++){
                            $(".centerContent .dx-scrollview-content").append('<div class="contentDownload clearfix" data-link="'+data[i]["archivo"]+'" data-id="'+data[i]['id']+'"><div class="contentImage"><div class="contentDownloadIcon"><img src="images/download-normal.png"/></div><img class="famous" src="test/katy.png"/></div><div class="contentTitle"><h3>'+data[i]["titulo"]+'</h3></div></div>');
                            }
                            }
                            $(".contentDownload").click(function(){
                      		   var link = $(this).attr("data-link");
                     		   window.MainActivity.descargarArchivo(link);
                     	   });
                            loadingGaleriaList(false);
                            },
                            error : function(){
                            loadingGaleriaList(false);
                            }
                            });
                 }else{
                     window.location = 'errorbusqueda:Error';
                     loadingGaleriaList(false);
                 }
                 
             }
	    	 
	    	 $("#lupa").click(function(){
                 loadingGaleriaList(true);
                 buscar();
                 });
	    	 $.ajax({
	                type: 'get',
	                url : 'http://www.appcycle.me/grupo-grada/app/categoriaData.php',
	                dataType : 'jsonp',
	                success : function(data,txt,jqXHR){
	                	$(".centerContent .dx-scrollview-content").append('<div class="contentCategoriaGaleria clearfix" data-id="'+data[0]["id"]+'"><div class="contentImage"><img src="http://www.appcycle.me/grupo-grada/archivos/'+data[0]["imagen"]+'" /></div><div class="contentInfo"><h3>'+data[0]["nombre"]+'</h3><p>'+data[0]["descripcion"]+'</p></div><div class="arrowNextContent"><img src="images/arrow-left.png" /></div></div>');
	                    $.ajax({
	                           type: 'get',
	                           url : 'http://www.appcycle.me/antena8/listarMultimedias.php',
	                           dataType : 'jsonp',
	                           success : function(data,txt,jqXHR){
	                           for(var i = 0; i < data.length; i++){
	                           $(".centerContent .dx-scrollview-content").append('<div class="contentDownload clearfix" data-link="'+data[i]["archivo"]+'" data-id="'+data[i]['id']+'"><div class="contentImage"><div class="contentDownloadIcon"><img src="images/download-normal.png"/></div><img class="famous" src="test/katy.png"/></div><div class="contentTitle"><h3>'+data[i]["titulo"]+'</h3></div></div>');
	                           }
	                           
	                           $(".contentDownload").click(function(){
                        		   var link = $(this).attr("data-link");
                        		   window.MainActivity.descargarArchivo(link);
                        	   });
	                           loadingGaleriaDetail(false);
	                           },
	                           error : function(jqXHR,txt,error){
	                           alert("Se ha producido un error");
	                           },
	                           data : { 'id' : params.id}});
	                 },
	                error : function(jqXHR,txt,error){
	                    alert("Se ha producido un error");
	                },
	               data : { 'id' : params.id}
	            });
	    	 
	    	 $.ajax({
	    		 type     : "get",
	    		 dataType : "jsonp",
	    		 url      : "http://www.appcycle.me/grupo-grada/app/listarBanner.php",
	    		 data     : { 'radio' : 1 , 'seccion' : 4},
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