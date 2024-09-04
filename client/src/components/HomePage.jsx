import { useState, useEffect } from 'react';
import Footer from './Footer';
import { useNavigate, useLocation } from 'react-router-dom';

export default function HomePage() {
    //----Tracking whether we are in a login state or not----//
    const [loginState, setLoginState] = useState(false); 
    const location = useLocation();
    //---For transversing to other pages or refreshing this page---//
    const navigate = useNavigate();

    //---Checking if we are in the login state----//
    useEffect(() => {
        //---Retrieve the loginState from localStorage----//
        const storedLoginState = localStorage.getItem('loginState');
        setLoginState(storedLoginState === 'true');
    }, []);

    useEffect(() => {
        //---Getting the url----//
        const params = new URLSearchParams(location.search);
        //--Checking the login status and userID-----// 
        const loginState = params.get('LoginState');
        const userId = params.get('userId');
        if (loginState === 'true') {
            localStorage.setItem('loginState', 'true');
            setLoginState(true);
        }
        if(userId){
            localStorage.setItem('userId', userId);
        }

        
    }, [location.search]);

    //---Function for making the navbar stay fixed when the user is scrolling down in the homepage---//
    useEffect(() => {
        // nav bar sticky function
        const header = document.querySelector(".HomepageHeaderSection");

        const handleScroll = () => {
            header.classList.toggle("sticky", window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    //----function for logging out---//

    const handleLogout = () =>{
        localStorage.removeItem('loginState');
        setLoginState(false);
        navigate('/'); 
    }

    return (
        <div className='HomepageMainBody'>
            {/* <!--header--> */}
            <header className='HomepageHeaderSection'>
                <a href="/" className="logo">MathDoodle</a>
                <div className="bx bx-menu" id="menu-icon"></div>

                <ul className="navbar">
                    {/*---This will become either a login button or a profile button depending on the login state--*/}
                    {loginState?(
                         <li><a className="navbarOption" href="/profile">Profile</a></li>
                    ):(
                        <li><a className="navbarOption" href="http://localhost:3000/users/login">Login</a></li>
                    )}
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
            {/* Home Section */}
            <section className="home" id="home">
                <div className="home-text">
                    <h1>MATHDOODLE: <br /> Arithmetic Guide</h1>
                    <p>Unlock your full potential</p>
                    <a href="/topics" className="home-btn ">Explore</a>
                </div>
            </section>

            {/* Popular Topics */}
            <section className="location" id="location">
                <div className="title">
                    <h2>Popular Topics</h2>
                </div>

                <div className="location-content">
                    <div className="col-images">
                        <img src="set.jpg" alt="Set Theory" />
                        <p>Set Theory</p>
                    </div>

                    <div className="col-images">
                        <img src="relations.jpg" alt="Relations" />
                        <p>Relations</p>
                    </div>

                    <div className="col-images">
                        <img src="combinatorics.jpg" alt="Combinatorics" />
                        <p>Combinatorics</p>
                    </div>

                    <div className="col-images">
                        <img src="permutations.jpg" alt="Permutations" />
                        <p>Permutations</p>
                    </div>

                    <div className="col-images">
                        <img src="graph.jpg" alt="Graphs" />
                        <p>Graphs</p>
                    </div>

                    <div className="col-images">
                        <img src="proofs.jpg" alt="Proofs" />
                        <p>Proofs</p>
                    </div>
                </div>
            </section>

            {/* This is where the footer section is placed at */}
            <Footer/>

        </div>
    );
};
