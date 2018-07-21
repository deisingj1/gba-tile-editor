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
		this.state.color = Array(64).fill("#FFFFFF");
		this.handleChange = this.handleChange.bind(this);
		this.handlePaletteChange = this.handlePaletteChange.bind(this);
		this.state.palette = [ [255,0,0], [0,255,0], [0,0,255],[255,255,255], [0,0,0], [255,255,0]]; 
	}
	handleChange(event){
		var name = event.target.name;
		var value = event.target.value;
		this.setState((prevState) => {
			prevState.color[name] = prevState.palette[value];
			return prevState;
		});
		console.log(name + " " + value);
	}
	setPalette(index,color,value) {
		this.setState((prevState) => {
			prevState.palette[index][color] = value;
			return prevState;
		});
	}
	handlePaletteChange(event) {
		var color = event.target.attributes.color.value;
		var value = event.target.value;
		var index = event.target.name;
		console.dir(event.target);
		console.log(value);
		console.log(index);
		console.log(color);
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

export default App;
