import React from "react";
import Colors from "./Colors";

export default class WhoAmIPlayer extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        var radius = Math.min(window.innerWidth, window.innerHeight)*.3;

        return <div className="whoAmIPlayer" style={{backgroundColor: window.turnPlayer == this.props.player?"#73D673":Colors.getTeam(this.props.player.team).color, position:"absolute", top:Math.cos(this.props.angle)*radius, left: Math.sin(this.props.angle)*radius,paddingLeft:20, paddingRight:20, display:"flex",borderRadius:100, width:"fit-content", whiteSpace:"nowrap", paddingTop:10, paddingBottom:10}}>
        {window.gameState > 3 && <div style={{backgroundColor: (this.props.player.foundWord==true?"#73D673":undefined)}} className="guessWord">
            
            <p>{this.props.player.givenName || "?"}</p>

            </div>}

                
            {this.props.player.guess != undefined && <div style={{backgroundColor:this.props.player.guessEnd == undefined?undefined:this.props.player.guessEnd == true?"#73D673":"#F85E68"}} className="guessedAnim">

                <p>{this.props.player.guess}</p>

            </div>}
        
        {this.props.player == window.ownerPlayer && <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="gold" style={{marginRight:5}} color="yellow" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/></svg>}
        <p style={{color: "white", padding:0,margin:0}}>{this.props.player.username + (window.localPlayer == this.props.player?" (Sen)":"")}</p>
        {/* <p>{this.player.name}</p> */}
    </div>
    }
}