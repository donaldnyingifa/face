import React, {Component} from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail:'',
      signInPassword:''
    }
  }

  onEmailChange =(event)=> {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange =(event)=> {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn =(event)=> {
    event.preventDefault();

    fetch('https://donald-face-app.herokuapp.com/signin', {
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user=> {
      if (user.id){
          this.props.loadUser(user)
          this.props.onRouteChange('home');
      }
   })
     //console.log(this.state)
  }

  render (){
    const {onRouteChange} = this.props;
    return (
      <div className="pa4 black-80" >
      <main className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <form className="measure ">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email"/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
          </div>
        </fieldset>
        <div className="">
          <input onClick = {this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" />
        </div>
        <div className="lh-copy mt3">
          <a href="#0" onClick = {()=> onRouteChange('register')} className="f6 link dim black db">Register</a>
          <a href="#0" className="f6 link dim black db">Forgot your password?</a>
        </div>
        </form>
        </main>

      </div>
    );
  }

}

export default SignIn;
