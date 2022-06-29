import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Welcome to arch buddy</h1>
      <Link to="/auth">Login</Link>
    </div>
  )
}

export default Home
