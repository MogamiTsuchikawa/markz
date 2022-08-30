import { useRecoilState } from "recoil";
import { drawImageList } from "../atom/userAtom";
import { DrawImage } from "../interface/draw";

type UseDrawImageList = () => {
  drawImages: DrawImage[];
  addDrawImage: (drawImage: DrawImage) => void;
};

const useDrawImageList: UseDrawImageList = () => {
  const [drawImages, setDrawImages] = useRecoilState(drawImageList);
  const addDrawImage = (drawImage: DrawImage) => {
    setDrawImages([...drawImages, drawImage]);
  };
  return {
    drawImages,
    addDrawImage,
  };
};

export default useDrawImageList;
