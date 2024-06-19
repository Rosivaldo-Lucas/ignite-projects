import { createContext, useState } from "react";

interface ThemeContextProps {
    theme: string;
    toggleTheme: () => void;
}

interface ThemeProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'dark',
    toggleTheme: () => {},
});

export default function ThemeProvider({ children }: ThemeProps) {
    const [theme, setTheme] = useState('dark');
    
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
