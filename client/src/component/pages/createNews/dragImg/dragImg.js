import { useState } from 'react'

import './dragImg.scss'

const DragImg = () => {

    const [img, setImg] = useState(null)
    const [drag, setDrag] = useState(false)

    const dragStartHandler = e => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = e => {
        e.preventDefault()
        setDrag(false)
    }

    const dropHandler = e => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        const url = URL.createObjectURL(file)
        const img = <img src={url} alt={file.name}/>
        setImg(img)
        URL.revokeObjectURL(file)
    }

    return (
        !img ? drag
            ? <div className="drop-area"
                onDragStart={dragStartHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragStartHandler}
                onDrop={dropHandler}
            >
                Отпустите картинку
            </div>
            : <div
                className="drag-area"
                onDragStart={dragStartHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragStartHandler}
            >
                Перетащите картинку
            </div> : img
    )
}

export default DragImg
