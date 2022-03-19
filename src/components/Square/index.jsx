export default function Square({play, children}) {
    return(
        <button className="square" onClick={play}>
            {
                children
            }
        </button>
    )
}