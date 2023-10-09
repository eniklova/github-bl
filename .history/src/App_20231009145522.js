import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Aboutme from "./pages/Aboutme"
import Articles from "./pages/Articles"
import Kontakt from "./pages/Kontakt"
import Error from "./pages/Error"
import NewArticel from "./"
import SharedLayout from "./pages/SharedLayout"
import ArticleList from "./components/ArticleList"



const App = () =>  {
  return  <BrowserRouter>
    <Routes>

      <Route path="/" element={ <SharedLayout /> } > 
        <Route index element={ <Home /> }  />
        <Route path="/aboutme" element={ <Aboutme /> } />
        <Route path="/articles" element={ <Articles />} />
        <Route path="/all-articles/:articleID" element={ <ArticleList />} />
        <Route path="/kontakt" element={ <Kontakt />} />
       
        <Route path="*" element={ <Error /> }/>
      </Route>
      
    </Routes>
  </BrowserRouter>
}

export default App