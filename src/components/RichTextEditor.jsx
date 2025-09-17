import React, { useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

export default function RichTextEditor() {
  const toolbarContainerRef = useRef();

  useEffect(() => {
    // Chỉ để đảm bảo container toolbar tồn tại
  }, []);

  return (
    <div>
      {/* Container hiển thị toolbar */}
      <div ref={toolbarContainerRef}></div>

      <CKEditor
        editor={DecoupledEditor}
        data="<p>Gõ văn bản ở đây...</p>"
        onReady={(editor) => {
          // Di chuyển toolbar ra ngoài để tùy chỉnh kiểu decoupled
          if (toolbarContainerRef.current) {
            toolbarContainerRef.current.appendChild(
              editor.ui.view.toolbar.element
            );
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log("Nội dung hiện tại:", data);
        }}
        config={{
          // cấu hình upload ảnh
          simpleUpload: {
            uploadUrl: "http://localhost:4000/upload", // URL API upload ảnh của bạn
            // headers: { Authorization: "Bearer <token>" } // nếu cần
          },
          // bật plugin ImageUpload, LinkImage, Table,... có sẵn trong build
        }}
      />
    </div>
  );
}
