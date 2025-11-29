import React, { useState } from "react";
import Toolbar from "./components/Toolbar.jsx";
import Whiteboard from "./components/Whiteboard.jsx";
import { LANGUAGES } from "./i18n.js";

export default function App() {
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [lang, setLang] = useState(LANGUAGES.EN);

  return (
    <div className="app-root">
      <header className="top-bar">
        <span className="logo">FlowBoard</span>

        <Toolbar tool={tool} setTool={setTool} setColor={setColor} lang={lang} />

        <div className="lang-switcher">
          <span className="lang-label">
            {lang === LANGUAGES.EN ? "Language:" : "Sprache:"}
          </span>

          <button
            onClick={() => setLang(LANGUAGES.EN)}
            className={`lang-btn ${lang === LANGUAGES.EN ? "active" : ""}`}
          >
            EN
          </button>

          <button
            onClick={() => setLang(LANGUAGES.DE)}
            className={`lang-btn ${lang === LANGUAGES.DE ? "active" : ""}`}
          >
            DE
          </button>
        </div>
      </header>

      <Whiteboard tool={tool} color={color} lang={lang} />
    </div>
  );
}