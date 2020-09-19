import React, { Component } from 'react';
import {
    Switch,
    Route,
    
  } from "react-router-dom";
import Contact from '../Candidate/Contact';
import SignIn from '../MainPage/SignIn';
import Emp from '../Employer/Emp';
import MainPage from '../MainPage/MainPage';
import NotFound from '../NotFound';
import Employer_ApprovedCV from '../Employer/EmployerApprovedCV';
import EmployerDetail from '../Employer/EmployerDetail';
import Loginadmin from '../Admin/Loginadmin';
import EmployerManagement from '../Admin/Employermanagement'
import Cvmanagement from '../Admin/Cvmanagement';
import MainSta from '../Admin/Statistic/MainSta';
import newEmployer from '../Admin/Statistic/newEmployer';
import deletedEmployer from '../Admin/Statistic/deletedEmployer';
import approvedCv from '../Admin/Statistic/approvedCv';
import detailEmployer from '../Admin/detailEmployer';
import detailCV from '../Admin/detailCV';
import CreateNewEmp from '../Admin/CreateNewEmp';
import EmpDetailAppr from '../Employer/EmpDetailAppr';
import PersonalInfo from '../Employer/PersonalInfo';
import Changepass from '../Employer/Changepass';
import CreateCand from '../Candidate/CreateCand';
import CVpage from '../Candidate/Pages/CVpage';
import ImportCV from '../Candidate/Pages/ImportCV';
import PersonalInfoCand from '../Candidate/Pages/PersonalInfo';
import Changepasscand from '../Candidate/ChangepassCand';
import CVManagementCand from '../Candidate/CVManagement';
import Term from '../MainPage/Term';
import Detail from '../Candidate/Pages/Detail';
import EmployerRejectedCV from '../Employer/EmployerRejectedCV';
import DetailImport from '../Candidate/Pages/DetailImport';
import ContactSinged from '../MainPage/ContactSinged';
import BlogMain from '../Admin/Blog/BlogMain';
import BlogCreate from '../Admin/Blog/BlogCreate';
import BlogDetail from '../Admin/Blog/BlogDetail';
import blogdetail from '../MainPage/blogdetail';
import blogdetailSigned from '../MainPage/blogdetailSigned';
import EmpDetailRej from '../Employer/EmpDetailRej';


class Routes extends Component {
    render() {
        return (
            <Switch>
                {/* Page Candidate */}
                
                <Route exact={true} path="/" component={MainPage}/>
                <Route path="/createCV" component={CVpage}/>
                <Route path="/importCV" component={ImportCV}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/Contactsign" component={ContactSinged}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/register" component={CreateCand}/>
                <Route path="/personalInformation" component={PersonalInfoCand}/>
                <Route path="/cvmanagement" component={CVManagementCand}/>
                <Route path="/changepassword" component={Changepasscand}/>
                <Route path="/TOP" component={Term}/>
                <Route path="/Detail" component={Detail}/>
                <Route path="/DetailImport" component={DetailImport}/>
                <Route path="/:id/FeatureArticle" component={blogdetail}/>
                <Route path="/:id/FeatureArticleSigned" component={blogdetailSigned}/>
                {/* Page Employer */}
                <Route path="/EmployerPage/newcv" component={Emp}/>
                <Route path="/EmployerPage/approvedcv" component={Employer_ApprovedCV}/>
                <Route path="/EmployerPage/rejectedcv" component={EmployerRejectedCV}/>
                <Route path="/EmployerPage/:id/detail" component={EmployerDetail}/>
                <Route path="/EmployerPage/:id/detailApproved" component={EmpDetailAppr}/>
                <Route path="/EmployerPage/:id/detailRejected" component={EmpDetailRej}/>
                <Route path="/EmployerPage/PersonalInformation" component={PersonalInfo}/>
                <Route path="/EmployerPage/ChangePassword" component={Changepass}/>
                {/* Page Administrator */}
                <Route path="/admin/login" component={Loginadmin}/>
                <Route path="/admin/employer" component={EmployerManagement}/>
                <Route path="/admin/cv" component={Cvmanagement}/>
                <Route path="/admin/statistic" component={MainSta}/>
                <Route path="/admin/newemployer" component={newEmployer}/>
                <Route path="/admin/deletedemployer" component={deletedEmployer}/>
                <Route path="/admin/approvedcv" component={approvedCv}/>
                <Route path="/admin/:id/detailEmployer" component={detailEmployer}/>
                <Route path="/admin/:id/detailCV" component={detailCV}/>
                <Route path="/admin/blogmanagement" component={BlogMain}/>
                <Route path="/admin/:id/blogmanagement" component={BlogDetail}/>
                <Route path="/admin/createnewBlog" component={BlogCreate}/>
                <Route path="/admin/Create" component={CreateNewEmp}></Route>
                {/* Page NotFound */}
                <Route component={NotFound}/>
                {/* <Route exact path="" component={NotFound}/> */}
            </Switch>
        );
    }
}

export default Routes;
