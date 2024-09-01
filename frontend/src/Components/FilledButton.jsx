function FilledButton(props) {
  return (
    <button
      className="text-[#000000] bg-white px-5 py-2 rounded-md"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
export default FilledButton;
