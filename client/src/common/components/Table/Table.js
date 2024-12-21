function Table({keys, rows, renderActions }) {
    return (
        <>
        <table className="table text-center">
            <thead>
                <tr>
                    {keys.map((key, index)=>(
                        <th key={index}>{key.toUpperCase()}</th>
                    ))}
                    {renderActions && <th>ACTIONS</th>}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index)=>(
                    <tr key={index}>
                        {keys.map((key, index)=>(
                            <td key={index}>{row[key]}</td>
                        ))}
                        {renderActions && (
                            <td>{renderActions(row)}</td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Table;