import cats from "../data/cats.js"

export default function Die(props) {

    // Set the background color based on whether the die is held
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    // Get the cat emoji and label based on the die value
    const catEmoji = cats[props.value - 1].emoji;
    const catLabel = cats[props.value - 1].label;
  
    return (
        <button 
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with cat face ${catLabel}, 
            ${props.isHeld ? "held" : "not held"}`}
        >
            {catEmoji}
        </button>
    )
}