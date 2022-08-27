import { useState } from "react";
import ImageDrawer from "../components/img/ImageDrawer";
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
      <ImageDrawer />
    </div>
  );
};

export default EditPage;
