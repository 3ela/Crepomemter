import React , {useState} from 'react';
import {GoogleLogin , GoogleLogout} from 'react-google-login'
import {FaGoogle} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';

function GoogleButton(props){

    const [logged , setLogged] = useState(false);
    
    const responseGoogle = async function loginUser(response){
      try {
          const text = `Welcome ${response.profileObj.givenName}`;
          props.useAlert(text,'success')
          setLogged(response.isSignedIn());
    
          let data = { name : response.profileObj.givenName , email: response.profileObj.email };
          let saveUser = await fetch( 'http://localhost:5000/user' , {
              method : 'post',
              headers : { 'Content-Type' : 'application/json'  },
              body : JSON.stringify(data)
          });
          let resUser = await saveUser.json();
          props.setLogged(response.isSignedIn(),resUser.user);    
      } catch (error) {
         props.useAlert(error.message)
         console.log(error)
      }
    };
    
    const logout = () => {
        setLogged(false);
        props.setLogged(false);
    };
  
    
      return (
        <div className="">
            {!logged ?
                <GoogleLogin
                    clientId="303215001912-aih4gfbqpi5747d4ok5m7a8nnjevhhcv.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'} 
                    icon={false}   
                >
                <FaGoogle className='google-icon'/>
                <span className='google-text'> Sign In With Google </span>
                </GoogleLogin>
            
            :
            <GoogleLogout
                clientId="303215001912-aih4gfbqpi5747d4ok5m7a8nnjevhhcv.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
                icon={false}
            >
                <FiLogOut className='google-icon'/>
                <span className='google-text'> Sign out </span>
            </GoogleLogout>
            }
        </div>
      );
};
  
export default GoogleButton;
  