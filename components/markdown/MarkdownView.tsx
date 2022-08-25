import { convertToHtml } from "../../util/markdown";

type Props = {
  md: string;
};

const MarkdownView = ({ md }: Props) => {
  const htmlText = convertToHtml(md);
  return <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>;
};

export default MarkdownView;
