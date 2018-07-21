import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Editor />
		  <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload, or don't I don't care.
        </p>
      </div>
    );
  }
}
class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.color = Array(64).fill("0");
		this.state.map = [];
		this.handleChange = this.handleChange.bind(this);
		this.handlePaletteChange = this.handlePaletteChange.bind(this);
		this.state.palette = []; 
	}
	handleChange(event){
		var name = event.target.name;
		var value = event.target.value;
		this.setState((prevState) => {
			if(typeof prevState.palette[value] == 'undefined') {
				prevState.palette[value] = [];
			}
			prevState.map[name] = value;
			prevState.color[name] = prevState.palette[value];
			return prevState;
		});
	}
	setPalette(index,color,value) {
		this.setState((prevState) => {
			if(typeof prevState.palette[index] == 'undefined') {
				prevState.palette[index] = [];
			}
			prevState.palette[index][color] = value * 8;
			return prevState;
		});
	}
	handlePaletteChange(event) {
		var color = event.target.attributes.color.value;
		var value = event.target.value;
		var index = event.target.name;
		this.setPalette(index,color,value);
	}
	createElements = () => {
		let elements = []
		for(let i = 0; i < 64; i++) {
			elements.push(<PixelBox onChange={this.handleChange} pixel={i} key={i}/>);
		}
		return elements;
	}
	render() {
		return (
		<div>
			<div class="Editor-box">
				{this.createElements()}
			</div>
			<div style={{ display: 'inline-block'}}>
				<Preview color={this.state.color}/>
			</div>
			<div>
				<br /> 
				<br />
				<Palette paletteHandler={this.handlePaletteChange} />
			</div>
			<div>
				<br />
				<br />
				<CodeGen map={this.state.map} palette={this.state.palette} />
			</div>
		</div>
		);
	}
}
class PixelBox extends Component {
	render() {
		return (
			<input name={this.props.pixel} onChange={this.props.onChange} type="text" />
		);
	}
}

class Preview extends Component {
	createElements = (color) => {
		let elements = []
		for(let i = 0; i < 64; i++) {
			elements.push(<PreviewBox key={i} bgcolor={color[i]} />);
		}
		return elements;
	}
	render() {
		return (
		<div class="Preview-box">
			{this.createElements(this.props.color)}
		</div>
		);
	}
}

class PreviewBox extends Component {
	render() {
		var styles = {
			backgroundColor: `rgb(${this.props.bgcolor})`
		}
		return (
			<div style={styles} />
		);
	}
}

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			palettes: [],
			paletteLen: 0
		};
		this.clickHandler = this.clickHandler.bind(this);
//		this.props.paletteHandler = this.props.paletteHandler.bind(this);
	}
	clickHandler() {
		this.setState((prevState) => {
			prevState.palettes = prevState.palettes.concat(<PaletteEditBox changeHandler={this.props.paletteHandler} paletteNum={prevState.paletteLen} key={prevState.paletteLen} />);
			prevState.paletteLen++;
			return prevState;
		});
	}
	render() {
		return (
			<div class="palettes">
				{this.state.palettes}
				<button onClick={this.clickHandler}>Add</button>
			</div>
		);
	}
}

class PaletteEditBox extends Component {
	render() {
		return (
			<div class="palette-edit-box">
				<strong>{this.props.paletteNum}: </strong>
				R:<input class="text-box-sm" onChange={this.props.changeHandler} name={this.props.paletteNum} color="0" size="4" maxLength="4" type="text" />
				G:<input class="text-box-sm" onChange={this.props.changeHandler} name={this.props.paletteNum} color="1" size="4" maxLength="4" type="text" />
				B:<input class="text-box-sm" onChange={this.props.changeHandler} name={this.props.paletteNum} color="2" size="4" maxLength="4" type="text" />
			</div>
		)
	}
}

class CodeGen extends Component {
	generateCode(palette,map) {
		var codeString = "0x";
		for(var i = 0; i < map.length; i +=4) {
			var reverseNibble = map.slice(i,i+4).reverse().join("");
			codeString += reverseNibble;
			codeString += ", 0x";
		}
		return codeString;
	}
	render() {
		return (
			<div>
				<textarea value={this.generateCode(this.props.palette,this.props.map)} />
			</div>
		)
	}
}

export default App;
