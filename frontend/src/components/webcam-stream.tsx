"use client";
import { useEffect, useRef, useState } from "react";

export default function WebcamStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [alert, setAlert] = useState(false);
  const [frameBase64, setFrameBase64] = useState<string | null>(null);
  const [showLines, setShowLines] = useState(true);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/stream");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const {frame, ...rest} = data;
      console.log("Server response:", rest); // LOG 1 (from server)
      setAlert(data.alert);
      if (frame) {
        setFrameBase64(`data:image/jpeg;base64,${data.frame}`);
      }
    };

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const interval = setInterval(() => {
        if (!canvasRef.current || !videoRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        ctx.drawImage(videoRef.current, 0, 0);
        canvasRef.current.toBlob((blob) => {
          if (blob && ws.readyState === WebSocket.OPEN) {
            // console.log("Sending frame to backend..."); // LOG 2 (to server)
            ws.send(blob);
          }
        }, "image/jpeg");
      }, 250); // Send a frame every 250ms

      return () => clearInterval(interval);
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} className="rounded shadow" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="mt-4">
        {alert ? (
          <p className="text-red-600 font-bold text-lg">ALERT DETECTED</p>
        ) : (
          <p className="text-green-600 font-medium">All clear</p>
        )}
      </div>
      {frameBase64 && showLines && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={frameBase64}
          alt="Live pose frame"
          className="mt-4 rounded shadow max-w-full"
        />
      )}
    </div>
  );
}
