import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PlanScreen from './screens/PlanScreen'
import ProductScreen from './screens/ExclusiveScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import Profiles from './screens/ProfilesListScreen'
import ProfilesScreen from './screens/ProfilesScreen'
import CreatePostScreen from './screens/CreateJobScreen'
import test from './screens/test'
import CreateProfileListScreen from './screens/CreateJobListScreen'
import CreateProfileListScreen2 from './screens/CreateJobListScreen2'

import HeartListScreen from './screens/JobList'
import HeartEditScreen from './screens/JobListEdit'

import MessageScreen from './screens/MessageScreen'
import Messages from './screens/Messages'

// import Stalk from './screens/Stalk'
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={Profiles} exact />

          <Route path='/admin/news/:id/edit' component={CreatePostScreen} />
          <Route path='/admin/joblist' component={CreateProfileListScreen2} />
          <Route path='/joblist' component={CreateProfileListScreen} />
          <Route path='/create/job/:id/edit' component={CreatePostScreen} />
         


          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        
          <Route path='/admin/planlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

          <Route path='/admin/exclusivelist' component={OrderListScreen} />

          <Route path='/proposal' component={HeartListScreen} />
          <Route path='/heart/:id/edit' component={HeartEditScreen} />
          <Route path='/plan' component={PlanScreen} exact />
          <Route path='/date/:id' component={ProfilesScreen} />
          <Route path='/test' component={test} />


          <Route path='/contact/:id' component={MessageScreen} />
          <Route path='/contacts' component={Messages} />
          {/* <Route path='/stalk' component={Stalk} /> */}



        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
