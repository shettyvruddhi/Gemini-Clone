import React, { createContext, useState } from 'react';
import run from '../config/gemini';  // Ensure you import the run function to call the API

// Create the context
export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);  // Define showResult here
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function to handle sending prompt and storing the result
    const onSent = async () => {
        setResultData(""); // Reset result data
        setLoading(true);  // Set loading state
        setShowResult(true); // Show result container
        setRecentPrompt(input); // Set the most recent prompt
        setPrevPrompts((prev) => [...prev, input]); // Save the input in history
    
        try {
            console.log("Sending prompt:", input); // Debugging: Log input
            const response = await run(input); // Call the API
            console.log("API Response:", response); // Debugging: Log raw response
    
            // Process the response to format it
            const formattedResponse = response
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold formatting
                .replace(/\*/g, "<br />") // Line breaks
                .replace(/``:/g, "-") // Remove backticks followed by colon
                .replace(/```/g, "") // Remove triple backticks
                .replace(/``/g, ""); // Remove double backticks
    
            console.log("Formatted Response:", formattedResponse); // Debugging: Log formatted response
            setResultData(formattedResponse); // Update state with formatted response
        } catch (error) {
            console.error("Error during API call:", error); // Log error
            setResultData("Failed to fetch response"); // Show error message
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const fetchPromptAnswer = async (prompt) => {
        setResultData(""); // Reset result data
        setLoading(true);  // Show loading indicator
        setShowResult(true); // Show result container
        setRecentPrompt(prompt); // Set the selected prompt
    
        try {
            console.log("Fetching answer for prompt:", prompt); // Debugging: Log selected prompt
            const response = await run(prompt); // Call the API
            console.log("API Response for selected prompt:", response); // Debugging: Log raw response
    
            // Process and format the response
            const formattedResponse = response
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold formatting
                .replace(/\*/g, "<br />") // Line breaks
                .replace(/``:/g, "-") // Remove backticks followed by colon
                .replace(/```/g, "") // Remove triple backticks
                .replace(/``/g, ""); // Remove double backticks
    
            console.log("Formatted Response for selected prompt:", formattedResponse); // Debugging: Log formatted response
            setResultData(formattedResponse); // Update state with formatted response
        } catch (error) {
            console.error("Error fetching previous prompt answer:", error); // Log error
            setResultData("Failed to fetch response"); // Show error message
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        showResult,  // Add showResult here
        setShowResult, // Optionally add the setter function if needed
        onSent,        // Make sure the onSent function is available
        fetchPromptAnswer,
        loading,
        resultData,
        input,
        setInput,
        recentPrompt,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
