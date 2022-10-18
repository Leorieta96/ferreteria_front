import React from 'react'
import { logout, useAuthDispatch, useAuthState } from '../../context/Auth'
import styles from './dashboard.module.css'
 
function Dashboard(props) {

    const dispatch = useAuthDispatch() // read dispatch method from context
    const { user } = useAuthState() //read user details from context
    const handleLogout = () => {
        logout(dispatch) //call the logout action
        
        props.history.push('/login') //navigate to logout page on logout
    }
    return (
        <div style={{ padding: 10 }}>
            <div className={styles.dashboardPage} >
                <h1>
                    Dashboard
                </h1>
                <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
            <p>Welcome {user.dni}</p>
        </div>
    )
}
 
export default Dashboard