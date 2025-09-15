import { useRef, useState } from "react";

export default function CameraBox() {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    // Khi click khung, kích hoạt input file
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3>Chụp ảnh</h3>

      {/* Khung bấm vào mở camera */}
      <div
        onClick={handleBoxClick}
        style={{
          width: "300px",
          height: "200px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Ảnh đã chụp"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <p>Bấm để mở camera</p>
        )}
      </div>

      {/* Input file ẩn */}
      <input
        type="file"
        accept="image/*"
        // capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

// "environment" = camera sau (rear camera).

// "user" = camera trước (front camera).

// Không ghi gì = để trình duyệt tự chọn. (sẽ tự động hiện options cho người dùng nhờ trình duyệt)
