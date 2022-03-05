import { useEffect, useState } from "react";

export default function RoomInfo({totalParticipants, finishTime}) {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft(){
    
    const difference = +finishTime - +new Date().getTime();
  
    let timeLeft = {
      // days: Math.floor(99999999999 / (1000*60*60*24)),
      // hours: Math.floor((99999999999 / (1000*60*60)) % 24),
      // minutes: Math.floor((99999999999 / 1000 / 60) % 60),
      // seconds: Math.floor((99999999999 / 1000) % 60),
    };
  
    if(difference >= 0){
      timeLeft = {
        days: Math.floor(difference / (1000*60*60*24)),
        hours: Math.floor((difference / (1000*60*60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if(!timeLeft[interval]) return;

    timerComponents.push(
      <span className="bg-[#C4C4C4] font-bold text-lg px-2 py-2 mx-1 rounded-lg my-2">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="p-5 bg-grey basis-1/4 text-center">
      <div className="p-2 bg-slate-200 rounded-lg ">
        <p className="font-bold text-2xl">Countdown</p>
      </div>
      <div className="flex justify-center">
        {timerComponents.length ? timerComponents : <span className="font-bold text-xl py-2 px-2">Time's up!</span>}
      </div>
      <div className="w-full bg-slate-200 rounded-lg p-3">
        <h3 className="text-left font-bold px-8 py-1 text-xl">
          Total Peserta:
        </h3>
        <h2 className="text-left font-bold px-8 text-3xl">{totalParticipants} Peserta</h2>
        <h3 className="text-left font-bold px-8 py-1 text-xl">
          Syarat & Ketentutan:
        </h3>
        <ol className="text-left font-bold px-8 py-1">
          <li>1. Dharma Gans</li>
          <li>2. Dharma Gans</li>
          <li>3. Dharma Gans</li>
          <li>4. Dharma Gans</li>
        </ol>
      </div>
    </div>
  );
}
