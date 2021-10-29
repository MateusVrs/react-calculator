import React from "react";

function Button(props) {
  return (
    <button className="btn" onClick={(e) => props.onClick(e.target.innerText)}>
      {props.value}
    </button>
  );
}

function InputItem(props) {
  return (
    <section className="input-container">
      <input id="calculation-text" type="text" value={props.insertValue} onChange={(e) => props.onChange(e.target.value)} />
    </section>
  );
}

class ButtonBox extends React.Component {
  constructor(props) {
    super(props);
    this.numbersArray = props.numbersArray;
    this.signalsArray = props.signalsArray;
    this.addChar = props.addChar;
    this.doCalculation = props.doCalculation;
  }

  render() {
    const btn_numbers = [];

    for (let index = 0; index < 7; index = index + 3) {
      btn_numbers.push(
        <div key={index / 3} className="btn-row">
          {this.numbersArray.slice(index, index + 3).reverse().map(
            (value) => <Button key={value} value={value} onClick={this.addChar} />)
          }
          <Button value={this.signalsArray[index / 3]} onClick={this.addChar} />
        </div>
      );
    }

    return (
      <div className="btn-container">
        {btn_numbers}
        <div className="btn-row">
          <Button value={0} onClick={this.addChar} />
          <Button value={this.signalsArray[4]} onClick={this.doCalculation} />
          <Button value={this.signalsArray[3]} onClick={this.addChar} />
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.numbersArray = Array.from(Array(10).keys()).slice(1, 10).reverse();
    this.signalsArray = ['/', '*', '-', '+', '='];

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
    const value = this.state.inputValue;

    return (
      <div className="calculator">
        <InputItem insertValue={value} onChange={this.onToDoChange} />
        <ButtonBox signalsArray={this.signalsArray} numbersArray={this.numbersArray} addChar={this.onToAddChar} doCalculation={() => this.doCalculation()} />
      </div>
    );
  }
}

export default Calculator;
