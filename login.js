(function () {
  if (typeof window.janrain !== "object") window.janrain = {};
  if (typeof window.janrain.settings !== "object") window.janrain.settings = {};

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", isReady, false);
  } else {
    window.attachEvent("onload", isReady);
  }

  function isReady() {
    janrain.ready = true;
    janrain.events.onCaptureRenderComplete.addHandler(function (result) {
      addHeader();
      loginScreen();
      forgotPassword();
      resetPassword();
      addFooter();
      addCustomSidebar();
      addLoginTabs();
      validEmailPass();
      addHelpText(result);
      mailSent();
      videoModal();
      resetPasswordCodeEx(result);
      if (typeof initGreenTheme !== "undefined") {
        initGreenTheme();
      }
      if (typeof initBlueTheme !== "undefined") {
        initBlueTheme();
      }

        //Kill session after no-auth reset password.
        if(screenBeingRendered == "resetPasswordSuccess") {
            console.log("in resetPasswordSuccess");
            janrain.capture.ui.endCaptureSession();
            result.stopPropagation();
            
            $('#signIn .screen-description').html("<b style='color:red'>Your password has been successfully Updated.</b>");
        }
    });
  }
})();

// Add Custom Header
function addHeader() {
  const topHeader = header;
  if ($("#customHeader").length == 0) {
    $("#content-wrapper #header-container").prepend(topHeader);
  }
  const logo = $("#logo-wrapper #logo").attr("src");
  const logoImg = $("<img>").attr({ src: logo, id: "logo", alt: "logo" });
  if (!$(".top-wrapper #tremfya img").length) {
    logoImg.appendTo(".top-wrapper #tremfya");
  }
}

// Add Custom Footer
function addFooter() {
  const siteFooter = footer;

  if ($("#customFooter").length == 0)
    $("#content-wrapper #content-container").append(siteFooter);
}

// Video modal script
function videoModal() {
  const modalContent = `
  <div id="video-section">
    <div
      role="dialog"
      aria-modal="true"
      class="fade modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="video-wrapper">
              <div>
                <video
                 id="my-video"
                  class="video-js"
                  controls
                  preload="auto"
                  muted>
                  <source src="https://dev.cam-assets.janssen.com/auth-service/dev/withme_login/video/guide_video.mp4" type="video/mp4">
                </video>
              </div>
            </div>
            <ul class="list-wrapper">
              <li>Let us help you sign up and explore affordability options.</li>
              <li>For eligible patients, view your savings information, track your Savings Program usage or submit a rebate request.</li>
              <li>Check what your insurance covers and your potential out-of-pocket costs.</li>
              <li>Learn about your medication and find other resources that will help you with your treatment journey.</li>
            </ul>
            <div class="cta-wrapper">
              <a class="sign-up-button" type="submit" href="https://janssencarepathâ€“sit.sandbox.my.site.com/JanssenPatient/user/register?flow=register">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  $("#janrainCaptureWidget").length &&
    !$("#janrainCaptureWidget #video-section").length &&
    $("#janrainCaptureWidget").append(modalContent);

  if ($("#janrainCaptureWidget .tour-video a").length) {
    $("#janrainCaptureWidget .tour-video a").attr("href", "#");
  }
}

//Open Video Modal
$(document).on("click", "#janrainCaptureWidget .tour-video a", function () {
  $("#video-section .modal").show();
  $("body").css("overflow", "hidden");
});

//Close Video Modal
$(document).on(
  "click",
  "#janrainCaptureWidget #video-section .modal .btn-close",
  function () {
    $("#video-section .modal").hide();
    $("#video-section .modal video-js video")[0].pause();
    $("body").css("overflow", "");
  }
);

//on click hide and show paass
$(document).on("click", "#passwordToogle", function (event) {
  $(this).toggleClass("open-eye");
  const type = $("#passwordToogle").hasClass("open-eye") ? "text" : "password";

  $("#signIn #capture_signIn_currentPassword").attr("type", type);
  const cursorPointer = document.getElementById(
    "capture_signIn_currentPassword"
  );
  setTimeout(function () {
    cursorPointer.focus();
    const type = $("#passwordToogle").hasClass("open-eye")
      ? "text"
      : "password";
    $("#signIn #capture_signIn_currentPassword").attr("type", type);
    cursorPointer.setSelectionRange(
      cursorPointer.value.length,
      cursorPointer.value.length
    );
  }, 1);
});

//Add help text
function addHelpText(result) {
  $(".additional-actions-container").html("");
  $("#capture_signIn_signInForm_errorMessages").appendTo(
    ".additional-actions-container"
  );
  if (result.screen == "signIn") {
    var eleProvider =
      "#" + result.screen + " .footer-container .content-wrapper #hcpFooter";
    var eleProviderWrapper =
      "#" + result.screen + " .footer-container .content-wrapper";
    if ($(eleProvider).length == 0) {
      $("<div>")
        .attr({ class: "healthcare-provide", id: "hcpFooter" })
        .html(
          "HealthCare Provider? <a href='https://www.janssencarepathportal.com/'>Go To Provider Portal</a>"
        )
        .appendTo(eleProviderWrapper);
    }
  }
  $(".footer-container .content-wrapper .help-link").hide();
}

//Mail sent screen
const email_icon =
  '<div class="img-wrapper"><img src="https://dev.cam-assets.janssen.com/auth-service/dev/www_tremfya_com/img/mail_icon.png"/></div>';
if ($("#emailIcon").length == 0)
  $("#resetPasswordRequestSuccess .auth-screen").prepend(email_icon);

function mailSent() {
  $("#resetPasswordRequestSuccess .screen-heading").text("Check Your Email!");
  $("#resetPasswordRequestSuccess .screen-description").text(
    "If the account exists, an email with a link to reset the password will be sent to the email we have on file."
  );
  //addition of div element for button
  const returnLogin =
    '<div id="returnLogin" class="form-action-buttons returnLogin"><button>Return to Log In</button></div>';
  if ($("#returnLogin").length == 0)
    $("#resetPasswordRequestSuccess .auth-screen").append(returnLogin);
  $(document).on(
    "click",
    "#resetPasswordRequestSuccess .returnLogin button",
    function () {
      janrain.capture.ui.renderScreen("signIn");
      // $("#signIn").show();
      $("#resetPasswordRequestSuccess").hide();
    }
  );
}

//reset password screen
function resetPassword() {
  $("#resetPassword .screen-heading").text("Create New Password");
  $("#resetPassword .form-action-buttons button")
    .addClass("reset-pass-button")
    .text("Change Password");
  $("#capture_resetPassword_form_item_newPassword label").text("New Password");
  $("#capture_resetPassword_newPassword").attr("placeholder", "");
  $("#capture_resetPassword_form_item_newPassword .capture_tip").text("");
  $("#capture_resetPassword_form_item_newPasswordConfirm label").text(
    "Repeat Password"
  );
  $("#capture_resetPassword_newPasswordConfirm").attr("placeholder", "");

  if ($("#resetPassword .reset-pass-cancel").length == 0) {
    $("#resetPassword .form-action-buttons").append(
      `<div class="reset-pass-cancel">Cancel</div>`
    );
  }

  const pwStrengthProgress = `<div class="strengthify-wrapper" data-strengthifyfor="capture_resetPassword_newPassword">
  <div class="strengthify-bg" style="opacity: 1;"></div>
  <div class="password-red strengthify-container" style="opacity: 1; width: 100%;"></div>
  <div class="strengthify-separator" style="left: 20%; opacity: 1;"></div>
  <div class="strengthify-separator" style="left: 40%; opacity: 1;"></div>
  <div class="strengthify-separator" style="left: 60%; opacity: 1;"></div>
  <div class="strengthify-separator" style="left: 80%; opacity: 1;"></div>
  </div>`;
  const pwStrength = `<div class="password-criteria-wrapper">
    <div id="password-strength-info">Your password must include a combination of all of the following requirements: </div>
    <ul class="pswd_info" id="passwordCriterion">
      <li data-criterion="length" class="invalid">minimum of 10 characters</li>
      <li data-criterion="capital" class="invalid">uppercase letters</li>
      <li data-criterion="small" class="invalid">lowercase letters</li>
      <li data-criterion="number" class="invalid">numbers</li>
      <li data-criterion="special" class="invalid">special characters (ex: !, @, %).</li>
    </ul>
  </div>`;
  const pwStrengthProgressWrap =
    '<div id="newPassStrengthProgressWrap">' +
    pwStrengthProgress +
    pwStrength +
    "</div>";
  $("#capture_resetPassword_form_item_newPassword").after(
    pwStrengthProgressWrap
  );
  $("#newPassStrengthProgressWrap").hide();

  $(document).on(
    "keyup",
    "#capture_resetPassword_newPassword",
    function (event) {
      var newpassword = $("#capture_resetPassword_newPassword").val();
      if (newpassword.trim().length > 0) {
        $("#newPassStrengthProgressWrap").show();
      } else {
        $("#newPassStrengthProgressWrap").hide();
      }
      checkPasswordStrength(newpassword);
    }
  );

  addShowHide(
    "capture_resetPassword_newPassword",
    "capture_resetPassword_form_item_newPassword"
  );
  addShowHide(
    "capture_resetPassword_newPasswordConfirm",
    "capture_resetPassword_form_item_newPasswordConfirm"
  );
}

//forgot password screen
function forgotPassword() {
  $("#resetPasswordRequest .screen-heading").text("Forgot Password?");
  $("#resetPasswordRequest .screen-description").text(ForgotPasswordDecription);
  $("#resetPasswordRequest .form-action-buttons button")
    .addClass("reset-pass-button")
    .text("Send Password Reset Link");

  if ($(".forgot-pass-cancel").length == 0) {
    $("#resetPasswordRequest .form-action-buttons").append(
      `<div class="forgot-pass-cancel">Cancel</div>`
    );
  }
}
// Forget password button click reset height right section
$(document).on("click", "#signIn .forgot-password-link", function () {
  //onclick forgot pass save text box.
  $("#signIn").hide();
  const emailValue = $("#capture_signIn_signInEmailAddress").val();
  localStorage.setItem("forgotEmail", emailValue);
  $("#capture_resetPasswordRequest_signInEmailAddress").val(
    localStorage.getItem("forgotEmail")
  );
  $(".form-right-section .form-not-account").addClass(
    "forgot-pass-have-account"
  );
});

//cancel button onclick go to the previous stage.
$(document).on(
  "click",
  ".form-action-buttons .forgot-pass-cancel",
  function (e) {
    $("#resetPasswordRequest").hide();
    $("#signIn").show();
    $(".form-right-section .form-not-account").removeClass(
      "forgot-pass-have-account"
    );
    $("#capture_resetPasswordRequest_signInEmailAddress").val(
      localStorage.getItem("")
    );
  }
);

//reset password cancel button onclick.
$(document).on(
  "click",
  ".form-action-buttons .reset-pass-cancel",
  function (e) {
    $("#resetPassword").hide();
    janrain.capture.ui.renderScreen("signIn");
  }
);
//reset password expired screen cancel button onclick.
$(document).on(
  "click",
  ".form-action-buttons .reset-codeex-cancel",
  function (e) {
    $("#resetPasswordCodeExchange").hide();
    $("#customAlert").hide();
    janrain.capture.ui.renderScreen("signIn");
    $(".form-right-section .form-not-account").removeClass("reset-pass-codeex");
    $(".form-right-section .form-right-button-section").removeClass(
      "reset-pass-codeex-section"
    );
  }
);
// Login section
function loginScreen() {
  janrain.events.onCaptureLoginFailed.addHandler(function (a) {
    if ($("#capture_signIn_form_item_currentPassword").length) {
      if (a.statusMessage === "invalidCredentials") {
        setTimeout(function () {
          $("#capture_signIn_form_item_currentPassword").addClass(
            "invalid-error"
          );

          $("#capture_signIn_signInForm_errorMessages")
            .children()
            .removeClass("capture-locked-error");

          $("#capture_signIn_form_item_currentPassword").removeClass(
            "locked-error"
          );
        }, 1);
      } else if (a.statusMessage === "rateLimitExceeded") {
        setTimeout(function () {
          $("#capture_signIn_form_item_currentPassword").addClass(
            "locked-error"
          );

          $("#capture_signIn_signInForm_errorMessages")
            .children()
            .addClass("capture-locked-error");

          $("#capture_signIn_form_item_currentPassword").removeClass(
            "invalid-error"
          );
        }, 1);
      }
    }
  });
  $("#signIn .auth-screen .alternate-credentials").text("");
  $("#signIn .auth-screen .alternate-credentials")
    .addClass("email-label")
    .text("Email & Password");
  $(
    "#capture_signIn_form_item_signInEmailAddress label #capture_resetPasswordRequest_form_item_signInEmailAddress label"
  ).text("");
  $(
    "#capture_signIn_form_item_signInEmailAddress label, #capture_resetPasswordRequest_form_item_signInEmailAddress label"
  ).text("Email");
  const passToogle = '<div class="pass-toogle-icon" id="passwordToogle"></div>';
  if ($("#passwordToogle").length == 0) {
    $("#signIn #capture_signIn_form_item_currentPassword").append(passToogle);
  }

  $("#capture_signIn_currentPassword").on("focus click", function () {
    // for the cursor issue in password.
    const cursorPointer = document.getElementById(
      "capture_signIn_currentPassword"
    );
    setTimeout(function () {
      const type = $("#passwordToogle").hasClass("open-eye")
        ? "text"
        : "password";
      $("#signIn #capture_signIn_currentPassword").attr("type", type);
      cursorPointer.setSelectionRange(
        cursorPointer.value.length,
        cursorPointer.value.length
      );
    }, 1);
  });

  // Remember me checkbox
  const rememberMe = `<div class="remember-wrapper"><input class="check-section checkbox" type="checkbox" id="checkbox" name="chkbx">
  <label for="checkbox" tabindex="1">Remember Me</label></div>`;
  if ($(".remember-wrapper").length == 0) {
    $("#signIn .form-action-buttons").prepend(rememberMe);
  }

  //remeber me functionality
  $(function () {
    if (localStorage.chkbx && localStorage.chkbx != "") {
      $("#checkbox").attr("checked", "checked");
      $("#capture_signIn_signInEmailAddress").val(localStorage.email);
    } else {
      $("#checkbox").removeAttr("checked");
      $("#capture_signIn_signInEmailAddress").val("");
    }

    janrain.events.onCaptureLoginSuccess.addHandler(function () {
      if ($("#checkbox").is(":checked")) {
        localStorage.email = $("#capture_signIn_signInEmailAddress").val();
        localStorage.chkbx = $("#checkbox").val();
      } else {
        localStorage.email = "";
        localStorage.chkbx = "";
      }
    });
  });

  //adding error class for form field generating error
  $(document).on("focus blur", ".capture_form_item", function () {
    const errorClassElement = $(this).find("div.capture_tip_error");
    const validClass = $(this).hasClass("capture_validated");
    if (errorClassElement.text() != "" && !validClass) {
      $(this).addClass("error");
    } else {
      $(this).removeClass("error");
    }
  });
}
//onclick focus in the email text box
$(document).on(
  "touchstart click",
  "#capture_signIn_signInEmailAddress",
  function () {
    $("#capture_signIn_signInEmailAddress").focus();
  }
);

function addLoginTabs() {
  const loginTabs = `<span id="codePhone" class="alternate-credentials login-tab">Code to Phone</span><span id="linkEmail" class="alternate-credentials login-tab">Link to Email</span>`;
  $(
    "#main-container #content-container #janrainCaptureWidget #signIn .alternate-credentials"
  )
    .attr("id", "emailPass")
    .addClass("active");
  $(
    "#main-container #content-container #janrainCaptureWidget #signIn .alternate-credentials"
  ).after(loginTabs);
}

function validEmailPass() {
  const emailInput = $("#signIn #capture_signIn_signInEmailAddress");
  const passInput = $("#signIn #capture_signIn_currentPassword");
  const rprEmailInput = $(
    "#resetPasswordRequest #capture_resetPasswordRequest_signInEmailAddress"
  );
  const emailErrorMessage = $(
    "#capture_signIn_form_item_signInEmailAddress .capture_tip_error"
  );
  const passErrorMessage = $(
    "#capture_signIn_form_item_currentPassword .capture_tip_error"
  );
  const rprEmailErrorMessage = $(
    "#capture_resetPasswordRequest_form_item_signInEmailAddress .capture_tip_error"
  );
  const rprCoexEmailErrorMessage = $(
    "#capture_resetPasswordCodeExchange_form_item_signInEmailAddress .capture_tip_error"
  );
  // email id validation function.
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  $(document).on("blur", "#capture_signIn_signInEmailAddress", function () {
    const email = emailInput.val().trim();
    if (email === "") {
      emailErrorMessage.show();
    } else if (isValidEmail(email)) {
      emailErrorMessage.hide();
    } else {
      emailErrorMessage.show();
    }
  });
  $(document).on("blur", "#capture_signIn_currentPassword", function () {
    const passLength = passInput.val().trim();
    if (passLength.length > 0) {
      passErrorMessage.hide();
    } else {
      passErrorMessage.show();
    }
  });
  $(document).on(
    "blur",
    "#capture_resetPasswordRequest_signInEmailAddress",
    function () {
      const email = this.value.trim();
      if (email === "") {
        rprEmailErrorMessage.show();
      } else if (isValidEmail(email)) {
        rprEmailErrorMessage.hide();
      } else {
        rprEmailErrorMessage.show();
        setTimeout(function () {
          rprEmailErrorMessage.text("Invalid Email");
        }, 1);
      }
    }
  );
  $(document).on(
    "blur",
    "#capture_resetPasswordCodeExchange_signInEmailAddress",
    function () {
      const email = this.value.trim();
      if (email === "") {
        rprCoexEmailErrorMessage.show();
      } else if (isValidEmail(email)) {
        rprCoexEmailErrorMessage.hide();
      } else {
        rprCoexEmailErrorMessage.show();
        setTimeout(function () {
          rprCoexEmailErrorMessage.text(
            "You have entered an invalid email address."
          );
        }, 1);
      }
    }
  );

  $(document).on(
    "click",
    "#resetPasswordRequest .form-action-buttons .reset-pass-button",
    function () {
      const email = $(
        "#resetPasswordRequest #capture_resetPasswordRequest_signInEmailAddress"
      )
        .val()
        .trim();
      if (email === "") {
        rprEmailErrorMessage.show();
      } else if (isValidEmail(email)) {
        rprEmailErrorMessage.hide();
      } else {
        rprEmailErrorMessage.show();
        setTimeout(function () {
          rprEmailErrorMessage.text("Invalid Email");
        }, 1);
      }
    }
  );

  const resetPassInput = $("#resetPassword #capture_resetPassword_newPassword");
  const resetPassErrorMessage = $(
    "#capture_resetPassword_form_item_newPassword .capture_tip_error"
  );
  $(document).on("blur", "#capture_resetPassword_newPassword", function () {
    const passLength = resetPassInput.val().trim();
    if (passLength.length > 0) {
      resetPassErrorMessage.hide();
    } else {
      resetPassErrorMessage.show();
    }
  });
  // hide invalid credentials error message
  $(document).on(
    "keyup",
    "#capture_signIn_signInEmailAddress, #capture_signIn_currentPassword ",
    function () {
      $("#capture_signIn_signInForm_errorMessages .capture_form_error").hide();
    }
  );
}

function checkPasswordStrength(password) {
  var number = /([0-9])/;
  var upperCase = /([A-Z])/;
  var lowerCase = /([a-z])/;
  var specialCharacters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

  var characters = password.length >= 10;
  var capitalletters = password.match(upperCase) ? 1 : 0;
  var loweletters = password.match(lowerCase) ? 1 : 0;
  var numbers = password.match(number) ? 1 : 0;
  var special = password.match(specialCharacters) ? 1 : 0;

  update_info("length", password.length >= 10);
  update_info("capital", capitalletters);
  update_info("small", loweletters);
  update_info("number", numbers);
  update_info("special", special);

  var total = characters + capitalletters + loweletters + numbers + special;
  password_meter(total);
}

function update_info(criterion, isValid) {
  var $passwordCriteria = $("#passwordCriterion").find(
    'li[data-criterion="' + criterion + '"]'
  );
  if (isValid) {
    $passwordCriteria.removeClass("invalid").addClass("valid");
  } else {
    $passwordCriteria.removeClass("valid").addClass("invalid");
  }
}

function password_meter(total) {
  var meter = $(".strengthify-container");
  meter.removeClass("password-green password-red");
  if (total === 0) {
    meter.css("width", "100%");
  } else if (total === 1) {
    meter.css("width", "20%");
    meter.addClass("password-green");
  } else if (total === 2) {
    meter.css("width", "40%");
    meter.addClass("password-green");
  } else if (total === 3) {
    meter.css("width", "60%");
    meter.addClass("password-green");
  } else if (total === 4) {
    meter.css("width", "80%");
    meter.addClass("password-green");
  } else if (total === 5) {
    meter.css("width", "100%");
    meter.addClass("password-green");
  } else {
    meter.css("width", "100%");
    meter.addClass("password-green");
  }
}

function addShowHide(passElementId, passEleWrap) {
  var toggleId = passElementId + "-passwordToogle";
  const passToogle =
    '<div class="pass-toogle-icon" id="' + toggleId + '"></div>';
  if ($("#" + toggleId).length == 0) {
    $("#" + passEleWrap).append(passToogle);
  }

  $("#" + passElementId).on("focus click", function () {
    // for the cursor issue in password.
    const cursorPointer = document.getElementById(passElementId);
    setTimeout(function () {
      const type = $("#" + toggleId).hasClass("open-eye") ? "text" : "password";
      $("#" + passElementId).attr("type", type);
      cursorPointer.setSelectionRange(
        cursorPointer.value.length,
        cursorPointer.value.length
      );
    }, 1);
  });

  //on click hide and show pass
  $(document).on("click", "#" + toggleId, function (event) {
    $(this).toggleClass("open-eye");
    const type = $("#" + toggleId).hasClass("open-eye") ? "text" : "password";

    $("#" + passElementId).attr("type", type);
    const cursorPointer = document.getElementById(passElementId);
    setTimeout(function () {
      cursorPointer.focus();
      const type = $("#" + toggleId).hasClass("open-eye") ? "text" : "password";
      $("#" + passElementId).attr("type", type);
      cursorPointer.setSelectionRange(
        cursorPointer.value.length,
        cursorPointer.value.length
      );
    }, 1);
  });
}

//reset password link expired screen
function resetPasswordCodeEx(result) {
  const isCodeEx = $(
    "#capture_resetPasswordCodeExchange_signInEmailAddress"
  ).length;
  const isVisCodeEx = $("#resetPasswordCodeExchange").is(":visible");
  if (result.screen == "resetPasswordCodeExchange") {
    if (isVisCodeEx && isCodeEx && $("#customAlert").length == 0) {
      const cusAlert = `<div id="customAlert" class="resetPasswordCodeExchange custom-alert"><p>The password reset link has expired.</br> Use the steps
      below to get another password reset link sent to you.</p></div>`;
      $("#content-wrapper #content-container").prepend(cusAlert);
      $(".form-right-section .form-not-account").addClass("reset-pass-codeex");
      $(".form-right-section .form-right-button-section").addClass(
        "reset-pass-codeex-section"
      );
    }
  } else {
    $("#customAlert").hide();
  }
  $("#resetPasswordCodeExchange .screen-heading").text("Forgot Password?");
  $("#resetPasswordCodeExchange .screen-description").text(
    "Please enter the email address associated with your account. We will send you a link to reset your password."
  );
  $("#resetPasswordCodeExchange .form-action-buttons button")
    .addClass("reset-codeex-button")
    .text("Send Password Reset Link");
  $("#capture_resetPasswordCodeExchange_signInEmailAddress").attr(
    "placeholder",
    "somebody@gmail.com"
  );

  if ($("#resetPasswordCodeExchange .reset-codeex-cancel").length == 0) {
    $("#resetPasswordCodeExchange .form-action-buttons").append(
      `<div class="reset-codeex-cancel">Cancel</div>`
    );
  }
}
