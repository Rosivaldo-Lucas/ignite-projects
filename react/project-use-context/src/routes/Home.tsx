import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    const handleToggleTheme = () => {
        toggleTheme();
    };

    return (
        <>
            <h1>
                O tema atual é: {theme}
            </h1>

            <button onClick={handleToggleTheme}>Mudar tema</button>
        </>
    );
}
