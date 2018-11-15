var ApExBCReader = {
  Config: {
    // Video elements
    videoId  : "bcreaderVideo",
    canvasId : "bcreaderVideoCanvas",
    // FacingMode of the camera, default to environment (back camera on phone)
    facingMode: "environment",
    // name of the custom event to raise
    eventName: "apexbcreader" },
  // variable for localized barcode
  localized: [],
  // Initilization of the BarcodeReader
  Init: function() {
    video = document.getElementById(ApExBCReader.Config.videoId);
    BarcodeReader.Init( );
    BarcodeReader.DecodeSingleBarcode();
    BarcodeReader.StreamCallback = function(result) {
        if (result.length > 0) {
          BarcodeReader.StopStreamDecode();
          video.pause(); 
          apex.event.trigger(document,ApExBCReader.Config.eventName ,result[0]);
      }
    };
    BarcodeReader.SetLocalizationCallback(function(result) {
      ApExBCReader.localized = result;
    });
    BarcodeReader.SwitchLocalizationFeedback(true);
    // Start the camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: ApExBCReader.Config.facingMode } })
                          .then(function(stream) {
                            video.srcObject = stream;
                            video.play();
                            ApExBCReader.Draw();
                            BarcodeReader.DecodeStream(video);
                          });
  },
  // Set different formats for barcode rading
  SetDecodeFormats: function(format) {
    BarcodeReader.SetDecodeFormats( format );
  },
  SetFacingMode: function(value) {
    ApExBCReader.Config.facingMode = value;
  },
  SetVideoId: function(value) {
    ApExBCReader.Config.videoId = value;
  },
  SetCanvasId: function(value) {
    ApExBCReader.Config.canvasId = value;
  },
  // Draw on canvas detection of barcode
  Draw: function() {
      video = document.getElementById(ApExBCReader.Config.videoId);
      c = document.getElementById(ApExBCReader.Config.canvasId);
      ctx = c.getContext("2d");
      try {
        ctx.drawImage(video, 0, 0, c.width, c.height);
        if (ApExBCReader.localized.length > 0) {
          ctx.beginPath();
          ctx.lineWIdth = "2";
          ctx.strokeStyle = "red";
          for (var i = 0; i < ApExBCReader.localized.length; i++) {
            ctx.rect(ApExBCReader.localized[i].x, ApExBCReader.localized[i].y, ApExBCReader.localized[i].width, ApExBCReader.localized[i].height);
          }
          ctx.stroke();
        }
        setTimeout(ApExBCReader.Draw, 20);
      } catch (e) {
        if (e.name == "NS_ERROR_NOT_AVAILABLE") {
          setTimeout(draw, 20);
        } else {
          throw e;
        }
      }
    }
    
}