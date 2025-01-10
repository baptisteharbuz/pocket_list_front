import React, { useState } from 'react';
import axios from 'axios';  // Importer axios

export default function WelcomePlus() {
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (event) => {
    setListName(event.target.value);
  };

  // Fonction pour envoyer la liste au backend avec Axios
  const handleAddList = async () => {
    if (listName.trim()) {
      try {
        // Requête POST pour envoyer les données au serveur
        const response = await axios.post('http://localhost:3000/list/', {
          name: listName,
          userId: 1, // Exemple d'ID utilisateur
          products: [], // Liste vide de produits pour cet exemple
        });
  
        // Réponse du serveur
        setSuccess(`Liste "${listName}" ajoutée avec succès!`);
        setListName(''); // Réinitialiser le champ
        setError(''); // Réinitialiser l'erreur
      } catch (err) {
        // Gestion des erreurs
        console.error('Error:', err);
        setError('Une erreur est survenue. Veuillez réessayer.');
        setSuccess(''); // Réinitialiser le message de succès en cas d'erreur
      }
    } else {
      setError('Veuillez entrer un nom pour la liste.');
    }
  };
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ajouter une liste</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nom de la liste"
          value={listName}
          onChange={handleInputChange}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '250px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      </div>

      <button
        onClick={handleAddList}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Ajouter la liste
      </button>
    </div>
  );
}

