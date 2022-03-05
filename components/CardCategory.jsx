export default function CardCategory(props) {
  return (
    <div className="hover:scale-125">
      <div className="min-w-[100px] rounded-lg bg-[#FFFF] border-2 border-red p-3">
        <img src={props.src} alt={props.name} className="object-cover w-20 rounded-t-lg" />
        <p className="p-2 text-center text-red">{props.title}</p>
      </div>
    </div>
  );
}
