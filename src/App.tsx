import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Timer from "./components/Timer";
interface DataType {
  id: number;
  name: string;
  [key: string]: unknown;
}
function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [users, setUsers] = useState<DataType[]>([]);
  useEffect(() => {
    let ignore: boolean = false;
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((val) => {
        if (!ignore) setData(val);
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    let ignore = false;
    const fetchFunc = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        const value = await response.json();
        if (!ignore) setUsers(value);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
    return () => {
      ignore = true;
    };
  }, []);
  console.log(data, users);
  return (
    <div className="App">
      {/* Timer: <Timer /> */}
      {data.map((ele) => (
        <p key={ele.id}>{ele.name}</p>
      ))}
      <hr />
      <p>The following data from my server:</p>
      {users.map((ele) => (
        <p key={ele.id}>{ele.name}</p>
      ))}
    </div>
  );
}

export default App;
