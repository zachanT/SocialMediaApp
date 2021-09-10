import { Link } from "react-router-dom"

const Login = ({  }) => {
    return (
        <div className='login'>
            <h1>Log In</h1>
            <form className='LoginFrom' onSubmit=''>
                <input type='text' placeholder='Username' required/>
                <input type='password' placeholder='Password' required/>
                <input type='submit' value='Log In' />
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default Login
