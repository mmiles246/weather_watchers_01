import {useState} from 'react'
import NavBar from './Navbar'

function Login ({currentUser, setCurrentUser}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    function loginSubmit (e) {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({username, password})
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user=> {
                    setCurrentUser(user)
                })
            } else {
                res.json().then(errors => {
                
                })
            }
        })
    }

    
    return(
        <>
            {/* <NavBar /> */}
            <div className="login-page">
                <div className="login-container">
                    <div className="login-form">
                        <form onSubmit={loginSubmit}>
                                <span>
                                    <input
                                    type='text'
                                    name='username'
                                    placeholder='username'
                                    value={username}
                                    onChange={((e) => setUsername(e.target.value))}
                                    >
                                    </input>
                                </span>

                                <span>
                                    <input
                                    type='password'
                                    name='password'
                                    placeholder='password'
                                    value={password}
                                    onChange={((e) => setPassword(e.target.value))}
                                    >
                                    </input>
                                </span>
                                <button type='submit'>
                                    Submit
                                </button>
                        </form>
                    </div>

                </div>
            </div>       
        </>
    )
}

export default Login;