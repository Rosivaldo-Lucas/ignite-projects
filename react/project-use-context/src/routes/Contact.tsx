import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Contact() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <h1>
                O tema atual é: {theme}
            </h1>
        </>
    );
}
