import { useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Avatar({ src, alt, fallback, size = "medium", className = "" }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    small: "w-8 h-8",
    medium: "w-10 h-10", 
    large: "w-12 h-12"
  };

  // If no src provided or image failed to load, show fallback
  if (!src || imageError) {
    return (
      <div className={`${sizes[size]} rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium ${className}`}>
        {fallback || "?"}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt || ""} 
      className={`${sizes[size]} rounded-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
}
