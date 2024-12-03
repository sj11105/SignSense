import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Camera, Globe, HandMetal, Coins } from "lucide-react";

export default function LandingPage() {
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

      <main className="flex-grow ">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-400 to-blue-300 text-white py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 parkinsans-text">
              Breaking Barriers in Communication
            </h2>
            <p className="text-xl mb-8">
              Translate sign language to text and identify currencies instantly
            </p>
            <Button size="lg">
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

        {/* Call to Action Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience SignSense?
            </h2>
            <p className="text-xl mb-8">
              Start breaking communication barriers today
            </p>
            <Button variant="secondary" size="lg">
              Try It Now
              <Camera className="ml-2" />
            </Button>
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
