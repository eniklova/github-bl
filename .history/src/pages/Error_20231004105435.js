import { Link } from "react-router-dom"



const Error = () => {
  return <div>
    <h2>404</h2>
    <p>Stránka nenájdená</p>
    <p><Link to="/">Home</Link></p>
  </div>
}

export default Error