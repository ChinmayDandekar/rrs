import React from 'react'
import { logout } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()


    console.log("hello")
    React.useEffect(() => {
        logout()
        navigate('/')
        
    })
    

    return (<></>)
}

export default Logout