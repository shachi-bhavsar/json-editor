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
      <div style={{backgroundColor : 'black'}}>
        <div style={{float:'left',width:"50%",backgroundColor:"#85DAB9"}}>            
            <JsonTree data={jsonData}
              readOnly={true}
              isCollapsed = {(keyPath, deep) => (deep !== 0)}
            />
        </div>
        <div style={{float:'right',width:"45%",backgroundColor:'#CEF7E4'}}>
            <JsonTree data={this.state.data}  
                  onFullyUpdate={this.onFullyUpdate} 
            />
        </div>
      </div>
    );
  }
}

export default App;
