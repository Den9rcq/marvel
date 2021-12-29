import './charList.scss';
import React, { useEffect, useRef, useState } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = ({ onCharSelected, charId }) => {
    const [charsList, setCharsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charsEnded, setCharsEnded] = useState(false)

    useEffect(() => {
        onRequest()
    }, [])

    const marvelService = new MarvelService()

    const onRequest = (offset) => {
        onCharsLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError)
    }

    const onCharsLoading = () => setNewItemLoading(true)

    const onCharsLoaded = (newCharsList) => {
        setCharsList(charsList => [...charsList, ...newCharsList])
        setLoading(false)
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharsEnded(newCharsList <= 9)
    };

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const formattedPicture = (picture) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: "fill" } : null
    }

    // Element selection logic
    const itemRefs = useRef([]);
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus()
    }
    // My version of the active class
    // const activeClass = (id) => charId === id ? 'char__item_selected' : ''
    const spinner = loading && <Spinner/>
    const errorMessage = error && <ErrorMessage/>
    const charsListComponent = () => charsList.map(({ name, thumbnail, id }, i) => (
        <li
            className={`char__item`}
            key={id}
            onClick={() => {
                onCharSelected(id);
                focusOnItem(i);
            }}
            ref={el => itemRefs.current[i] = el}
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