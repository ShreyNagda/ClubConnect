function CarouselItem(props) {
  return (
    <div className={props.className + " aspect-video"}>
      <div>
        <img
          src={props.item.image}
          className="md:h-[500px] lg:h-[80%] h-[100%] aspect-video object-cover"
        />
      </div>
    </div>
  );
}
export default CarouselItem;
