import React from 'react';
import { FlexBox, withTheme, withTaskContext } from '@twilio/flex-ui';

class DataDipComponent extends React.Component {
    state = {
        dipData: null
    };

    constructor(props) {
        super(props);
        console.log('dipping', this.props);
        this.doDip({...this.props});
    }

    async doDip(task) {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                this.setState({dipData: json});
            });
    }

    render() {
        console.log(this.state.dipData, this.props.task);

        return (
            <FlexBox overflow="hidden">
                {this.state.dipData ?
                    <ul style={{"text-align": "left", "margin": "10px"}}>
                        <li>taskSid: {this.props.task.taskSid}</li>
                        <li>dipped userId: {this.state.dipData.userId}</li>

                        {Object.keys(this.props.task.attributes).map(attr => {
                           return <li>{attr}: {this.props.task.attributes[attr]}</li> 
                        })}
                    </ul>
                : ''}
            </FlexBox>
        );
    }
}

export default withTaskContext(withTheme(DataDipComponent));