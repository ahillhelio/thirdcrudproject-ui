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

        updateEntry = (entry) => {
            this.setState({
                updateEntry: entry,
                isCreate: false,
            })
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
                result = (<EntryForm key="createForm" refresh={this.getEntry} />);
            }else{
                result = <EntryForm/>
                const data = this.state.updateEntry;
                result= <EntryUpdate key={data._id} entry={data} refresh={this.getEntry}/>;
            }
            return result;
        };

        componentDidMount (){ 
            this.getEntry();
        };

        render(){ 
            console.log(this.state.entry)
            const displayEntry = this.state.entry.map((entry) => {

                const entrySource = entry.sources.map((source) => {
                        return (<div>
                                Display Name: {source.displayName} 
                                <br></br>
                                {/* Link: {source.link}  */}
                                <a href={source.link}> Link to Resource </a>
                                {/* //HTH Do I add an anchor tag? */}
                        </div>)
                })
                    return (<div>
                        Entry: {entry.name}
                        <br></br>
                        Definition: {entry.definition}  
                        <br></br>
                        {entrySource}
                        <DeleteEntry entry={entry} 
                        deleteEntry={this.deleteEntry}
                        updateEntry={this.updateEntry} //NEEDS TO BE ADDED
                        />
                    </div> 
                    )
            
            })      

            console.log(this.state.entry);
            return (
                <>
                <h2>ENTRIES</h2>
                {this.renderForm()}
                {displayEntry} 
                
                </>
            )
        }            
};
export default Entry; 