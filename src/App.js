import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=PNNAo56BqMP30bfAhhdgwO8zjgclbjq34JAwtYEA&date=2020-03-16`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }



  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <h1>Rnq</h1>
        <img src={this.state.data.url} />
      </div>
    );
  }
}

export default App;
