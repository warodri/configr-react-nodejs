import React, { Component } from 'react';

export class DisplayData extends Component {
    render() {
        return (
            <div>
                { this.props.data.path ? 'Data Uploaded.' : '' }
            </div>
        );    
    }
}

export default DisplayData;