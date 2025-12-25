import { Route, Routes } from 'react-router-dom'
import Login from './components/public/login/Login'
import Register from './components/public/register/Register'
import Forum from './components/public/forum/ForumThemes'
import Articles from './components/public/articles/Articles'
import Artworks from './components/public/artworks/Artworks'
import Layout from './components/layout/Layout.jsx'
import Home from './components/public/home/Home'
import Artwork from './components/public/artworks/Artwork'
import Article from './components/public/articles/Article'
import ForumThemes from './components/public/forum/ForumThemes'
import { ROUTES } from './routes.js'
import NotFound from './components/public/NotFound.jsx'
import Profile from './components/user/profile/Profile.jsx'
import Auctions from './components/user/auctions/Auctions.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import RoleRoute from './context/RoleRoute.jsx'
import ArtistDashboard from './components/artist/dashboard/ArtistDashboard.jsx'
import CreateArtwork from './components/artist/createArtwork/CreateArtwork.jsx'
import CreateArticle from './components/artist/createArticle/CreateArticle.jsx'
import './App.css'
import CreateTheme from './components/artist/createTheme/CreateTheme.jsx'

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
        <Route element={<ProtectedRoute/>}>
          <Route path={ROUTES.PROFILE} element={<Profile/>}/>
          <Route path={ROUTES.AUCTIONS} element={<Auctions/>}/>
        </Route>
        <Route element={<RoleRoute role={'artist'}/>}>
          <Route path='artist/dashboard' element={<ArtistDashboard/>}/>
          <Route path='artist/artwork/create' element={<CreateArtwork/>}/>
          <Route path='artist/article/create' element={<CreateArticle/>}/>
          <Route path='forum/topic/create' element={<CreateTheme/>}/>
        </Route>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
