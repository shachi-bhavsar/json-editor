
import React from 'react';
export default class DropComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            container : []
        }
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onDrop = e => {
        //const data = e.dataTransfer.getData("text/json")
        var data = e.dataTransfer.getData("text/plain");
        let {container} = this.state;
        container.push(data);
        this.setState({container});
        console.log("state: "+this.state.container);
    }  

    allowDrop = ev => {
        ev.preventDefault();
    }

    onKeyPress(e){
        if(e.type === 'mousedown')
        {
            console.log("mouse used");
            return;
        }
        if(e.type === 'keypress')
        {
            e.preventDefault();
            return;
        }
    }
    render(){
        return(               
                <input onChange={this.onKeyPress} value={this.state.container} ref={this.state.container} onDragOver={this.allowDrop} onDrop={this.onDrop}/>
        )
    }
}
