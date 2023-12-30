import React from "react";


export default class GamemodeButton extends React.Component {


    constructor(props) {
        super(props)
    }

    render() {
        return <button onClick={() => this.props.onClick()} className="gameMode">
            
            <p>{this.props.gameMode.title}</p>
            <p>{this.props.gameMode.desc}</p>
        </button>
    }
}