import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { useRef, useEffect, MouseEventHandler, useState } from "react";
import { BorderColor } from "@mui/icons-material";
type Props = {
  onSelect: (color: string, width: number) => void;
  onCancel: (width: number) => void;
  isOpen: boolean;
  currentLineWidth: number;
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
const ColorSelectModal = ({
  onSelect,
  onCancel,
  isOpen,
  currentLineWidth,
}: Props) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const onClickColorBtn = (color: string) => {
    onSelect(color, lineWidth);
    setOpen(false);
  };
  const [lineWidth, setLineWidth] = useState(2);
  useEffect(() => {
    setLineWidth(currentLineWidth);
  }, [currentLineWidth]);
  const colors = ["black", "red", "blue", "green", "orange"];
  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          onCancel(lineWidth);
        }}
      >
        <Box sx={modalStyle}>
          {colors.map((c) => (
            <IconButton
              onClick={() => {
                onClickColorBtn(c);
              }}
              key={c}
            >
              <BorderColor sx={{ color: c }} />
            </IconButton>
          ))}
          <Select
            label="線の太さ"
            onChange={(e) => {
              if (typeof e.target.value === "string") return;
              setLineWidth(e.target.value);
            }}
            value={lineWidth}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </Box>
      </Modal>
    </>
  );
};

export default ColorSelectModal;
