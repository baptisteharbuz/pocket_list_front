import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//STYLES
import styles from "./Login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    Email: '',
    Mdp: '',
    Nom: '',
    Prenom: '',
    Adresse: '',
  });

  const [isLogin, setIsLogin] = useState(false); // Etat pour gérer l'affichage des formulaires
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/user/add', {
        FirstName: formData.Nom,
        LastName: formData.Prenom,
        Email: formData.Email,
        Password: formData.Mdp,
        Age: formData.Age,
      });
  
      console.log('User signed up:', response.data);
      navigate(`/WelcomePlus`);
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error.response ? error.response.data : error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Logique de connexion (ex : appel API)
      console.log('User logged in:', formData);
      // Si la connexion réussit
      navigate(`/WelcomePlus`); 
    } catch (error) {
      console.error('Échec de la connexion', error);
    }
  };

  return (
    <div className={styles.PageContainer}>
      <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
      <div className={styles.Form}>
        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
          <div className='Form'>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="Nom"
                  value={formData.Nom}
                  onChange={handleChange}
                  required
                  placeholder="Nom"
                />
                <input
                  type="text"
                  name="Prenom"
                  value={formData.Prenom}
                  onChange={handleChange}
                  required
                  placeholder="Prénom"
                />
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  placeholder="Adresse-mail"
                />
                <input
                  type="password"
                  name="Mdp"
                  value={formData.Mdp}
                  onChange={handleChange}
                  required
                  pattern="(?=.*\d).{8,}"
                  title="Le mot de passe doit contenir au moins 8 caractères dont au moins un chiffre"
                  placeholder="Mot de passe"
                />
                 <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  required
                  placeholder="Age"
                />
              </>
            )}
            {isLogin && (
              <>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  placeholder="Adresse-mail"
                />
                <input
                  type="password"
                  name="Mdp"
                  value={formData.Mdp}
                  onChange={handleChange}
                  required
                  placeholder="Mot de passe"
                />
              </>
            )}
            <button type="submit">{isLogin ? 'Se Connecter' : 'S\'inscrire'}</button>
          </div>
        </form>
      </div>
      <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Pas encore inscrit ? Cliquez ici' : 'Déjà inscrit ? Cliquez ici'}</p>
    </div>
  );
}
