import {
  Box,
  Button,
  IconButton,
  Modal,
  SvgIcon,
  Icon,
  Typography,
} from "@mui/material";
import { useRef, useEffect, MouseEventHandler, useState } from "react";
import { DrawImage } from "../../interface/draw";
import UUID from "uuidjs";
import useDrawImageList from "../../hook/useDrawImageList";
import { BorderColor } from "@mui/icons-material";
import ColorSelectModal from "./ColorSelectModal";

type ImageDrawerProps = {
  openImageDrawer: boolean;
  onDrawEnd: (drawImage: DrawImage) => void;
  onClose: () => void;
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ImageDrawer = ({
  openImageDrawer,
  onDrawEnd,
  onClose,
}: ImageDrawerProps) => {
  const [open, setOpen] = useState(false);
  const { addDrawImage } = useDrawImageList();
  useEffect(() => {
    if (!openImageDrawer) return;
    setOpen(openImageDrawer);
  }, [openImageDrawer]);
  const canvasRef = useRef(null);
  const [currentPenColor, setCurrentPenColor] = useState("green");
  const getContext = (): CanvasRenderingContext2D | null => {
    if (!canvasRef.current) return null;
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };
  let lastPos = [0, 0];
  let isDrawing = false;
  const getPos = (e: any) => {
    if (!canvasRef.current) return [0, 0];
    var x, y;
    const canvas: any = canvasRef.current;
    x = e.clientX - canvas.getBoundingClientRect().left;
    y = e.clientY - canvas.getBoundingClientRect().top;
    return [x, y];
  };
  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!canvasRef.current) return;
    isDrawing = true;
    lastPos = getPos(e);
    const ctx = getContext();
    if (ctx === null) return;
    ctx.beginPath();
  };
  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!isDrawing) return;
    const ctx = getContext();
    if (ctx === null) return;
    ctx.moveTo(lastPos[0], lastPos[1]);
    const pos = getPos(e);
    ctx.lineTo(pos[0], pos[1]);
    ctx.strokeStyle = (" " + currentPenColor).slice(1);
    ctx.stroke();
    lastPos = pos;
  };
  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
    isDrawing = false;
  };
  const onClickSave = () => {
    const ctx = getContext();
    if (ctx === null) return;
    const dataUrl = ctx.canvas.toDataURL();
    const drawImage: DrawImage = {
      id: UUID.generate(),
      imageUrl: dataUrl,
    };
    onDrawEnd(drawImage);
    addDrawImage(drawImage);
    setOpen(false);
  };
  const [openColorSelector, setOpenColorSelector] = useState(false);

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div style={{ height: "50px" }}>
            <IconButton
              sx={{ color: currentPenColor }}
              onClick={() => {
                setOpenColorSelector(true);
              }}
            >
              <BorderColor />
            </IconButton>
            <ColorSelectModal
              isOpen={openColorSelector}
              onCancel={() => {
                setOpenColorSelector(false);
              }}
              onSelect={(color) => {
                setCurrentPenColor(color);
                setOpenColorSelector(false);
              }}
            />
            <IconButton>
              <Icon>
                <img src="image/icon/eraser.svg" style={{ maxWidth: "100%" }} />
              </Icon>
            </IconButton>
          </div>
          <canvas
            style={{ border: "solid black 1px", cursor: "crosshair" }}
            ref={canvasRef}
            width={400}
            height={400}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => {
              isDrawing = false;
            }}
          ></canvas>
          <Button onClick={onClickSave}>Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ImageDrawer;
