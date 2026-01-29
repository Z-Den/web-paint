import React, { useState } from "react";


const Tabs = ({canvases, activeCanvasId, setActiveCanvasId, removeCanvas, renameCanvas}) => {

    const [editingId, setEditingId] = useState(null);
    const [tempName, setTempName] = useState("");

    const handleDoubleClick = (canvas) => {
        setEditingId(canvas.id);
        setTempName(canvas.name);
    };

    const handleBlur = () => {
        if (editingId) {
            renameCanvas(editingId, tempName);
            setEditingId(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            setEditingId(null); // Отмена редактирования
        }
    };

    return (
        <div className="tabs">
            {canvases.map(canvas => (
                <div
                    key={canvas.id}
                    className={`tab ${activeCanvasId === canvas.id ? 'active' : ''}`}
                    title={editingId === canvas.id ? "" : canvas.name}
                    onClick={() => setActiveCanvasId(canvas.id)}
                    onDoubleClick={() => handleDoubleClick(canvas)}
                >
                    {editingId === canvas.id ? (
                        <input
                            autoFocus
                            className="tab-input"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                    ) : (
                        <span>{canvas.name}</span>
                    )}
                    {canvases.length > 1 && (
                        <span
                            style={{marginLeft: '10px', color: '#999', fontWeight: 'bold'}}
                            onClick={(e) => removeCanvas(e, canvas.id)}
                        >
                            ×
                        </span>
                    )}
                </div>
            ))}
        </div>
    )
}


export default Tabs;