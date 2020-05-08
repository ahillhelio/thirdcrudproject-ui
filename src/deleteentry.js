import React from 'react';

const DeleteEntry = ({entry, deleteEntry, updateEntry}) => {
    return (
        <>
        <button onClick={() => deleteEntry(entry._id)}>DELETE ENTRY</button>
        <br></br>
        <button onClick={() => updateEntry(entry)}>EDIT ENTRY</button>
        </>
    )
} 
export default DeleteEntry;