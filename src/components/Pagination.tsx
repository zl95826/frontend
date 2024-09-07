import React, { useEffect, useRef, useState } from "react";
import { DataType } from "../App";

const Pagination = ({
  data,
  size = 3,
}: {
  data: DataType[];
  size?: number;
}) => {
  const [index, setIndex] = useState<number>(0);
  // const [currentData, setCurrentData] = useState(() => {
  //   return data.slice(0, size);
  // });
  const currentData = data.slice(index, index + size);
  const nextFunc = () => {
    setIndex((pre) => pre + size);
  };
  const preFunc = () => {
    setIndex((pre) => pre - size);
  };
  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((ele) => (
            <tr key={ele.id}>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={nextFunc} disabled={currentData.length < size}>
        Next
      </button>
      <button onClick={preFunc} disabled={index <= 0}>
        Pre
      </button>
      {data.map((ele) => (
        <p key={ele.id}>{ele.name}</p>
      ))}
    </div>
  );
};

const Pagination2 = ({
  data,
  size = 3,
}: {
  data: DataType[];
  size?: number;
}) => {
  const currentIndex = useRef<number>(0);
  const [currentData, setCurrentData] = useState(() => {
    return data.slice(0, size);
  });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((ele) => (
            <tr key={ele.id}>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button onClick={() => calFunc("next")}>Pre</button>
      <button onClick={() => calFunc("back")}>Next</button> */}
    </div>
  );
};

export default Pagination2;
