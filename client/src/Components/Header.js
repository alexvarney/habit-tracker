import React from "react";
import { connect } from "react-redux";
import { logout } from "../Store/Actions/auth";
import { Link } from "react-router-dom";

function Header(props) {
  
  const navStyle = {
    backgroundColor: '#414F61',
    color: "#fff",
    
  }

  return (

    <nav className="navbar" style={navStyle}>
      <span className="navbar-brand mb-0 h1"><Link to="/">HabitTracker</Link></span>

      {props.auth.loggedIn && props.auth.user ? (
        <div className="userInfo">
          <Link to={"/user"}>{props.auth.user.name}</Link>

          {props.auth.user.role === "admin" && (
            <>
              <Link style={{ marginLeft: "1rem" }} to={"/admin"}>
                Admin
              </Link>
            </>
          )}

          <a
            style={{ marginLeft: "1rem" }}
            href="#"
            onClick={() => props.logout(props.auth.token)}
          >
            Logout
          </a>
        </div>
      ) : <Link to={'/user'}>Login</Link>}
    </nav>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
