import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useEffect, useState } from "react";

const RandomChar = () => {
    const [char, setChar] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateChar()
        const timer = setInterval(updateChar, 10000)

        return () => {
            clearInterval(timer)
        }
    }, [])


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

    const updateChar = async () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        onCharLoading()
        await marvelService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const formattedDescription = (description) => {
        const limitedDescription = description && description.length > 150 ? `${description.substring(0, 150)}...` : description
        return limitedDescription || "This character has no description."
    }

    const formattedPicture = (picture) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: "fill" } : null
    }

    const spinner = loading && <Spinner/>
    const errorMessage = error && <ErrorMessage/>
    return (
        <div className="randomchar">
            {spinner ||
            errorMessage ||
            <View
                char={char}
                onFormattingDescription={formattedDescription}
                onFormattingPicture={formattedPicture}
            />}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateChar}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({ char, onFormattingDescription, onFormattingPicture}) => {
    const { name, description, thumbnail, wiki, homepage } = char
    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={onFormattingPicture(thumbnail)}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {onFormattingDescription(description)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;