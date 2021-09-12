import { Settings } from "@material-ui/icons"
import Bell from '@material-ui/icons/Notifications'
import Followers from '@material-ui/icons/People'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-option'><Bell /> Notifications </div>
            <div className='sidebar-option'><Followers /> Following </div>
            <div className='sidebar-option'><Settings /> Settings </div>
        </div>
    )
}

export default Sidebar
