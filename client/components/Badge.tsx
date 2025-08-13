interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "gray" | "red";
}

export function Badge({ children, variant = "gray" }: BadgeProps) {
  const variants = {
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
