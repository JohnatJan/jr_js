function CheckRegion() {
    if (document.getElementById('capture_traditionalRegistration_dataRegion').value == "NA")
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "none";
    else
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "block";
}
function initCheckRegion() {
    console.log("attempting to wire event.");
    try {
        //document.getElementById('capture_traditionalRegistration_dataRegion').onchange = CheckRegion;
        document.getElementById('capture_traditionalRegistration_dataRegion').addEventListener('change', CheckRegion);
        console.log("after document.getElementById('capture_traditionalRegistration_dataRegion').addEventListener('change', CheckRegion);");

        CheckRegion();
        return true;
    }catch (err) {
        console.log(err);
    }
}
/*
function janrainCaptureWidgetOnLoad() {
                                                                            
    janrain.events.onCaptureRenderComplete.addHandler(function(result) {
        setTimeout(3000);
        initCheckRegion()
    });

    janrain.capture.ui.start();
        document.write('<script type="text/javascript" defer="defer">initCheckRegion();</script>');

}
*/
(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureRenderComplete.addHandler(function(result) {
            setTimeout(3000);
            initCheckRegion()
        });

        janrain.capture.ui.start();
    };
    
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
      window.attachEvent('onload', isReady);
    }
})();
