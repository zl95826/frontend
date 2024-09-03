import React, { useState } from "react";

const Box = () => {
  const [num, setNum] = useState("");
  const conNum = Number(num);
  const flexItems = Array(conNum)
    .fill(null)
    .map((_, index) => <div key={index}>box {index + 1}</div>);
  console.log(Array(conNum).fill(null));
  return (
    <div>
      <Calendar />
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
    </div>
  );
};

export default Box;

const Calendar = () => {
  const [time, setTime] = useState(() => new Date());
  const month = time.getMonth();
  const year = time.getFullYear();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const arr: { date: number; day: number }[][] = Array.from(Array(5), () => []);
  for (let i = 1; i <= lastDay; i++) {
    const temp = new Date(year, month, i).getDay();

    arr[Math.floor((i - 1) / 7)].push({ date: i, day: temp });
  }
  const arrEle = arr.map((row, index) => {
    return (
      <tr key={index + 1}>
        {row.map((ele, po) => (
          <td key={ele.date}>{ele.date}</td>
        ))}
      </tr>
    );
  });
  const ele = Array.from(Array(lastDay), (_, index) => index + 1);
  const pre = [];
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    const temp = new Date(year, month, -(firstDay - i - 1)).getDate();
    pre.push(temp);
  }
  const after = [];
  for (let i = 1; i <= 35 - pre.length - ele.length; i++) {
    const temp = new Date(year, month, lastDay + i).getDate();
    after.push(temp);
  }
  console.log(ele, pre, after);
  return (
    <>
      {time.toTimeString()} {calMonth(month)} {time.getDay()} {lastDay}
      <table>
        <thead>
          <tr>
            {weekday.map((ele, index) => (
              <th key={index}>{ele}</th>
            ))}
          </tr>
        </thead>
        <tbody>{arrEle}</tbody>
      </table>
      <div className="calendar">
        {weekday.map((ele, index) => (
          <div className="square" key={index}>
            {ele}
          </div>
        ))}
        {pre.map((ele, index) => (
          <div className="square" key={index}>
            {ele}
          </div>
        ))}
        {ele.map((ele, index) => (
          <div className="square" key={index}>
            {ele}
          </div>
        ))}
        {after.map((ele, index) => (
          <div className="square" key={index}>
            {ele}
          </div>
        ))}
      </div>
    </>
  );
};

const calMonth = (num: number) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[num];
};
