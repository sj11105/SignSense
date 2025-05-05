"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Camera,
  Globe,
  HandMetal,
  Coins,
  Upload,
  Loader2,
} from "lucide-react";
import { useRef, useState } from "react";

export default function LandingPage() {
  const fileInputRef = useRef(null);
  const [prediction, setPrediction] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        setError("");
        setPrediction("");

        // Create URL for preview
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        setPrediction(data.result || "No result");
        console.log("Prediction result:", data);
      } catch (error) {
        console.error("Prediction error:", error);
        setError("Failed to process image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-primary text-primary-foreground">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SignSense</h1>
          <nav>
            <ul className="flex space-x-4 rubik-text">
              <li>
                <Link href="#features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-400 to-blue-300 text-white py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 parkinsans-text">
              Breaking Barriers in Communication
            </h2>
            <p className="text-xl mb-8">
              Translate sign language to text and identify currencies instantly
            </p>
            <Button size="lg" onClick={handleUploadClick}>
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<HandMetal size={40} />}
                title="Sign Language Translation"
                description="Instantly translate sign language gestures into readable text."
              />
              <FeatureCard
                icon={<Coins size={40} />}
                title="Currency Detection"
                description="Quickly identify and classify different types of currency."
              />
              <FeatureCard
                icon={<Globe size={40} />}
                title="Multi-language Support"
                description="Support for multiple sign languages and currency types from around the world."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/first.jpg"
                  alt="How SignSense works"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <Step
                  number={1}
                  description="Open the app and point your camera at the sign language gesture or currency."
                />
                <Step
                  number={2}
                  description="Our AI instantly processes the image and recognizes the content."
                />
                <Step
                  number={3}
                  description="Receive accurate text translation or currency identification in real-time."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Try It Now Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience SignSense?
            </h2>
            <p className="text-xl mb-8">
              Start breaking communication barriers today
            </p>

            <div className="max-w-md mx-auto">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <Button
                variant="secondary"
                size="lg"
                onClick={handleUploadClick}
                disabled={isLoading}
                className="w-full"
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

              {/* Preview and Result Area */}
              {(uploadedImage || prediction || error) && (
                <Card className="mt-6 overflow-hidden bg-white">
                  <CardContent className="p-6">
                    {uploadedImage && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Uploaded Image
                        </h3>
                        <div className="relative h-48 w-full">
                          <Image
                            src={uploadedImage}
                            alt="Uploaded image"
                            fill
                            className="object-contain rounded-md"
                          />
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                        {error}
                      </div>
                    )}

                    {prediction && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Prediction Result
                        </h3>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-blue-800 font-medium text-xl">
                            {prediction}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SignSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function Step({ number, description }) {
  return (
    <div className="flex items-start">
      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
        {number}
      </div>
      <p>{description}</p>
    </div>
  );
}
