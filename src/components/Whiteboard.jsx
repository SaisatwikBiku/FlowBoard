import React, { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Text, Group } from "react-konva";
import { t } from "../i18n.js";

export default function Whiteboard({ tool, color, lang, brushSize }) {
  const [lines, setLines] = useState([]);
  const [notes, setNotes] = useState([]);
  const [shapes, setShapes] = useState([]);

  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    if (tool === "pen" || tool === "eraser") {
      isDrawing.current = true;

      setLines((prev) => [
        ...prev,
        {
          tool,
          color: tool === "eraser" ? "#ffffff" : color,
          points: [pos.x, pos.y],
          strokeWidth: brushSize,
        },
      ]);
    }

    if (tool === "sticky") {
      setNotes((prev) => [
        ...prev,
        {
          id: `note-${prev.length}`,
          x: pos.x,
          y: pos.y,
          width: 150,
          height: 150,
          text: t(lang, "note"),
          color: "#ffeb3b",
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (!point) return;

    setLines((prevLines) => {
      if (prevLines.length === 0) return prevLines;

      const last = prevLines[prevLines.length - 1];
      const updated = {
        ...last,
        points: last.points.concat([point.x, point.y]),
      };

      const clone = [...prevLines];
      clone[clone.length - 1] = updated;
      return clone;
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClearBoard = () => {
    setLines([]);
    setNotes([]);
    setShapes([]);
  };

  const handleAddRectangle = () => {
    setShapes((prev) => [
      ...prev,
      {
        id: `shape-${prev.length}`,
        x: 100 + prev.length * 10,
        y: 100 + prev.length * 10,
        width: 150,
        height: 80,
        color,
      },
    ]);
  };

  const stageWidth = window.innerWidth;
  const stageHeight = window.innerHeight - 100;

  return (
    <div className="board-wrapper">
      <div className="board-top-controls">
        <button className="clear-btn" onClick={handleClearBoard}>
          Clear Board
        </button>
        <button className="shape-btn" onClick={handleAddRectangle}>
          {t(lang, "addRectangle")}
        </button>
      </div>

      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="stage"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
              lineCap="round"
              lineJoin="round"
            />
          ))}

          {shapes.map((shape) => (
            <Rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.color}
              draggable
              cornerRadius={4}
            />
          ))}

          {notes.map((note) => (
            <Group key={note.id} x={note.x} y={note.y} draggable>
              <Rect
                width={note.width}
                height={note.height}
                fill={note.color}
                cornerRadius={10}
                shadowBlur={4}
              />
              <Text
                text={note.text}
                x={10}
                y={10}
                width={note.width - 20}
                fontSize={18}
                fill="#333"
              />
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
}