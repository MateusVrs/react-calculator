import React from "react";

function Button(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class ButtonBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }

    this.numbersArray = Array.from(Array(10).keys()).slice(1, 10).reverse();
    this.someSignals = ['/', '*', '-'];

    this.onToDoChange = this.onToDoChange.bind(this);
    this.onToAddChar = this.onToAddChar.bind(this);
  }

  onToDoChange(value) {
    this.setState({
      inputValue: value
    });
  }

  onToAddChar(value) {
    this.setState((prevState) => ({
      inputValue: prevState.inputValue + value
    }));
  }

  doCalculation() {
    // using 'eval' just to focus on React
    const value = document.getElementById("calculation-text").value;
    const result = eval(value);
    this.onToDoChange(result);
  }

  render() {
    const btn_numbers = [];
    for (let index = 0; index < 3; index++) {
      btn_numbers.push(
        <div key={index} className="btn-row">
          {
            this.numbersArray.slice(index * 3, index * 3 + 3).reverse().map(
              (value) => <Button key={value} value={value} onClick={(e) => this.onToAddChar(e.target.innerText)} />)
          }
          <Button value={this.someSignals[index]} onClick={(e) => this.onToAddChar(e.target.innerText)} />
        </div>
      );
    }

    return (
      <div className="btn-container">
        <section className="input-container">
          <input id="calculation-text" type="text" value={this.state.inputValue} onChange={(e) => this.onToDoChange(e.target.value)} />
        </section>
        {btn_numbers}
        <div className="btn-row">
          <Button value={0} />
          <Button value={'='} onClick={() => this.doCalculation()}/>
          <Button value={'+'} onClick={(e) => this.onToAddChar(e.target.innerText)}/>
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calculator">
        <ButtonBox />
      </div>
    );
  }
}

export default Calculator;
