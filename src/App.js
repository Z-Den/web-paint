import React, { useState } from 'react';
import CanvasBoard from './components/CanvasBoard';
import Toolbar from './components/Toolbar';
import './App.css';
import './style/style.css';

function App() {
  const [selectedTool, setTool] = useState('brush'); // 'brush' или 'eraser'
  const [selectedColor, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  return (
      <div className="app-container">
        <h1>React Drawing App</h1>

        <Toolbar
            selectedTool={selectedTool}
            setTool={setTool}
            selectedColor={selectedColor}
            setColor={setColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
        />

        <CanvasBoard
            selectedTool={selectedTool}
            selectedColor={selectedColor}
            brushSize={brushSize}
        />
      </div>
  );
}

export default App;