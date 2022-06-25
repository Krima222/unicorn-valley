import { useState, useRef} from 'react'

import Header from '../../header/header'
import './createNews.scss'

const Text = () => {
    return <textarea className="constructor__block-text"/>
}

const  Title = () => {
    return <input className="constructor__block-title"></input>
}

const CreateNews = () => {
    const [blocks, setBlocks] = useState([
        <Text/>
    ])
    const [activeBlock, setActiveBlock] = useState(null)

    const field = useRef()

    const move = (ref, e, offsetY, offsetX) => {
        ref.style.top = `${e.pageY - offsetY}px`
        ref.style.left = `${e.pageX - offsetX}px`
    }

    const onMousedown = (event, Block) => {
        const ref = event.target
        const position = ref.getBoundingClientRect();
        const offsetY =  event.pageY - position.top
        const offsetX = event.pageX - position.left

        ref.style.position = 'fixed'
        ref.style.top = `${event.pageY - offsetY}px`
        ref.style.left = `${event.pageX - offsetX}px`
        setActiveBlock(ref)
        const moveMouse = (e) => move(ref, e, offsetY, offsetX)
        const mouseUp = (e) => upMouse(e, moveMouse, mouseUp, Block)
        window.addEventListener('mousemove', moveMouse)
        ref.addEventListener('mouseup', mouseUp)
    }

    const upMouse = (e, moveMouse, mouseUp, Block) => {
        const position = field.current.getBoundingClientRect()
        if (e.pageY >= position.top && e.pageY <= position.top + field.current.offsetHeight &&
            e.pageX >= position.left && e.pageX <= position.left + field.current.offsetWidth) {
            setBlocks(blocks => [...blocks, <Block/>])
        }
        window.removeEventListener('mousemove', moveMouse)
        e.target.removeEventListener('mouseup', mouseUp)
        e.target.style.position = 'static'
    }

    return (
        <>
            <Header/>
            <div className="blocks-container">
                <div className="constructor">
                    <div className="constructor__block">
                        <div className="constructor__block-piece"  onMouseDown={(event) => onMousedown(event, Title)}>Заголовок</div>
                        <div className="constructor__block-piece" onMouseDown={(event) => onMousedown(event, Text)} >Текст</div>
                        <div className="constructor__block-piece">Картинка</div>
                        <div className="constructor__block-piece">Цитата</div>
                    </div>
                    <div ref={field} className="constructor__field">
                        {blocks}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNews;
