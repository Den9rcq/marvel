import './charList.scss';
import React, { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        charsList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charsEnded: false
    }

    componentDidMount() {
        this.onRequest()
    }

    marvelService = new MarvelService()

    onRequest = (offset) => {
        this.onCharsLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharsLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onCharsLoaded = (newCharsList) => this.setState(({ charsList, offset }) => ({
        charsList: [...charsList, ...newCharsList],
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
        charsEnded: newCharsList <= 9
    }));

    onError = () => this.setState({
        loading: false,
        error: true
    })

    formattedPicture = (picture) => {
        const notPicture = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        return picture === notPicture ? { objectFit: "fill" } : null
    }

    // Element selection logic
    itemRefs = [];
    setRef = (ref) => {
        this.itemRefs.push(ref);
    }
    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
    }

    render() {
        const { charsList, loading, error, offset, newItemLoading, charsEnded } = this.state
        const spinner = loading && <Spinner/>
        const errorMessage = error && <ErrorMessage/>
        const charsListComponent = charsList.map(({ name, thumbnail, id}, i) => (
            <li
                className={`char__item`}
                key={id}
                onClick={() => {
                    this.props.onCharSelected(id);
                    this.focusOnItem(i);
                }}
                ref={this.setRef}
            >
                <img
                    src={thumbnail}
                    alt={name}
                    style={this.formattedPicture(thumbnail)}
                />
                <div className="char__name">{name}</div>
            </li>
        ))
        return (
            <div className="char__list">
                {spinner || errorMessage || <ul className="char__grid">{charsListComponent}</ul>}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ display: charsEnded ? "none" : "block" }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;