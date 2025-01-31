import React from "react";

function Table() {
    const gridSize = 1000;
    const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-10 gap-1 p-4 w-fit mx-auto bg-black rounded-lg">
            {numbers.map((num) => {
                let isBlue = false;

                const cycle = Math.floor((num - 1) / 180);
                const cycleStart = cycle * 180 + 1;
                const localNum = num - cycleStart + 1;

                if (localNum <= 100) {
                    isBlue = (localNum - 1) % 11 === 0;
                } else if (localNum > 100 && localNum < 181) {
                    isBlue = (localNum - 100) % 9 === 0;
                }

                return (
                    <div
                        key={num}
                        className={`w-12 h-12 flex items-center justify-center rounded-md text-lg font-bold 
                            transition-all duration-200
                            ${isBlue ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50" : "bg-gray-900 text-gray-300 border border-gray-700"}`}
                    >
                        {num}
                    </div>
                );
            })}
        </div>
    );
}

export default Table;
