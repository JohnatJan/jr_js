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
        console.log("after document.getElementById('capture_traditionalRegistration_dataRegion').onchange = CheckRegion; ");
        document.getElementById('capture_traditionalRegistration_dataRegion').addEventListener("change", CheckRegion);
                console.log("after document.getElementById('capture_traditionalRegistration_dataRegion').onchange = CheckRegion; ");


        CheckRegion();
        return true;
    }catch (err) {
        console.log(err);

    }
}

function janrainCaptureWidgetOnLoad() {
                                                                            
    janrain.events.onCaptureRenderStart.addHandler(function(result) {
          initCheckRegion()
    });

    janrain.capture.ui.start();
}
