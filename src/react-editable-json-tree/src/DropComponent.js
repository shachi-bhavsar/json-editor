
import React from 'react';

export default class DropComponent extends React.Component {
    
    onKeyPress(e){
        e.preventDefault();
    }

    render(){
        
        return(
            <div>                
                <input style={{backgroundColor:"yellow"}} onKeyPress={this.onKeyPress}/>
            </div>
        )
    }
}