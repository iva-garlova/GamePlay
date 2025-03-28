import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import gameServise from "../../services/gameServise";
import { Link } from "react-router";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-add/CommentsCreate";
import commentServise from "../../services/commentServise";
import { UserContext } from "../../contexts/UserContext";
import { useGame } from "../../api/gameApi";

export default function GamesDetails() {
    
    const navigate = useNavigate();
    const {email} = useContext(UserContext)
    const [comments, setComments] = useState([]);
    const { gameId} = useParams();
    const {game} = useGame(gameId);

    useEffect(() =>{
           commentServise.getAll(gameId)
           .then(setComments)
        

    }, [gameId]);

    const gameDeleteClickHandler = async() => {
        const isConfirmed = confirm(`Are you sure you want to delete ${game.title} game?`);

        if(!isConfirmed) {
            return;
        }
        await gameServise.delete(gameId);

        navigate('/games');

    };
    const commentCreateHandler = (newComment)=> {
        setComments(state => [...state, newComment])
    }

    return (
        <section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">

            <div className="game-header">
                <img className="game-img" src={game.imageUrl}/>
                <h1>{game.title}</h1>
                <span className="levels">MaxLevel: {game.maxLevel}</span>
                <p className="type">{game.category}</p>
            </div>

            <p className="text">
                {game.summary}
            </p>
            <CommentsShow comments={comments}/>

            {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
            <div className="buttons">
                <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                <button 
                  onClick={gameDeleteClickHandler}
                  className="button"
                >
                  Delete
                </button>
            </div>
        </div>
        <CommentsCreate 
        email={email} 
        gameId={gameId}
        onCreate={commentCreateHandler}
        />
    </section>
    );
}