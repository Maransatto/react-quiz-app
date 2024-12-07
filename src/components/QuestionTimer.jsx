import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    setTimeout(onTimeOut, timeout);
    // const counter = setTimeout(() => onTimeOut, timeout);
    // return () => {
    //   clearTimeout(counter);
    // };
  }, [timeout, onTimeOut]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    setInterval(() => setRemainingTime((prev) => prev - 100), 100);
    // const interval = setInterval(
    //   () => setRemainingTime((prev) => prev - 100),
    //   100
    // );
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
