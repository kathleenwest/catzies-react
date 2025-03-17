import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import myAudio from '../sounds/catscream.mp3'; 

export default function App() {

    // State to manage the dice
    const [dice, setDice] = useState(() => generateAllNewDice())
    
    // Ref to manage the button element
    const buttonRef = useRef(null)

    // Check if the game is won
    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    // Function to play the audio
    const playAudio = () => {
        const audio = new Audio(myAudio);
        audio.play();
    }; 
          
    // Effect to focus the button when the game is won
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    // Function to generate a new set of dice
    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    // Function to roll the dice
    function rollDice() {
        playAudio();

        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }

    // Function to hold a die
    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    // Map over the dice array to create Die components
    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">😻 Catzies</h1>
            <p className="instructions">Roll until all the cat faces are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}