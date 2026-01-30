import React, { useState, useRef } from 'react';
import CanvasBoard from './components/CanvasBoard';
import Toolbar from './components/Toolbar';
import Tabs from "./components/Tabs";
import './App.css';
import './style/style.css';


function App() {
    // Tools
    const [selectedTool, setTool] = useState('brush'); // 'brush' или 'eraser'
    const [selectedColor, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);

    // Canvases
    const [canvases, setCanvases] = useState(
      [{id: 1, name: 'Рисунок 1'}]
    );
    const [activeCanvasId, setActiveCanvasId] = useState(1);
    const canvasRefs = useRef({});

    // BG Image
    const [pageBackground, setPageBackground] = useState('');

    const addCanvas = () => {
        const newCanvasId = canvases.length > 0 ? Math.max(...canvases.map(c => c.id)) + 1 : 1;
        setCanvases([...canvases, {id: newCanvasId, name: 'Рисунок ' + newCanvasId}]);
        setActiveCanvasId(newCanvasId);
    }

    const removeCanvas = (e, id) => {
        e.stopPropagation();
        if (canvases.length === 1) return;
        const newList = canvases.filter(c => c.id !== id);
        setCanvases(newList);
        if (activeCanvasId === id) {
            setActiveCanvasId(newList[0].id);
        }
        delete canvasRefs.current[id];
    };

    const renameCanvas = (id, newName) => {
        setCanvases(prev =>
            prev.map(c => c.id === id ? { ...c, name: newName } : c)
        );
    };

    const handleSetPageBackground = () => {
        if (canvasRefs.current[activeCanvasId]) {
            const dataUrl = canvasRefs.current[activeCanvasId].getImage();
            setPageBackground(dataUrl);
        }
    };

    const handleClear = () => {
        if (canvasRefs.current[activeCanvasId]) {
            canvasRefs.current[activeCanvasId].clearCanvas();
        }
    };

    const handleDownload = () => {
        if (canvasRefs.current[activeCanvasId]) {
            const activeName = canvases.find(c => c.id === activeCanvasId)?.name || 'drawing';
            canvasRefs.current[activeCanvasId].downloadCanvas(activeName);
        }
    };

    return (
        <div className="app-container"
             style={{
                 backgroundImage: pageBackground ? `url(${pageBackground})` : 'none',
                 backgroundSize: 'cover', // Растянуть на весь экран
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
             }}
        >
            <h1><i>Drawing</i> App</h1>

            <Toolbar
                selectedTool={selectedTool}
                setTool={setTool}
                selectedColor={selectedColor}
                setColor={setColor}
                brushSize={brushSize}
                setBrushSize={setBrushSize}
                onAddCanvas={addCanvas}
                onSetPageBackground={handleSetPageBackground}
                onClear={handleClear}
                onDownload={handleDownload}
            />

            <Tabs
                canvases={canvases}
                activeCanvasId={activeCanvasId}
                setActiveCanvasId={setActiveCanvasId}
                removeCanvas={removeCanvas}
                renameCanvas={renameCanvas}
            />

            {/* Рендерим все канвасы, но скрываем неактивные */}
            <div className="canvases-area">
                {canvases.map(canvas => (
                    <div
                        key={canvas.id}
                        style={{ display: activeCanvasId === canvas.id ? 'block' : 'none' }}
                    >
                        <CanvasBoard
                            ref={(el) => (canvasRefs.current[canvas.id] = el)}
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