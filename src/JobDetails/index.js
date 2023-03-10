import {Component} from 'react'

import './index.css'

class JobDetails extends Component {
  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    return (
      <div>
        <h1 className="color">Ya got it</h1>
      </div>
    )
  }
}

export default JobDetails
