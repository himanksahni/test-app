import React from 'react';

const Tables = (props) =>{

    return(

                <tr>
                    <td> <strong> {props.survey}</strong></td>
                    <td className="has-text-centered">
                        <button className="button is-success is-outlined" disabled={props.disabled} onClick={() => props.addSurvey(props.sid)}>Assign</button> &nbsp;
                        <button className="button is-danger is-outlined"  disabled= {props.surdisabled}onClick={() => props.removeSurvey(props.sid)}>Remove</button>
                    </td>
                </tr>
    )
}

export default Tables;