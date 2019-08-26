import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
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

            </div>
        );

    }
}

export default App;
