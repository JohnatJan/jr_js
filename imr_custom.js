(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureRenderComplete.addHandler(function(result) {
                screenBeingRendered = janrain.gizmo.screenToRender;
                //Psuedo-Activation Path
                if(janrain.gizmo.screenToRender == 'signIn') 
                {
                    document.getElementsByName("signInEmailAddress")[0].value = getLoginHint(); 
                }
                        
                //Kill session after no-auth reset password.
                if(janrain.gizmo.screenToRender == "changePasswordSuccess") {
                    janrain.capture.ui.endCaptureSession();
                }
                
                if(janrain.gizmo.screenToRender == 'verifyEmailSuccess') 
                {
                    event.stopPropagation();
                    janrain.capture.ui.renderScreen("manageProfile_security");
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
function getLoginHint()
{

    const urlParams = new URLSearchParams(window.location.search);
    const emailAddress = urlParams.get('login_hint');
    return emailAddress
}
