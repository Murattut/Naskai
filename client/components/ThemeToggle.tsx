"use client";

import { useTheme } from "next-themes";
import { Icon } from "./Icon";

export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors text-gray-700 dark:text-yellow-300 ${className}`}
            aria-label="Toggle Theme"
        >
            {resolvedTheme === "dark" ? <Icon name="sun" size={24} /> : <Icon name="moon" size={24} />}
        </button>
    );
}
