import reactLogo from "./assets/react.svg";
import "./App.css";
import WritingSpace from "./components/writing-space/WritingSpace";

function App() {
  return (
    <>
      <div className="title">
        <img src={reactLogo} className="logo" alt="React logo" />
        <h1>Emotion Diary</h1>
      </div>
      <WritingSpace />
    </>
  );
}

export default App;
