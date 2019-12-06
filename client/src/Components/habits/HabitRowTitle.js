import React, { useEffect, useState } from "react";
import HabitRowControl from "./HabitRowControl";
import moment from "moment";
import classNames from "classnames";

export default function HabitRow({ title }) {
  const getDates = () => {
    const allDates = [];

    for (let i = 0; i < 30; i++) {
      allDates.push(moment().subtract(i, "days"));
    }
    return allDates;
  };

  const [habitDateData, setHabitDateData] = useState(getDates());

  const containerStyle = {
    backgroundColor: "#414F61",
    color: "#fff",
    fontWeight: "300",
    fontSize: "12px",
    height: "1.5rem"
  };

  const dateRowStyle = {
    display: "flex",
    flexDirection: "row-reverse",
    overflow: "hidden",
    height: "100%",
    alignItems: "center"
  };

  const rowStyle = {
    display: "flex",
    height: "100%",
    alignItems: "center"
  };

  const spanStyle = {
    display: "inline-block",
    minWidth: "1.2rem",
    margin: "0 0.5rem 0 0.5rem",
    overflow: "hidden",
    textAlign: "center"
  };

  return (
    <div className="row" style={containerStyle}>
      <div className="col" style={rowStyle}>
        <span>{title}</span>
      </div>
      <div className="col-8" style={dateRowStyle}>
        {habitDateData.map(date => (
          <span style={spanStyle}>{date.format("DD")}</span>
        ))}
      </div>
    </div>
  );
}
