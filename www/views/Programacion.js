KitchenSink.Programacion = function (params) { 
    loadPanelVisible = ko.observable(true);
    overlayVisible = ko.observable(true);
    
    var valor = "";
    dia = "";
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
	    	 
	    	 function hideoverlay(){
                 overlayVisible(false);
            }
             loadPanelVisible(true);
             function buscar(){

                 
                 dia = window.MainActivity.diaValor();
                 alert(dia);
                 var texto = $("#searchinput").dxTextBox('option','value');
                 var diaBuscar = dia;
                 if(texto != "" || diaBuscar != "" ){
                     $.ajax({
                            type : "get",
                            url   : "http://www.appcycle.me/grupo-grada/app/buscarProgramas.php",
                            data : { dia : diaBuscar , palabras : texto , radio : radioNumber },
                            dataType : "jsonp",
                            success : function(data,txt,jqXHR){
                                if(data.length == 0){
                                    window.location = "noresultado:nada";
                            }else{
                            $("#contenedorNoticiasGeneral .dx-scrollview-content").html('');
                            for(var i = 0; i < data.length; i++){
                            $("#contenedorNoticiasGeneral .dx-scrollview-content").append('<div class="contentPrograma clearfix" data-id="'+data[i]["id"]+'"><div class="contentDivLogo clearfix"><img src="http://www.appcycle.me/grupo-grada/archivos/'+data[i]["logo"]+'"/></div><div class="contentDivPrograma"><p class="horario">'+data[i]["inicio"]+' a '+data[i]["fin"]+'</p><p class="dias">'+data[i]["dias"]+'</p></div></div>');
                            }
                            loadPanelVisible(false);
                            $(".contentPrograma").click(function(){
                                                        idNoticia = $(this).attr("data-id");
                                                        //KitchenSink.app.navigate("ProgramacionDetail/Pepe");
                                                        KitchenSink.app.navigate({ view: 'ProgramacionDetail',id: idNoticia});
                                                        })
                                }
                                loadPanelVisible(false);
                            },
                            error : function(){
                                loadPanelVisible(false);
                            }
                     });
                 }else{
                     window.location = 'errorbusqueda:Error';
                     loadPanelVisible(false);
                 }
                 
             }
             overlayVisible(false);
             
             
             $("#diasBtn").click(function(){
                 window.MainActivity.dialogoDias();
             });
              
             $("#lupa").click(function(){
                 loadPanelVisible(true);
                 buscar();
             });
             
             
             $.ajax({
                 type: 'get',
                 url : 'http://www.appcycle.me/grupo-grada/app/listarProgramas.php',
                 dataType : 'jsonp',
                 success : function(data,txt,jqXHR){
                	 var posicionActual = 0;
                	 var arrayAgregar = new Array();
                	 
                	 $("#contenedorNoticiasGeneral .dx-scrollview-content").html("").css({"height" : "75%"});
                     for(var i = 0; i < data.length; i++){
                    	 arrayAgregar.push('<div class="contentPrograma clearfix" data-id="'+data[i]["id"]+'"><div class="contentDivLogo clearfix"><img src="http://www.appcycle.me/grupo-grada/archivos/'+data[i]["logo"]+'"/></div><div class="contentDivPrograma"><p class="horario">'+data[i]["inicio"]+' a '+data[i]["fin"]+'</p>');
                    	 //agregar = "";
                    	 $.ajax({
                             type : 'get',
                             url  : 'http://www.appcycle.me/grupo-grada/app/horarioProgramas.php',
                             dataType : 'jsonp',
                             success : function(dat,txt,jqXHR){
                                      arrayAgregar[posicionActual]+='<p class="dias" style="font-size:15px;">'+dat+'</p>';
                                      $("#contenedorNoticiasGeneral .dx-scrollview-content").append(arrayAgregar[posicionActual]+"</div></div>");
                                      posicionActual++;
                                      
                                      if(posicionActual == data.length){

                                          $(".contentPrograma").click(function(){
                                              idNoticia = $(this).attr("data-id");
    						                       //KitchenSink.app.navigate("ProgramacionDetail/Pepe");
    						                         KitchenSink.app.navigate({ view: 'ProgramacionDetail',id: idNoticia});
    						               })
                                      }
                             
                             },
                             data : { 'programa' : data[i]["id"]}
                    	 });
                     }
                     
                     loadPanelVisible(false);
                 },
                 error : function(jqXHR,txt,error){
                     alert("Se ha producido un error");
                 },
                 data : { 'radio' : radioNumber }
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