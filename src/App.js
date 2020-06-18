import React, { Component } from "react";
import ReactDOM from "react-dom";
import Calendar from 'react-calendar';
import './App.css';
import 'react-calendar/dist/Calendar.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      date: new Date(localStorage.getItem('rememberDate'))
    };
  }

  componentDidMount() {
    // localStorage.clear();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=PNNAo56BqMP30bfAhhdgwO8zjgclbjq34JAwtYEA`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  changeImage = (date) => {
    localStorage.setItem('rememberDate', date);
    let y = (date.getFullYear()).toString();
    let m = (date.getMonth() + 1).toString();
    let d = (date.getDate()).toString();
    m = (m.length) === 1 ? '0' + m : m;
    d = (d.length) === 1 ? '0' + d : d;
    let formatted_date = y + '-' + m + '-' + d;
    fetch(`https://api.nasa.gov/planetary/apod?api_key=PNNAo56BqMP30bfAhhdgwO8zjgclbjq34JAwtYEA&date=${formatted_date}`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  onChange = date => {
    this.changeImage(date);
  };

  render() {
    return (
      <div className="app">
      <div>
        <h2>
          Picture of the day:
        </h2>
        <img src={this.state.data.url} width="512px"/>
      </div>
      <div>
        <h2>
          Choose a date:
        </h2>
        <p>
          Date must be between Jun 16, 1995 and Jun 17, 2020.
        </p>
        <Calendar
          onChange={this.onChange}
          value={this.state.date < new Date(1995, 1, 1) ? new Date(1995, 2, 1) : this.state.date}
        />
      </div>
      </div>
    );
  }
}

export default App;
