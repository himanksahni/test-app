import React from 'react';
import Tables from './tables';


class AssignedSurveys extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            assignedSurveys: this.props.assSurveys,
            search:""
        }
        this.changeSearch = this.changeSearch.bind(this)
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
         this.setState({
          assignedSurveys:this.props.assSurveys,
         })
        }}

        changeSearch(e){
            const value = e.target.value
            this.setState({
                search: value
            })
        }

    render(){

        const {assignedSurveys} = this.state;
        let filteredSur = assignedSurveys.filter(survey =>{
            return survey.name.indexOf(this.state.search) !== -1
        })
        return(
                <div className="column is-centered has-text-centered">
                    Assigned Surveys
                    <div className="field">
                        <label className="level-left label is-inline"> Search</label>
                            <input className="input is-inline-block" value={this.state.search} onChange={this.changeSearch} type="text" placeholder="Search Surveys"/>
                    </div>

                    <div className="table-container">
                            <table className="table is-bordered is-striped is-narrow is-fullwidth">
                                <tbody>
                                    {filteredSur.map( (survey) => {
                                                return <Tables survey={survey.name} 
                                                                key={survey.sid} 
                                                                removeSurvey={this.props.removeSurvey} 
                                                                sid={survey.sid}
                                                                disabled="disabled"/>
                                        })
                                    }
                            </tbody>
                            </table>
                        </div>
                </div>

        )
    }
}

export default AssignedSurveys