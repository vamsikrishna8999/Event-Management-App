
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayot from './components/RootLayot';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';

import Userprofile from './components/Userprofile';
import CreateEvent from './components/CreateEvent';
import Events from './components/Events';


function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayot />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/create-event",
          element:<CreateEvent />
        },
        {
          path:"/events",
          element:<Events />
        },
        {
          path:"/Signup",
          element:<Signup />
        },
        {
          path:"/Signin",
          element:<Signin />
        },
        {
          path:"/user-profile",
          element:<Userprofile />
        }
      ]
    }
  ])

  return (
    <div className="App">
      {/*provide browser router*/}
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
