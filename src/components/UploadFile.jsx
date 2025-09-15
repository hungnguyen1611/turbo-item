import { useState } from "react";

function UploadImage() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    // Tạo FormData
    const formData = new FormData();
    formData.append("image", file); // 'image' = tên field backend nhận

    // Gửi lên server
    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Kết quả:", data); // {url: "..."}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadImage;
