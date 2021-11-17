import { useState, useEffect } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import Button from './Button'
import Error from './Error'
export default function FlashCardForm({createMode = true, onPersist = null, children: flashCard = null}) {
    const [title, setTitle] = useState(flashCard?.title || '')
    const [description, setDescription] = useState(flashCard?.description || '')
    const [error, setError] = useState('')

    useEffect(() => {
        if(createMode){
            clearFileds()
        }
    },[createMode])

    function handleTitleChange (newTitle) {
        setTitle(newTitle)
    }

    function handleDescriptionChange(newDescription){
        setDescription(newDescription)
    }

    function clearFileds(){
        setTitle('')
        setDescription('')
        setError('')
    }

    function validatorForm(){
         return title.trim() !== '' && description.trim() !== ''
    }

    function handleFormSubmit(event){
        event.preventDefault()

        if(validatorForm()){
            clearFileds()
            if(onPersist){
                onPersist(title, description)
                clearFileds()
            }
        }else{
            setError('Titulo e Descrição são obrigatórios!')
        }
    }

    function handleFormReset(){
        clearFileds()
    }

    const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100'
    return (
        <form className={`${backgroundClassName} p-4`} onSubmit={handleFormSubmit} onReset={handleFormReset}>
            <h2 className='text-center font-semibold'>Manutenção de Flash Cards</h2>
            <TextInput labelDescription='Título' inputValue={title} onInputChange={handleTitleChange}/>
            <TextArea labelDescription='Descrição' textAreaValue={description} onTextAreaChange={handleDescriptionChange}/>
            <div className='flex items-center justify-between'>
                {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}
                <div>
                    <Button colorClass='bg-red-200' type='reset'>Limpar</Button>
                    <Button colorClass='bg-green-300' type='submit'>Salvar</Button>
                </div>
            </div>
        </form>
    )
}