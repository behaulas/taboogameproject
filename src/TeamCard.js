import React from "react";
import Colors from "./Colors";

export default class TeamCard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const teamSettings = Colors.getTeam(this.props.team)

        return <div className={"teamCard "+(this.props.team.id%2==0?"right":"left")}>
            <div className={"scoreDisplay "+(this.props.team.id%2==0?"right":"left")} style={{backgroundColor:teamSettings.color}}><p>{this.props.team.score}</p></div>
            
            <p style={{fontSize:25, color:"white", fontWeight:"900", marginBottom:0, marginTop:0, color:teamSettings.color}}>{teamSettings.name}</p>

            <div style={{display:"flex", flex:1, gap: 10,flexDirection:"column",width:"100%", marginTop:20,marginBottom:20}}>
            {this.props.children}
            </div>
            
            
         
            {(window.localPlayer == undefined || window.localPlayer.team != this.props.team) && window.gameState < 3 && <button style={{backgroundColor:teamSettings.color}} onClick={() => this.props.onJoinClicked()}>Katıl</button>}

            
        </div>
    }
}