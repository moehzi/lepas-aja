import giveawayRoom from "../data/giveaway-room";

export default function ProductDetail() {
  return (
    <section className="p-5">
      <div className="bg-slate-200 w-full min-h-[400px] rounded-lg h-full flex p-8">
        <div className="text-center  items-center align-middle flex-1">
          <img src={giveawayRoom.image} alt="" className="border-red border-2 mx-auto" />
        </div>
        <div className=" flex-1 flex-column p-3 relative">
          <div className="align-middle">
            <h3 className=" text-xl font-bold text-orange">{giveawayRoom.name}</h3>
            <p className="text-orange opacity-70 text-sm">{giveawayRoom.owner}</p>
            <div className="items-center gap-2 mt-2">
              <img src="/icons/map-pin.svg" />
              <p className="text-orange text-sm">{giveawayRoom.lokasi}</p>
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, veniam? Nisi hic at veniam quam et perspiciatis ratione nostrum eum temporibus iure voluptate placeat odit nulla ullam, perferendis nam quae?</p>
          </div>
          <div className="mt-6 absolute bottom-0 mx-auto px-auto left-0 right-0 text-center">
            <button>
              <a href="#" className="inline-block text-lg px-12 py-4 rounded-xl leading-none border-orange rounded bg-white text-red hover:border-red hover:text-white hover:bg-red mt-4 lg:mt-0">
                Ikuti giveaway
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
