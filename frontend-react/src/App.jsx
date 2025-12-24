import { Route, Routes } from 'react-router-dom'
import Login from './components/public/login/Login'
import Register from './components/public/register/Register'
import Forum from './components/public/forum/ForumThemes'
import Articles from './components/public/articles/Articles'
import Artworks from './components/public/artworks/Artworks'
import Layout from './components/public/layout/Layout'
import Home from './components/public/home/Home'
import Artwork from './components/public/artworks/Artwork'
import Article from './components/public/articles/Article'
import ForumThemes from './components/public/forum/ForumThemes'
import { ROUTES } from './routes.js'
import './App.css'
import NotFound from './components/public/NotFound.jsx'
import Profile from './components/public/profile/Profile.jsx'


function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.ARTWORKS} element={<Artworks />}/>
        {/* <Route path={ROUTES.ARTWORKS_ID} element={<Artwork />}/> */}
        <Route path={ROUTES.ARTICLES} element={<Articles />}/>
        {/* <Route path={ROUTES.ARTICLES_ID} element={<Article />}/> */}
        <Route path={ROUTES.FORUM} element={<ForumThemes />}/>
        {/* <Route path={ROUTES.FORUM_ID} element={<Forum />}/> */}
        <Route path={ROUTES.LOGIN} element={<Login />}/>
        <Route path={ROUTES.REGISTER} element={<Register />}/>
        <Route path={ROUTES.PROFILE} element={<Profile/>}/>
        {/* <Route path='artist/dashboard' element={}/>
        <Route path='artist/artwork/create' element={}/>
        <Route path='artist/article/create' element={}/>
        <Route path='forum/topic/create' element={}/> */}
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
