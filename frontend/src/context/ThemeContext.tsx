import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}
type ThemeType = 'light' | 'dark';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme as ThemeType) || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};