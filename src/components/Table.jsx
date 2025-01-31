import React from "react";

function Table() {
    const gridSize = 1000; // Set your desired grid size
    const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-10 gap-2 p-4 w-fit mx-auto">
            {numbers.map((num) => {
                let isBlue = false;

                const cycle = Math.floor((num - 1) / 180);
                const cycleStart = cycle * 180 + 1; // 1st number of the current cycle
                const localNum = num - cycleStart + 1; // Position inside the cycle

                // Phase 1: +11 pattern from 1 to 100 (inside the cycle)
                if (localNum <= 100) {
                    isBlue = (localNum - 1) % 11 === 0;
                }
                // Phase 2: +9 pattern from 109 to 181 (inside the cycle)
                else if (localNum > 100 && localNum < 181) {
                    isBlue = (localNum - 100) % 9 === 0;
                }

                return (
                    <div
                        key={num}
                        className={`border p-2 text-center w-10 h-10 flex items-center justify-center 
                            ${isBlue ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {num}
                    </div>
                );
            })}
        </div>
    );
}

export default Table;
