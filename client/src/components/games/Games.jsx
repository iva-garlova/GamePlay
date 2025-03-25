import {useEffect, useState} from 'react';
import gameServise from '../../services/gameServise';
import GameCatalog from './GameCatalogItem';

export default function Games() {
    const [games, setGames] = useState([]);

    useEffect(()=> {
        gameServise.getAll()
        .then(result => {
            setGames(result);
             });
    }, []);

    console.log(games);
    
    return (
        <section id="catalog-page">
        <h1>All Games</h1>

      {games.length > 0
      ? games.map(game => <GameCatalog key={game._id} {...game} />)
     : <h3 className="no-articles">No articles yet</h3>}
    </section>
    );
}