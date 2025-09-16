import { Box, Button, Modal, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export default function ImageDropModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage(null);
  };

  // Xử lý drop ảnh
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImage({ file, url });
    }
  }, []);

  // Ngăn mở file khi kéo qua
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Mở Modal Upload Ảnh
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Kéo & thả ảnh vào đây
          </Typography>

          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              width: "100%",
              height: 200,
              border: "2px dashed #aaa",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "#fafafa",
            }}
          >
            {image ? (
              <img
                src={image.url}
                alt="preview"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <Typography>Thả ảnh vào khung này</Typography>
            )}
          </Box>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose}>Đóng</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
