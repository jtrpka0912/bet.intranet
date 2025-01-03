type BetResponseDTO = {
    id: string,
    stipulation: string,
    jeremyAnswer: string,
    hidemiAnswer: string,
    jeremyBets: string,
    hidemiBets: string,
    jeremyWon: boolean,
    hidemiWon: boolean,
    endsAt: string,
    completedAt: string
}

export default BetResponseDTO;