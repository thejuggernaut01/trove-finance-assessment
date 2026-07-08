import { toast } from 'sonner';
import { XCircle, CheckCircle } from 'lucide-react';

type ToastProps = {
  title: string;
  description: string;
};

const showSuccessToast = ({ title, description }: ToastProps) => {
  toast.success(title, {
    description: description,
    duration: 4000,
    icon: <CheckCircle className="h-4 w-4" />,
  });
};

const showErrorToast = ({ title, description }: ToastProps) => {
  toast.error(title, {
    description: description,
    duration: 5000,
    icon: <XCircle className="h-4 w-4" />,
  });
};

export { showSuccessToast, showErrorToast };
