import React from "react";


const Tabs = ({canvases, activeCanvasId, setActiveCanvasId}) => {
    return (
        <div className="tabs">
            {canvases.map(canvas => (
                <div
                    key={canvas.id}
                    className={`tab ${activeCanvasId === canvas.id ? 'active' : ''}`}
                    onClick={() => setActiveCanvasId(canvas.id)}
                >
                    {canvas.name}
                </div>
            ))}
        </div>
    )
}


export default Tabs;