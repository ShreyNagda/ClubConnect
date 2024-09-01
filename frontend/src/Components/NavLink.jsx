import { Link } from "react-router-dom";

function NavLink(props) {
  return (
    <Link
      to={props.to}
      onClick={props.onClick}
      className={`py-2 px-5 rounded-md ${
        props.selected == true ? "bg-[#000000]" : "bg-transparent"
      }`}
    >
      {props.text}
    </Link>
  );
}
export default NavLink;
