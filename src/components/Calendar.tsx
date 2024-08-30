import React, { useState } from "react";

const Calendar = () => {
  const [num, setNum] = useState("");
  const conNum = Number(num);
  const flexItems = Array(conNum)
    .fill(null)
    .map((_, index) => <div key={index}>box {index + 1}</div>);
  console.log(Array(conNum).fill(null));
  return (
    <div>
      <input
        name="number"
        type="number"
        value={num}
        min={0}
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      <div className={`calendar ${conNum > 5 ? "greater" : "smaller"}`}>
        {flexItems}
      </div>
    </div>
  );
};

export default Calendar;
