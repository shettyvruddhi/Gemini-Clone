// Use Vite-specific environment variable syntax
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log("Loaded API Key:", apiKey); // Debug API key

if (!apiKey) {
    throw new Error("API key is missing. Ensure .env is configured correctly.");
}

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the GoogleGenerativeAI instance with the API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Define the async function to interact with the model
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    try {
        // Send the prompt message and get the result
        const result = await chatSession.sendMessage(prompt);

        // Await the response text since text() is likely a promise
        const responseText = await result.response.text();

        // Log the text content of the response
        console.log(responseText);

        // Return the response text
        return responseText;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error; // Throw the error so that it can be caught in the caller
    }
}

// Export run function if needed for other parts of your app
export default run;
