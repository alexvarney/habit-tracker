import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import { connect } from "react-redux";

import HabitRow from "./HabitRow";
import HabitRowTitle from "./HabitRowTitle";
import AddHabit from "./AddHabit";

function HabitDisplay(props) {
  const { auth } = props;

  const [habits, setHabits] = useState([]);

  const updateHabits = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };
    axios
      .get("/api/habits/", config)
      .then(res => {
        setHabits(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (auth.loggedIn && auth.token) {
      updateHabits();
    } else {
      setHabits([]);
    }
  }, [auth.loggedIn, auth.token]);

  if(!auth.loggedIn){
    return <p>You must <Link style={{textDecoration: 'underline'}} to="/user">Login</Link> to view this page.</p>
  }

  return (
    <>
      <div
        className="container-fluid"
        style={{
          marginTop: "1rem",
          boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.125)"
        }}
      >
        <HabitRowTitle title={"Daily Habits"} />
        {habits.map(habit => (
          <HabitRow key={habit._id} habit={habit} onUpdate={updateHabits} />
        ))}
      </div>
      <AddHabit onUpdate={updateHabits} />
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(HabitDisplay);
