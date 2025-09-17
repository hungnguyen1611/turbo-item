// import React, { useState } from "react";
// import { Modal, Upload, message, Row, Col, Image } from "antd";
// import { InboxOutlined } from "@ant-design/icons";

// const { Dragger } = Upload;

// const ImageUploadModal = ({ visible, onClose }) => {
//   const [fileList, setFileList] = useState([]);

//   const props = {
//     name: "file",
//     multiple: true,
//     accept: "image/*",
//     fileList,
//     beforeUpload: (file) => {
//       const isImage = file.type.startsWith("image/");
//       if (!isImage) {
//         message.error(`${file.name} không phải ảnh`);
//         return Upload.LIST_IGNORE;
//       }
//       return false; // ngăn upload tự động
//     },
//     onChange(info) {
//       setFileList(info.fileList);
//     },
//   };

//   return (
//     <Modal
//       title="Tải ảnh lên"
//       open={visible}
//       onCancel={onClose}
//       onOk={() => {
//         console.log("Các file:", fileList);
//         onClose();
//       }}
//       width={700}
//       okText="Xong"
//       cancelText="Đóng"
//     >
//       <Dragger {...props} style={{ padding: 20 }}>
//         <p className="ant-upload-drag-icon">
//           <InboxOutlined />
//         </p>
//         <p className="ant-upload-text">
//           Kéo & thả ảnh vào đây hoặc nhấn để chọn
//         </p>
//         <p className="ant-upload-hint">Chấp nhận nhiều ảnh cùng lúc.</p>
//       </Dragger>

//       {/* Gallery ảnh */}
//       {fileList.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <p>
//             <strong>Ảnh đã chọn:</strong>
//           </p>
//           <Row gutter={[8, 8]}>
//             {fileList.map((file, index) => {
//               const preview =
//                 file.thumbUrl ||
//                 file.url ||
//                 URL.createObjectURL(file.originFileObj);
//               return (
//                 <Col key={index}>
//                   <Image
//                     src={preview}
//                     width={80}
//                     height={80}
//                     style={{
//                       objectFit: "cover",
//                       borderRadius: 6,
//                       border: "2px solid #fff",
//                       boxShadow: "0 0 2px rgba(0,0,0,0.3)",
//                     }}
//                   />
//                 </Col>
//               );
//             })}
//           </Row>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default ImageUploadModal;
import React, { useState } from "react";
import { Modal, Upload, message, Row, Col, Image } from "antd";
import { InboxOutlined, CloseCircleOutlined } from "@ant-design/icons";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const { Dragger } = Upload;

const ImageUploadModal = ({ visible, onClose }) => {
  const [fileList, setFileList] = useState([]);

  const props = {
    name: "file",
    multiple: true,
    accept: "image/*",
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error(`${file.name} không phải ảnh`);
        return Upload.LIST_IGNORE;
      }
      return false; // ngăn upload tự động
    },
    onChange(info) {
      setFileList(info.fileList);
    },
  };

  // Xóa ảnh khỏi danh sách
  const removeImage = (index) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  // Gộp file và lưu xuống máy khi nhấn Xong
  const handleOk = async () => {
    if (fileList.length === 0) {
      message.warning("Chưa có ảnh nào để gộp");
      onClose();
      return;
    }

    const zip = new JSZip();
    for (const f of fileList) {
      const file = f.originFileObj;
      if (file) {
        zip.file(file.name, file);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "images.zip");
    console.log("File zip đã gộp:", zipBlob);

    onClose();
  };

  return (
    <Modal
      title="Tải ảnh lên"
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      width={700}
      okText="Xong"
      cancelText="Đóng"
    >
      <Dragger {...props} style={{ padding: 20 }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Kéo & thả ảnh vào đây hoặc nhấn để chọn
        </p>
        <p className="ant-upload-hint">Chấp nhận nhiều ảnh cùng lúc.</p>
      </Dragger>

      {/* Gallery ảnh */}
      {fileList.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Ảnh đã chọn:</strong>
          </p>
          <Row gutter={[8, 8]}>
            {fileList.map((file, index) => {
              const preview =
                file.thumbUrl ||
                file.url ||
                URL.createObjectURL(file.originFileObj);
              return (
                <Col key={index}>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Image
                      src={preview}
                      width={80}
                      height={80}
                      style={{
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "2px solid #fff",
                        boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                      }}
                    />
                    <CloseCircleOutlined
                      onClick={() => removeImage(index)}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        fontSize: 18,
                        color: "red",
                        cursor: "pointer",
                        background: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </Modal>
  );
};

export default ImageUploadModal;
