function CheckRegion() {
    if (document.getElementById('capture_traditionalRegistration_dataRegion').value == "NA")
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "none";
    else
        document.getElementById('capture_traditionalRegistration_form_item_dataWWID').style.display = "block";
}
function initCheckRegion() {
    while (document.getElementById('capture_traditionalRegistration_dataRegion') == null) {
        try {
        document.getElementById('capture_traditionalRegistration_dataRegion').onchange = CheckRegion;
        }catch (err) {}
        setTimeout(500);
    }
    CheckRegion();
}
/*
function janrainCaptureWidgetOnLoad(){
    while (document.getElementById('capture_traditionalRegistration_dataRegion') == null) {
        try {
            document.getElementById('capture_traditionalRegistration_dataRegion').onchange = CheckRegion;
        }catch (err) {}
        
        setTimeout(500);
    }
  janrain.capture.ui.start();
}
*/
