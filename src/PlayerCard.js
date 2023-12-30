import React from "react";
import Colors from "./Colors";

export default class PlayerCard extends React.Component {
    constructor(props) {
        super(props);

        console.log("asdasd");
    }


    render() {
       
        return <div className={this.props.ffa != undefined?("playerFFA " + (this.props.left?"leftStack":"")):""} style={{width:"100%", backgroundColor: Colors.getTeam(this.props.player.team).color, justifyContent:"center", display:"flex",borderRadius:100, paddingTop:10, paddingBottom:10}}>
            
            
            {/* {this.props.ffa != undefined && <div className={"scoreDisplay "+(this.props.player.id%2==0?"right":"left")} style={{backgroundColor:"red"}}><p>{this.props.player.score || "0"}asd</p></div>} */}
            {this.props.ffa && <div className="ffaScore">
                <p>{this.props.player.score}</p>
            </div>}

            <div style={{display:"flex", flex:1, justifyContent:"center", alignItems:"center"}}>


            {this.props.player == window.ownerPlayer && <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="gold" style={{marginRight:5}} color="yellow" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/></svg>}
            <p style={{color: "white", padding:0,margin:0}}>{this.props.player.username + (window.localPlayer == this.props.player?" (Sen)":"")}</p>
            {/* <p>{this.player.name}</p> */}

            </div>
        </div>
    }
}