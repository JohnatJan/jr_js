function CheckRegion() {
    if (document.getElementById('capture_traditionalRegistration_dataRegion').value == "NA")
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "none";
    else
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "block";
}
function initCheckRegion() {
    document.getElementById('capture_traditionalRegistration_dataRegion').onchange = CheckRegion;
    CheckRegion();
}
function janrainCaptureWidgetOnLoad(){
  janrain.events.onCaptureLoginSuccess.addHandler(initCheckRegion);
  janrain.capture.ui.start();

}
