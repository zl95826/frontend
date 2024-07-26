import React from "react";
import { useEffect, useState, useRef } from "react";

export default function Timer() {
  useEffect(() => {
    function animatedFun(time: number): void {
      if (previousTimeRef.current !== null) {
        const elapse = time - previousTimeRef.current;
        // setTime((pre) => pre + elapse);
        // setTime(elapse);
        setTime(time);
      }
      previousTimeRef.current = time;
      timeRef.current = requestAnimationFrame(animatedFun);
    }
    //const func = (): void => {};

    timeRef.current = requestAnimationFrame(animatedFun);
    return () => {
      if (timeRef.current) cancelAnimationFrame(timeRef.current);
    };
  }, []);
  const timeFormat = (time: number): string => {
    const millisecondsLeft = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const mintues = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours} : ${mintues < 10 ? "0" + mintues : mintues}: ${
      seconds < 10 ? "0" + seconds : seconds
    } `; // : ${millisecondsLeft}
  };
  const [time, setTime] = useState<number>(0);
  const timeRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  return <div>{timeFormat(time)}</div>;
}
