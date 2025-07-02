import React, { Component, ChangeEvent, FormEvent } from 'react';
import { calculateResult, SumResult } from './utils';
import './App.css';

interface AppState {
  value: string;
  userInput: number[];
  result: SumResult[];
  error: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: '',
      userInput: [],
      result: [],
      error: 'Write something',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    this.setState({ value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>): void {
    const { value } = this.state;
    const { input, result, error } = calculateResult(value);
    this.setState({ userInput: input, result, error: error || '' });
    event.preventDefault();
  }

  render() {
    const { userInput, result, error } = this.state;
    return (
      <div className="App">
        <form className="App-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          { !error &&
            <p>
              <span>Result for input '{userInput}' is [{result.map((item) => JSON.stringify(item)).join(',')}]</span>
            </p>
          }
          { error &&
            <p className="App-error">
              {error}
            </p>
          }
        </form>
      </div>
    );
  }
}

export default App; 