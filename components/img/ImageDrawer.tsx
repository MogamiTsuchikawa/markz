import { useRef, useEffect, MouseEventHandler } from "react";

const ImageDrawer = () => {
  return (
    <>
      <DrawCanvas />
    </>
  );
};

export default ImageDrawer;

const DrawCanvas = () => {
  const canvasRef = useRef(null);
  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };
  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.save();
  });
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
  };
  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!isDrawing) return;
    const ctx = getContext();
    ctx.moveTo(lastPos[0], lastPos[1]);
    const pos = getPos(e);
    ctx.lineTo(pos[0], pos[1]);
    ctx.strokeStyle = "green";
    ctx.stroke();
    lastPos = pos;
  };
  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
    isDrawing = false;
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      ></canvas>
    </>
  );
};
