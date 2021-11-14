export default function FlashCard({id, title = 'Titulo do card', description = 'Descrição do card que pode conter mais palavras que o titulo', showFlashCardTitle = true, onToggleFlashCard = null}) {

    const fontSizeClassName = showFlashCardTitle ? 'text-xl text-justify' : 'text-sm text-justify'

    function handleCardClick () {
        if(onToggleFlashCard){
            onToggleFlashCard(id)
        }
    }

    return (
        <div className={`shadow-lg p-4 m-2 w-80 h-48 flex flex-row items-center justify-center font-semibold ${fontSizeClassName} cursor-pointer`} style={{fontFamily:"'JetBrains Mono', monospace"}} onClick={handleCardClick}>
            {showFlashCardTitle ? title : description}
        </div>
    )
}
