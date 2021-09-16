import { Settings } from "@material-ui/icons"
import Bell from '@material-ui/icons/Notifications'
import Followers from '@material-ui/icons/People'
import Logout from '@material-ui/icons/ExitToApp'
import { useHistory } from "react-router-dom"
import { GoogleLogout } from 'react-google-login'

const Sidebar = () => {
    const history = useHistory()

    const logout = () => {
        localStorage.setItem('profile', null)
        history.push('/login')
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-option'><Bell /> Notifications </div>
            <div className='sidebar-option'><Followers /> Following </div>
            <div className='sidebar-option'><Settings /> Settings </div>
            <div className='sidebar-option' onClick={logout}><Logout/> Sign Out </div>
            {/*<GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
            />*/}
        </div>
    )
}

export default Sidebar
