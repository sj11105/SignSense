"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = (useState < string) | (null > null);
  const [prediction, setPrediction] = (useState < string) | (null > null);
  const [confidence, setConfidence] = (useState < number) | (null > null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = (useState < string) | (null > null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setConfidence(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setPrediction(data.class);
      setConfidence(data.confidence);
    } catch (err) {
      console.error(err);
      setError("Failed to process the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <Button
        size="lg"
        className="mb-6"
        onClick={handleUploadClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Upload Image
            <Upload className="ml-2" />
          </>
        )}
      </Button>

      {(uploadedImage || prediction || error) && (
        <Card>
          <CardContent className="p-6">
            {uploadedImage && (
              <div className="mb-4">
                <Image
                  src={uploadedImage}
                  alt="Uploaded"
                  width={300}
                  height={300}
                  className="rounded-md object-contain"
                />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {prediction && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  Prediction:{" "}
                  <span className="text-blue-600">{prediction}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Confidence: {confidence}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
