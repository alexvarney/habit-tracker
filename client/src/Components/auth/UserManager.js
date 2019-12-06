import React from 'react'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'


function UserManager(props) {
    return (
        <div className="container">
            {!props.auth.loggedIn && 
                <LoginForm />}

            {props.auth.loggedIn && <> 
                <UserProfile /> 
                </>}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(UserManager)