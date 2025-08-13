interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled 
}: ButtonProps) {
  let buttonClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  
  if (size === "sm") {
    buttonClasses += " px-3 py-1 text-sm";
  } else if (size === "lg") {
    buttonClasses += " px-6 py-3 text-lg";
  } else {
    buttonClasses += " px-4 py-2";
  }
  
  if (variant === "primary") {
    buttonClasses += " bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "secondary") {
    buttonClasses += " bg-gray-200 text-gray-900 hover:bg-gray-300";
  } else {
    buttonClasses += " border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
  }
  
  if (disabled) {
    buttonClasses += " opacity-50 cursor-not-allowed";
  }
  
  if (className) {
    buttonClasses += " " + className;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
