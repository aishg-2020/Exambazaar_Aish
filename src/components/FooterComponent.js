import React from 'react';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Menu</a></li>
                        <li><a href="contactus.html">Contact</a></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Our Address</h5>
                    <address>
                    6th Floor, Bhamashah Techno Hub,<br />
                    Sansthan Path, Jhalana Gram, Malviya Nagar,<br />
                    Jaipur, Rajasthan 302017<br />
		              <i className="fa fa-phone fa-lg"></i>: +91-9680542015<br />
		              <i className="fa fa-fax fa-lg"></i>: +91-9784041216<br />
		              <i className="fa fa-envelope fa-lg"></i>: <a href="always@exambazaar.com">
                      always@exambazaar.com</a>
                    </address>
                </div>
                
            </div>
            <div className="row justify-content-center">
                          
                <div className="col-auto">
                <p>&nbsp;</p>
                    <p>© 2020</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;