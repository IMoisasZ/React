import { getNewId } from "../services/idService"

function TextArea({labelDescription = 'Descrição do label', textAreaValue = 'Valor padrão do text area', onTextAreaChange = null, id= getNewId(), maxLength=230, rows=4, resize = 'none'} ) {

    function handleInptChange({currentTarget}){
        if(onTextAreaChange){
            const newValue = currentTarget.value
            onTextAreaChange(newValue)
        }
    }

    const currentCharacterCount = textAreaValue.length
    const alertCharacterMax = currentCharacterCount >= 200 ? ' text-red-900' : ''

    return(
        <div className='flex flex-col my-4'>
          <label className='text-sm mb-1' htmlFor={id}>{labelDescription}</label>
          <textarea id={id} className="border p-1" maxLength={maxLength} rows={rows} value={textAreaValue} onChange={handleInptChange} />
          <div className='text-right mr-1'>
              <span className={alertCharacterMax}>{currentCharacterCount} / {maxLength}</span>
          </div>
        </div>
    )
} 

export default TextArea
