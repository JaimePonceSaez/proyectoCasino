import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";

type ToasterProps = React.ComponentProps;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    
  );
};

export { Toaster, toast };
