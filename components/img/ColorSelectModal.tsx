import { Box, Button, Modal, Typography, IconButton } from "@mui/material";
import { useRef, useEffect, MouseEventHandler, useState } from "react";
import { BorderColor } from "@mui/icons-material";
type Props = {
  onSelect: (color: string) => void;
  onCancel: () => void;
  isOpen: boolean;
};
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ColorSelectModal = ({ onSelect, onCancel, isOpen }: Props) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const onClickColorBtn = (color: string) => {
    onSelect(color);
    setOpen(false);
  };
  const colors = ["black", "red", "blue", "green", "orange"];
  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          onCancel();
        }}
      >
        <Box sx={modalStyle}>
          {colors.map((c) => (
            <IconButton
              onClick={() => {
                onClickColorBtn(c);
              }}
            >
              <BorderColor sx={{ color: c }} />
            </IconButton>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default ColorSelectModal;
