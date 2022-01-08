import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";

const SinglePage = ({ Component, dataType }) => {
    const [data, setData] = useState(null)
    const { id } = useParams()
    const { loading, error, clearError, getComic, getCharacter } = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [id])

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateChar = () => {
        clearError()

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
                break
            default:
                console.log(error)
        }
    }

    const spinner = loading && <Spinner/>
    const errorMessage = error && <ErrorMessage/>
    const content = !(loading || error || !data) && <Component data={data}/>

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}
export default SinglePage