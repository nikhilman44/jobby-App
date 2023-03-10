import {Link, withRouter} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="card-container">
      <div className="top-row">
        <img src={companyLogoUrl} className="company-logo" alt="company-logo" />
        <div className="top-row-sub">
          <h1 className="role">{title}</h1>
          <div className="top-row-super-sub">
            <BsStarFill className="star" />
            <p className="role">{rating}</p>
          </div>
        </div>
      </div>
      <div className="second-row">
        <div className="second-row-first">
          <div className="align-second-row-first">
            <BsStarFill className="star" />
            <p className="small-heading">{location}</p>
          </div>
          <div className="align-second-row-first">
            <BsStarFill className="star" />
            <p className="small-heading">{employmentType}</p>
          </div>
        </div>
        <p className="role">{packagePerAnnum}</p>
      </div>
      <hr />
      <h1 className="role">Description</h1>
      <p className="description">{jobDescription}</p>
    </Link>
  )
}

export default withRouter(JobCard)
