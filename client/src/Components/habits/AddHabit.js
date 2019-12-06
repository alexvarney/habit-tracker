import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

function AddHabit({ auth, onUpdate }) {
  const addRowTitleStyle = {
    backgroundColor: "#414F61",
    color: "#fff",
    fontWeight: "300",
    fontSize: "12px",
    height: "1.5rem",
    display: "flex",
    alignItems: "center",
    paddingLeft: "1rem"
  };

  const [formValues, _setFormValues] = useState({
    name: "",
    color: "#E2D2A2",
    requiresUpdate: true
  });

  const setFormValues = e => {
    e.persist();

    let updatedValue = e.target.value;

    if(e.target.name === 'color'){
      updatedValue = (e.target.value.startsWith('#')) ? e.target.value : '#' + e.target.value
    }
    _setFormValues(prevState=>({
      ...prevState,
      [e.target.name]: updatedValue,
    }))

  }

  const postHabit = (e) => {

    e.preventDefault()

    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };

    axios.post('/api/habits/', formValues, config)
      .then(res => onUpdate())
      .catch(err => console.log(err))

  }

  return (
    <div
      className="container-fluid"
      style={{
        margin: "1rem 0 0 0",
        boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.125)",
        background: '#F7F7F7'
      }}
    >
      <div className="row" style={addRowTitleStyle}>
        <span>Add Habit</span>
      </div>
      <form onSubmit={postHabit} className="row addForm">
        <div className="col-sm">
          <label>name</label>
          <input name="name" type="text" value={formValues.name} onChange={setFormValues}/>
        </div>
        <div className="col-sm-2">
          <label>outcome</label>
          <select value={formValues.requiresUpdate} onChange={setFormValues} name="requiresUpdate">
            <option value={true}>Maintain</option>
            <option value={false}>Break</option>
          </select>
        </div>
        <div className="col-sm-2">
          <label>color</label>
          <input name="color" value={formValues.color} onChange={setFormValues} type="text" />
        </div>
        <div className="col-sm-3" style={{display: 'flex', alignItems: 'flex-end',}}>
          <button className="btn btn-sm btn-secondary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(AddHabit);
