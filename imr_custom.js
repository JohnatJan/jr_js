(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureRenderComplete.addHandler(function(result) {
                console.log(janrain.gizmo.screenToRender);
                if(janrain.gizmo.screenToRender == 'verifyEmailSuccess') 
                {
                    //Show set password controls
                    const urlParams = new URLSearchParams(window.location.search);
                    const emailAddress = urlParams.get('login_hint');
                    document.getElementsByName("signInEmailAddress")[0].value = emailAddress; 
                }
        });

        janrain.capture.ui.start();
    };
    
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
      window.attachEvent('onload', isReady);
    }
})();
