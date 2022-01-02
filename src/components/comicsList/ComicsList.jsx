import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import React, { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)
    const { loading, error, clearError, getAllComics } = useMarvelService()
    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        clearError()
        getAllComics(offset)
            .then(onComicsLoaded)
    }
    const onComicsLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemLoading(false)
        setOffset(offset => offset + 8)
        setComicsEnded(newComicsList.length < 8)
    }

    const formattedPicture = (picture) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: "fill" } : null
    }

    const spinner = loading && !newItemLoading && <Spinner/>
    const errorMessage = error && <ErrorMessage/>
    const comicsListComponent = () => comicsList.map(({ id, title, thumbnail, price }, i) => (
        <li key={i} className="comics__item">
            <a href="#">
                <img
                    src={thumbnail}
                    alt={title}
                    className="comics__item-img"
                    style={formattedPicture(thumbnail)}
                />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{`${price}$`}</div>
            </a>
        </li>
    ))

    return (
        <div className="comics__list">
            {spinner || errorMessage || <ul className="comics__grid">{comicsListComponent()}</ul>}
            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: comicsEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;