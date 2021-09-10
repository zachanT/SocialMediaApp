import { alpha, makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/SearchRounded'
import Home from '@material-ui/icons/HomeRounded'
import InputBase from '@material-ui/core/InputBase'

const useStyles = makeStyles((theme) => ({

}))

const Navbar = () => {
    const classes = useStyles();

    return(
        <div className='navbar'>
            <Home id='home'/>
            {/*<input type='text'></input>*/}
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <Search />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        </div>
    )
}

export default Navbar;
