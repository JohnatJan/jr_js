(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureSaveSuccess.addHandler(function(result) {
            console.log(result);
        });
        janrain.events.onCaptureRenderStart.addHandler(function(result) {
            console.log(result);
        });
        janrain.events.onCaptureEmailVerificationSuccess.addHandler(function(results) {
            console.log(result);
            console.log("In verifyEmailSuccess");
            setTimeout(function() { janrain.capture.ui.renderScreen("resetPassword"); },500);
            
        })

        janrain.events.onCaptureRenderComplete.addHandler(function(result) {
            try {
                console.log(result)
                screenBeingRendered = result.screen;
                //Psuedo-Activation Path
                console.log(screenBeingRendered);
                if(screenBeingRendered == 'signIn') 
                {
                    document.getElementsByName("signInEmailAddress")[0].value = getLoginHint(); 
                }
                        
                //Kill session after no-auth reset password.
                if(screenBeingRendered == "changePasswordSuccess") {
                    janrain.capture.ui.endCaptureSession();
                }
                if(screenBeingRendered == 'verifyEmail') 
                {
                    console.log("In verifyEmail");
                }
                
            }catch(err) {
                console.log(err);
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
