KitchenSink.Configuracion = function(params) {
    var viewModel = {
    	viewShown: function(){
            $("#masAlertas").unbind("click").click(function(){
                KitchenSink.app.navigate("Alertas");
            });
            if(window.MainActivity.isCheckCategory("NOTICIAS")==1){
                var noticias = $("#noticias").dxCheckBox("instance");
                noticias.option('checked',true);

               // noticiasPush = ko.observable(true);
            }
            if(window.MainActivity.isCheckCategory("CONTENIDOS")==1){
                 var contenidos = $("#contenidos").dxCheckBox("instance");
                 contenidos.option('checked',true);
               //contenidosPush = ko.observable(true);
            }
    	}
    };
    return viewModel;
};