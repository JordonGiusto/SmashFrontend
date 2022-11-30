const Characters = {
    "Character": 0,
    "MARIO" : 1,
    "DONKEY_KONG" : 2,
    "LINK" : 3,
    "SAMUS" : 4,
    "DARK_SAMUS" : 5,
    "YOSHI" : 6,
    "KIRBY" : 7,
    "FOX" : 8,
    "PIKACHU" : 9,
    "LUIGI" : 10,
    "NESS" : 11,
    "CAPTAIN" : 12,
    "FALCON" : 13,
    "JIGGLYPUFF" : 14,
    "PEACH" : 15,
    "DAISY" : 16,
    "BOWSER" : 17,
    "ICE_CLIMBERS" : 18,
    "SHEIK" : 19,
    "ZELDA" : 20,
    "DR._MARIO" : 21,
    "PICHU" : 22,
    "FALCO" : 23,
    "MARTH" : 24,
    "LUCINA" : 25,
    "YOUNG_LINK" : 26,
    "GANONDORF" : 27,
    "MEWTWO" : 28,
    "ROY" : 29,
    "CHROM" : 30,
    "MR._GAME_&_WATCH" : 31,
    "META_KNIGHT" : 32,
    "PIT" : 33,
    "DARK_PIT" : 34,
    "ZERO_SUIT_SAMUS" : 35,
    "WARIO" : 36,
    "SNAKE" : 37,
    "IKE" : 38,
    "POKÉMON_TRAINER" : 39,
    "DIDDY_KONG" : 40,
    "LUCAS" : 41,
    "SONIC" : 42,
    "KING_DEDEDE" : 43,
    "OLIMAR" : 44,
    "LUCARIO" : 45,
    "R.O.B." : 46,
    "TOON_LINK" : 47,
    "WOLF" : 48,
    "VILLAGER" : 49,
    "MEGA_MAN" : 50,
    "Wii_Fit_TRAINER" : 51,
    "ROSALINA_&_LUMA" : 52,
    "LITTLE_MAC" : 53,
    "GRENINJA" : 54,
    "MII_BRAWLER" : 55,
    "MII_SWORDFIGHTER" : 56,
    "MII_GUNNER" : 57,
    "PALUTENA" : 58,
    "PAC-MAN" : 59,
    "ROBIN" : 60,
    "SHULK" : 61,
    "BOWSER_JR." : 62,
    "DUCK_HUNT_DUO" : 63,
    "RYU" : 64,
    "KEN" : 65,
    "CLOUD" : 66,
    "CORRIN" : 67,
    "BAYONETTA" : 68,
    "INKLING" : 69,
    "RIDLEY" : 70,
    "SIMON" : 71,
    "RICHTER" : 72,
    "KING_K._ROOL" : 73,
    "ISABELLE" : 74,
    "INCINEROAR" : 75,
    "PIRANHA_PLANT" : 76,
    "JOKER" : 77,
    "HERO" : 78,
    "BANJO_&_KAZOOIE" : 79,
    "TERRY" : 80,
    "BYLETH" : 81,
    "MIN_MIN" : 82,
    "STEVE" : 83,
    "SEPHIROTH" : 84,
    "PYRA/MYTHRA" : 85,
    "KAZUYA" : 86,
    "SORA" : 87,
    "MII_BRAWLER" : 88,
    "MII_SWORDFIGHTER" : 89,
    "MII_GUNNER" : 90,
}
let Players = []

async function getPlayersFromServer(setPlayers){
    Players = await fetch('http://34.125.211.66/api/player',{
        method: 'GET',
        mode: 'cors'
        })
        .then((response) => response.json())
        .then((data) => data.players)
        .then((players)=>players.sort(
            (a,b)=>{
                return b[2] - a[2] 
            }
        ))
        .catch(
            ()=>{
                return [
                    [6,'jordon',999,null],
                    [6,'cole',900,null],
                ]
            }
        )
    //Players.unshift([0, 'None',0])
    
    setPlayers(Players)

    console.log(Players.map((player)=>[player[0],player[1],player[2]]))
}

export {Characters, Players, getPlayersFromServer}