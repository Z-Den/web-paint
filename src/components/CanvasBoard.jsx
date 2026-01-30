import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

const CanvasBoard = forwardRef(({ selectedTool, selectedColor, brushSize }, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useImperativeHandle(ref, () => ({

        clearCanvas: () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        downloadCanvas: (fileName) => {
            const canvas = canvasRef.current;
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL();
            link.click();
        },

        getImage: () => {
            return canvasRef.current.toDataURL();
        }
    }));

    // Инициализация канваса (размер и настройка линий)
    useEffect(() => {
        const canvas = canvasRef.current;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        canvas.width = screenWidth * 0.7;
        canvas.height = screenHeight * 0.7;

        // Начальный стиль линии
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current.getContext('2d');

        ctx.strokeStyle = selectedTool === 'eraser' ? '#FFFFFF' : selectedColor;
        ctx.lineWidth = brushSize;

        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.closePath();
        setIsDrawing(false);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
        />
    );
});

export default CanvasBoard;