import React from 'react';
import Survey from '../survey/survey';
import axios from 'axios';

let assSurveys=[]

class Employee extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            surveysList: [],
            assSurveys : assSurveys,
            empSur:[],
            empAss:[],
            value : -1
        }
        this.changeEmp = this.changeEmp.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:7000/employees')
        .then(res => this.setState({employees: res.data}))
        .catch(err => console.log(err))
        

        axios.get('http://localhost:7000/surveys')
        .then(res => this.setState({ surveysList: res.data}))
        .catch(err => console.log(err))
    }

    changeEmp(e){

        this.setState({ value: e.target.value})
        if(e.target.value == -1){
            this.setState({
                empSur: [],
                empAss: []
            })
            return
        }

        const employee = this.state.employees[e.target.value]
        let sur = [...this.state.surveysList]
        let surcopy = []
        let assSur=[]
        let empAss = [] 

        for (let i in employee.assSur){
            empAss.push(employee.assSur[i])
        }

        for (let i in sur){
            if (empAss.includes(sur[i].sid)){
                assSur.push(sur[i])
            }
        }

        for (let i in sur){
            if (!empAss.includes(sur[i].sid)){
                surcopy.push(sur[i])
            }
        }

        this.setState({
            empSur:surcopy,
            empAss:assSur
        })

    }


    render(){
    return(
        <div>
            <div className="columns is-centered">
                <div className="employee has-text-centered">
                <h3>Select Employee</h3>
                    <div className="select">
                        <select onChange={this.changeEmp} value={this.state.value}>
                            <option value={-1}>Select Employee</option>
                            { this.state.employees.map((employee,i) => {
                                return <option key ={i} value={i}>{employee.name}</option>
                            })}
                        </select>
                        </div>
                </div>
            </div>

            <Survey empSur={this.state.empSur} 
                    empAss={this.state.empAss}
                    employees={this.state.employees}
                    employee ={this.state.employees[this.state.value]}/>

            <div className="has-text-centered is-centered">
                <button className="button is-success">Done</button>
            </div>
        </div>
    )
    }
}

export default Employee;
