import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://ensono-backend-fve4cyc7embuamhc.swedencentral-01.azurewebsites.net"

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async () => {
      if (!question) return;
  
      try {
          const response = await axios.post(`${API_URL}/ask`, { question });
  
          console.log("🔍 Full API Response:", response.data);  // Log API response
  
          let extractedAnswer = response.data.answer; // Default assumption
  
          // Check if `answer` is an object and extract the first available text
          if (typeof extractedAnswer === "object" && extractedAnswer !== null) {
              console.log("⚠️ Answer is an object:", extractedAnswer);
              extractedAnswer = JSON.stringify(extractedAnswer, null, 2); // Convert to readable string
          }
  
          // If answer is an array, join it into a string
          if (Array.isArray(extractedAnswer)) {
              console.log("⚠️ Answer is an array:", extractedAnswer);
              extractedAnswer = extractedAnswer.join(" ");
          }
  
          setAnswer(extractedAnswer);
      } catch (error) {
          console.error("❌ Error fetching answer:", error.response ? error.response.data : error);
          setAnswer("Error fetching answer.");
      }
    };
  


    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Ask a Question</h2>
            <input 
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                style={{ padding: "10px", width: "300px" }}
            />
            <br /><br />
            <button onClick={handleSubmit} style={{ padding: "10px 20px", cursor: "pointer" }}>
                Ask
            </button>
            <br /><br />
            {answer && <p><strong>Answer:</strong> {answer}</p>}
        </div>
    );
}

export default App;

