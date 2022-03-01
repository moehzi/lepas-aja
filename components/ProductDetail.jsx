import giveawayRoom from '../data/giveaway-room';

export default function ProductDetail({roomInfo, handleJoinRoom, isJoinRoom}) {
  
  return (
    <section className="p-5">
      <div className="bg-slate-200 w-full min-h-[400px] rounded-lg h-full flex p-8">
        <div className="text-center  items-center align-middle flex-1">
          <img
            src={roomInfo.photoUrl}
            alt=""
            className="border-ruddy-pink border-2 mx-auto w-96"
          />
        </div>
        <div className=" flex-1 flex-column p-3 relative">
          <div className="align-middle">
            <h3 className=" text-xl font-bold text-[#DF8D9F]">
              {roomInfo.name}
            </h3>
            <p className="text-[#DF8D9F] opacity-70 text-sm">
              {roomInfo.owner}
            </p>
            <div className="items-center gap-2 mt-2">
              <img src="/icons/map-pin.svg" />
              <p className="text-[#DF8D9F] text-sm">{roomInfo.location}</p>
            </div>
            <p>
              {roomInfo.description}
            </p>
          </div>
          <div className="mt-6 absolute bottom-0 mx-auto px-auto left-0 right-0 text-center">
            {/* {console.log(isJoinRoom)} */}
            <form 
              onSubmit={handleJoinRoom}
            >
              <input type="hidden" />
              <button
                type="submit"
                disabled={isJoinRoom}
              >
                <input className={`inline-block text-lg px-12 py-4 rounded-xl leading-none border rounded mt-4 lg:mt-0 ${!isJoinRoom? "bg-ruddy-pink text-white hover:border-ruddy-pink hover:text-ruddy-pink hover:bg-white": "bg-gray-400 text-white cursor-not-allowed"}`} type="submit" value={`Ikuti Giveaway`} disabled={isJoinRoom}/>
                {/* <a
                  href="#"
                  className="inline-block text-lg px-12 py-4 rounded-xl leading-none border rounded bg-ruddy-pink text-white hover:border-ruddy-pink hover:text-ruddy-pink hover:bg-white mt-4 lg:mt-0"
                >
                  Ikuti giveaway
                </a> */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
