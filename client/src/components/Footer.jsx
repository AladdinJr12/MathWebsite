export default function Footer(){
    return(
        <>
         {/* Footer */}
         <section id="contact">
                <div className="footer">
                    <div className="main">
                        <div className="list">
                            <h4>Links</h4>
                            <ul>
                                <li><a className="footerLinks" href="#">About us</a></li>
                                <li><a className="footerLinks" href="#">Terms & Conditions</a></li>
                            </ul>
                        </div>

                        <div className="list">
                            <h4>Support</h4>
                            <ul> 
                                <li><a className="footerLinks"  href="#">Troubleshooting</a></li>
                                <li><a className="footerLinks"  href="#">Help</a></li>
                                <li><a className="footerLinks"  href="#">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div className="list">
                            <h4>Contact Information</h4>
                            <ul>
                                <li><a className="footerLinks" href="#">461 Clementi Rd, Singapore 599491</a></li>
                                <li><a className="footerLinks" href="mailto:MathDoodle@website.com">MathDoodle@website.com</a></li>
                                <li><a className="footerLinks" href="tel:+6587654321">+65 8765 4321</a></li>
                            </ul>
                        </div>

                        <div className="list">
                            <h4>Connect</h4>
                            <div className="social">
                                <a className="footerLinks" href="https://www.facebook.com"><i className='bx bxl-facebook-circle'></i></a>
                                <a className="footerLinks" href="https://www.instagram.com"><i className='bx bxl-instagram-alt'></i></a>
                                <a className="footerLinks" href="https://twitter.com"><i className='bx bxl-twitter'></i></a>
                                <a className="footerLinks" href="https://www.tiktok.com"><i className='bx bxl-tiktok'></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="final-msg">
                    <p>© 2024 MathDoodle. All rights reserved.</p>
                </div>
            </section>
        </>
    )
}