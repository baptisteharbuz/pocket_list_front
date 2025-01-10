import React, { useState } from 'react';
import axios from 'axios';

const UpdateList = () => {
    const [listName, setListName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleNameChange = (e) => {
        setListName(e.target.value);
    };

    const handlePrivateChange = (e) => {
        setIsPrivate(e.target.checked);
    };

    const handleUpdateList = async () => {
        if (listName.trim()) {
            try {
                const response = await axios.put('http://localhost:3000/list/', {
                    name: listName,
                    isPrivate: isPrivate,
                });

                setSuccess(`Liste "${listName}" mise à jour avec succès!`);
                setError('');
            } catch (err) {
                setError('Erreur lors de la mise à jour de la liste.');
                setSuccess('');
                console.error('Error:', err);
            }
        } else {
            setError('Veuillez entrer un nom pour la liste.');
        }
    };

    return (
        <div>
            <h1>Modifier une liste</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <input
                type="text"
                placeholder="Nom de la liste"
                value={listName}
                onChange={handleNameChange}
            />
            <label>
                Liste privée
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={handlePrivateChange}
                />
            </label>
            <button onClick={handleUpdateList}>Mettre à jour</button>
        </div>
    );
};

export default UpdateList;

