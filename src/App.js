import React, { Component } from 'react';
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import FaceRecognition from './components/FaceRecognition'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Particles from 'react-particles-js'
import './App.css';

const Clarifai = require('clarifai');

const particlesOptions = {
  particles: {
    number:{
      value:70,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

const app = new Clarifai.App({
 apiKey: 'a238991c62684374836e7f8141d9f1d1'
});



class App extends Component {
  constructor (){
    super ();
    this.state = {
      input:'',
      imageUrl: '',
      box : {},
      route:'signin',
      signedIn:false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        password:'',
        joined: ''
      }
    }
  }

  loadUser =(data)=> {
    this.setState ({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation =(data)=> {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
  //  console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
  //  console.log(box)
    this.setState({box:box});
  }

  onInputChange =(event)=>{
    this.setState({input: event.target.value})
  }

  onSubmit =()=> {
    this.setState({ imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => {
      if (response) {
        fetch('https://donald-face-app.herokuapp.com/image', {
          method: 'put',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count =>
          this.setState(Object.assign(this.state.user, {entries:count}))
        )
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err, 'oopps'));
  }

  onRouteChange =(route)=> {
    this.setState({route:route})
    if (route === 'home') this.setState({signedIn:true})
   else if (route === 'signin' || route === 'register' ) this.setState({signedIn:false})
  }

  render() {
    return (
      <div className="App">
          <Particles
            className="particles"
            params={particlesOptions}
            />
          <Navigation signedIn = {this.state.signedIn} onRouteChange = {this.onRouteChange}/>
          {
            this.state.route === 'home' ?

            <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            {  console.log(this.state)}
            </div>
              :

              (
                  this.state.route === 'signin' ?
                  <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
                  :
                  <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              )



          }

      </div>
    );
  }
}

export default App;
