import './charInfo.scss';
import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateChar()
    },[])

    useEffect(() => {
        updateChar()
    },[charId])

    const updateChar = () => {
        if (!charId) return

        onCharLoading()
        marvelService.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const formattedPicture = (picture) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: "fill" } : null
    }

    const spinner = loading && <Spinner/>
    const errorMessage = error && <ErrorMessage/>
    const content = !(loading || error || !char) && <View char={char} onFormattingPicture={formattedPicture}/>
    const skeleton = !(loading || error || char) && <Skeleton/>

    return (
        <div className="char__info">
            {spinner}
            {errorMessage}
            {skeleton}
            {content}
        </div>
    )
}

const View = ({ char, onFormattingPicture }) => {
    const { name, description, thumbnail, wiki, homepage, comics } = char
    const comicsFilter = comics.filter((item, i) => i <= 9 && item)
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={onFormattingPicture(thumbnail)}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            {
                comics.length
                    ? <ul className="char__comics-list">
                        {comicsFilter.map((item, i) => (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    : "There is not comics with this character"
            }
        </>
    )
}

export default CharInfo;