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
      date: new Date()
    };
  }

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=PNNAo56BqMP30bfAhhdgwO8zjgclbjq34JAwtYEA`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  changeImage = (date) => {
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
        <h1>Date must be between Jun 16, 1995 and Jun 17, 2020.</h1>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <img src={this.state.data.url} width="512px"/>
      </div>
    );
  }
}

export default App;
