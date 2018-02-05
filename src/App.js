import React, { Component } from 'react';
import data from './data.js';
import Drag from './Drag';
import jsondata from './data.json'
import {JsonTree} from 'react-editable-json-tree'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.data,
    }
    this.onFullyUpdate = this.onFullyUpdate.bind(this);
  }

  onFullyUpdate(data) {

    let updatedData = JSON.stringify(data);
      this.setState({
          data : updatedData,
      });
      console.log(updatedData);
  }

  render() {
    return (
      <div style={{backgroundColor : 'black'}}>
        <div style={{float:'left',width:"50%",backgroundColor:"#85DAB9"}}>
            <Drag data ={data}/>
        </div>
        <div style={{float:'right',width:"45%",backgroundColor:'#CEF7E4'}}>
            <JsonTree data={data}  
                  onFullyUpdate={this.onFullyUpdate} 
                  readOnly={(name, value, keyPath) => (keyPath[keyPath.length - 1] === 'id')}
                />
        </div>
      </div>
    );
  }
}

export default App;
