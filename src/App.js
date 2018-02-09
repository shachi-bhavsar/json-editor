import React, { Component } from 'react';
import data from './data.json'
import {JsonTree} from './react-editable-json-tree/src/JsonTree'
import jsonData from './masterConfig.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {data},
    };
    this.onFullyUpdate = this.onFullyUpdate.bind(this);
  }

  onFullyUpdate(data) {

    //let updatedData = JSON.stringify(data);
      this.setState({
          data : {data},
      });
      //console.log(updatedData);
  }
 
  render() {
    return (
      <div>
        <div style={{float:'left',width:"50%",backgroundColor:"black"}}>            
            <JsonTree data={jsonData}
              readOnly={true}
              isCollapsed = {(keyPath, deep) => (deep !== 0)}
            />
        </div>
        <div style={{float:'right',width:"45%",backgroundColor:'black'}}>
            <JsonTree data={this.state.data}  
                  onFullyUpdate={this.onFullyUpdate} 
                  readOnly={(name, value, keyPath) => (keyPath[keyPath.length - 1] === 'id')}
            />
        </div>
      </div>
    );
  }
}

export default App;
