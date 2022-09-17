import {
  Box,
  Button,
  IconButton,
  Modal,
  SvgIcon,
  Icon,
  Typography,
} from "@mui/material";
import {
  useRef,
  useEffect,
  MouseEventHandler,
  useState,
  TouchEventHandler,
} from "react";
import { DrawImage, PenMode } from "../../interface/draw";
import UUID from "uuidjs";
import useDrawImageList from "../../hook/useDrawImageList";
import { BorderColor, CssTwoTone } from "@mui/icons-material";
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
  const [penMode, setPenMode] = useState<PenMode>("free");
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
    ctx.globalCompositeOperation =
      penMode === "eraser" ? "destination-out" : "source-over";
    ctx.lineWidth = penMode === "eraser" ? 10 : lineWidth;
    ctx.beginPath();
  };
  const onTouchStart: TouchEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
      const t: any = e.touches[i];
      if (t.touchType !== "stylus") return;
      if (!canvasRef.current) return;
      isDrawing = true;
      lastPos = getPos(e);
      const ctx = getContext();
      if (ctx === null) return;
      ctx.globalCompositeOperation =
        penMode === "eraser" ? "destination-out" : "source-over";
      ctx.lineWidth = penMode === "eraser" ? 10 : lineWidth;
      ctx.beginPath();
    }
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
  const onTouchMove: TouchEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
      const t: any = e.touches[i];
      if (t.touchType !== "stylus") return;
      if (!isDrawing) return;
      const ctx = getContext();
      if (ctx === null) return;
      ctx.moveTo(lastPos[0], lastPos[1]);
      const pos = getPos(e);
      ctx.lineTo(pos[0], pos[1]);
      ctx.strokeStyle = (" " + currentPenColor).slice(1);
      ctx.stroke();
      lastPos = pos;
    }
  };
  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
    isDrawing = false;
  };
  const onTouchEnd: TouchEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
      const t: any = e.touches[i];
      if (t.touchType !== "stylus") return;
      isDrawing = false;
    }
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
  const [lineWidth, setLineWidth] = useState(2);

  const getActiveColor = (isActive: boolean) =>
    isActive ? { backgroundColor: "gray" } : {};
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
              onCancel={(width) => {
                setOpenColorSelector(false);
                setLineWidth(width);
              }}
              onSelect={(color, width) => {
                setCurrentPenColor(color);
                setOpenColorSelector(false);
                setLineWidth(width);
              }}
              currentLineWidth={lineWidth}
            />

            <div
              style={{
                border: "solid gray 2px",
                borderRadius: "5px",
                display: "inline-block",
              }}
            >
              <IconButton
                onClick={() => {
                  setPenMode("eraser");
                }}
                sx={getActiveColor(penMode === "eraser")}
              >
                <Icon>
                  <img
                    src="image/icon/eraser.svg"
                    style={{ maxWidth: "100%" }}
                  />
                </Icon>
              </IconButton>
              <IconButton
                onClick={() => {
                  setPenMode("free");
                }}
                sx={getActiveColor(penMode === "free")}
              >
                <Icon>
                  <img
                    src="image/icon/squiggly-line.png"
                    style={{ maxWidth: "100%" }}
                  />
                </Icon>
              </IconButton>
              <IconButton
                onClick={() => {
                  setPenMode("line");
                }}
                sx={getActiveColor(penMode === "line")}
              >
                <Icon>
                  <img src="image/icon/line.png" style={{ maxWidth: "100%" }} />
                </Icon>
              </IconButton>
            </div>
          </div>
          <canvas
            style={{
              border: "solid black 1px",
              cursor: "crosshair",
              touchAction: "none",
            }}
            ref={canvasRef}
            width={400}
            height={400}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => {
              isDrawing = false;
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          ></canvas>
          <Button onClick={onClickSave}>Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ImageDrawer;
