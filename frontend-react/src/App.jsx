import { Route, Routes } from 'react-router-dom'
import Login from './components/public/login/Login'
import Register from './components/public/register/Register'
import Layout from './components/layout/Layout.jsx'
import Home from './components/public/home/Home'
import ForumPage from './components/public/forum/ForumPage'
import { ROUTES } from './routes.js'
import NotFound from './components/public/NotFound.jsx'
import Profile from './components/user/profile/Profile.jsx'
import AuctionsPage from './components/user/auctions/AuctionsPage.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import RoleRoute from './context/RoleRoute.jsx'
import ArtistDashboard from './components/artist/dashboard/ArtistDashboard.jsx'
import CreateArtwork from './components/artist/createArtwork/CreateArtwork.jsx'
import CreateArticle from './components/artist/createArticle/CreateArticle.jsx'
import CreateTheme from './components/artist/createTheme/CreateTheme.jsx'
import ArtistsPage from './components/public/artists/ArtistsPage.jsx'
import LayoutArtistDashboard from './components/layout/LayoutArtistDashboard.jsx'
import MyArtworks from './components/artist/myArtworks/MyArtworks.jsx'
import MyArticles from './components/artist/myArticles/MyArticles.jsx'
import ArtworksPage from './components/public/artworks/ArtworksPage.jsx'
import ArticlesPage from './components/public/articles/ArticlesPage.jsx'
import TopicPage from './components/public/forum/TopicPage.jsx'

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.ARTISTS} element={<ArtistsPage />}/>
        <Route path={ROUTES.ARTWORKS} element={<ArtworksPage />}/>
        {/* <Route path={ROUTES.ARTWORKS_ID} element={<Artwork />}/> */}
        <Route path={ROUTES.ARTICLES} element={<ArticlesPage />}/>
        {/* <Route path={ROUTES.ARTICLES_ID} element={<Article />}/> */}
        <Route path={ROUTES.FORUM} element={<ForumPage />}/>
        <Route path={ROUTES.FORUM_ID} element={<TopicPage />}/>
        <Route path={ROUTES.LOGIN} element={<Login />}/>
        <Route path={ROUTES.REGISTER} element={<Register />}/>
        <Route element={<ProtectedRoute/>}>
          <Route path={ROUTES.PROFILE} element={<Profile/>}/>
          <Route path={ROUTES.AUCTIONS} element={<AuctionsPage/>}/>
        </Route>
        <Route element={<RoleRoute role={'artist'}/>}>
          <Route path={ROUTES.ARTIST_PROFILE} element={<LayoutArtistDashboard />}>
            <Route index element={<ArtistDashboard />} />
            <Route path="dashboard" element={<ArtistDashboard />} />
            <Route path="artwork" element={<MyArtworks />} />
            <Route path="artwork/create" element={<CreateArtwork />} />
            <Route path="article" element={<MyArticles />} />
            <Route path="article/create" element={<CreateArticle />} />
          </Route>
          <Route path='topic/create' element={<CreateTheme/>}/>
        </Route>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
