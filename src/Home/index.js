import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="heading">Welcome to home</h1>
        <p className="para-text">
          Millions of people are searching for jobs, salary information,
          <br /> company reviews. Find the jobs that fits your ability and
          <br />
          potential.
        </p>
        <button
          type="button"
          className="find-jobs-btn"
          onClick={onClickFindJobs}
        >
          Find Jobs
        </button>
      </div>
    </>
  )
}
export default Home
