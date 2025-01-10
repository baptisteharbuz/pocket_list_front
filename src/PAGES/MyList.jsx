import React, { useState, useEffect } from 'react';
import axios from 'axios';

// STYLES
import styles from './MyList.module.css';

// ASSETS
import Edit from "../ASSETS/Edit.svg";
import Share from "../ASSETS/Share.svg";
import Trash from "../ASSETS/Trash.svg";

export default function MyList() {
  // State pour stocker les listes récupérées
  const [userLists, setUserLists] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [error, setError] = useState('');
  const itemsPerPage = 3; // Nombre de listes par page
  
  // Remplacez ceci par l'ID de l'utilisateur authentifié
  const userId = 1;

  // Effect pour récupérer les listes de l'utilisateur depuis l'API
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const userId = 1;  // Remplacez par l'ID réel de l'utilisateur connecté
        const response = await axios.get(`http://localhost:3000/list/user/${userId}`);
        setUserLists(response.data.data); // Stocker les résultats dans l'état
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, [userId]); // Ce useEffect se déclenche quand userId change

  // Calculer les listes à afficher pour la page active
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = userLists.slice(indexOfFirstItem, indexOfLastItem);

  // Gestion du changement de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(userLists.length / itemsPerPage);

  return (
    <div className={styles.MyListContainer}>
      <h1>Mes Listes</h1>

      {/* Affichage du message d'erreur s'il y en a une */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {currentLists.map((list) => (
          <li key={list.ID_List} className={styles.MyListCard}>
            <h2>{list.Name}</h2>
            <p>Créée le {new Date(list.Creation_Date).toLocaleDateString()}</p>
            <div className={styles.IconContainer}>
              <img src={Edit} alt="Icone modification" onClick={null} />
              <img src={Share} alt="Icone de partage" onClick={null} />
              <img src={Trash} alt="Icone de Poubelle" onClick={null} />
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className={styles.PaginationContainer}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`${styles.PaginationButton} ${index + 1 === currentPage ? styles.ActiveButton : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
