import React from 'react';

const Toolbar = ({
                    selectedTool,
                    setTool,
                    selectedColor,
                    setColor,
                    brushSize,
                    setBrushSize,
                    onAddCanvas,
                 }) => {
    return (
        <div className="toolbar">
            {/* Кнопки инструментов */}
            <button
                className={`tool-btn ${selectedTool === 'brush' ? 'active' : ''}`}
                onClick={() => setTool('brush')}
            >
                🖌 Кисть
            </button>

            <button
                className={`tool-btn ${selectedTool === 'eraser' ? 'active' : ''}`}
                onClick={() => setTool('eraser')}
            >
                🧽 Ластик
            </button>

            <div className="separator"></div>

            {/* Выбор цвета */}
            <div className="setting-group">
                <label>Цвет:</label>
                <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setColor(e.target.value)}
                    disabled={selectedTool === 'eraser'}
                />
            </div>

            {/* Настройка размера */}
            <div className="setting-group">
                <label>Размер: {brushSize}px</label>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                />
            </div>

            <button className="tool-btn" onClick={onAddCanvas}>Добавить холст</button>
        </div>
    );
};

export default Toolbar;