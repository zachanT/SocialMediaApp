import { Settings } from "@material-ui/icons"
import Bell from '@material-ui/icons/Notifications'
import Followers from '@material-ui/icons/People'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <p>My Name</p>
            <a href='#'><Bell /> Notifications</a>
            <a href='#'><Followers /> Following</a>
            <a href='#'><Settings /> Settings</a>
        </div>
    )
}

export default Sidebar
