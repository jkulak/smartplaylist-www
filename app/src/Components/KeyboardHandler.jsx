import { useState, useEffect } from "react";

// toggle = change state on consecutive presses
// toggle = ignore keyUp
const KeyboardHandler = (targetKey, toggle = false) => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed((prev) => (toggle ? !prev : true));
    };

    const upHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed(false);
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        if (!toggle) window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            if (!toggle) window.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;
};

export default KeyboardHandler;
