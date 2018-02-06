import React,{Component} from 'react';

export default class Drag extends React.Component {
    
    list (data){
        const child = (items) => {
            if(items){
                return <ul node={items}> {this.list(items)} </ul>
            }
        }
        return data.map((node) => {
            if(node){                
                return <Item key={node.id} name ={node.name} {...this.props} node={node}>
                {child(node.items)}
                </Item>
            }
            else
                return <span></span>
        })
    }
    
    render(){
       
        return(
            <div>
                    <div>
                        {this.list(this.props.data)}
                    </div>
            </div>
        )
    }
}

class Item extends Component {
    constructor(){
        super();
        this.state = {
            expanded : false,
            name : "+",
        }
    }
    display (){
        if(this.state.expanded)
        {
            this.setState({
                expanded: !this.state.expanded,
                name: "+"
            }); 
        }
        else
        {
            this.setState({
                expanded: !this.state.expanded,
                name: "-"
            });
        }      
    }
    getExpandedText(props){
        if(this.state.expanded)
            return <span>{this.props.children}</span>;
        else
            return null;
    }

    onDragStart = (e,v) => {
        e.dataTransfer.dropEffect = "move";  
        e.dataTransfer.setData("text/plain",JSON.stringify(v));     
        console.log(v)
    }

    render (){
      var expandedDiv = this.getExpandedText(this.props.children);
      return (<div>
            <div style={{backgroundColor : '#DAD985'}}>
            <li draggable="true" onDragStart={(e) => {this.onDragStart (e,this.props.node)}}>           
                <button onClick={this.display.bind(this)}>{this.state.name} </button>
                <b>{this.props.name}<hr/>{ expandedDiv }</b>
            </li>
            </div>
        </div>)
    }
}
