import { useEffect, useState } from "react";

function Table({keys, rows, renderActions, onRowClick }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRows, setFilteredRows] = useState(rows);

    useEffect(() => {
        setFilteredRows(rows);
      }, [rows]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    
        const filtered = rows.filter((row) =>
          keys.some((key) =>
            String(row[key]).toLowerCase().includes(value)
          )
        );
    
        setFilteredRows(filtered);
      };

    return (
        <>
        <div className="d-flex align-items-center">
            <input type="text" className="form-control text-center" style={{fontFamily: 'Arial, FontAwesome'}} placeholder="&#xf002; Search" name="search" value={searchTerm} onChange={handleSearch} />
        </div>
        <hr />
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
                {filteredRows.map((row, index)=>(
                    <tr key={index} style={{cursor: onRowClick?  "pointer":""}} onClick={onRowClick ? () => onRowClick(row._id) : undefined} >
                        {keys.map((key, index)=>(
                            <td key={index}>{row[key]}</td>
                        ))}
                        {renderActions && (
                            <td onClick={(e) => {e.stopPropagation();}}>{renderActions(row)}</td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Table;