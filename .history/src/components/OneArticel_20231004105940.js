import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import articles from "../data"

const OneArticel = () => {
   
    const {articleID} = useParams()

    const oneSpecificArticel = articles.find( (OneArticel) => {
      return OneArticel.id === parseInt(articleID)
    })
  
    const {title, perex, content, author } = oneSpecificArticel

  return <section>
    <h2>{title}</h2>
    <p>{perex}</p>
    <p>{content}</p>
    <p>{author}</p>
    <Link to="/articles">Naspať na všetky články</Link>
  </section>
}

export default OneArticel