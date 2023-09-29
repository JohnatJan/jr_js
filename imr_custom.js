(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureRenderComplete.addHandler(function(result) {
                console.log(janrain.gizmo.screenToRender);
                //Psuedo-Activation Path
                if(janrain.gizmo.screenToRender == 'verifyEmailSuccess') 
                {
                    janrain.capture.ui.renderScreen("changePasswordNoAuthForm");
                    //Show set password controls
                    const urlParams = new URLSearchParams(window.location.search);
                    const emailAddress = urlParams.get('login_hint');
                    document.getElementsByName("signInEmailAddress")[0].value = emailAddress; 
                }
                //Kill session after no-auth reset password.
                if(janrain.gizmo.screenToRender == "changePasswordSuccess") {
                    janrain.capture.ui.endCaptureSession();
                    janrain.capture.ui.renderScreen("signIn");
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
