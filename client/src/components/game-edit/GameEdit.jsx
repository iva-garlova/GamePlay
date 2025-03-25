import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import gameServise from "../../services/gameServise";

export default function GameEdit() {

    const navigate = useNavigate();
    const {gameId} = useParams();
    const [game, setGame] = useState({});

    useEffect(() =>{
     gameServise.getOne(gameId)
     .then(setGame)
    }, [gameId]);

    const formAction = async(formData) => {
        const gameData = Object.fromEntries(formData);
        await gameServise.edit(gameId, gameData);

        navigate(`/games/${gameId}/details`)

    }

    return (
        <section id="edit-page" className="auth">
        <form id="edit" action={formAction}>
            <div className="container">

                <h1>Edit Game</h1>
                <label htmlfor="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" defaultValue={game.title}/>

                <label htmlfor="category">Category:</label>
                <input type="text" id="category" name="category" defaultValue={game.category}/>

                <label htmlfor="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue={game.maxLevel}/>

                <label htmlfor="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" defaultValue={game.imageUrl}/>

                <label htmlfor="summary">Summary:</label>
                <textarea name="summary" id="summary" defaultValue={game.summary}></textarea>
                <input className="btn submit" type="submit" defaultValue="Edit Game"/>

            </div>
        </form>
    </section>
    );
}