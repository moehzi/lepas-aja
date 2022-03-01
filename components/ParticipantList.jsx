import { useEffect, useState } from 'react';

export default function ParticipantList(props) {

  return (
    <div className="grow text-center">
      <h1 className="font-bold text-[#DF8D9F] text-center text-4xl m-4">
        Participant List
      </h1>
      <div className="flex flex-col items-center">
        {props.participantLists.map((participant, index) => {
          return(
            <p key={index} className="w-10/12 p-3 my-2 rounded-full bg-slate-200">{participant.email}</p>
          );
        })}
        {/* <p className="w-10/12 p-3 my-2 rounded-full bg-slate-200">UserName</p>
        <p className="w-10/12 p-3 my-2 rounded-full bg-slate-200">UserName</p>
        <p className="w-10/12 p-3 my-2 rounded-full bg-slate-200">UserName</p>
        <p className="w-10/12 p-3 my-2 rounded-full bg-slate-200">UserName</p>
        <p className="w-10/12 p-3 my-2 rounded-full bg-slate-200">UserName</p>
        <p className="w-10/12 p-3 my-2 rounded-full bg-slate-200">UserName</p>
        <p className="w-10/12 p-3 my-2 rounded-full bg-slate-200">UserName</p> */}
      </div>
    </div>
  );
}
