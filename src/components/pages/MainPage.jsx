import React, { useState } from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null)
    const onCharSelected = (id) => setChar(id)

    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} charId={selectedChar}/>
                <div>
                    <CharInfo charId={selectedChar}/>
                    <CharSearchForm/>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
};

export default MainPage;