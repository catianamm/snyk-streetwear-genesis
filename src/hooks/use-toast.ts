
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

export interface Toast extends ToastProps {
  id: string | number;
}

// This array will store our active toasts
const TOAST_LIMIT = 20;
let toasts: Toast[] = [];

export const useToast = () => {
  const addToast = ({ title, description, variant = "default", duration = 3000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = {
      id,
      title,
      description,
      variant,
      duration,
    };
    
    toasts = [newToast, ...toasts].slice(0, TOAST_LIMIT);
    
    // Use sonner for the actual toast display
    if (variant === "destructive") {
      sonnerToast.error(title, { description, duration });
    } else {
      sonnerToast.success(title, { description, duration });
    }
    
    return id;
  };

  const dismissToast = (toastId: string | number) => {
    toasts = toasts.filter((toast) => toast.id !== toastId);
  };

  return {
    toast: addToast,
    toasts: [...toasts],
    dismissToast,
  };
};

// Create a simple toast function for direct use
export const toast = ({ 
  title, 
  description, 
  variant = "default", 
  duration = 3000 
}: ToastProps) => {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
      duration,
    });
  } else {
    return sonnerToast.success(title, {
      description,
      duration,
    });
  }
};
