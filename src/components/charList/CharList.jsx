import './charList.scss';
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        charsList: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(charsList => this.onCharsLoaded(charsList))
            .catch(this.onError)
    }

    marvelService = new MarvelService()


    onCharsLoaded = (charsList) => this.setState({
        charsList: charsList.map(item => ({ ...item, active: false })),
        loading: false
    });

    onError = () => this.setState({
        loading: false,
        error: true
    })

    onToggleActive = (id) => {
        return this.setState((prevState) => {
            return {
                ...prevState,
                charsList: prevState.charsList.map(item => item.id === id
                    ? { ...item, active: !item.active }
                    : { ...item, active: false }
                )
            }
        })
    }
    formattedPicture = (picture, property) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: property } : null
    }

    render() {
        const { charsList, loading, error } = this.state
        const activeClass = "char__item_selected"
        const spinner = loading && <Spinner/>
        const errorMessage = error && <ErrorMessage/>
        const charsListComponent = charsList.map(({ name, thumbnail, id, active }) => (
            <li
                className={`char__item ${active ? activeClass : null}`}
                key={id}
                onClick={() => this.onToggleActive(id)}

            >
                <img
                    src={thumbnail}
                    alt={name}
                    style={this.formattedPicture(thumbnail, "fill")}
                />
                <div className="char__name">{name}</div>
            </li>
        ))
        return (
            <div className="char__list">
                {spinner || errorMessage || <ul className="char__grid">{charsListComponent}</ul>}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;