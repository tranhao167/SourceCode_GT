import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer_part">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col col-lg-6" style={{marginTop:'20px'}}>
                  <div className="single_footer_part">
                    <a href="/TOP"><h1>TERM OF POLICY</h1></a>
                    
                  </div>
                </div>
                <div className=" col-lg-5">
                    
                    <div className="social_icon"style={{marginTop:'30px'}}>
                      <a className="btn_social" style={{color: 'white'}} href="https://www.facebook.com/profile.php?id=100009293717251"> <i className="fab fa-facebook" style={{color: 'white'}}></i> FACEBOOK</a>
                      <a className="btn_social" style={{color: 'white'}} href="https://www.instagram.com/llllblack___wolfllll/"><i className="fab fa-instagram" style={{color: 'white'}}></i> INSTAGRAM</a>
                      <a className="btn_social" style={{color: 'white'}} href="https://career.fpt-software.com"><i className="fas fa-globe" style={{color: 'white'}}></i> WEBSITE</a>
                    </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="copyright_text">
                    <h3>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright ©2020 All rights reserved
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</h3>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        );
    }
}

export default Footer;
