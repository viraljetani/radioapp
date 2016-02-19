window.KitchenSink = window.KitchenSink || {};
$(function() {
    KitchenSink.app = new DevExpress.framework.html.HtmlApplication({
        namespace: KitchenSink,
        
        defaultLayout: KitchenSink.config.defaultLayout,
        navigation: KitchenSink.config.navigation
    });

    // NOTE: turn on ios7 theme
    var devices = DevExpress.devices;
    if(devices.current().platform === "ios" && devices.iosVersion() && devices.iosVersion()[0] === 7) {
        $(".dx-viewport")
            .removeClass("dx-theme-ios")
            .addClass("dx-theme-ios7");
    }

    KitchenSink.app.router.register(":view/:id", { view: "Home", id: '' });

});
