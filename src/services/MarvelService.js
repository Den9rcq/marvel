import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=ac2e6f03cdc0d474ff8ea6766c9bbdbb'
    const _baseOffset = 210
    const _comicsOffset = 121

    const {request, loading, error, clearError} = useHttp()

    const getAllCharacters = async (offset = _baseOffset) => {
        const {data} = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const {data} = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(data.results[0])
    }
    const getAllComics = async (offset = _comicsOffset) => {
        const {data} = await  request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return data.results.map(_transformComics)
    }
    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
    return {loading, error, clearError, getCharacter, getAllCharacters, getAllComics, getComics}
}

export default useMarvelService