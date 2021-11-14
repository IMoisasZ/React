import { useState, useEffect } from "react"

export default function FlashCard({title = 'Titulo do card', description = 'Descrição do card que pode conter mais palavras que o titulo', showFlashCardTitle = true}) {

    const [showTitle, setShowTitle] = useState(showFlashCardTitle)

    useEffect(() => {
        setShowTitle(showFlashCardTitle)
    }, [showFlashCardTitle])

    const fontSizeClassName = showTitle ? 'text-xl text-justify' : 'text-sm text-justify'

    function handleCardClick () {
        setShowTitle(currentShowTitle => !currentShowTitle)
    }

    return (
        <div className={`shadow-lg p-4 m-2 w-80 h-48 flex flex-row items-center justify-center font-semibold ${fontSizeClassName} cursor-pointer`} style={{fontFamily:"'JetBrains Mono', monospace"}} onClick={handleCardClick}>
            {showTitle ? title : description}
        </div>
    )
}
