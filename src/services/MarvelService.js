class MarvelService {
    #apiBase = 'https://gateway.marvel.com:443/v1/public/'
    #apiKey = 'apikey=ac2e6f03cdc0d474ff8ea6766c9bbdbb'

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const {data} = await this.getResource(`${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`)
        return data.results.map(this.#transformCharacter)
    }
    getCharacter = async (id) => {
        const {data} = await this.getResource(`${this.#apiBase}characters/${id}?${this.#apiKey}`)
        return this.#transformCharacter(data.results[0])
    }
    #transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService