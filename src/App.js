import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './ProtectedRoute'
import LoginForm from './LoginForm'
import Home from './Home'
import Jobs from './Jobs'
import JobDetails from './JobDetails'
import NotFound from './NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
