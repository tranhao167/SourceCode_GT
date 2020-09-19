import React, { Component } from 'react';
import Footer from './Footer';
import TopMenuSigned from './TopMenuSigned';

class ContactSinged extends Component {
    constructor(props) {
        super(props);
        this.state = {
          check: "contact",
        };
      }
      
      onClickContact = () => {
        this.setState({
          check: "contact",
        });
      };
      onClickAbout = () => {
        this.setState({
          check: "About",
        });
      };
    render() {
        let change = null;

    if (this.state.check === "contact") {
      change = (
        <div >
          <div
            className="form-row"
            style={{ width:'800px',textAlign: "center", padding: "10px" }}
          >
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{paddingLeft:'50px'}}>
              <h3 style={{ textAlign:'left',color: "#01DF01" }}>Headquarters</h3>
            </div>
          </div>
          <div
            className="form-row"
            style={{  padding: "10px" ,paddingLeft:'50px'}}
          >
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <p>
                Fsoft , Lot T2, D1 Street, Saigon Hi-Tech Park, District 9, Ho
                Chi Minh City, Vietnam
              </p>
            </div>
          </div>
          <div
            className="form-row"
            style={{ padding: "10px" ,paddingLeft:'50px'}}
          >
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <p>Tel : 0363543388 - Email : <span style={{color:'#01DF01'}}>facms@fsoft.com</span></p>
            </div>
          </div>
          <hr style={{borderStyle:'solid',width:'80%'}}></hr>
            <div style={{ padding: "10px" ,paddingLeft:'50px'}}>
            <h5 style={{color:'black'}}>Having problems with your account?</h5> 
            <p>Please mail to : <span style={{color:'#01DF01'}}>evantran@gmail.com</span></p>
            </div>
            <div style={{ padding: "10px" ,paddingLeft:'50px'}}>
            <h5 style={{color:'black'}}>Having an error on the website?</h5> 
            <p>Please notify to us via gmail : <span style={{color:'#01DF01'}}>facms@fsoft.com</span></p>
            </div>
          
            
        </div>
      );
    } else if (this.state.check === "About") {
      change = (
        <div className="row">
          <div
            className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
            style={{ padding: "30px" }}
          >
            <h3
              style={{
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
                color: "#01DF01"
              }}
            >
              Who are we ?
            </h3>
            <p>
              Founded in 1999 as a FPT Group company, FPT Software has become
              the largest digital transformation and software services provider
              in Southeast Asia with more than 15,000 people working in 37
              offices in 16 countries. <br></br>FPT Software is a Global
              Software Company built from the ambition of 13 Vietnamese children
              with the mission of bringing Vietnam's intelligence to the world
              and changing people's lives with technology.
            </p>
            <h3
              style={{
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
                color: "#01DF01"
              }}
            >
              4 reasons to join us
            </h3>
              <h5
                style={{

                  fontWeight: "bold",
                  width: "100%",
                  color: "#01DF01"
                }}
              >
                Global recognition
              </h5>
              We believe that the practical lessons and honing from the most
              valuable and new technology projects for the world's leading names
              are specialties of FPT Software. Continually developing and
              conquering the five continents with us.
            
            
              <h5
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  color: "#01DF01"
                }}
              >
                Leading technology
              </h5>
              As a leading technology service provider, FPT Software assists
              customers from all sectors in the deployment and adaptation of
              digital technologies. This is where you can find the most
              interesting and diverse jobs.
            
              <h5
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  color: "#01DF01"
                }}
              >
                Welfare competition
              </h5>
              One of FPT Software's missions is to ensure employees with
              material adequacy and spiritual richness. Explore our competitive
              benefit packages including salaries, bonuses, health care, family
              care, insurance, cultural and sports activities and more.
              <h5
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  color: "#01DF01"
                }}
              >
                Unique culture
              </h5>
              The organizational culture is formed from its own members. All members of FPT Software, from senior leaders to an ordinary programmer, have created a different culture. Come and feel the essence of FPT Software in your own way.
          </div>
        </div>
      );
    }
    return (
      <div>
        <TopMenuSigned/>
        <div className="Employer_font">
        <div className="container" style={{width:'800px',padding:'100px 0px 100px 0px'}}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="form-group">
                <div className="panel panel-default">
                  <div className="panel-heading"></div>
                  {/* DIV */}
                  <div
                    className="panel-body"
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      //borderRadius: "30px",
                      border:'0',
                      backgroundColor: "white",
                      boxShadow: "5px 10px 18px #888888",
                    }}
                  >
                    <div className="form-row" style={{ textAlign: "center" }}>
                      <div className="row" style={{ justifyContent: "center",width:'100%' }}>
                        <div
                          className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                          style={{ padding: "50px" }}
                        >
                          <button
                            className="btn_contact"
                            onClick={this.onClickContact}
                          >
                            Contact
                          </button>
                        </div>
                        <div
                          className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                          style={{ padding: "50px" }}
                        >
                          <button
                            className="btn_contact"
                            onClick={this.onClickAbout}
                          >
                            About us
                          </button>
                        </div>
                      </div>
                    </div>
                    {change}
                  </div>
                  {/* End DIV */}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <Footer/>
      </div>
    );
    }
}

export default ContactSinged;
