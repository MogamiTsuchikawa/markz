import useMarkdown from "../../hook/useMarkdown";
import { convertToHtml } from "../../util/markdown";

type Props = {
  md: string;
};

const MarkdownView = ({ md }: Props) => {
  const htmlText = useMarkdown(md);
  return (
    <>
      <div
        className="markdown-area"
        dangerouslySetInnerHTML={{ __html: htmlText }}
      ></div>
      <div id="mermaid"></div>
    </>
  );
};

export default MarkdownView;
