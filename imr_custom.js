function CheckRegion() {
    if (document.getElementById('capture_traditionalRegistration_dataRegion').value == "NA")
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "none";
    else
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "block";
}
function initCheckRegion() {
    console.log("attempting to wire event.");
        try {
            document.getElementById('capture_traditionalRegistration_dataRegion').onchange = CheckRegion;
            break;
        }catch (err) {}

    }
    CheckRegion();
}
function janrainCaptureWidgetOnLoad(){
  initCheckRegion
  janrain.events.onCaptureLoginSuccess.addHandler(function(event){
    // do stuff
  }
  janrain.capture.ui.start();
}
