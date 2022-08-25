import { useEffect, useState } from "react";
import MarkdownView from "./MarkdownView";

type Props = {
  initMd: string;
  onChange: (md: string) => void;
};
const MarkdownEditor = ({ initMd, onChange }: Props) => {
  const [md, setMd] = useState<string>(initMd);
  useEffect(() => {
    setMd(initMd);
  }, [initMd]);

  return (
    <>
      <textarea name="" id="" cols={30} rows={10}></textarea>
      <MarkdownView md={md} />
    </>
  );
};

export default MarkdownEditor;
