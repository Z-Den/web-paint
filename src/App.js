import React, { useState } from 'react';
import CanvasBoard from './components/CanvasBoard';
import Toolbar from './components/Toolbar';
import Tabs from "./components/Tabs";
import './App.css';
import './style/style.css';


function App() {

    const [selectedTool, setTool] = useState('brush'); // 'brush' или 'eraser'
    const [selectedColor, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [canvases, setCanvases] = useState(
      [{id: 1, name: 'Рисунок 1'}]
    );
    const [activeCanvasId, setActiveCanvasId] = useState(1);

    const addCanvas = () => {
        const newCanvasId = canvases.length + 1;
        setCanvases([...canvases, {id: newCanvasId, name: 'Рисунок ' + newCanvasId}]);
        setActiveCanvasId(newCanvasId);
    }

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
                onAddCanvas={addCanvas}
            />

            <Tabs
                canvases={canvases}
                activeCanvasId={activeCanvasId}
                setActiveCanvasId={setActiveCanvasId}
            />

            {/* Рендерим все канвасы, но скрываем неактивные */}
            <div className="canvases-area">
                {canvases.map(canvas => (
                    <div
                        key={canvas.id}
                        style={{ display: activeCanvasId === canvas.id ? 'block' : 'none' }}
                    >
                        <CanvasBoard
                            selectedTool={selectedTool}
                            selectedColor={selectedColor}
                            brushSize={brushSize}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;