function PlayerList() {
    //check if isLogin
    const isLogin = document.getElementById("username");
    const [players, setPlayers] = React.useState([]);
    const [battleMode, setBattleMode] = React.useState("")


    React.useEffect(() => {
        fetch(`/battle_players_json?battle_mode=${battleMode}`)
            .then(response => response.json())
            .then(data => {
                setPlayers(data.players);
            });
    }, []);

    function PlayerInfo(props) {
        const pokemonList = []
        const hasEnoughPokemon = props.player.pokemons.length >= battleMode;

        for (let pokemon of props.player.pokemons) {
            pokemonList.push(<div className="col-4" key={pokemon.pokemon_id}>
                <img src={pokemon.img} style={{ maxWidth: "50%", height: "auto", maxHeight: "100px" }} />
                <div>{pokemon.nickname}</div>
                <div>LV:{pokemon.level}</div>
            </div>)
        }
        return <div className="row border rounded">
            <div className="col-3 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <img className="img-fluid" src={props.player.img} style={{ maxHeight: "100px", width: "auto" }} />
                    <div>Username: {props.player.username}</div>
                    <div>Winning Rate: {props.player.winning_rate.win}/{props.player.winning_rate.lose}</div>
                    <form action="/battle" method="GET">
                        <input type="hidden" name="player_id" value={props.player.player_id} />
                        <input type="hidden" name="battle_mode" value={battleMode} />
                        {isLogin && battleMode && <button className="btn btn-primary btn-sm" type="submit" disabled={!hasEnoughPokemon}>Let's battle</button>}
                    </form><div>Joined since: {new Date(props.player.created_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}</div>
                </div>
            </div>
            <div className="col-9 text-center">
                Pokemons
                <div className="row">
                    {pokemonList}
                </div>
            </div>
        </div >
            ;
    }

    const playeList = []
    for (let player of players) {
        playeList.push(<PlayerInfo player={player} key={player.player_id} />)
    }

    const handleBattleMode = (evt, battleMode) => {
        evt.preventDefault();
        const playerPokeCnt = document.getElementById("userInfo").children[4].innerHTML.split(":")[1].trim();
        if (playerPokeCnt < battleMode) {
            alert("You don't have enough Pokemons to battle");
            evt.target.disabled = true;
        }
        else {
            setBattleMode(battleMode);
        }
    }

    return (
        <React.Fragment>
            <h1>Battle instruction:</h1>
            <div>First, make sure you have at least One Pokémon.</div>
            <div>Next, select the number of Pokemons you want to engage in.</div>
            <div>Finally, choose the player you want to battle against.</div>
            {isLogin && (<div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary mx-2" onClick={(evt) =>
                    handleBattleMode(evt, 1)}>1v1</button>
                <button className="btn btn-primary mx-2" onClick={(evt) => handleBattleMode(evt, 2)}>2v2</button>
                <button className="btn btn-primary mx-2" onClick={(evt) => handleBattleMode(evt, 3)}>3v3</button>
            </div>)}
            <div>{playeList}</div>
        </React.Fragment>
    );
}

ReactDOM.render(<PlayerList />, document.getElementById('playerList'));
