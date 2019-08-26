import './App.css';
import {Component} from "react";
import * as React from "react";
import EmployeeOverview from "./employees/EmployeeOverview";

interface Article {
  title: string
}

interface AppProps {
  articles: Article[]
}


class App extends Component<{},AppProps> {

  constructor(props: AppProps) {
    super(props);
    this.state = { articles: [] };
  }


  componentDidMount() {

    fetch('/article')
        .then(response => response.json())
        .then(data => this.setState({ articles: data._embedded.article }));
  }


  render() {


    return (
        <div className="App">
          <ul>
            {this.state.articles.map(article => <li>{article.title}</li>)}
          </ul>
          <EmployeeOverview/>
        </div>
    );

  }
}

export default App;
