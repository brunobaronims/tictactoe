import Square from "../Square";

export default function Board({squares, click}) {
    return (
        <div>
            {
                squares.map((item, index) => {
                        if (index === 0 || index === 3 || index === 6)
                            return (
                                <div className="board-row" key={index}>
                                    <Square play={() => click(index)}>{squares[index]}</Square>
                                    <Square play={() => click(index + 1)}>{squares[index + 1]}</Square>
                                    <Square play={() => click(index + 2)}>{squares[index + 2]}</Square>
                                </div>
                            );
                    })
            }
        </div>
    )
}