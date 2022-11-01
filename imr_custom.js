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
            break;
        }catch (err) {}
        setTimeout(500);
    }
    CheckRegion();
}
janrain.events.onCaptureScreenShow.addHandler(function(result){
     initCheckRegion();
    });
