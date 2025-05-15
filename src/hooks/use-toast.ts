
import { toast as sonnerToast, Toast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

export const toast = ({ 
  title, 
  description, 
  variant = "default", 
  duration = 3000 
}: ToastProps) => {
  const options = {
    duration,
    className: variant === "destructive" ? "destructive" : "",
  };

  return sonnerToast(title, {
    description,
    ...options,
  });
};

export const useToast = () => {
  return { toast };
};
