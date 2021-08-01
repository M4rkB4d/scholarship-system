import { Button } from '@material-ui/core'
import React from 'react'
import { auth } from '../firebase'
// import useLoginSession from '../Pages/Hooks/use-loginSession'


const LogoutButton = (props) => {
    
    // const { setUseUserType, 
    //         setUseUserSignedIn } = useLoginSession()

    const logut = () => {
        auth.signOut().then(() => {
            console.log('Sign-out successful.')
            // setUseUserType("visitor")
            // setUseUserSignedIn(false)
        }).catch((error) => {
            console.error(error.message)
        });
    }

    return (
        <div>
            <Button color="inherit" onClick={logut}>
                Logout
            </Button>
        </div>
    )
}

export default LogoutButton
