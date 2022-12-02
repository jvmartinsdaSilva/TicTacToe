const cells = document.querySelectorAll('.cell')
const PlayerX = 'X'
const PlayerO = 'circle'

let turno = true

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const game = () => {
    for(const cell of cells){
        cell.addEventListener('click', () => {
            if(cell.classList != 'cell'){
                return
            } else {
                if(turno){
                    cell.classList.add(PlayerX)
                    turno = false
                    checkWinner(PlayerX)
                } else {
                    cell.classList.add(PlayerO)
                    turno = true
                    checkWinner(PlayerO)
                }
            }
        })
    }    
}

const checkWinner = (Player) => {
    const winner = winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cells[index].classList.contains(Player)
        })
    })

    if(winner){
        winnerGame(Player)
    } else {
        checkForTie()
    }
   
}

const winnerGame = (Player) => {
    const messageDisplay = document.querySelector('.messageDisplay')
    const messageWinner = document.querySelector('.message')
    const btnReset = document.querySelector('.btnReset')


    messageWinner.classList.add(Player)
    messageDisplay.style.display = 'block'
    messageWinner.textContent =  `Player ${Player} win`

    btnReset.addEventListener('click', resetGame)
}


const checkForTie = () => {
    const AllCells = [...cells].every((cell) => {
        return cell.classList.contains('X') || cell.classList.contains('circle')
    })

    if(AllCells){
        GameTie()
    }
}

const GameTie = () => {
    const messageDisplay = document.querySelector('.messageDisplay')
    const messageWinner = document.querySelector('.message')
    const btnReset = document.querySelector('.btnReset')

    messageDisplay.style.display = 'block'
    messageWinner.textContent =  `Not have winner`

    btnReset.addEventListener('click', resetGame)
}


const resetGame = () => {
    const messageDisplay = document.querySelector('.messageDisplay')
    const messageWinner = document.querySelector('.message')
    
    for(const cell of cells){
        cell.classList.remove('X')
        cell.classList.remove('circle')
    }
    
    turno = true
      
    messageWinner.classList.remove('X')
    messageWinner.classList.remove('circle')

    messageDisplay.style.display = 'none'
}
game()