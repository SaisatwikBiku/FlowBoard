import React from "react";
import { Pencil, Eraser, StickyNote } from "lucide-react";
import { t } from "../i18n.js";

export default function Toolbar({ tool, setTool, setColor, lang }) {
  return (
    <div className="toolbar">
      <button
        className={`tool-btn ${tool === "pen" ? "active" : ""}`}
        onClick={() => setTool("pen")}
      >
        <Pencil size={16} />
        {t(lang, "pen")}
      </button>

      <button
        className={`tool-btn ${tool === "eraser" ? "active" : ""}`}
        onClick={() => setTool("eraser")}
      >
        <Eraser size={16} />
        {t(lang, "eraser")}
      </button>

      <button
        className={`tool-btn ${tool === "sticky" ? "active" : ""}`}
        onClick={() => setTool("sticky")}
      >
        <StickyNote size={16} />
        {t(lang, "sticky")}
      </button>

      <input
        type="color"
        onChange={(e) => setColor(e.target.value)}
        className="color-picker"
        aria-label="Color picker"
      />
    </div>
  );
}