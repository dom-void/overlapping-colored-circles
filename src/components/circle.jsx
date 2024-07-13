import { useCallback, useEffect, useMemo, useState } from 'react';
import './circle.css'

const Circle = ({ color }) => {
    const size = 50;
    const { innerWidth, innerHeight } = window;
    const smallerViewportSide = innerWidth < innerHeight ? innerWidth : innerHeight;
    const circleSize = Math.ceil((size / 100) * smallerViewportSide);
    const randomPosition = (maxValue) => Math.floor(Math.random() * (maxValue - circleSize - 1));
    const randomDirection = () => Boolean(Math.round(Math.random())) ? 1 : -1;

    const initStyle = {
        width: `min(${size}vw, ${size}vh)`,
        height: `min(${size}vw, ${size}vh)`,
        background: color,
    };

    const [position, setPosition] = useState({ x: randomPosition(innerWidth), y: randomPosition(innerHeight) });
    const [style, setStyle] = useState(initStyle);
    const direction = useMemo(() => ({ x: randomDirection(), y: randomDirection() }), []);

    const calculatePosition = useCallback((x, y) => {
        let internalX = x;
        let internalY = y
        if (y >= innerHeight - circleSize) {
            direction.y = -1 * direction.y;
            internalY = innerHeight - circleSize - 1;
        }
        if (y < 0) {
            direction.y = -1 * direction.y;
        }
        if (x >= innerWidth - circleSize) {
            direction.x = -1 * direction.x;
            internalX = innerWidth - circleSize - 1;
        }
        if (x < 0) {
            direction.x = -1 * direction.x;
        }
        return {
            x: internalX + direction.x,
            y: internalY + direction.y,
        };
    }, [direction, innerHeight, innerWidth, circleSize]);

    useEffect(() => {
        let intervalId = setInterval(() => {
            const { x, y } = calculatePosition(position.x, position.y);
            setPosition((position) => ({ ...position, x, y }));
            setStyle((style) => ({ ...style, top: `${position.y}px`, left: `${position.x}px` }));
        }, 30);
        return () => clearInterval(intervalId);
    }, [calculatePosition, position, style]);

    return (
        <div className='circle' style={style}></div>
    );
}

export default Circle;