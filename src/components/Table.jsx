import React, { useState, useEffect } from "react";

function Table() {
    const gridSize = 1000;
    const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);
    const cols = 10;
    const rows = gridSize / cols;

    // Blue pattern logic (remains fixed)
    const getBluePattern = () => {
        let blueCells = new Set();
        for (let num = 1; num <= gridSize; num++) {
            const cycle = Math.floor((num - 1) / 180);
            const cycleStart = cycle * 180 + 1;
            const localNum = num - cycleStart + 1;

            if (localNum <= 100 && (localNum - 1) % 11 === 0) {
                blueCells.add(num);
            } else if (localNum > 100 && localNum < 181 && (localNum - 100) % 9 === 0) {
                blueCells.add(num);
            }
        }
        return blueCells;
    };

    const blueIndexes = getBluePattern();

    // Red pattern logic (same as blue but moves)
    const [redIndexes, setRedIndexes] = useState(new Set(blueIndexes));

    useEffect(() => {
        const interval = setInterval(() => {
            setRedIndexes((prev) => {
                let newRedIndexes = new Set();
                prev.forEach((num) => {
                    let newIndex = num + cols; // Move down by one row
                    if (newIndex > gridSize) newIndex = ((newIndex - 1) % gridSize) + 1; // Wrap to top
                    newRedIndexes.add(newIndex);
                });
                return newRedIndexes;
            });
        }, 500); // Adjust speed as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-10 gap-1 p-4 w-fit mx-auto bg-black rounded-lg">
            {numbers.map((num) => {
                let isBlue = blueIndexes.has(num);
                let isRed = redIndexes.has(num);

                return (
                    <div
                        key={num}
                        className={`w-12 h-12 flex items-center justify-center rounded-md text-lg font-bold 
                            transition-all duration-200
                            ${isBlue ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50" : ""}
                            ${isRed ? "bg-red-500 text-white shadow-lg shadow-red-500/50" : ""}
                            ${!isBlue && !isRed ? "bg-gray-900 text-gray-300 border border-gray-700" : ""}`}
                    >
                        {num}
                    </div>
                );
            })}
        </div>
    );
}

export default Table;
