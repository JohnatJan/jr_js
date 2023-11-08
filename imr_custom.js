(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureSaveSuccess.addHandler(function(result) {
            console.log(result);
        });
        janrain.events.onCaptureRenderStart.addHandler(function(result) {
        });
        janrain.events.onCaptureEmailVerificationSuccess.addHandler(function(results) {
            console.log(result);
            console.log("In verifyEmailSuccess");
            
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
                    $('head').append('<meta http-equiv="Content-Security-Policy" content="media-src \'self\ \'*.brightcove.com\' \'*.brightcove.net\'">');
                }
                        
                //Kill session after no-auth reset password.
                if(screenBeingRendered == "resetPasswordSuccess") {
                    janrain.settings.isPostReset = true;
                    console.log("in resetPasswordSuccess");
                    janrain.capture.ui.endCaptureSession();
                    result.stopPropagation();
                    
                    $('#signIn .screen-description').html("<b style='color:red'>Your password has been successfully Updated.</b>");
                }
                if(screenBeingRendered == 'verifyEmailSuccess') 
                {
                    janrain.capture.ui.renderScreen("resetPassword");
                    console.log("In verifyEmail");
                }
                if(screenBeingRendered == 'initialLoadScreen' && janrain.settings.isPostReset) 
                {
                    console.log("in InitialLoadScreen Only after a Reset");
                    $('#initialLoadScreen').html('<h2>Your password has been successfully Updated.</h2><br /><a class="sign-up-button" type="submit" href="#">Sign In</a>'
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
