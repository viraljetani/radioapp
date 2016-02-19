KitchenSink.Alertas = function(params) {
    var viewModel = {
    		viewShown : function(){
                var ObjList = new Array();
                $('.alertasprogram .dx-scrollview-content').html('');
                //Cargar Noticias de DB
                $.ajax({
                       type: 'get',
                       url : 'http://www.appcycle.me/grupo-grada/app/listarProgramas.php',
                       dataType : 'jsonp',
                       success : function(data,txt,jqXHR){
                       $(".alertasprogram .dx-scrollview-content").append('<div class="contentOption clearfix" id="masAlertas" ><div class="contentTextOption">Alerta de Programas</div><div class="contentCheckOption"><img class="arrowleft" src="images/arrow-down.png"></div></div>');
                       for(var i = 0; i < data.length; i++){
                            $(".alertasprogram .dx-scrollview-content").append('<div class="contentOption clearfix opcionpara"><div class="contentTextOption">Alerta '+data[i]["nombre"]+'</div><div class="contentCheckOption"><div class="checkbx" _canal="'+data[i]["canal"]+'" id="checkbx-'+i+'" ></div></div>');
                            var puedo = false;
                            window.MainActivity.CheckCategory(data[i]["canal"]);

                            if(window.MainActivity.isCheckCategory(data[i]["canal"])==1){
                                puedo=true;
                            }
                            var cb = $("#checkbx-"+i).dxCheckBox(
                                {
                                    checked: puedo
                                }
                            );
                            ObjList.push(cb);


                         }
                       for(var f=0;f<ObjList.length;f++){
                            var cb = ObjList[f];
                           $("#checkbx-"+f).click(function(){
                                var canal = $(this).attr('_canal');
                                if(window.MainActivity.isCheckCategory(canal)==1){
                                    window.MainActivity.Unsuscribe(canal);
                                    window.MainActivity.UpdateCategory(canal,0);
                                }else{
                                    window.MainActivity.Suscribe(canal);
                                    window.MainActivity.UpdateCategory(canal,1);
                                }

                           });
                       }

                       },
                       error : function(jqXHR,txt,error){
                       alert("Se ha producido un error");
                       },
                       data : { 'radio' : 4 }
                });
    		}
    };
    return viewModel;
};