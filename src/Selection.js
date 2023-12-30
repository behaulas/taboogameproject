import React from "react";


export default class Selection extends React.Component {


    constructor(props) {
        super(props);
    }



    render() {
        return <div className="selectionParent">
            
            <p>{this.props.title}</p>
            
            <div className="selectionDiv">

                {this.props.selections.map((x, i) => <button disabled={window.localPlayer != window.ownerPlayer} onClick={() => this.props.onClick(i)} className={i == this.props.selected?"settingSelected":""} key={i}>{x}</button>)}

        </div>

        </div>
    }
}