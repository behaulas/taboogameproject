import logo from './logo.svg';
import './App.css';
import './WhoAmI.css';
import "./Emoji.css";
import React from 'react';
import { DominoSpinner } from 'react-spinners-kit';
import TeamCard from './TeamCard';
import PlayerCard from './PlayerCard';
import ReactConfetti from 'react-confetti';
import Selection from './Selection';
import GamemodeButton from './GamemodeButton';
import GameModes from './GameModes';
import WhoAmIPlayer from './WhoAmIPlayer';
import Colors from './Colors';

const DEV = false;

export default class App extends React.Component {


  componentDidMount() {
    
    const script = document.createElement("script");
    script.src = "PlayerIOClient.development.js";
    script.async = true;
    document.body.appendChild(script);


    // const words = require('./words.json');

    // require('./otherwords.json').forEach(word => {
    //   words.push({word: word.key, forbidden_words: [word.bannedWord1,word.bannedWord2,word.bannedWord3,word.bannedWord4,word.bannedWord5]});
    // })

    // var txt = "";

    // var wordByName = [];
    // words.forEach(w => {
    //   var s = (w.word + "," + w.forbidden_words.join(",") + "\n").replace(/I/g, "ı").replace(/İ/g, "i").replace(/Ö/g,"ö").replace(/Ç/g,"ç").replace(/Ğ/g, "ğ").replace(/Ü/g, "ü").toLowerCase().split(",");

    //   for(var i = 0; i < s.length; i++) {
    //     s[i]= s[i].charAt(0).toUpperCase() + s[i].substring(1);
    //   }

    //   var word = s[0];

    //   if(!wordByName.includes(word)) {
    //     wordByName.push(word);

    //     txt += s.join(',');
    //   }
    // })

    // console.log(txt);

    
    this.setState({username: window.localStorage.getItem("username") || ""})
  }

  constructor() {
    super();

   
    
  
    if(window.location.hash.length == 6) this.roomId = window.location.hash.substring(1);


    this.state = {username: "", gameState: 0, players: [], teams: [], gameMode: 0, writingFor: undefined, gameSettings: [0,3,0,0,0], confettiPlay: false,gameModeSelectionPopup: false, whoAmIText: "", whoAmIPrompt: false, inviteClicked: false, passAction: false, cezaAction: false, correctAction: false}
  }

  componentWillUnmount() {
    if(window.connection != undefined) window.connection.disconnect();
  }

  render() {
    var emojiIndex = 0;
    window.gameState = this.state.gameState;
  return (
    <div className='rootDiv'>
        <script src="PlayerIOClient.development.js" type='text/js' />
        <div className='gamePanel'>
          
            <div className={'loginPanel '+(this.state.gameState <= 1?"":"closedLoginPanel")}>
              <img className='icon' src={"icon.png"} />
              <div className={'basicOutline loginPrompt '+(this.state.gameState == 0?"":"popHide")}>
                <div className='basicOutlineInner'>
                  <p style={{fontSize: 20, color:"#FEF1E0"}}>Eğlenceye Katıl!</p>

                  <input value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} placeholder='Kullanıcı adı' type='text' className='nameInput' />

                  <button onClick={() => this.joinClicked()} style={{marginTop:20}}>{this.roomId!=undefined?"Lobiye Katıl":"Lobi Oluştur"}</button>


                  
                  {this.roomId != undefined && <>
                  
                    <p style={{color:"white", opacity: .5, marginTop:30}}>ya da</p>

                    <p style={{textAlign:"center", color:"white", opacity: .5, marginBottom:0}}>arkadaşlarını davet edebileceğin bir</p>
                    <button onClick={() => {
                      this.roomId = undefined;
                      window.history.pushState("", document.title, window.location.pathname + window.location.search);


                      this.joinClicked()
                    
                    }} style={{marginTop:10}}>Lobi Oluştur</button>
                  </>}
                </div>


            <div style={{height:20, marginTop:10}} className='wavesParent'>
        
        <svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio='none' viewBox="0 0 1440 320"><path fill="#1E1534" fillOpacity="1" d="M0,256L60,234.7C120,213,240,171,360,144C480,117,600,107,720,117.3C840,128,960,160,1080,149.3C1200,139,1320,85,1380,58.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>
              </div>  

            </div>
              
            
           {this.state.gameState > 0 && <div className={'dominoSpin '+(this.state.gameState == 1?" enabled":" pop-out")}>

              <p>Odaya katılınıyor..</p>
              <DominoSpinner size={120} color="#F85E68" backColor={"#9B9AD3"} />
              
              </div>}

       


        <div className={'gameContainer '+(this.state.gameState > 1?"enabled":"")}>
          {this.state.gameState > 1 && (this.state.gameMode == 0 || this.state.gameMode == 3) && <>
                
                
                <div className='teamStack stack' style={{justifyContent:"flex-end"}}>

                {this.state.teams.length == 0 && <div className='playerStack rightStack'>

                {this.state.players.filter((v,i) => i % 2 == 0).map((x, i) => <PlayerCard ffa left key={i} player={x} />)}

              </div>}

                  {this.state.teams.filter((v,i) => i % 2 == 0).map((x, i) => 

                  
                  
                  <TeamCard onJoinClicked={() => this.joinTeam(x.id)} team={x} key={i}>
                    
                    
                    {this.state.players.filter(s => s.team != undefined && s.team == x).sort((a,b) => a.date-b.date).map((x, i) => <PlayerCard key={i} player={x} />)}

                  </TeamCard>)}
                </div>

                <div className='lobbyGame stack' >
              {this.state.gameState != 5 && <p style={{color:"white", fontSize:30,fontWeight:"900", marginTop:0, marginBottom:10}}>Lobi</p>}

                  {this.state.gameState == 2 && <>
                  <div style={{display:"flex", gap:10}}>
<div className='inviteDiv'>
              <p className={'inviteP ' + (this.state.inviteClicked?"enabled":"")}>Davet linki kopyalandı!</p>
              <button onClick={() => {
                  this.setState({inviteClicked: true});


                  //
                  //navigator.clipboard.writeText("https://uko-gilt.vercel.app/#" + this.roomId)

                  
                  navigator.clipboard.writeText((window.location.origin+"/#"+this.roomId))

                  setTimeout(() => {
                    this.setState({inviteClicked: false});
                  }, 4000);
              }} className={'invite'}>Davet Et</button>


              
              
              </div>

              


              </div>

              
              <p style={{color:"white", marginTop:40, marginBottom:5, fontSize:20, whiteSpace:"pre-wrap"}}>⚙️  Oyun Ayarları  ⚙️</p>
              {/* <button onClick={() => {
                this.setState({gameModeSelectionPopup: true});
              }} className='gameModeButton'>
                  <p>Oyun Modu</p>
                  <p>Klasik</p>
              </button> */}

              <div className='gameSettings'>
                  
                  {this.state.gameMode == 0 && <>
                  <Selection onClick={(i) => this.changeGameSetting(3,i)} selected={this.state.gameSettings[3]} title={"Takım Sayısı"} selections={[2,3,4]} />
                  <Selection onClick={(i) => this.changeGameSetting(0,i)} selected={this.state.gameSettings[0]} title={"Anlatım Süresi"} selections={[30,60,90,120]} />
                  <Selection onClick={(i) => this.changeGameSetting(1,i)}  selected={this.state.gameSettings[1]} title={"Pas Hakları"} selections={[0,1,2,3,4]} />

                  </>}

                  {this.state.gameMode == 3 && <>
                    <Selection onClick={(i) => this.changeGameSetting(3,i)} selected={this.state.gameSettings[3]} title={"Takım Sayısı"} selections={[0,2,3,4]} />
                  </>}
                  <Selection onClick={(i) => this.changeGameSetting(2,i)}  selected={this.state.gameSettings[2]} title={"Hedef Puan"} selections={[10,20,30,40]} />
              </div>

              {window.localPlayer == window.ownerPlayer && <div className='ownerControls' style={{display:"flex", gap:10}}>
                {this.state.teams.length > 0 && <button onClick={() => window.connection.send("randomTeams")} className='invite '>Takımları Kar</button>}
                <button onClick={() => window.connection.send("start")} className='invite startButtonGame'>Başlat</button>
                
              </div>}


              {this.state.teams.length > 0 && <><p style={{color:"white", marginTop:40, marginBottom:5}}>İzleyiciler</p>
              <div style={{display:"flex", flexDirection:"column", gap: 10,flex:1,width:"200px"}}>
              {this.state.players.filter(s => s.team == undefined).map((x, i) => <PlayerCard key={i} player={x} />)}
              </div>
             
              
              
              </>}
              </>}


              

                <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:(this.state.gameMode == 3 && this.state.gameState == 4?"100%":250)}}>

                    {this.state.gameMode == 3 && <>


                      {this.state.gameState == 5 && <>

<p style={{color:"white", fontSize:30, textAlign:"center"}}>{(this.state.winnerPlayer.team == null?(this.state.winnerPlayer.username+" Kazandı! 🏆"):(Colors.getTeam(this.state.winnerPlayer.team).name + " Takım Kazandı! 🏆"))} </p>

<p style={{color:"white", textAlign:"center"}}>Lobiye geri dönülüyor</p>

</>}
                    
                    
                      {this.state.gameState == 4 && <div className='emojiDivParent'>
                        
                          <p className='emojiExplain'>{this.state.emoji}</p>
                        

                          <div style={{animation: (this.state.guessAnim == false?"wrong .2s":undefined)}} className='emojiInputTop'>

                            {this.state.guessAnim == true && this.state.emojiWinner != undefined && <div className='emojiWinner'>
                              <PlayerCard player={this.state.emojiWinner} />
                              </div>}

                            {this.state.emojiAnswer.split(' ').map((sent, iX) => <div className='emojiOneWord' key={iX}>

                            {sent.split('').map((x, i) => {
                            
                              

                            if(x == 'a') {

                              var myIndex = emojiIndex;
                              emojiIndex++;


                          return <input value={this.givenInputs[myIndex]} ref={(a) => {
                            
                            if(myIndex == 0 && this.inputReferences[myIndex] != a && a != null) a.focus()
                            this.inputReferences[myIndex] = a
                          
                          }} key={i} onKeyDown={(e) => {
                            if(e.key == 'Backspace' && e.target.value == '') {
                              if(myIndex > 0) 
                              setTimeout(() => {
                                for(var dst = myIndex-1;dst >= 0; dst--) {
                                
                                  if(this.givenInputs[dst] == undefined) {
                                    this.inputReferences[dst].value = '';
                                    this.inputReferences[dst].focus();
                                    break;
                                  }
                                }
                                
                                
                               
                              }, 20);
                                
                            }
                          }} onChange={e => {
                           
                            if(e.target.value == '' && myIndex > 0) {
                              this.inputReferences[myIndex-1].focus();
                            } else if(e.target.value.length > 0 && this.inputReferences[myIndex+1]) {

                              if(e.target.value.length > 1) {

                                if( this.inputReferences[myIndex+1].value.length == 0)  this.inputReferences[myIndex+1].value = e.target.value.charAt(1) + "";

                                e.target.value = e.target.value.charAt(0) + "";
                              }

                              for(var dst in this.inputReferences) {
                                if(dst > myIndex && this.inputReferences[dst].value == '') {
                                    this.inputReferences[dst].focus();
                                    break;
                                }
                              }
                              //this.inputReferences[myIndex+1].focus();


                              
                              
                            }
                            
                            if(e.target.value.length == 1) {
                              var found = false;
                              var s = "";
                              for(var i in this.inputReferences) {
                                if(i != myIndex && this.givenInputs[i] == undefined && this.inputReferences[i].value.length != 1) {
                                  found = true;
                                  break;
                                }
                                s += (this.givenInputs[i] != undefined)?this.givenInputs[i]:this.inputReferences[i].value;
                              }

                            

                              if(!found) {
                                this.setState({guessSent: true});
                                window.connection.send("guess",s);
                              }
                            }
                          }} disabled={this.state.guessAnim != undefined || this.givenInputs[myIndex] != undefined || this.state.guessSent == true} style={{backgroundColor:this.givenInputs[myIndex] != undefined?"#E8D28F":(this.state.guessAnim == true?(this.waveTimes[myIndex]?"#73D673":undefined):this.state.guessAnim == false?"#F85E68":undefined)}} className='emojiInput' />
                        }

                          return <p className='emojiInput alreadyGiven'>{x}</p>})}


                            </div>)}

                          </div>
                          <p className='emojiExplain'>{this.state.emojiAnswer}</p>
                        </div>}
                      
                      
                      
                      
                      
                    
                    
                    
                    </>}
                    {this.state.gameMode == 0 && <>
                  {this.state.gameState == 4 && <>
                  
                    <div className='timer'><p>{toHHMMSS(this.state.timer)}</p></div>
                  </>}
              {this.state.gameState > 2 && this.state.gameState < 5 && <>

<p style={{color:"white", fontSize:20}}>Anlatan</p>
<PlayerCard player={this.state.explainer} />

</>}

{this.state.gameState == 5 && this.state.gameMode == 0 && <>

<p style={{color:"white", fontSize:30, textAlign:"center"}}>{Colors.getTeam(this.state.winnerTeam).name} Takım Kazandı! 🏆</p>

<p style={{color:"white", textAlign:"center"}}>Lobiye geri dönülüyor</p>

</>}





                {this.state.gameState == 4 && <><div className='cardRoot'>
                  
                  {this.state.card != undefined && <div className='cardOpened'>
                    
                    <div className='wordContainer'>
                    <p>{this.state.card.word}</p>
                    </div>

                    <div className='forbiddenContainer'>
                    {this.state.card.forbidden.map((x, i) => <p key={i}>{x}</p>)}
                    </div>

                    <svg className='cardWave' preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F7C1A0" fill-opacity="1" d="M0,256L60,234.7C120,213,240,171,360,138.7C480,107,600,85,720,96C840,107,960,149,1080,154.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                    
                    </div>}

                  {this.state.card == undefined && <div className='cardClosed'>
                    <p>?</p>
                    
                    
                    </div>}


                    {this.state.passAction == true &&  <div className='animPass cardAnim'>
                      <p>Pas</p>
                    </div>}

                    {this.state.correctAction == true &&  <div className='animCorrect cardAnim'>
                      <p>Doğru!</p>
                    </div>}

                    {this.state.cezaAction == true && <div className='animPenalty cardAnim'>
                      <p>Ceza!</p>
                    </div>}

                  </div>

                  {this.state.explainer == window.localPlayer && <div className='cardActions'>
                    
                    
                    <button onClick={() => window.connection.send("correct")}>Doğru</button>
                    <button style={{backgroundColor:(this.state.passChances > 0?undefined:"#C8C8C7")}} disabled={this.state.passChances <= 0} onClick={() => {
                      
                      window.connection.send("pass")
                    this.setState({passChances: this.state.passChances-1});
                    }}>Pas ({this.state.passChances})</button>
                    <button onClick={() => window.connection.send("fail")}>Ceza</button>


                    
                    </div>}
                    
                    {this.state.watcher == window.localPlayer &&
                    
                    // <p className='explainFaul'>
                      
                    //   Yasaklı kelimeler kullanıldığı takdirde kullanılan harfi kart üzerinden seçerek ceza belirtebilirsin

                    //   </p>
                        <button className='faulWatcher' onClick={() => window.connection.send("fail")}>Ceza</button>
                      
                      }
                  
                  
                  </>}

{this.state.gameState == 3 && <>
<p style={{color:"white", fontSize:20}}>Gözetmen</p>
<PlayerCard player={this.state.watcher} />


{this.state.explainer != window.localPlayer && <><p style={{color:"white"}}>{this.state.explainer.username} adlı oyuncunun oyunu başlatması bekleniyor</p></>}
{this.state.explainer == window.localPlayer && <>

    <button onClick={() => window.connection.send("startRound")} style={{backgroundColor:"green", marginTop:20}}>Başlat</button>
</>}

</>}

</>}


{this.state.gameState == 3 && this.state.gameMode == 3 && <div className='turnStartingEmoji'>

  <p className=''>Tur Başlıyor!</p>
  <p className=''>Emojilerle anlatılan şeyi herkesten önce bulmaya çalış!</p>
  <span className='lyricCountdown'></span>


</div>}




</div>


              </div>

              <div className='teamStack stack'  style={{justifyContent:"flex-start"}}>

              {this.state.teams.length == 0 && <div className='playerStack leftStack'>

                {this.state.players.filter((v,i) => i % 2 == 1).map((x, i) => <PlayerCard ffa right key={i} player={x} />)}
              
              </div>}
                
              {this.state.teams.filter((v,i) => i % 2 == 1).map((x, i) => <TeamCard team={x}  onJoinClicked={() => this.joinTeam(x.id)} key={i}>
              {this.state.players.filter(s => s.team != undefined && s.team == x).sort((a,b) => a.date-b.date).map((x, i) => <PlayerCard  key={i} player={x} />)}
              </TeamCard>)}


              
              </div>
              </>}



              {this.state.gameState > 1 && this.state.gameMode == 2 && <>

                <div className='whoAmIRoot'>

                    
                    <div className='whoAmICenter'>

                          {this.state.players.sort((a,b) => b.date - a.date).map((x, i) => <WhoAmIPlayer player={x} angle={((2*Math.PI) / this.state.players.length)*i} key={i} />)}
                    </div>

                    <div className='whoAmILobby'>

                    {this.state.gameState < 3 && <><p style={{color:"white", fontSize:30,fontWeight:"900", marginTop:0, marginBottom:10}}>Lobi</p>

                    <div style={{display:"flex", gap:10}}>
<div className='inviteDiv'>
              <p className={'inviteP ' + (this.state.inviteClicked?"enabled":"")}>Davet linki kopyalandı!</p>
              <button onClick={() => {
                  this.setState({inviteClicked: true});


                  //
                  //navigator.clipboard.writeText("https://uko-gilt.vercel.app/#" + this.roomId)

                  
                  navigator.clipboard.writeText((window.location.origin+"/#"+this.roomId))

                  setTimeout(() => {
                    this.setState({inviteClicked: false});
                  }, 4000);
              }} className={'invite'}>Davet Et</button>
 </div>
 </div></>}
 </div>
              <div className='whoAmIActions'>
                    

                {this.state.gameState == 2 && <>  
              {window.localPlayer == window.ownerPlayer && <button onClick={() => window.connection.send("start")} className='startGame'>Başlat</button>}
              {window.localPlayer != window.ownerPlayer && <p style={{color:"white"}}>Lobi sahibinin oyunu başlatması bekleniyor</p>}
              </>}

              {this.state.gameState == 3 && <p style={{color:"white"}}>Bütün oyuncular bekleniyor</p>}

              {this.state.gameState == 4 && <>
              
              
                {window.localPlayer == window.turnPlayer && <div className='yourTurnDiv'>
                

                    <p className='yourTurnP'>Senin Turun!</p>
                    <p className='yourTurnDesc'>Hayır cevabı alana kadar Evet/Hayır soruları sormaya devam edebilirsin</p>
                    <button onClick={() => window.connection.send("skip")} className='skipTurn'>Turunu Geç</button>

                    <input value={this.state.guess} onChange={(e) => this.setState({guess: e.currentTarget.value})} type='text' placeholder='tahmin...' />
                    <button onClick={() => {
                      window.connection.send("guess", this.state.guess)
                      
                      this.setState({gameState: 10});
                    }} className='makeGuess'>Tahmini Gönder</button>
                
                </div>}

                {window.localPlayer != window.turnPlayer && window.turnPlayer != null && <div className='otherTurn'>
                
                  <p className='yourTurnP'>{window.turnPlayer.username} adlı oyuncunun turu!</p>
                    <p className='yourTurnDesc'>Hayır cevabını verene kadar Evet/Hayır sorularını cevapla</p>
                </div>}
              
              </>}

              {this.state.gameState == 5 && <>


                <p style={{color:"white", textAlign:"center"}}>Lobiye geri dönülüyor</p>
              </>}
              </div>
             


              
              
             

              


             
                


                </div>





              </>}








        </div>

        </div>

        <div className='wavesParent'>
        <svg xmlns="http://www.w3.org/2000/svg" style={{height: "20vh"}} preserveAspectRatio='none' viewBox="0 0 1440 320"><path fill="#9B9AD3" fillOpacity="1" d="M0,224L60,208C120,192,240,160,360,176C480,192,600,256,720,272C840,288,960,256,1080,240C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none' viewBox="0 0 1440 320"><path fill="#FFCEAE" fillOpacity="1" d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,197.3C840,181,960,107,1080,101.3C1200,96,1320,160,1380,192L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none' viewBox="0 0 1440 320" width={"100%"}><path fill="#F85E68"  fillOpacity="1" d="M0,128L40,138.7C80,149,160,171,240,160C320,149,400,107,480,122.7C560,139,640,213,720,240C800,267,880,245,960,208C1040,171,1120,117,1200,117.3C1280,117,1360,171,1400,197.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        
        </div>

        <button onClick={() => {
          this.roomId = undefined;
          window.history.pushState("", document.title, window.location.pathname + window.location.search);

          if(window.connection != undefined) {
            window.connection.disconnect();
            window.connection = undefined;
          }

          this.setState({gameState: 0});
          
        }} className='backArrow' disabled={this.state.gameState <= 0}><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>
        
        
        <div className={'gamemodesPopup '+(this.state.gameModeSelectionPopup?"enabled":"")}>

          <div className='gamemodeList'>
            <p className='gamemodeHeader'>Bir Oyun Modu Seç</p>
            <svg onClick={() => {
              this.setState({gameModeSelectionPopup: false});
            }} className='gamemodeListClose' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            <div className='gamemodeParent'>

              {GameModes.map((x, i) => <GamemodeButton onClick={() => this.selectedGameMode(i)}  key={i} gameMode={x} />)}
              
            </div>
          </div>
        </div>


        <div className={'gamemodesPopup '+(this.state.whoAmIPrompt?"enabled":"")}>

          <div className='gamemodeList' style={{display:"flex", alignItems:"center", flexDirection:"column", height:"fit-content", paddingBottom:30}}>
            <p className='gamemodeHeader'>{this.state.writingFor?.username} oyuncusu için bir kişi gir</p>
            
            <input value={this.state.whoAmIText} onChange={(e) => this.setState({whoAmIText: e.target.value})} placeholder='Beha Ulaş Karakişi' type='text' className='nameInput whoAmIInput' />
            <button style={{width:200, marginTop:20}} onClick={() => {

              this.setState({whoAmIPrompt: false, gameState: 3});
              window.connection.send("givenName", this.state.whoAmIText);
            
            }} className='startGame'>Gönder</button>
          </div>
        </div>

        
        {((this.state.gameState == 5 && window.localPlayer.team == this.state.winnerTeam) || this.state.confettiPlay) && <ReactConfetti />}
     
    </div>
  );
  }

  selectedGameMode(i) 
  {
    this.setState({gameModeSelectionPopup: false});

    this.attemptJoin(GameModes[i].roomName, i == 2);

  }

  callbacksForNormal() {

    window.connection.addMessageCallback("join", (message) => {

      this.state.players.push(new Player(message.getInt(0),message.getString(1), undefined, 0));
      this.forceUpdate();
    });
    window.connection.addMessageCallback("newTeams", (message) => {

      this.state.teams = [];
      var currIndx = 0;

      
      var teamCount = message.getInt(currIndx);
      currIndx++;
      for(var i = 0; i < teamCount; i++) {
        var team = new Team(message.getInt(currIndx), message.getInt(currIndx+1));
        currIndx += 2;
        this.state.teams.push(team);
      }

      this.state.players.forEach(player => {
        if(player.team != null) player.team = this.state.teams.find(s => s.id == player.team.id);
      })

      this.forceUpdate();
    });

    window.connection.addMessageCallback("changeSettings", (message) => {
        this.state.gameSettings[message.getInt(0)] = message.getInt(1);
        this.forceUpdate();
    });


    window.connection.addMessageCallback("reset", (message) => {
      this.state.teams.forEach(s => s.score = 0);
    
        this.setState({gameState: 2, card: undefined, explainer: undefined, watcher: undefined, winnerTeam: undefined});
    });

    window.connection.addMessageCallback("correct", (message) => {
      this.state.explainer.team.score = message.getInt(0);
      if(this.state.explainer != window.localPlayer) 
        {
          if(this.state.correctAction) {
            this.setState({correctAction: false});
            clearTimeout(this.oldCorrectTimeout);
            setTimeout(() => {
              this.setState({correctAction: true});
            }, 10);
          } else {
          this.setState({correctAction: true});
          }
          this.oldCorrectTimeout = setTimeout(() => {
            this.setState({correctAction: false})
          }, 1300);
        } else {
          this.forceUpdate();
        }
    });


    window.connection.addMessageCallback("pass", (message) => {
      if(this.state.explainer != window.localPlayer) 
        {
          if(this.state.passAction) {
            this.setState({passAction: false});
            clearTimeout(this.oldPassTimeout);

            setTimeout(() => {
              this.setState({passAction: true});
            }, 10);
          } else {
          this.setState({passAction: true});
          }
          this.oldPassTimeout = setTimeout(() => {
            this.setState({passAction: false})
          }, 1300);
        }
    });



    window.connection.addMessageCallback("fail", (message) => {
      this.state.explainer.team.score = message.getInt(0);
      if(this.state.explainer != window.localPlayer || message.getBoolean(1)) 
        {
          if(this.state.cezaAction) {
            this.setState({cezaAction: false});
            clearTimeout(this.oldCezaTimeout);
            setTimeout(() => {
              this.setState({cezaAction: true});
            }, 10);
          } else {
            this.setState({cezaAction: true});
          }
          this.oldCezaTimeout = setTimeout(() => {
            this.setState({cezaAction: false})
          }, 1300);
        } else {
          this.forceUpdate();
        }
    });
    window.connection.addMessageCallback("card", (message) => {
      this.setState({card: {
        word: message.getString(0),
        forbidden: [message.getString(1),message.getString(2),message.getString(3),message.getString(4),message.getString(5)]
      }})
    });
    window.connection.addMessageCallback("startRound", (message) => {
      
      this.setState({gameState: 4,timer: message.getInt(0), passChances: message.getInt(1)});

      this.timerInterval = setInterval(() => {
        this.setState({timer: this.state.timer-1});
        if(this.state.timer <= 0) clearInterval(this.timerInterval);
      }, 1000);
    });

    window.connection.addMessageCallback("endGame", (message) => {
      this.setState({gameState: 5,winnerTeam: this.state.teams.find(s => s.id == message.getInt(0))});
    });


    window.connection.addMessageCallback("turnStart", (message) => {

      this.setState({gameState: 3,card: undefined, explainer: this.state.players.find(s => s.id == message.getInt(0)), watcher: this.state.players.find(s => s.id == message.getInt(1))})
    });

    window.connection.addMessageCallback("team", (message) => {

      var player = this.state.players.find(s => s.id == message.getInt(0));
      if(player != null) {
        player.team = this.state.teams.find(s => s.id == message.getInt(1));
        player.date = message.getLong(2);
        this.forceUpdate();

        
      }
    });
  }


  callbacksForEmoji() {

    window.connection.addMessageCallback("join", (message) => {

      this.state.players.push(new Player(message.getInt(0),message.getString(1), undefined, 0));
      this.forceUpdate();
    });
    window.connection.addMessageCallback("newTeams", (message) => {

      this.state.teams = [];
      var currIndx = 0;

      
      var teamCount = message.getInt(currIndx);
      currIndx++;
      for(var i = 0; i < teamCount; i++) {
        var team = new Team(message.getInt(currIndx), message.getInt(currIndx+1));
        currIndx += 2;
        this.state.teams.push(team);
      }

      this.state.players.forEach(player => {
        if(player.team != null) player.team = this.state.teams.find(s => s.id == player.team.id);
      })

      this.forceUpdate();
    });

    window.connection.addMessageCallback("changeSettings", (message) => {
        this.state.gameSettings[message.getInt(0)] = message.getInt(1);
        this.forceUpdate();
    });


    window.connection.addMessageCallback("reset", (message) => {
      this.state.teams.forEach(s => s.score = 0);
      this.state.players.forEach(s => s.score = 0);
        this.setState({gameState: 2, card: undefined,confettiPlay: false, explainer: undefined, watcher: undefined, winnerTeam: undefined, emojiWinner: undefined});
    });

    
    window.connection.addMessageCallback("nextRoundStart", (message) => {
      this.setState({gameState: 3, confettiPlay: false});
    });

    window.connection.addMessageCallback("keyAns", (message) => {

      this.givenInputs[message.getInt(0)] = message.getString(1);
      this.forceUpdate();
    });

    window.connection.addMessageCallback("nextRound", (message) => {
      this.inputReferences = {};
      this.givenInputs = {};
      this.setState({gameState: 4,emoji: message.getString(0), emojiAnswer: message.getString(1), guessSent: false, guessAnim: undefined, emojiWinner: undefined});
    });

    window.connection.addMessageCallback("guess", (message) => {
      if(message.getBoolean(0)) {
        this.waveTimes = [];
        var lengthPer = 800/Object.keys(this.inputReferences).length;
        for(var i in this.inputReferences) {

          const thisIndx = i;
          setTimeout(() => {
           
            this.waveTimes[thisIndx] = true;
            this.inputReferences[thisIndx].value = message.getString(1).charAt(thisIndx);
            this.forceUpdate();


          }, (i*lengthPer));
        }
        var player = this.state.players.find(s => s.id == message.getInt(2));
        if(player.team != null) player.team.score = message.getInt(3);
        else player.score = message.getInt(3);

        this.setState({emojiWinner: player, confettiPlay: (player == window.localPlayer || (window.localPlayer.team != undefined && window.localPlayer.team == player.team))})
      }
      this.setState({guessAnim: message.getBoolean(0), guessSent: false});

      if(!message.getBoolean(0)) {
      setTimeout(() => {
        for(var key in this.inputReferences) {
          if(this.givenInputs[key] == undefined)
          this.inputReferences[key].value = "";
        }
        this.setState({guessAnim: undefined});
      },300);
    }
    });

    window.connection.addMessageCallback("endGame", (message) => {
      this.setState({gameState: 5,winnerPlayer: this.state.players.find(s => s.id == message.getInt(0))});
    });


    window.connection.addMessageCallback("turnStart", (message) => {

      this.setState({gameState: 3,card: undefined, explainer: this.state.players.find(s => s.id == message.getInt(0)), watcher: this.state.players.find(s => s.id == message.getInt(1))})
    });

    window.connection.addMessageCallback("team", (message) => {

      var player = this.state.players.find(s => s.id == message.getInt(0));
      if(player != null) {
        player.team = this.state.teams.find(s => s.id == message.getInt(1));
        player.date = message.getLong(2);
        this.forceUpdate();

        
      }
    });
  }

  callbacksForWhoAmI() {
    window.connection.addMessageCallback("guess", (message) => {

        var player = this.state.players.find(s => s.id == message.getInt(0));
        player.guess = message.getString(1);
        player.guessEnd = undefined;

        setTimeout(() => {
          player.guess = undefined;
          player.guessEnd = undefined;

          this.forceUpdate();
        }, 5000);

        this.forceUpdate();

    });


    window.connection.addMessageCallback("reset", (message) => {
      var currIndex = 0;
      for(var i = 0; i < this.state.players.length; i++) {
        var player = this.state.players.find(s => s.id == message.getInt(currIndex));
        player.date = message.getLong(currIndex+1);
        player.foundWord = undefined;

        currIndex += 2;
      }
      window.turnPlayer = undefined;

        this.setState({gameState: 2});
    });


    window.connection.addMessageCallback("guessEnd", (message) => {

      var player = this.state.players.find(s => s.id == message.getInt(0));
      player.guessEnd = message.getBoolean(1);

      if(player == window.localPlayer && player.guessEnd == true) {
        this.state.confettiPlay = true;

        setTimeout(() => {
          this.setState({confettiPlay: false});
        }, 15000);
      }

      if(player.guessEnd == true) {
        player.foundWord = true;
      }

      this.forceUpdate();

  });


  window.connection.addMessageCallback("returningToLobby", (message) => {
    this.setState({gameState: 5})

  });


    

    window.connection.addMessageCallback("join", (message) => {

      this.state.players.push(new Player(message.getInt(0),message.getString(1), undefined, message.getLong(2)));
      this.forceUpdate();
    });


    window.connection.addMessageCallback("nextTurn", (message) => {
        window.turnPlayer = this.state.players.find(s => s.id == message.getInt(0));
        this.setState({guess: "", gameState: 4});
    });

    window.connection.addMessageCallback("gameStart", (message) => {

      window.localPlayer.givenName = undefined;
      var indx = 0;
      for(var i = 0; i < this.state.players.length-1; i++) {
        this.state.players.find(s => s.id == message.getInt(indx)).givenName = message.getString(indx+1);

        indx += 2;
      }

      window.turnPlayer = undefined;
      this.setState({gameState: 4});
    })

    window.connection.addMessageCallback("start", () => {
      var writingForPlayer;
      var minPlayer;

      this.state.players.forEach((s) => {
        if(s == window.localPlayer) return;

        if(window.localPlayer.date < s.date && (writingForPlayer == null || writingForPlayer.date > s.date)) {
          writingForPlayer = s;
        }

        if(minPlayer == null || minPlayer.date > s.date) minPlayer = s;
      })

      if(writingForPlayer == null) writingForPlayer = minPlayer;

      if(writingForPlayer == null) writingForPlayer = window.localPlayer;
      
    
      this.setState({whoAmIPrompt: true, whoAmIText: "", writingFor: writingForPlayer});
    })
  }

  
  attemptJoin(mode, traitor) {
    var username = this.state.username;
      window.localStorage.setItem("username", username);
      this.setState({gameState: 1});
      var id = parseInt(Math.random()*10000);

      if(!DEV)
        window.PlayerIO.useSecureApiRequests= true;
      window.PlayerIO.authenticate(
        'taboogame-bn2r4fht7eqxoyquhhzgg',    //Game id
        'public',                       //Connection id
        { userId: id },           //Authentication arguments
        { },            //Optional PlayerInsight segments
        (client) => {

          if(!this.roomId) this.roomId = makeid(5);

          if(!DEV) {
            client.multiplayer.useSecureConnections = true;
           
          } else {
            client.multiplayer.developmentServer = "192.168.1.34:8184";
          }
          client.multiplayer.createJoinRoom(this.roomId, mode || 'normal', false, {lang: "TR", traitor}, {username}, (connection) => {

            window.connection = connection;


            

            

            connection.addMessageCallback("setOwner", (message) => {

              window.ownerPlayer = this.state.players.find(s => s.id == message.getInt(0));
              this.forceUpdate();
            });

            connection.addMessageCallback("left", (message) => {

              var player = this.state.players.findIndex(s => s.id == message.getInt(0));

              if(player != -1) {
                this.state.players.splice(player, 1);
                this.forceUpdate();
              }
             
            });

            


            connection.addMessageCallback("onJoinEmoji", (message) => {

              this.callbacksForEmoji();
              //When we receive a message, log it to the console:
              this.state.players = [];
              this.state.teams = [];

              var currIndx = 0;

              
              var teamCount = message.getInt(currIndx);
              currIndx++;
              for(var i = 0; i < teamCount; i++) {
                var team = new Team(message.getInt(currIndx), message.getInt(currIndx+1));
                currIndx += 2;
                this.state.teams.push(team);
              }

              

              var playerCount = message.getInt(currIndx);
              currIndx++;

              for(var i = 0; i < playerCount; i++) {
                console.log(message.getInt(currIndx+2));
                var player = new Player(message.getInt(currIndx), message.getString(currIndx+1), this.state.teams.find(s => s.id == message.getInt(currIndx+2)), message.getLong(currIndx+3));
                player.score = 0;
                currIndx += 4;


                if(i == playerCount-1) window.localPlayer = player;

                
                this.state.players.push(player);
              } 

              window.ownerPlayer = this.state.players.find(s => s.id == message.getInt(currIndx))
              currIndx++;


              for(var i = 0; i < this.state.gameSettings; i++) {
                this.state.gameSettings[i] = message.getInt(currIndx);
                currIndx++;
              }

             



              this.setState({gameState: 2, gameMode: 3});

              
            });

           
            
            connection.addMessageCallback("onJoinNormal", (message) => {

              this.callbacksForNormal();
              //When we receive a message, log it to the console:
              this.state.players = [];
              this.state.teams = [];

              var currIndx = 0;

              
              var teamCount = message.getInt(currIndx);
              currIndx++;
              for(var i = 0; i < teamCount; i++) {
                var team = new Team(message.getInt(currIndx), message.getInt(currIndx+1));
                currIndx += 2;
                this.state.teams.push(team);
              }

              

              var playerCount = message.getInt(currIndx);
              currIndx++;

              for(var i = 0; i < playerCount; i++) {
                console.log(message.getInt(currIndx+2));
                var player = new Player(message.getInt(currIndx), message.getString(currIndx+1), this.state.teams.find(s => s.id == message.getInt(currIndx+2)), message.getLong(currIndx+3));
                currIndx += 4;


                if(i == playerCount-1) window.localPlayer = player;

                
                this.state.players.push(player);
              } 

              window.ownerPlayer = this.state.players.find(s => s.id == message.getInt(currIndx))
              currIndx++;


              for(var i = 0; i < this.state.gameSettings; i++) {
                this.state.gameSettings[i] = message.getInt(currIndx);
                currIndx++;
              }

             



              this.setState({gameState: 2, gameMode: 0});

              
            });




            connection.addMessageCallback("onJoinWhoAmI", (message) => {

              this.callbacksForWhoAmI();
              //When we receive a message, log it to the console:
              this.state.players = [];

              var currIndx = 0;

              
              

              var playerCount = message.getInt(currIndx);
              currIndx++;

              for(var i = 0; i < playerCount; i++) {
               
                var player = new Player(message.getInt(currIndx), message.getString(currIndx+1),undefined, message.getLong(currIndx+2));
                currIndx += 3;


                if(i == playerCount-1) window.localPlayer = player;

                
                this.state.players.push(player);
              } 

              window.ownerPlayer = this.state.players.find(s => s.id == message.getInt(currIndx))
              currIndx++;


              

             



              this.setState({gameState: 2, gameMode: 2});

              
            });


            //Setup a disconnect handler:
            connection.addDisconnectCallback(function(){
                console.log("disconnected from room");  
            });
            console.log("Room successfully joined");

          }, (error) => {
            console.log(error);
          })
         
            //Success!
            //You can now use the client object to make API calls.
        },
        function(error) {
            console.log(error);
        }
    );
  }



  joinClicked() {

    if(this.roomId != null) {
      this.attemptJoin(null);
                    

    } else {
      this.setState({gameModeSelectionPopup: true});
    }
      
  }
  


  changeGameSetting(id, setting) {
    
    this.state.gameSettings[id] = setting;
    this.forceUpdate();
    
    window.connection.send("changeSettings",id, setting);
  }

  joinTeam(id) {
    window.connection.send("team", id);
  }
}


var toHHMMSS = (secs) => {
  if(secs <= 0) return "00:00";

  var sec_num = parseInt(secs, 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}

class Team {
  constructor(id, score) {
    this.id = id;
    this.score = score;
  }
}

class Player {
  constructor(id, username, team, date) {
    this.id = id;
    this.username = username;
    this.team = team;
    this.date = date;
  }
}


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
