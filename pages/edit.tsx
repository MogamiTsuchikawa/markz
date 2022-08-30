import { useState } from "react";
import MarkdownEditor from "../components/markdown/MarkdownEditor";

const EditPage = () => {
  const [md, setMd] = useState("");
  return (
    <div>
      <MarkdownEditor
        value={md}
        onChange={(e) => {
          setMd(e);
        }}
      />
    </div>
  );
};

export default EditPage;
