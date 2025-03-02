import { useState } from "react";

export default function OCRApp() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["FACE WASH", "SHAMPOO", "BODY LOTION", "SOAP", "SERUM", "MOISTURIZER"];

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleExtractText = async () => {
    if (!file) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://ocr-flask-2zog.onrender.com/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setExtractedText(data.text);

      // Process text for category detection (case-insensitive)
      const words = data.text
        .replace(/\n/g, " ") // Replace newlines with spaces
        .split(/\s+/) // Split by any whitespace (spaces, tabs, newlines)
        .map(word => word.trim().toUpperCase()) // Convert each word to uppercase
        .filter(word => word !== ""); // Remove empty strings

      console.log("Extracted Words:", words);

      let foundCategory = null;
      for (let i = 0; i < words.length; i++) {
        for (let j = i; j < words.length; j++) {
          const phrase = words.slice(i, j + 1).join(" ");
          if (categories.includes(phrase)) {
            foundCategory = phrase;
            break;
          }
        }
        if (foundCategory) break;
      }

      console.log("Detected Category:", foundCategory || "Not Found");

      if (foundCategory) {
        const res = await fetch("https://ocr-system-dxro.onrender.com/get-products-by-category", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: foundCategory }),
        });

        const result = await res.json();
        setProducts(result.products || []);
      } else {
        setProducts([]);
        setError("No matching category found.");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      setError("Failed to process the image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-5 bg-gray-100">
      {/* Upload Section */}
      <div className="flex gap-6">
        <div className="w-1/2 flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
          <input type="file" onChange={handleFileChange} className="mb-2" />
          {preview && <img src={preview} alt="Preview" className="max-w-full max-h-64" />}
          <button
            onClick={handleExtractText}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {loading ? "Processing..." : "Extract Text"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* Extracted Text Display */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Extracted Text</h2>
          <div className="p-2 border h-40 overflow-y-auto whitespace-pre-wrap">
            {extractedText || "No text extracted yet."}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Matching Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded-md" />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-gray-800 font-semibold">₹{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
}
