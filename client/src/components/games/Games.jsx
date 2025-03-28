
import GameCatalog from './GameCatalogItem';
import { useGmaes } from '../../api/gameApi';

export default function Games() {
  const {games} = useGmaes();

    return (
        <section id="catalog-page">
        <h1>All Games</h1>

      {games.length > 0
      ? games.map(game => <GameCatalog key={game._id} {...game} />)
     : <h3 className="no-articles">No articles yet</h3>}
    </section>
    );
}