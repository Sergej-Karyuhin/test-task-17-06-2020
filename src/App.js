import React, { Component } from "react";
import Calendar from 'react-calendar';
import './App.css';
import 'react-calendar/dist/Calendar.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      date: new Date(localStorage.getItem('rememberDate')),
      urls: []
    };
  }

  componentDidMount() {
    // localStorage.clear();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=PNNAo56BqMP30bfAhhdgwO8zjgclbjq34JAwtYEA`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    const PROMISES = [];

    function createPromise(date) {
      if (date.length === 1) {date = '0' + date};
      let promise = new Promise((resolve, reject) => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=PNNAo56BqMP30bfAhhdgwO8zjgclbjq34JAwtYEA&date=2017-01-${date}`)
          .then(res => res.json())
          .then(json => {
            if (!json.url.includes('youtube')) {
              resolve(json.url);
            }
            else {
              resolve('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png');
            }
          });
      });
      return promise;
    }

    for (let i = 1; i < 30; i++) { // Days of the month
      PROMISES.push(createPromise(i));
    }

    Promise.all(PROMISES).then(result => {
      this.setState({urls: result});
    });
  }

  changeImage = (date) => {
    localStorage.setItem('rememberDate', date);
    let y = (date.getFullYear()).toString();
    let m = (date.getMonth() + 1).toString();
    let d = (date.getDate()).toString();
    m = (m.length === 1) ? '0' + m : m;
    d = (d.length === 1) ? '0' + d : d;
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
      <div className="wrapper">

      <section className="section-1">
        <div>
          <h2>Picture of the day:</h2>
          <img src={this.state.data.url} width="512px" alt="NASA"/>
        </div>
        <div>
          <h2>Choose a date:</h2>
          <p>Date must be between Jun 16, 1995 and Jun 17, 2020.</p>
          <Calendar
            onChange={this.onChange}
            value={(this.state.date < new Date(1995, 1, 1)) ? new Date(1995, 2, 1) : this.state.date}
            locale="En"
          />
        </div>
      </section>

      <section className="section-2">
        <div className="pictures">
          <h2>Pictures of January 2017:</h2>
          {
            this.state.urls.map((item, index) => {
              return (
                <a href={item} target="_blank" rel="noopener noreferrer" key={index}>
                  <img src={item} width="100px" height="100px" alt="NASA" className="pictures__imgs"></img>
                </a>
              )
            })
          }
        </div>
        <div className="contacts">
          <h2>Call me =)</h2>
          <h2>+375 25 608-78-17</h2>
          <h2>Sergej Karyuhin</h2>
        </div>
      </section>

      </div>
    );
  }
}

export default App;
