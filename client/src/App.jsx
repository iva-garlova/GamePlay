import {Routes, Route} from 'react-router'

import './App.css'

import { UserContext } from './contexts/UserContext'

import Header from './components/header-navigation/Header'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Login from './components/login/Login'
import CreateGame from './components/create-game/CreateGame'
import GameEdit from './components/game-edit/GameEdit'
import GamesDetails from './components/game-details/GamesDetails'
import Games from './components/games/Games'
import { useState } from 'react'
import Logout from './components/logout/Logout'

function App() {
  const [authData, setAuthData] = useState({});

  const userLoginHandler = (resultData) => {
      setAuthData(resultData)
  };

  const userLogoutHandler = () => {
setAuthData({});
  };


  return (
    <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
    <div id="box">
      <Header />

      <main id="main-content">
        <Routes>
          <Route path ="/" element={<Home />}/>
          <Route path ="/login" element={<Login />}/>
          <Route path ="/register" element={<Register />}/>
          <Route path ="/games/create" element={<CreateGame />}/>
          <Route path ="/games/:gameId/edit" element={<GameEdit />}/>
          <Route path ="/games/:gameId/details" element={<GamesDetails/>}/>
          <Route path ="/games" element={<Games />}/>
          <Route path ="/logout" element={<Logout />}/>
        </Routes>
        </main>
    </div>
    </UserContext.Provider>
  )
}

export default App
