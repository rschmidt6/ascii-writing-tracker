import { useState, useEffect } from "react";

const AsciiWriter = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const dailyGoal = 500;

  useEffect(() => {
    const words = text.trim().split(/\s+/);
    setWordCount(text.trim() === "" ? 0 : words.length);
  }, [text]);

  const formatDate = () => {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  };

  const generateHeader = () => `
╔════════════════════════════════════════════════════════╗
║                   WRITING TRACKER                      ║
║                      ${formatDate()}                        ║
╚════════════════════════════════════════════════════════╝`;

  const generateProgressBar = () => {
    const progress = Math.floor((wordCount / dailyGoal) * 20);
    return `[${">".repeat(progress)}${"-".repeat(20 - progress)}] ${wordCount
      .toString()
      .padStart(3, " ")}/${dailyGoal}`;
  };

  const exportAsTxt = () => {
    const content = `${generateHeader()}

Progress: ${generateProgressBar()}

--------------------.-=~=-.--------------------

${text}

--------------------.-=~=-.--------------------`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `writing_${formatDate()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Add VT323 font */}
      <link
        href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-neutral-900 text-orange-200 p-8"
        style={{ fontFamily: "VT323, monospace", fontSize: "1.2rem" }}
      >
        <div className=" flex justify-between">
          <pre className="mb-6">{generateHeader()}</pre>
          <pre>
            {`
┌──────────── progress ────────────┐
│ ${generateProgressBar()}   │
└──────────────────────────────────┘`}
          </pre>
        </div>

        {/* Writing Area */}
        <pre className="mb-1">
          {`
┌─────────── write ──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐`}
        </pre>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-[1494px] ml-1 h-128 bg-neutral-900 px-4 py-2 focus:outline-none resize-none 
                     border-l-2 border-r-2 border-orange-200 text-orange-200"
          style={{ fontFamily: "VT323, monospace", fontSize: "1.2rem" }}
          placeholder="enter your thoughts..."
        />
        <pre>{`└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘`}</pre>

        {/* Export Button */}
        <pre
          className="mt-4 cursor-pointer hover:text-orange-300"
          onClick={exportAsTxt}
        >
          {`┌──── export txt ────┐
│ [click to export]  │
└────────────────────┘`}
        </pre>
      </div>
    </>
  );
};

export default AsciiWriter;
