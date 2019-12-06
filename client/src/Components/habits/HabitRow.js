import React, { useEffect, useState } from "react";
import HabitRowControl from "./HabitRowControl";
import moment from "moment";
import cn from "classnames/bind";
import styles from "./HabitRow.module.css";
import HabitRowDisplayButton from "./HabitRowDisplayButton";

const classNames = cn.bind(styles)


export default function HabitRow(props) {
  const { habit, onUpdate } = props;

  const getOccurrences = () => {
    const allDates = [];

    for (let i = 0; i < 30; i++) {
      allDates.push(moment().subtract(i, "days"));
    }

    const habitDates = habit.occurrences.map(date => moment(date));

    return allDates.map(date => {
      let matchFound = false;

      for (let habitDate of habitDates) {
        if (date.isSame(habitDate, "day")) {
          matchFound = true;
        }
      }

      return { date, matchFound };
    });
  };

  const [habitDateData, setHabitDateData] = useState([]);

  useEffect(() => {
    setHabitDateData(getOccurrences());
  }, [habit]);

  const spanStyle = {
    padding: "0.25rem",
    color: "lightgrey"
  };

  const activeStyle = {
    ...spanStyle,
    color: habit.requiresUpdate ? "green" : "red"
  };

  const boxShadowStyle = {
    float: "right",
    height: "100%"
  };

  return (
    <div className="row habitRow">
      <div className="col-4" style={{padding: 0}}>
        <HabitRowControl key={habit._id} habit={habit} onUpdate={onUpdate} />
        <div style={boxShadowStyle} />
      </div>
      <div className={classNames({"col-8": true, dateRow: true})}>
        {habitDateData.map(obj => (
          <HabitRowDisplayButton habitDateObject={obj} habit={habit} />
        ))}
      </div>
    </div>
  );
}
