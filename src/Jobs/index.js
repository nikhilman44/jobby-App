import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const statusList = {
  initial: 'LOADING',
  found: 'FOUND',
  noData: 'NODATA',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    newList: [],
    name: '',
    profileUrl: '',
    bio: '',
    employmentType: [],
    salaryAmount: '0',
    status: statusList.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const profileDetails = data.profile_details

    this.setState({
      name: profileDetails.name,
      profileUrl: profileDetails.profile_image_url,
      bio: profileDetails.short_bio,
    })
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const getData = await data.jobs

    const reqData = getData.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
      id: each.id,
    }))

    this.setState({
      jobsList: reqData,
      newList: reqData,
      status: statusList.found,
    })
  }

  getEmployment = event => {
    const {employmentType} = this.state
    const val = event.target.value

    if (event.target.checked === true) {
      this.setState(prevState => ({
        employmentType: [...prevState.employmentType, val],
      }))
    } else {
      const remove = employmentType.filter(each => each !== val)
      this.setState({employmentType: remove})
    }
  }

  getSalary = event => {
    const amount = event.target.value

    this.setState({salaryAmount: amount})
  }

  onSearchInput = event => {
    const val = event.target.value
    const {jobsList} = this.state
    const finalJobsList = jobsList.filter(each =>
      each.title.toLowerCase().includes(val.toLowerCase()),
    )
    if (finalJobsList.length === 0) {
      this.setState({newList: [], status: statusList.noData})
    } else {
      this.setState({newList: finalJobsList, status: statusList.found})
    }
  }

  showNoJobsFound = () => (
    <div className="no-job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-job-image"
        alt="no jobs"
      />
      <p className="employment-title">No Jobs Found</p>
      <p className="lable">We could not found any job. Try for other job</p>
    </div>
  )

  showFilterJobs = () => {
    const {newList, salaryAmount, employmentType} = this.state
    console.log(newList)

    const finalList = newList.filter(each => {
      const amount = parseInt(each.packagePerAnnum.slice(0, 2))
      return amount >= parseInt(salaryAmount)
    })

    let finalDisplayList = finalList
    if (employmentType.length !== 0) {
      finalDisplayList = finalList.filter(each =>
        employmentType.includes(each.employmentType),
      )
    }

    return (
      <ul className="jobs-list-container">
        {finalDisplayList.map(each => (
          <JobCard jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  showLoading = () => (
    <div className="loader-container">
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {name, profileUrl, bio, newList, status} = this.state
    console.log(newList)

    console.log(newList)
    let required
    switch (status) {
      case statusList.noData:
        required = this.showNoJobsFound()
        break
      case statusList.found:
        required = this.showFilterJobs()
        break
      default:
        required = this.showLoading()
    }

    return (
      <>
        <Header />
        <div className="job-container">
          <div className="job-sub-container">
            <div className="container-1">
              <div className="profile-card">
                <img src={profileUrl} className="profile-image" alt="profile" />
                <h1 className="name">{name}</h1>
                <p className="profile">{bio}</p>
              </div>
              <hr className="horizontal-line" />
              <div>
                <h1 className="employment-title">Type of Employment</h1>
                <ul className="employment-type">
                  <li className="list-item">
                    <input
                      type="checkbox"
                      id="fullTime"
                      value="Full Time"
                      onClick={this.getEmployment}
                    />
                    <label htmlFor="fullTime" className="lable">
                      Full Time
                    </label>
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      id="partTime"
                      value="Part Time"
                      onClick={this.getEmployment}
                    />
                    <label htmlFor="partTime" className="lable">
                      Part Time
                    </label>
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      id="freelance"
                      value="Freelance"
                      onClick={this.getEmployment}
                    />
                    <label htmlFor="freelance" className="lable">
                      Freelance
                    </label>
                  </li>
                  <li className="list-item">
                    <input
                      type="checkbox"
                      id="internship"
                      value="Internship"
                      onClick={this.getEmployment}
                    />
                    <label htmlFor="internship" className="lable">
                      Internship
                    </label>
                  </li>
                </ul>
              </div>
              <hr className="horizontal-line" />
              <div>
                <h1 className="employment-title">Salary Range</h1>
                <ul className="employment-type">
                  <li className="list-item">
                    <input
                      type="radio"
                      name="salary"
                      id="10lpa"
                      value="10"
                      onClick={this.getSalary}
                    />
                    <label htmlFor="10lpa" className="lable">
                      10 LPA and above
                    </label>
                  </li>
                  <li className="list-item">
                    <input
                      type="radio"
                      name="salary"
                      id="20lpa"
                      value="20"
                      onClick={this.getSalary}
                    />
                    <label htmlFor="20lpa" className="lable">
                      20 LPA and above
                    </label>
                  </li>
                  <li className="list-item">
                    <input
                      type="radio"
                      name="salary"
                      id="30lpa"
                      value="30"
                      onClick={this.getSalary}
                    />
                    <label htmlFor="30lpa" className="lable">
                      30 LPA and above
                    </label>
                  </li>
                  <li className="list-item">
                    <input
                      type="radio"
                      name="salary"
                      id="40lpa"
                      value="40"
                      onClick={this.getSalary}
                    />
                    <label htmlFor="40lpa" className="lable">
                      40 LPA and above
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container2">
              <div className="search-box">
                <input
                  type="search"
                  placeholder="search"
                  className="input-element"
                  onChange={this.onSearchInput}
                />
                <div className="search-icon-box">
                  <BsSearch className="search-icon" />
                </div>
              </div>
              {required}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
