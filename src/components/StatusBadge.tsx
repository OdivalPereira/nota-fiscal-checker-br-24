
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Autorizada" | "Cancelada" | "Denegada" | boolean;
  label?: string;
  className?: string;
}

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  // Handle boolean status (for report inclusion)
  if (typeof status === "boolean") {
    const included = status;
    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          included
            ? "bg-nfe-success/10 text-nfe-success"
            : "bg-nfe-error/10 text-nfe-error",
          className
        )}
      >
        {included ? "Incluído" : "Ausente"}
      </span>
    );
  }

  // Handle NFe status
  const getStatusStyles = () => {
    switch (status) {
      case "Autorizada":
        return "bg-nfe-success/10 text-nfe-success";
      case "Cancelada":
        return "bg-nfe-error/10 text-nfe-error";
      case "Denegada":
        return "bg-nfe-warning/10 text-nfe-warning";
      default:
        return "bg-nfe-slate/10 text-nfe-slate";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getStatusStyles(),
        className
      )}
    >
      {label || status}
    </span>
  );
};
