interface CodeDisplayProps {
  text: string;
  loading?: boolean; // Added loading prop
}

const CodeDisplay = ({ text, loading }: CodeDisplayProps) => {
  return (
    <div className="code-display">
      <div className="buttons">
        <div className="button first"></div>
        <div className="button middle"></div>
        <div className="button last"></div>
      </div>
      <div className="code-output">
        {loading ? <p>Loading...</p> : <p>{text}</p>} {/* Display "Loading..." if loading prop is true */}
      </div>
    </div>
  );
};

export default CodeDisplay;