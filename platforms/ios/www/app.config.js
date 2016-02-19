window.KitchenSink = $.extend(true, window.KitchenSink, {
  "config": {
    "defaultLayout": "slideout",
    "navigation": [
      {
        "title": "Programación",
        "action": "#Programacion",
        "icon": "programacion"
      },
      {
        "title": "Radio en vivo",
        "action": "#Home",
        "icon": "envivo"
      },
      {
        "title": "Noticias",
        "action": "#Noticias",
        "icon": "noticias"
      },
      /*{
        "title": "Galeria",
        "action": "#Galeria",
        "icon": "galeria"
      },*/
      {
        "title": "Configuracion",
        "action": "#Configuracion",
        "icon": "configuracion"
      },
      {
    	  "title" : "Salir",
    	  "action": function(){
    		  window.MainActivity.salir();
    	  },
    	  "icon" : "close"
      }
    ]
  }
});