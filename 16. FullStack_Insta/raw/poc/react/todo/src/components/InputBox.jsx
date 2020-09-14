// imrc
import React, { Component } from 'react';
class InputBox extends Component {
    state = {
        cValue: ""
    }
    setValue = (e) => {
        //  
        let input = e.currentTarget;
        this.setState({ cValue: input.value })
    }

    submitTask = () => {
        // class props
        this.props.addTask(this.state.cValue);
        this.setState({ cValue: "" })

    }
    render() {
        return (<div>
            <input type="text" value={this.state.cValue} onChange={this.setValue} />
            <button onClick={this.submitTask}>Add </button>
        </div>);
    }
}

export default InputBox;