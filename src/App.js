import Particlebackground from './Components/particleBackground/Particlebackground';
import './App.css';
import 'tachyons';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import { Component } from 'react';
import FaceRecognization from './Components/FaceRecognization/FaceRecognization';

// ====================================================================================

// const clarifyoutputauth = (urlofimage) => {

  
//     const PAT = '3c26075edbf54ec787f3ce2ced98c491';
//     const USER_ID = 'k8ihlsm53jgz';       
//     const APP_ID = 'Test';
//     const MODEL_ID = 'face-detection';
//     const IMAGE_URL = urlofimage;


//     const raw = JSON.stringify({
//       "user_app_id": {
//           "user_id": USER_ID,
//           "app_id": APP_ID
//       },
//       "inputs": [
//           {
//               "data": {
//                   "image": {
//                       "url": IMAGE_URL
//                   }
//               }
//           }
//       ]
//   });

//   const requestOptions = {
//       method: 'POST',
//       headers: {
//           'Accept': 'application/json',
//           'Authorization': 'Key ' + PAT
//       },
//       body: raw
//   };
//   return requestOptions;
// }
// =======================================================================================


const initialState = {
  input: '',
  imageurl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor()
  {
    super();

    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  
  
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) => {
    const clarifyface = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftcol: clarifyface.left_col * width,
      toprow: clarifyface.top_row * height,
      rightcol: width - (clarifyface.right_col * width),
      bottomrow: height - (clarifyface.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {

    this.setState({box: box});
  }

  onButtonClick = () => {
    this.setState({imageurl: this.state.input});
  
    fetch('https://facerecognizer-server-backend.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify
      ({
        input: this.state.input  
      })
    })
    // .then(response => response.json())
    // fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", clarifyoutputauth(this.state.input))
        .then(response => response.json())
        .then(data => {
          if(data)
          {
            fetch('https://facerecognizer-server-backend.onrender.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify
              ({
                id: this.state.user.id  
              })

            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

          }

        this.displayFaceBox(this.calculateFaceLocation(data))
        })
        .catch(err => console.log(err));
        
  }

  onRouteChange = (route) => {
    if(route === 'signout')
    {
      this.setState(initialState)
    }
    else if(route === 'home')
    {
      this.setState({isSignedIn: true })
    }

    this.setState({route: route});
  }

  render()
  {
    const {isSignedIn, imageurl, box, route} = this.state;
  return (
    <div className="App">

      <Particlebackground />

      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

      { route === 'home'

      ? <div>

          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
          <FaceRecognization box={box} imageurl={imageurl} />

        </div>

      : 
        (route === 'SignIn' 
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
  );
  }
}

export default App;
