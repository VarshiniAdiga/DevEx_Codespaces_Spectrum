import React, { useState } from "react";
import "./App.css";

/**
 * Greeting component.
 * @param props - Passed down properties.
 * @returns Greeting component.
 */
function Greeting({ greeting }) {
    return <div className="greeting">{greeting}</div>;
}

export function App() {
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");

    /**
     * Handle text input change.
     * @param event - HTML event.
     */
    function handleChange(event) {
        setName(event.target.value);
    }

    /**
     * Handle button click.
     */
    function handleClick() {
        if (name.trim().length > 0) {
            setGreeting(`Hello, ${name} !!`);
            setName("");
        }
    }

    return (
        <>
            <input
                type="text"
                value={name}
                onChange={handleChange}
                maxLength={50}
                placeholder="Enter your name ..."
                autoFocus
            />
            <button onClick={handleClick}>Click me</button>
            <Greeting greeting={greeting} />
        </>
    );
}

export default App;
