import { Link } from "react-router-dom";

function NavLink(props) {
  return (
    <Link to={props.to} onClick={props.onClick()}>
      {props.text}
    </Link>
  );
}
export default NavLink;
