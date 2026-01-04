export const ROUTES={
    HOME:"/",
    LOGIN:"/login",
    REGISTER:"/register",
    ABOUT:"/about",
    CONTACT:"/contact",
    ME:"/me",
    FORUM:"/forum",
    ARTISTS:"/artists",
    FORUM_ID:'/forum/:forumId',
    ARTICLES:"/articles",
    ARTICLES_ID: (id)=>{`/articles/:${id}`},
    PROFILE:"/profile",
    ARTWORKS: "/artworks",
    ARTWORKS_ID: (id)=>{`/artworks/:${id}`},
    PROFILE_ID: (id)=>{`/profile/:${id}`},
    AUCTIONS: "/auctions",
    ARTIST_PROFILE: "/artist"

}