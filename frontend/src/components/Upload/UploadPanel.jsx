import { useState } from "react";
import axios from "axios";

export default function UploadPage({ onDataReceived }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/upload-transcript/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onDataReceived(res.data);
    } catch (error) {
      console.error("Error subiendo archivo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <label className="px-6 py-3 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
        {loading ? "Procesando..." : "Subir documento"}
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}
