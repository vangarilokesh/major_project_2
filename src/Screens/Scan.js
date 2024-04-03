// import React, { useEffect, useRef } from 'react';
// import Webcam from 'react-webcam';
// import Quagga from 'quagga';

// const Scan = () => {
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     const runBarcodeDetection = async () => {
//       Quagga.init(
//         {
//           inputStream: {
//             name: 'Live',
//             type: 'LiveStream',
//             target: webcamRef.current.video,
//           },
//           decoder: {
//             readers: ['ean_reader'], // Specify the barcode types you want to detect
//           },
//           locate: true, // Enable locating the barcode on the image
//         },
//         (err) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           Quagga.start();
//         }
//       );

//       Quagga.onDetected((data) => {
//         // Display an alert with the extracted barcode data
//         const userInput = prompt(`Detected Barcode: ${data.codeResult.code}\nIs it correct? (yes/no)`);

//         // Perform actions based on user input
//         if (userInput && userInput.toLowerCase() === 'yes') {
//           console.log('User confirmed. Performing action...');
//           // Add your specific action for 'yes' here
//         } else {
//           console.log('User denied or provided invalid input.');
//           // Add your specific action for 'no' or invalid input here
//         }

//         // Stop barcode detection after user interaction
//         Quagga.stop();
//       });

//       // Draw bounding boxes around detected barcodes
//       Quagga.onProcessed((result) => {
//         const drawingCtx = Quagga.canvas.ctx.overlay;
//         const drawingCanvas = Quagga.canvas.dom.overlay;

//         if (result) {
//           if (result.boxes) {
//             drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
//             result.boxes.filter((box) => box !== result.box).forEach((box) => {
//               Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
//             });
//           }

//           if (result.box) {
//             Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
//           }

//           if (result.codeResult && result.codeResult.code) {
//             Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
//           }
//         }
//       });

//       return () => Quagga.stop();
//     };

//     runBarcodeDetection();
//   }, []);

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={640}
//         height={480}
//         mirrored={true}
//       />
//     </div>
//   );
// };

// export default Scan;

import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scan() {
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
    function error(error) {
      console.warn(error);
    }
  }, []);

  return (
    <div className="container my-4">
    <div>
      <h1>Scan</h1>
      {scanResult ? <div>Success: {scanResult}</div> : <div id="reader"></div>}
    </div>
    </div>
  );
}
export default Scan;
