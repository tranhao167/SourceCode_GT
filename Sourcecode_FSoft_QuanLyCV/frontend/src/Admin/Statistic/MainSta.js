import React, { Component } from 'react';
import Menuadmin from '../Menuadmin';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import {Pie} from 'react-chartjs-2';

class MainSta extends Component {
  constructor(props){
    super(props);
    const token=localStorage.getItem("auth-jwt");
    let loggedIn=true;
    if(token===null){
      loggedIn=false
    }
    this.state={
       chartdata:{},
       newEmp:null,
        DelEmp:null,
        Appcv:null,
        Delcv:null,
        Acceptedcv:null,
        loggedIn
    }
  }
  
  componentDidMount(){  
    Axios({
                method:'GET',
                url: `http://localhost:56058/api/Chart/`,
                data: null
            }).then(res =>{
              const data = res.data;
              var chartData=[];
              chartData={
                labels:["New Employers","Deleted Employers","Approved CVs","Got a Job"],
                datasets:[{
                  label:"Data",
                  backgroundColor: [
                    "#0D69B3",
                    "#F27323",
                    "#1FB34A",
                    "#770000"
                  ],
                  borderColor: '#9933CC',
                  data:[data.paginationMetadata.TotalCountNewEmp,data.paginationMetadata.TotalCountDelEmp,
                    data.paginationMetadata.TotalCountAppr,data.paginationMetadata.TotalCountAccept],
                }]
              }
              this.setState({chartdata:chartData,
              newEmp:data.paginationMetadata.TotalCountNewEmp,
              DelEmp:data.paginationMetadata.TotalCountDelEmp,
              Appcv:data.paginationMetadata.TotalCountAppr,
              Acceptedcv:data.paginationMetadata.TotalCountAccept
              })
            }
            );
  }
  
  
    render() {
      if(this.state.loggedIn===false){
        return <Redirect to="/admin/login"/>
      }

        return (
            <div className="Employer_font">
                <Menuadmin/>
                <form style={{width:'100%'}}>
              <div className="form-row">
              <div className="form-group col-md-9">
                <Link exact="false" to='/admin/newemployer' className="btn_4" >New Employers</Link>
                <Link className="btn_4" exact="false" to='/admin/deletedemployer'> Deleted Employers</Link>
                <Link className="btn_4" exact="false" to='/admin/approvedcv'> Approved CVs</Link>
              </div>
              <div className="form-group col-md-3">

              </div>
              
            </div>
            </form>
            <div className="form-row">
              <div className="form-group col-md-7">
              <Pie
                data={this.state.chartdata}
                option={{
                  title: {
                    display: true,
                    text: "Predicted world population (millions) in 2050"
                  },
                }}
                legend={{
                  position:'top'
                }}
              />
              <h2 style={{textAlign:'center',marginTop:'2%',marginBottom:'10%'}}>STATISTICAL PIE CHART</h2>
              </div>
              <div className="form-group col-md-5">
                <div style={{width:'70%', border:'1px solid black', borderRadius:'1rem',paddingTop:'7%',paddingBottom:'7%',paddingLeft:'3%',marginTop:'10%'}}>
                  <div><h2>New Employers:{this.state.newEmp}</h2> </div>
                  <div><h2>Deleted Employers:{this.state.DelEmp}</h2></div>
                  <div><h2>Approved CVs:{this.state.Appcv} </h2></div>
                  <div><h2>Be Accepted:{this.state.Acceptedcv} </h2></div>
                </div>
              </div>
            </div>
            </div>
        );
    }
}

export default MainSta;
