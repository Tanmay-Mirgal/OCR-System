import { useState } from "react";

export default function OCRApp() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleExtractText = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/ocr", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setExtractedText(data.text);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  return (
    <div className="flex h-screen p-5 bg-gray-100">
      {/* Left Side - File Upload and Preview */}
      <div className="w-1/2 flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        {preview && <img src={preview} alt="Preview" className="max-w-full max-h-64" />}
        <button
          onClick={handleExtractText}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Extract Text
        </button>
      </div>

      {/* Right Side - Extracted Text */}
      <div className="w-1/2 p-4 bg-white rounded-lg shadow-md ml-4">
        <h2 className="text-lg font-semibold mb-2">Extracted Text</h2>
        <div className="p-2 border h-full overflow-y-auto whitespace-pre-wrap">
          {extractedText || "No text extracted yet."}
        </div>
      </div>
    </div>
  );
}
