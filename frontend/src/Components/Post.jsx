function Post(props) {
  return (
    <div>
      <img src={props.src} alt="" className="aspect-square object-cover" />
      <p>{props.text}</p>
    </div>
  );
}

export { Post };
