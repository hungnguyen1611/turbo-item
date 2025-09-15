import { useEffect, useRef, useState } from "react";

export default function SignaturePad() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);

  // Khởi tạo context
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500; // chiều rộng vùng ký
    canvas.height = 200; // chiều cao vùng ký
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctxRef.current = ctx;
  }, []);

  // Bắt đầu vẽ
  const startDrawing = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = getEventOffset(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
  };

  // Đang vẽ
  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getEventOffset(e);
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  // Dừng vẽ
  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  // Lấy offset chuột/touch
  const getEventOffset = (e) => {
    const canvas = canvasRef.current;
    if (e.nativeEvent.touches) {
      const rect = canvas.getBoundingClientRect();
      return {
        offsetX: e.nativeEvent.touches[0].clientX - rect.left,
        offsetY: e.nativeEvent.touches[0].clientY - rect.top,
      };
    }
    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    };
  };

  // Xuất ảnh chữ ký
  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    setSignatureImage(dataURL);
  };

  // Xóa chữ ký
  const handleClear = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureImage(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3>Ký xác nhận</h3>
      <canvas
        ref={canvasRef}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          cursor: "crosshair",
          backgroundColor: "#f9f9f9",
          width: "500px",
          height: "200px",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleSave}>Xem ảnh chữ ký</button>
        <button onClick={handleClear}>Xóa</button>
      </div>
      {signatureImage && (
        <div>
          <p>Ảnh chữ ký của bạn:</p>
          <img
            src={signatureImage}
            alt="Chữ ký"
            style={{ border: "1px solid #ccc", maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
