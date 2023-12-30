export default {
    Background: "#1E1534",
    Red: "#F85E68",
    Yellow: "#FFCEAE",
    Blue: "#9B9AD3",
    Bright: "#FCE5DB",
    TeamBlue: "#263787",
    getTeam(team) {
        return team == undefined?teams[0]:teams[team.id]
    },
    
}

var teams = [
    {
        name: "İzleyiciler",
        color: "#251a41"
    },
    {
        name: "Kırmızı Takım",
        color: "#F7665E"
    },
    {
        name: "Mavi Takım",
        color: "#6188A0"
    },
    {
        name: "Yeşil Takım",
        color: "#73D673"
    }, 
    {
        name: "Pembe Takım",
        color: "#F699BE"
    }
];