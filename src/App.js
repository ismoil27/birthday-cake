import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";
import cakegif from "./cake.gif";
import cake from "./cake.png";

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 10,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [birthdayImage, setBirthdayImage] = useState(cakegif);
  const [marginLeft, setMarginLeft] = useState("76px");

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown.seconds === 1) {
          clearInterval(interval);
          setShowConfetti(true);
          setBirthdayImage(cake);
          setMarginLeft("76px"); // Resetting marginLeft when displaying cake image
        }
        return { ...prevCountdown, seconds: prevCountdown.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1 style={{ fontSize: 40 }}>Birthday Countdown</h1>
      <div className="birthday-cake">
        <img
          src={birthdayImage}
          alt="Birthday Cake"
          width={"500px"}
          style={{
            marginLeft: birthdayImage === cakegif ? "0" : marginLeft,
            marginTop: "50px",
            transition: "1s ease",
          }}
        />
      </div>
      <div className="countdown">
        <div className="time">
          <span>{countdown.days}</span> Days
        </div>
        <div className="time">
          <span>{countdown.hours}</span> Hours
        </div>
        <div className="time">
          <span>{countdown.minutes}</span> Minutes
        </div>
        <div className="time" style={{ color: "red" }}>
          <span>{countdown.seconds}</span> Seconds
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
}

export default App;
