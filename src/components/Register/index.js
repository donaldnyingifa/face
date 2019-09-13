import React , {Component} from 'react';
  
class Register extends Component {
  constructor (props){
    super(props);
    this.state = {
      email:'',
      password:'',
      name: ''
    }
  }

  onNameChange =(event)=> {
    this.setState({name: event.target.value})
  }

  onEmailChange =(event)=> {
    this.setState({email: event.target.value})
  }

  onPasswordChange =(event)=> {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn =(event)=> {
    event.preventDefault();

    fetch('https://donald-face-app.herokuapp.com/register', {
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id){
        console.log('user', user)
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
   })
     //console.log(this.state)
  }

  render(){
    return (
      <div className="pa4 black-80" >
      <main className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <form className="measure ">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
            <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address"/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
          </div>
        </fieldset>

        <div className="lh-copy mt3">
          <p onClick = {this.onSubmitSignIn}  href="#0" className="f6 link dim black db pointer ">Register</p>
        </div>
        </form>
        </main>

      </div>
    );
  }
}

export default Register;
