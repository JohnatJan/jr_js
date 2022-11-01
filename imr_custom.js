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
        CheckRegion();
        return true;
    }catch (err) {}
}

// This function is called by the Capture Widget when it has completred loading
// itself and all other dependencies. This function is required, and must call
// janrain.capture.ui.start() for the Widget to initialize correctly.
function janrainCaptureWidgetOnLoad() {

    /*--
        SHOW EVENTS:
        This function will log Janrain events in your browser's console. You must
        include janrain-utils.js to run this function. Comment this line to hide 
        event logging.
                                                                            --*/
    janrainUtilityFunctions().showEvents();

    /*--
        SHOW FLOW VERSION:
        This event handler shows the flow version in the specified element.
        This is primarily for our developers' convenience, but your developers
        may also find it useful.
                                                                            --*/

    janrain.events.onCaptureRenderStart.addHandler(function(result) {
          initCheckRegion()
    });

    /*                                                                        *\
    || *** CUSTOM ONLOAD CODE END ***                                         ||
    \*========================================================================*/

    // This should be the last line in janrainCaptureWidgetOnLoad()
    janrain.capture.ui.start();
}
