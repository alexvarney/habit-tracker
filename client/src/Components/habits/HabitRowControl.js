import React from "react";
import tinycolor from "tinycolor2";
import { connect } from "react-redux";
import axios from "axios";

function HabitRowControl({ auth, habit, onUpdate }) {
  
  const updateHabit = () => {

    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };

    axios.patch(`/api/habits/${habit._id}`, {}, config)
        .then(res => onUpdate())
        .catch(err => console.log(err))

  }

  const textColor = `${tinycolor(habit.color)
    .darken(70)
    .toHexString()}`;

  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "2rem",
    background: habit.color,
    color: textColor,
    display: "flex",
    alignItems: "center",
    padding: "0.25rem",
    justifyContent: "space-between"
  };

  const actionButtonTextStyle = {
    fontWeight: "300",
    fontSize: "10px",
    lineHeight: "14px",
    color: textColor
  };

  const actionButtonContainerStyle = {
    ...actionButtonTextStyle,
    flex: "0 0 40%",
    minWidth: '5rem',
    height: "100%",
    borderLeft: "0.5px solid rgba(0, 0, 0, 0.21)",
    padding: "0.25rem",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  };

  const nameContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  };

  return (
    <div style={containerStyle}>
      <div className="name" style={nameContainerStyle}>
        <span>{habit.name}</span>
      </div>
      <div className="actionButtons" style={actionButtonContainerStyle}>
        <button onClick={updateHabit} style={actionButtonTextStyle} className="btn btn-link">
          {habit.requiresUpdate ? "complete" : "break"}
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(HabitRowControl);
