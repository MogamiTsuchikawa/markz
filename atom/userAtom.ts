import { atom } from "recoil";
import { DrawImage } from "../interface/draw";

export const drawImageList = atom<DrawImage[]>({
  key: "editor/image",
  default: [],
});
