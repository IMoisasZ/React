import { read, exclude, create, edit } from "./httpServer";
import { getNewId } from './idService'

export async function apiGetAllFlashCards(){
    const allFlashCards = await read('/flashCards')
    return allFlashCards
}

export async function apiDeleteFlashCard(cardId){
    await exclude(`/flashCards/${cardId}`)
}

export async function apiCreateFlashCard(title, description){
    const newFlashCard = await create(`/flashCards`, {
        id: getNewId(),
        title,
        description
    })
    return newFlashCard
}

export async function apiUpdateFlashCard(cardId, title, description){
    const updatedFlashCard = await edit(`/flashCards/${cardId}`, {
        title,
        description
    })
    return updatedFlashCard
}