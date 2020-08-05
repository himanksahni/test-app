import React from 'react';
import AssignedSurveys from './assigned_surveys';
import SurveyList from './survey_list';

class Survey extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            surveys: this.props.empSur,
            assignedSurveys: this.props.empAss,
            employees: this.props.employees,
            employee: this.props.employee
        }
        this.assignSurvey = this.assignSurvey.bind(this)
        this.removeSurvey = this.removeSurvey.bind(this)
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
         this.setState({
          surveys:this.props.empSur,
          assignedSurveys: this.props.empAss,
          employees: this.props.employees,
          employee: this.props.employee
         })
        }
    }

    assignSurvey(sid){
        let newSurvey = ""
        var indx
        for (indx in this.state.surveys){
            if (this.state.surveys[indx].sid === sid){
                newSurvey = this.state.surveys[indx]
            }
        }
        let newAss = [...this.state.assignedSurveys, newSurvey]
        let newSurList = this.state.surveys.filter(survey=>{
           return survey.sid!==sid
        })

        this.setState({
            surveys: newSurList,
            assignedSurveys: newAss})

        this.state.employee.assSur.push(sid)

    }

    removeSurvey(sid){
        let newSurvey = ""
        var indx
        for (indx in this.state.assignedSurveys){
            if (this.state.assignedSurveys[indx].sid === sid){
                newSurvey = this.state.assignedSurveys[indx]
            }
        }
        let newSurrList = [...this.state.surveys, newSurvey]
        let newAss = this.state.assignedSurveys.filter(survey=>{
           return survey.sid!==sid
        })

        this.setState({
            surveys: newSurrList,
            assignedSurveys: newAss})

        const newAssSur = this.state.employee.assSur.filter(assSid=>{
            return assSid !== sid;
        })
        let newEmployee = {}
        newEmployee = Object.assign(newEmployee, this.state.employee)
        newEmployee.assSur = newAssSur
        this.setState({
            employee: newEmployee
        })

    }

    render(){
        return(
            <div className="columns">
                    <SurveyList surveys={this.state.surveys} addSurvey = {this.assignSurvey}/>
                    <AssignedSurveys assSurveys={this.state.assignedSurveys} removeSurvey={this.removeSurvey}/>

            </div>
        )
    }
}

export default Survey