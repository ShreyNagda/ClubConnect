function OutlinedButton(props) {
  return (
    <button
      className="border-2  border-white px-5 py-2 rounded-md"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
export default OutlinedButton;
