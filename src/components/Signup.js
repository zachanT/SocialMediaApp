import {useState} from 'react'
import axios from 'axios'

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleCPasswordChange = (e) => {
        setCPassword(e.target.value)
    }

    const handleSignup = (e) => {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            password: password,
            posts: [],
        }

        axios.post("http://localhost:5000/user/add/", {user})
            .then(res => {
                setName("")
                setEmail("")
                setPassword("")
                setCPassword("")
                console.log("pls work")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='login'>
            <form className='signupForm' onSubmit={handleSignup} >
                <input type='text' placeholder='Username' onChange={handleNameChange} required />
                <input type='email' placeholder='Email' onChange={handleEmailChange} required />
                <input type='password' placeholder='Password' onChange={handlePasswordChange} required />
                <input type='password' placeholder='Confirm Password' onChange={handleCPasswordChange} required />
                <input type='submit' value='Sign Up' />
            </form>
        </div>
    )
}

export default Signup
