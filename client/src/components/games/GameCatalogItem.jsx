import { Link } from 'react-router'
 export default function GameCatalog({
    _id,
    title,
    category,
    imageUrl,
}) {
    return (
        <div className="allGames">
        <div className="allGames-info">
        {imageUrl ? (
                    <img src={imageUrl} alt={title} />
                ) : (
                    <p>No image available</p>
                )}                 
             <h6>{category}</h6>
             <h2>{title}</h2>
             <Link to={`/games/${_id}/details`} className="details-button">Details</Link>
         </div>
     </div>
    );
}