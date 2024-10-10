import React, { useState, useRef } from "react";

export default function Clicker() {
  const [clickerValue, setClickerValue] = useState(0);
  const isHolding = useRef(false);
  const startTimeRef = useRef(null);
  const holdIntervalRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  // So i need the 4th project to understand brudha
  /* 

  pro writter yes mmm mai scurta ca a meadar uniformaii sta fain

  */
  const startIncreasing = (isIncrement) => {
    // Track that the button is being held
    isHolding.current = true;
    startTimeRef.current = Date.now();

    // Increment/decrement immediately on click
    setClickerValue((prev) =>
      isIncrement ? prev + 1 : Math.max(0, prev - 1)
    );

    // Set a timeout for 3 seconds to start the fast incrementing if button is held
    holdTimeoutRef.current = setTimeout(() => {
      if (isHolding.current) {
        const updateClicker = () => {
          if (!isHolding.current) return; // Stop if not holding

          const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // Time in seconds

          // Adjust speed based on the time held
          let speed = 500; // Default speed

          if (elapsedTime >= 5) {
            speed = 50; // Very fast after 7 seconds
          } else if (elapsedTime >= 2) {
            speed = 150; // Medium speed after 3 seconds
          }

          // Update the clicker value
          setClickerValue((prev) =>
            isIncrement ? prev + 1 : Math.max(0, prev - 1)
          );

          // Continue updating at the adjusted speed
          holdIntervalRef.current = setTimeout(() => {
            updateClicker();
          }, speed);
        };

        // Start updating repeatedly after 3 seconds
        updateClicker();
      }
    }, 1000); // Delay of 2 seconds before starting faster updates
  };

  const stopIncreasing = () => {
    // Stop holding
    isHolding.current = false;
    clearTimeout(holdTimeoutRef.current); // Cancel the 3-second timeout
    clearTimeout(holdIntervalRef.current); // Stop any pending timeouts for speed-up
  };

  return (
    <div className="container">
      <div className="clickerParent border border-secondary rounded mt-4">
        <div className="clickerDisplay d-flex align-items-center justify-content-center bg-light display-2">
          {clickerValue}
        </div>
        <div className="clickerButtonContainer d-flex flex-row">
          <button
            className="btn btn-success w-100"
            onMouseDown={() => startIncreasing(true)}
            onMouseUp={stopIncreasing}
            onMouseLeave={stopIncreasing}
          >
            <i className="fa fa-2x fa-plus" />
          </button>
          <button
            className="btn btn-warning w-100"
            onClick={() => setClickerValue(0)}
          >
            <i className="fa fa-2x fa-refresh" />
          </button>
          <button
            className="btn btn-danger w-100"
            onMouseDown={() => startIncreasing(false)}
            onMouseUp={stopIncreasing}
            onMouseLeave={stopIncreasing}
          >
            <i className="fa fa-2x fa-minus" />
          </button>
        </div>
      </div>
    </div>
  );
}
