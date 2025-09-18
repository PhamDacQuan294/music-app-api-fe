import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function MyEditor() {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    console.log("Content was updated:", content);
  };

  return (
    <Editor
      apiKey="no-api-key"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        plugins: "image",
        toolbar: "undo redo | bold italic | image",
        file_picker_callback: (cb) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
              const id = "blobid" + new Date().getTime();
              const blobCache =
                editorRef.current.editorUpload.blobCache; 
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
}

export default MyEditor;
