//---For tracking login state--------//
import { useState, useEffect } from 'react';

export default function HeaderComponent(){
    const [loginState, setLoginState] = useState(false);
    
    //---Checking if we are in the login state----//
    useEffect(() => {
        //---Retrieve the loginState from localStorage----//
        const storedLoginState = localStorage.getItem('loginState');
        setLoginState(storedLoginState === 'true');
    }, []);

    //----function for logging out---//
    const handleLogout = () =>{
        localStorage.removeItem('loginState');
        localStorage.removeItem('userId');
        setLoginState(false);
    }

    return(
        <div>
            <header className='headerSection'>
                <a href="/" className="logo">MathDoodle</a>
                <div className="bx bx-menu" id="menu-icon"></div>

                <ul className="navbar">
                   {/*---This will become either a login button or a profile button depending on the login state--*/}
                   {loginState?(
                         <li><a className="navbarOption" href="/profile">Profile</a></li>
                    ):(
                        <li><a className="navbarOption" href="http://localhost:3000/users/login">Login</a></li>
                    )
                    }
                    <li><a className="navbarOption" href="/topics">Topics</a></li>
                    <li><a className="navbarOption" href="/lesson-page">Lessons</a></li>
                    <li><a className="navbarOption" href="/question-settings">Quizzes</a></li>
                    {loginState?(
                        <li><a className="navbarOption" href="#" onClick={handleLogout}>Logout</a></li>
                    ):(
                        <></>
                    )}
                </ul>
            </header>

        </div>
    )
};
