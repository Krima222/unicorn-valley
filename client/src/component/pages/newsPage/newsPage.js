import { NavLink } from 'react-router-dom'

import Header from '../../header/header'
import './newsPage.scss'

const NewPage = () => {
    return (
        <>
            <Header/>
            <div className="news-container">
                <NavLink to="/create-news" className="create-news">Создать новость</NavLink>
            </div>
        </>
    )
}

export default NewPage;
