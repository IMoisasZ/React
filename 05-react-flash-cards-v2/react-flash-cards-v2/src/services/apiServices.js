import { read, exclude } from "./httpServer";

export async function apiGetAllFlashCards(){
    const allFlashCards = await read('/flashCards')
    return allFlashCards
}

export async function apiDeleteFlashCard(cardId){
    await exclude(`/flashCards/${cardId}`)
}