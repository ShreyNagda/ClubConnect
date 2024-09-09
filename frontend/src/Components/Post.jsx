function Post(props) {
  return (
    <div className="p-5 bg-[#fff] rounded-md">
      <img src={props.src} alt="" className="aspect-square object-cover" />
      <p className="text-black text-2xl mt-2">{props.text}</p>
    </div>
  );
}

export { Post };
