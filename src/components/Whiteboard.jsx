import React, { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Text, Group } from "react-konva";
import { t } from "../i18n.js";

export default function Whiteboard({ tool, color, lang, brushSize }) {
  const [lines, setLines] = useState([]);
  const [notes, setNotes] = useState([]);
  const [shapes, setShapes] = useState([]);

  const isDrawing = useRef(false);

  const handlePointerDown = (e) => {
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

  const handlePointerMove = (e) => {
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

  const handlePointerUp = () => {
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

  const getCursor = () => {
    switch (tool) {
      case "pen": {
        const size = Math.max(20, brushSize * 2);
        const padding = size / 2;
        return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 4}" fill="black"/></svg>') ${padding} ${padding}, auto`;
      }
      case "eraser": {
        const size = Math.max(20, brushSize * 2);
        const padding = size / 2;
        return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect x="2" y="2" width="${size - 4}" height="${size - 4}" fill="none" stroke="black" stroke-width="1.5"/></svg>') ${padding} ${padding}, auto`;
      }
      case "sticky":
        return "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><rect x=\"3\" y=\"3\" width=\"14\" height=\"14\" fill=\"%23ffeb3b\" stroke=\"black\"/></svg>') 10 10, auto";
      default:
        return "default";
    }
  };

  return (
    <div className="board-wrapper">
      <div className="board-top-controls">
        <button className="clear-btn" onClick={handleClearBoard}>
          {t(lang, "clearBoard")}
        </button>
        <button className="shape-btn" onClick={handleAddRectangle}>
          {t(lang, "addRectangle")}
        </button>
      </div>

      <Stage
        width={stageWidth}
        height={stageHeight}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="stage"
        style={{ cursor: getCursor(), touchAction: "none" }}
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