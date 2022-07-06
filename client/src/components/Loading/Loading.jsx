import React, { Component } from 'react'
import './Loading.css'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="LoadingContainer">
                <div className="load-row">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }
}

export default Loading