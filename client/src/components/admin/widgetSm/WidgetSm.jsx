import "./widgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { userRequest } from "../../../../requestMethod";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users?new=true");
        setUsers(res?.data);
      } catch (error) {}
    };
    getUsers();
    // console.log(users);
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user, i) => (
          <li key={i} className="widgetSmListItem">
            <img
              src={
                user?.img ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.occupation}</span>
            </div>
            <Link
              to={"/admin/user/" + user._id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
