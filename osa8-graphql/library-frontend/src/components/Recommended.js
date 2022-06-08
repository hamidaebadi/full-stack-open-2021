const Recommended = (props) => {

    if (!props.show) {
        return null
    }
    const favBooks = props.faveBooks
        return (
            <div>
            <h2>your favorite books</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {favBooks.map((book) => (
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td>{book.published}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )
    }

export default Recommended
