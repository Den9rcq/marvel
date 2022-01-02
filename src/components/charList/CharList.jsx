import './charList.scss';
import React, { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

const CharList = ({ onCharSelected, charId }) => {
    const [charsList, setCharsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charsEnded, setCharsEnded] = useState(false)

    const {loading, error, clearError, getAllCharacters} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        clearError()
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }


    const onCharsLoaded = (newCharsList) => {
        setCharsList(charsList => [...charsList, ...newCharsList])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharsEnded(newCharsList.length < 8)
    };

    const formattedPicture = (picture) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: "fill" } : null
    }

    const activeClass = (id) => charId === id ? 'char__item_selected' : ''

    const spinner = loading && !newItemLoading && <Spinner/>
    const errorMessage = error && <ErrorMessage/>
    const charsListComponent = () => charsList.map(({ name, thumbnail, id }) => (
        <li
            className={`char__item ${activeClass(id)}`}
            key={id}
            onClick={() => {
                onCharSelected(id);
            }}
        >
            <img
                src={thumbnail}
                alt={name}
                style={formattedPicture(thumbnail)}
            />
            <div className="char__name">{name}</div>
        </li>
    ))

    return (
        <div className="char__list">
            {spinner || errorMessage || <ul className="char__grid">{charsListComponent()}</ul>}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charsEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;