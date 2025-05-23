import Image from "next/image";
import React from "react";
import TextareaField from "../../text-input/TextareaField";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesElement {
  features: FeatureItem[];
  highlighted?: number;
}

export function RenderFeatures({ data }: { data: FeaturesElement }) {
  const features =
    Array.isArray(data.features) && data.features.length > 0
      ? data.features
      : [{ icon: "", title: "No features", description: "No features to display." }];

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center p-6 transition-all`}
          style={{ maxWidth: 300 }}
        >
          {/* Show icon if present, else fallback */}
          {feature.icon ? (
            <div className="flex items-center justify-center" style={{ width: 200, height: 200 }}>
              <Image
                src={feature.icon}
                width={200}
                height={200}
                alt="Icon"
              />
            </div>
          ) : (
            <div className="h-12 w-12 mb-4 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
              {/* Optionally, put a default icon here */}
              <span>?</span>
            </div>
          )}
          <div className="font-bold text-lg text-center mb-2">
            {feature.title}
          </div>
          <div className="text-center text-muted-foreground">
            {feature.description}
          </div>
        </div>
      ))}
    </div>
  );
}