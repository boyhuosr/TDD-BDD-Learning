import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.hanldeInputKeyUp = this.hanldeInputKeyUp.bind(this)
        this.state={
            value: ''
        }
    }

    handleInputChange(e){
        this.setState({
            value: e.target.value
        })
    }

    hanldeInputKeyUp(e){
        const {value} = this.state
        if(e.keyCode === 13 && value) {
            this.props.addUndoItem(value)
        }
    }

    render() {
        const {value} = this.state
        return (
            <div className="header">
                <div className="header-content">
                    TodoList
                    <input data-test='input' 
                        placeholder="To do"
                        className="header-input"
                        value={value} 
                        onChange={this.handleInputChange}
                        onKeyUp = {this.hanldeInputKeyUp}
                    />
                </div>
                
            </div>
        )
    }
}

export default Header;
