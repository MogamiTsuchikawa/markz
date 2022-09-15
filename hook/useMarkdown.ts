import { useEffect, useState } from "react";
import { convertToHtml } from "../util/markdown";
import useDrawImageList from "./useDrawImageList";
import katex from "katex";
import mermaid from "mermaid";
import UUID from "uuidjs";

mermaid.mermaidAPI.initialize({ startOnLoad: false });
const useMarkdown = (md: string): string => {
  const [html, setHtml] = useState(convertToHtml(md));
  const { drawImages } = useDrawImageList();
  useEffect(() => {
    (async () => {
      let mdText = (" " + md).slice(1);
      drawImages.forEach((di) => {
        console.log(di);
        mdText = mdText.replaceAll(
          `[[${di.id}]]`,
          `![${di.id}](${di.imageUrl})`
        );
      });
      const mathCodes = mdText.match(/```math([\s\S]*?)```/g);
      if (mathCodes != undefined) {
        for (let i = 0; i < mathCodes.length; i++) {
          const tex = mathCodes[i]
            .replaceAll("```math", "")
            .replaceAll("```", "");
          mdText = mdText.replace(
            mathCodes[i],
            katex.renderToString(tex, {
              throwOnError: false,
            })
          );
        }
      }
      const mermaidCodes = mdText.match(/```mermaid([\s\S]*?)```/g);
      if (mermaidCodes != undefined) {
        for (let i = 0; i < mermaidCodes.length; i++) {
          const mId = UUID.generate();
          const code = mermaidCodes[i]
            .replaceAll("```mermaid", "")
            .replaceAll("```", "");
          const svg = await new Promise<string>((resolve, reject) => {
            mermaid.mermaidAPI.render("mermaid", code, (svgCode) => {
              resolve(svgCode);
            });
          });
          console.log(svg);
          mdText = mdText.replace(mermaidCodes[i], svg);
        }
      }
      setHtml(convertToHtml(mdText));
      console.log(mdText);
    })();
  }, [drawImages, md]);
  return html;
};
export default useMarkdown;
