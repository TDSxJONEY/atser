import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline" 
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border-border bg-background/60 backdrop-blur hover:bg-accent"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}