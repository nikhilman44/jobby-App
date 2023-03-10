import {Route, Switch, BrowserRouter} from 'react-router-dom'
import './App.css'

import LoginForm from './LoginForm'
import Home from './Home'
import Jobs from './Jobs'
import JobDetails from './JobDetails'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="jobs/:id" component={JobDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
