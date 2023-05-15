from model import db, Fetch_Pokemon, Player, PlayerPokemon, Pokemon, Comment

# fetch_pokemons


def create_fetch_pokemon(abilities, base_experience, forms, game_indices, height, held_items, is_default, location_area_encounters, moves, name, order, past_types, species, sprites, stats, types, weight):
    fetch_pokemon = Fetch_Pokemon(
        abilities=abilities, base_experience=base_experience, forms=forms, game_indices=game_indices, height=height, held_items=held_items, is_default=is_default,
        location_area_encounters=location_area_encounters, moves=moves, name=name, order=order, past_types=past_types, species=species, sprites=sprites, stats=stats, types=types, weight=weight)
    return fetch_pokemon


def get_fetch_pokemon_by_id(kind_id):
    return Fetch_Pokemon.query.get(kind_id)


def get_fetch_pokemon():
    return Fetch_Pokemon.query.all()

# players


def create_player(email, password, username):
    player = Player(email=email, password=password, username=username)
    return player


def get_players():
    return Player.query.all()


def get_player_by_email(email):
    return Player.query.filter(Player.email == email).first()


def get_player_by_id(player_id):
    return Player.query.get(player_id)

# Pokemons

# C


def create_pokemon(nickname, kind_id):
    pokemon = Pokemon(nickname=nickname, kind_id=kind_id)
    return pokemon

# R


def get_pokemons_by_user_id(player_id):
    # find the player
    player = Player.query.get(player_id)
    # return list of pokemons
    # print(player.pokemons)
    return player.pokemons


def get_pokemon_by_pokemon_id(pokemon_id):
    pokemon = Pokemon.query.get(pokemon_id)
    return pokemon


def get_nickname_by_pokemon_id(pokemon_id):
    pokemon = Pokemon.query.get(pokemon_id)
    return pokemon.nickname

# U


def update_pokemon_by_pokemon_id(pokemon_id, new_nickname):
    pokemon = get_pokemon_by_pokemon_id(pokemon_id)
    pokemon.nickname = new_nickname
    db.session.commit()
    return True
# Delete a pokemon


def delete_pokemon_by_pokemon_id(pokemon_id):
    pokemon = Pokemon.query.get(pokemon_id)
    db.session.delete(pokemon)
    db.session.commit()
    return True

# Comment


def create_comment(player, pokemon, content):
    comment = Comment(player=player, pokemon=pokemon, content=content)
    return comment


def get_comment_by_pokemon_id(pokemon_id):
    return Comment.query.filter(Comment.pokemon_id == pokemon_id).all()

# Login


def player_login(email, password):
    return Player.query.filter(Player.email == email, Player.password == password).first()
