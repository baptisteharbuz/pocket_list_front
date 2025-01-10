import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NonPrivateList() {
  const [lists, setLists] = useState([]);  // État pour stocker les listes non privées
  const [error, setError] = useState('');  // État pour afficher un message d'erreur

  // Effect pour récupérer les listes non privées
  useEffect(() => {
    const fetchNonPrivateLists = async () => {
      try {
        // Requête GET vers l'API qui renvoie les listes non privées
        const response = await axios.get('http://localhost:3000/list/all');
        setLists(response.data);  // Stocker les listes dans l'état
      } catch (err) {
        console.error('Erreur lors de la récupération des listes non privées:', err);
        setError('Impossible de récupérer les listes.');  // Message d'erreur en cas d'échec
      }
    };

    fetchNonPrivateLists();  // Appel de la fonction au chargement du composant
  }, []);  // Le tableau vide [] signifie que l'Effect s'exécute une seule fois au montage du composant

  return (
    <div>
      <h1>Listes Partagées</h1>

      {/* Affichage du message d'erreur s'il y en a une */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Affichage des listes récupérées */}
      {lists.length > 0 ? (
        <ul>
          {lists.map((list) => (
            <li key={list.ID_List}>
              <h2>{list.Name}</h2>
              <p>Créée le {new Date(list.Creation_Date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune liste disponible.</p>
      )}
    </div>
  );
}

