import './header.scss'
import logo from '../imgs/logo.svg'

const Header = () => {
    return (
        <header className="header">
            <div className="header__position">
                <img className="header__logo" src={logo} alt="logo"/>
                <a href="http://localhost:5000/game-download"><button className="header__game-button">Игра</button></a>
                <button className="header__news-button">Новости</button>
            </div>
            <button className="header__premium-button">Получить премиум</button>
        </header>
    )
}

export default Header;
