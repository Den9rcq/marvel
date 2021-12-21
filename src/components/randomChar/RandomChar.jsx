import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }
    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
        this.timer = setInterval(this.updateChar, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    onCharLoaded = (char) => this.setState({
        char,
        loading: false
    });

    onError = () => this.setState({
        loading: false,
        error: true
    })

    updateChar = async () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        await this.marvelService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    formattedDescription = (description) => {
        const limitedDescription = description && description.length > 150 ? `${description.substring(0, 150)}...` : description
        return limitedDescription || "Описания не существует"
    }

    formattedPicture = (picture) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: "contain" } : null
    }

    render() {
        const { char, loading, error } = this.state
        const spinner = loading && <Spinner/>
        const errorMessage = error && <ErrorMessage/>
        return (
            <div className="randomchar">
                {spinner ||
                errorMessage ||
                <View
                    char={char}
                    onFormattingDescription={this.formattedDescription}
                    onFormattingPicture={this.formattedPicture}
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
                            onClick={this.updateChar}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({ char, onFormattingDescription, onFormattingPicture }) => {
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