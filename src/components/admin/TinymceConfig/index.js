import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function MyEditor({ value = "", onChange }) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="3dr1athu2ipj7r6mas9tjycnidb3rugt2qzntw011g812o3g"
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value} // nhận value từ Form
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
              const blobCache = editorRef.current.editorUpload.blobCache;
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
      onEditorChange={(content) => {
        onChange?.(content); // đồng bộ với Form
      }}
    />
  );
}

export default MyEditor;
