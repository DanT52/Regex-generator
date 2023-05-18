import { useState } from "react";
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getQuery = async () => {
    try {
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      };
      const response = await fetch("http://localhost:8000/completions", options);
      const data = await response.json();
      console.log(data);

      const userMessage = {
        role: "user",
        content: value,
      };
      setChat((oldChat) => [...oldChat, data, userMessage]);
      setValue(""); // Clear the input box after submission
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getQuery();
    }
  };

  const clearChat = () => {
    setValue("");
    setChat([]);
  };

  const filteredUserMessages = chat.filter((message) => message.role === "user");
  const latestCode = chat.filter((message) => message.role === "assistant").pop();

  return (
    <div className="wrap">
      <h2 className="heading">RegEx Generator</h2>
      <p>Just describe what you want to select!</p>
      <div className="app">
        <MessagesDisplay userMessages={filteredUserMessages} />
        <input
          value={value}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Enable submission on Enter key press
        />
        <CodeDisplay text={latestCode?.content || ""} loading={loading} />
        <div className="button-container">
          <button id="get-query" onClick={getQuery}>
            Get RegEx!
          </button>
          <button id="clear-chat" onClick={clearChat}>
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
