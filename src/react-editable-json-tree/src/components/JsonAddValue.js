/*
/* ************************************* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import parse from '../utils/parse';
import DropComponent from '../DropComponent'
/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    onlyValue: PropTypes.bool,
    addButtonElement: PropTypes.element,
    cancelButtonElement: PropTypes.element,
    inputElement: PropTypes.element,
};

// Default props
const defaultProps = {
    
    onlyValue: false,
    addButtonElement: <button>+</button>,
    cancelButtonElement: <button>c</button>,
    inputElement: <DropComponent/>,
};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class JsonAddValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputRefKey: null,
            inputRefValue: null,
        };
        // Bind
        this.refInputValue = this.refInputValue.bind(this);
        this.refInputKey = this.refInputKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { inputRefKey, inputRefValue } = this.state;
        const { onlyValue } = this.props;

        if (inputRefKey && (typeof inputRefKey.focus === 'function')) {
            inputRefKey.focus();
        }

        if (onlyValue && inputRefValue && (typeof inputRefValue.focus === 'function')) {
            inputRefValue.focus();
        }
    }

    onSubmit() {
        const { handleAdd, onlyValue } = this.props;
        const { inputRefKey, inputRefValue } = this.state;
        let forParse
        for(let key in inputRefValue.refs) {
            forParse = inputRefValue.refs[key].value;
        }
        const result = {
            newValue: parse(forParse),
        };
        // Check if we have the key
        if (!onlyValue) {
            // Check that there is a key
            if (!inputRefKey.value) {
                // Empty key => Not authorized
                return;
            }

            result.key = inputRefKey.value;
        }
        handleAdd(result);
    }

    refInputKey(node) {
        this.setState({
            inputRefKey: node,
        });
    }

    refInputValue(node) {
        //console.log(node)
        this.setState({
            inputRefValue: node,
        });
    }
    render() {
        const { handleCancel, onlyValue, addButtonElement, cancelButtonElement, inputElement } = this.props;

        let addButtonElementLayout = null;
        let cancelButtonElementLayout = null;
        let inputElementValueLayout = null;
        let inputElementKeyLayout = null;
        let separatorElement = null;
        if(onlyValue)
        {
            addButtonElementLayout = React.cloneElement(addButtonElement, {
                onClick: this.onSubmit,
            });
            cancelButtonElementLayout = React.cloneElement(cancelButtonElement, {
                onClick: handleCancel,
            });
            inputElementValueLayout = React.cloneElement(inputElement, {
                placeholder: 'Value',
                ref: this.refInputValue,
            });
            
        }
      
        const handlers = {
            esc: handleCancel,
            enter: this.onSubmit,
        };
        
        return (<HotKeys className="rejt-add-value-node" component={'span'} handlers={handlers}>
            {inputElementKeyLayout} {separatorElement} {inputElementValueLayout} {cancelButtonElementLayout}
            {addButtonElementLayout}
        </HotKeys>);
    }
}

// Add prop types
JsonAddValue.propTypes = propTypes;
// Add default props
JsonAddValue.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default JsonAddValue;
