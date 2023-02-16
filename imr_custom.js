(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureRenderComplete.addHandler(function(result) {
                if(janrain.gizmo.screenToRender == 'resetPassword' || janrain.gizmo.screenToRender == 'verifyEmail') 
                { 
                    const urlParams = new URLSearchParams(window.location.search);
                    const emailAddress = urlParams.get('login_hint');
                    $("[name='signInEmailAddress']").value = emailAddress; 
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
