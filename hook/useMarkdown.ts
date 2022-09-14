import { useEffect, useState } from "react";
import { convertToHtml } from "../util/markdown";
import useDrawImageList from "./useDrawImageList";
import katex from "katex";

const useMarkdown = (md: string): string => {
  const [html, setHtml] = useState(convertToHtml(md));
  const { drawImages } = useDrawImageList();
  useEffect(() => {
    let mdText = (" " + md).slice(1);
    drawImages.forEach((di) => {
      console.log(di);
      mdText = mdText.replaceAll(`[[${di.id}]]`, `![${di.id}](${di.imageUrl})`);
    });
    const regExp = /```math([\s\S]*?)```/g;
    const mathCodes = mdText.match(regExp);
    if (mathCodes != undefined) {
      for (let i = 0; i < mathCodes.length; i++) {
        const tex = mathCodes[i]
          .replaceAll("```math", "")
          .replaceAll("```", "");
        console.log(tex);
        mdText = mdText.replace(
          mathCodes[i],
          katex.renderToString(tex, {
            throwOnError: false,
          })
        );
      }
    }
    setHtml(convertToHtml(mdText));
    console.log(mdText);
  }, [drawImages, md]);
  return html;
};
export default useMarkdown;
