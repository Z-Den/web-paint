import React from "react";


const Tabs = ({canvases, activeCanvasId, setActiveCanvasId, removeCanvas}) => {
    return (
        <div className="tabs">
            {canvases.map(canvas => (
                <div
                    key={canvas.id}
                    className={`tab ${activeCanvasId === canvas.id ? 'active' : ''}`}
                    onClick={() => setActiveCanvasId(canvas.id)}
                >
                    {canvas.name}
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