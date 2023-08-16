(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
    
    function isReady() { 
        janrain.ready = true; 
        janrain.events.onCaptureRenderComplete.addHandler(function(result) {
                addHeader();
                loginScreen();
                addFooter();
                
                const logo=$("#logo-wrapper #logo").attr("src");
                $("<img>").attr({src:logo,id:"logo",alt:"logo"}).appendTo(".top-wrapper #tremfya");
                $(".additional-actions-container .content-wrapper ").hide();
                $("<div>").attr({class:"halthcare-provide"}).html("HealthCare Provider ?<a> Go To Provider Portal</a>").appendTo(".footer-container .content-wrapper");
                $(".additional-actions-container .content-wrapper .help-text, .footer-container .content-wrapper .help-link").hide();
                $("<div>").attr("class","form-right-section").appendTo("#janrainCaptureWidget");
                $("<h3>").attr("class","screen-heading").text("Welcome to Janssen CarePath").appendTo(".form-right-section");
                $("<div>").attr("class","form-text").text("Sign into your account to verify your insurance coverage or find affordability options. You can also learn about your medication and find other resources that will help you with your treatment journey.").appendTo(".form-right-section");
                $("<div>").attr("class","form-not-account").text("Don't have an account?").appendTo(".form-right-section");
                $("<div>").attr("class","form-right-button-section").appendTo(".form-right-section");
                $("<a>").attr({class:"sign-up-button",type:"submit",href:"#",}).text("Sign Up").appendTo(".form-right-button-section");
                
                $("<div>").attr("class","tour-video").html('<a href="#" class="tour-video-section"><span>Watch a 90-second video tour</span></a>').appendTo(".form-right-button-section");

            janrain.capture.ui.start();
        });
    }
    
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
      window.attachEvent('onload', isReady);
    }
})();


function loginScreen(){
    $("#signIn .auth-screen .alternate-credentials").text("");
    $("#signIn .auth-screen .alternate-credentials").addClass("email-label").text("Email & Password");
    $("#capture_signIn_form_item_signInEmailAddress label").text("");$("#capture_signIn_form_item_signInEmailAddress label").text("Email");
    const passToogle='<div class="pass-toogle-icon" id="passwordToogle"></div>';$("#signIn #capture_signIn_form_item_currentPassword").append(passToogle);
    $(document).on("click","#passwordToogle",function(event){
        const passwordField=$("#signIn #capture_signIn_currentPassword");
        const fieldType=passwordField.attr("type");
        const type=fieldType==="password"?"text":"password";
        passwordField.attr("type",type);
        $("#passwordToogle").toggleClass("open-eye")
    ;})
;}
function addHeader() {
    const topHeader='<div class="top-wrapper first"><div class="top-left-section"><a href="#" class="info-saty">Important Safety Information</a><a href="#" class="full-info">Full Prescribing Information</a></div>' +
              '<div class="top-right-section"><a href="#" class="top-trimfya-link">Go to BRAND.com</a></div></div><div class="top-wrapper"><div class="logo-wrapper" id="tremfya"></div><div class="top-support-program"><div class="support-program">Patient Support Program</div><div class="need-help"><a href="">Need Help?</a></div></div></div>';
                  
    $("#content-wrapper #header-container").prepend(topHeader);
}
function addFooter () {
    const siteFooter='<div class="login-footer-wrapper"><p>If you have any questions, please contact us at:</p><p><span class="bold">877-CarePath</span> (877-227-3728)</p><p> Monday - Friday, 8:00 AM - 8:00  PM ET</p></div>';
                      
                $("#content-wrapper #content-container").append(siteFooter);
}
