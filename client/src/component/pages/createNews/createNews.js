import Header from '../../header/header'
import './createNews.scss'


const CreateNews = () => {
    return (
        <>
            <Header/>
            <div className="blocks-container">
                <div className="constructor">
                    <div className="constructor__block">
                        <div className="constructor__block_piece">Заголовок</div>
                        <div className="constructor__block_piece">Текст</div>
                        <div className="constructor__block_piece">Картинка</div>
                        <div className="constructor__block_piece">Цитата</div>
                    </div>
                    <div className="constructor__field">

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNews;
