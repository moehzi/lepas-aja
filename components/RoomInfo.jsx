import { useEffect, useState } from "react";

export default function RoomInfo({totalParticipants, finishTime}) {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft(){
    // let year = new Date().getFullYear();
    // console.log(timeLeft);
    const difference = +finishTime - +new Date().getTime();

    // console.log(difference);
  
    let timeLeft = {};
  
    if(difference > 0){
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
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="p-5 bg-grey basis-1/4 text-center">
      <div className="p-2 bg-slate-200 rounded-lg ">
        <p>countdown</p>
      </div>
      <div className="flex justify-between">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
      {/* <div className="flex justify-between">
        <div className="p-2  px-6 bg-slate-200 m-2 rounded-lg">
          <p className="font-bold text-xl">03</p> <p>day</p>
        </div>
        <div className="p-2  px-6 bg-slate-200 m-2 rounded-lg">
          <p className="font-bold text-xl">03</p> <p>Hour</p>
        </div>
        <div className="p-2  px-6 bg-slate-200 m-2 rounded-lg">
          <p className="font-bold text-xl">03</p> <p>Minute</p>
        </div>
        <div className="p-2  px-6 bg-slate-200 m-2 rounded-lg">
          <p className="  font-bold text-xl">03</p> <p>Second</p>
        </div>
      </div> */}
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
