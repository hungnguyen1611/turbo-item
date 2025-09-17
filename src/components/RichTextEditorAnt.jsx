/* eslint-disable no-undef */
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { Modal, Button } from "antd";
import { RequestMyBM } from "@repo/ui/util/RequestMyBM";
import { useEffect, useMemo, useRef, useState } from "react";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTkyNzY3OTksImp0aSI6IjUwZjJjYzQzLTZhNzctNGM2OS1iYTRjLWY0ZmU3Y2Q2ZTNiZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijk1ZGFmMzQ1In0.N_lhIKqLIgvLuS5cKLb4-V-56PZdSKVcE7gVh6qx0YRoPrvdECEHz5HNPJhftMdkgXbxk5NEO6RV15LGv66elg";

const CLOUD_SERVICES_TOKEN_URL =
  "https://n8zcdpullmls.cke-cs.com/token/dev/c5ddce0c9002fdad73278b93c3a136106bb82853db67f0131607eaf5fefa?limit=10";

export default function RichTextEditor({
  title = "Thông tin nhân viên",
  open = false,
  setOpen,
}) {
  const editorRef = useRef(null);
  const [fileData, setFileData] = useState(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const cloud = useCKEditorCloud({
    version: "46.1.1",
    premium: true,
    ckbox: { version: "2.6.1" },
  });

  const handleClose = () => setOpen(false);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();

    const temp = document.createElement("div");
    temp.innerHTML = data;

    const imgs = Array.from(temp.querySelectorAll("img")).map((img) => img.src);
    const context = temp.textContent || temp.innerText || "";

    const payload = { html: data, images: imgs, text: context };
    const jsonString = JSON.stringify(payload);
    const blob = new Blob([jsonString], { type: "application/json" });
    const file = new File([blob], "editor-content.json", {
      type: "application/json",
    });

    setFileData(file);
  };

  const handleSaveData = () => {
    if (fileData) {
      new RequestMyBM()
        .SetToken(true)
        .SetApi("api/hrm/equipment/set-info-description")
        .SetParam({ equipmentID: 4 })
        .SetBody(fileData)
        .SetSuccess((data, message) => console.log(data, message))
        .Process();
    }
  };

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) return {};

    const {
      ClassicEditor,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      Bold,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Code,
      CodeBlock,
      Emoji,
      Essentials,
      GeneralHtmlSupport,
      Heading,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Mention,
      Paragraph,
      PasteFromOffice,
      PictureEditing,
      ShowBlocks,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
    } = cloud.CKEditor;
    const { PasteFromOfficeEnhanced, SourceEditingEnhanced } =
      cloud.CKEditorPremiumFeatures;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "sourceEditingEnhanced",
            "showBlocks",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "code",
            "|",
            "emoji",
            "link",
            "insertImage",
            "ckbox",
            "insertTable",
            "codeBlock",
            "htmlEmbed",
            "|",
            "bulletedList",
            "numberedList",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          Bold,
          CKBox,
          CKBoxImageEdit,
          CloudServices,
          Code,
          CodeBlock,
          Emoji,
          Essentials,
          GeneralHtmlSupport,
          Heading,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Mention,
          Paragraph,
          PasteFromOffice,
          PasteFromOfficeEnhanced,
          PictureEditing,
          ShowBlocks,
          SourceEditingEnhanced,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
        ],
        cloudServices: {
          tokenUrl: CLOUD_SERVICES_TOKEN_URL,
        },
        /** bỏ khung kéo & thả ảnh */
        initialData: `<h2>Cập nhật ${title}</h2><p><br></p>`,
        licenseKey: LICENSE_KEY,
        placeholder: "Type or paste your content here!",
      },
    };
  }, [cloud, isLayoutReady]);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={1000}
      title={title}
    >
      {ClassicEditor && editorConfig && (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          onChange={handleEditorChange}
        />
      )}
      <Button type="primary" onClick={handleSaveData} style={{ marginTop: 8 }}>
        Save
      </Button>
    </Modal>
  );
}
