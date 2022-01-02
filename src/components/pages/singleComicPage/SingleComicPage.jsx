import './singleComicPage.scss';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";

const SingleComicPage = () => {
    const [comic, setComic] = useState(null)
    const { comicId } = useParams()
    const { loading, error, clearError, getComic } = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [comicId])

    const updateChar = () => {
        clearError()
        getComic(comicId)
            .then(setComic)
    }

    const spinner = loading && <Spinner/>
    const errorMessage = error && <ErrorMessage/>
    const content = !(loading || error || !comic) && <View comic={comic}/>

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, language, price } = comic
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;