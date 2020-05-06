import React, { Component } from 'react';
import EntryForm from './entryform';
import EntryUpdate from './entryupdate'
import DeleteEntry from './deleteentry'

class Entry extends Component { //do I need to do anything special to retrieve Array this time?
    constructor(props){
        super(props);
        this.state ={
            entry : [

            ],
            isCreate : true,
        }
    }

        getEntry = () => {
            fetch(`${process.env.REACT_APP_API_URL}/api/catalog_entries`) 
            .then(response => response.json())
            .then(data => this.setState( {entry : data, isCreate: true } ));
        };

        deleteEntry = (id) => {
            fetch(`${process.env.REACT_APP_API_URL}/api/catalog_entries/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(console.log)
            .then(this.getEntry);
        }

        renderForm = () => {
            let result;
            if (this.state.isCreate){
                result(<EntryForm key="createForm" refresh={this.getEntry} />);
            }else{
                const data = this.state.updateEntry;
                result= <EntryUpdate key={data._id} entry={data} refresh={this.getEntry}/>;
            }
            return result;
        };

        componentDidMount (){ 
            this.getEntry();
        };

        render(){ 
            const displayEntry = this.state.entry.map((entry) => {

                const entrySource = entry.sources.map((source) => {
                    return (<div>{source.displayName}, {source.link}</div>)
                    })
                return (<div>{entry.name}, {entry.definition} {entrySource}</div> )
            })            
            console.log(this.state.entry);
            return (
                <>
                <h3>ENTRIES</h3>
                {displayEntry}
                </>
            )
        }            
};
export default Entry; 