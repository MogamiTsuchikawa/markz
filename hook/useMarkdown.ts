import { useEffect, useState } from "react";
import { convertToHtml } from "../util/markdown";
import useDrawImageList from "./useDrawImageList";

const useMarkdown = (md: string): string => {
  const [html, setHtml] = useState(convertToHtml(md));
  const { drawImages } = useDrawImageList();
  useEffect(() => {
    let mdText = (" " + md).slice(1);
    drawImages.forEach((di) => {
      console.log(di);
      mdText = mdText.replaceAll(`[[${di.id}]]`, `![${di.id}](${di.imageUrl})`);
    });
    setHtml(convertToHtml(mdText));
  }, [drawImages, md]);
  return html;
};
export default useMarkdown;
