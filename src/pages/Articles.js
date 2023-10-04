import articles from "../data"
import { Link } from "react-router-dom"

function Articles () {
  return <section>
    <h1>Články</h1>
    <div>
      {articles.map ( (OneArticel) => {
        return  <article key={OneArticel.id}>
          <h2>{OneArticel.title}</h2>
          <Link to={`/all-articles/${OneArticel.id}`}>Zobraz článok</Link>
        </article>
      })}
    </div>
  </section>
}

export default Articles