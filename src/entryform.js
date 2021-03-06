import React from 'react';

class EntryForm extends React.Component{
    state = { // what to do to get displayName and link under the umbrella of "source"?
        name: "",
        definition: "",
        displayName: "",
        link:""
    }

    handleChange = ( {target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();

    

        fetch(`${process.env.REACT_APP_API_URL}/api/catalog_entries`, {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify([
                { 
                    name : this.state.name, 
                    definition : this.state.definition, 
                    sources: [
                        {
                         displayName : this.state.displayName, 
                         link : this.state.link
                        }
                    ]
                }
            ]) 
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            name: "",
            definition: "",
            displayName: "",
            link:""
        }));
    }

    render () {
        return(
            <form onSubmit={this.handleSubmit}> 
                <input 
                    name="name" 
                    type="text"
                    value={this.state.name}
                    placeholder= "Entry"
                    onChange={this.handleChange}/>
                
                <input 
                    name="definition" 
                    type="text"
                    value={this.state.definition}
                    placeholder= "Definition"
                    onChange={this.handleChange}/>
            
                <input 
                    name="displayName" 
                    type="text"
                    value={this.state.displayName}
                    placeholder= "Display Name"
                    onChange={this.handleChange}/>
               
                <input 
                    name="link" 
                    type="text"
                    value={this.state.link}
                    placeholder= "Link"
                    onChange={this.handleChange}/>

                <input type="submit" value="Add Entry"/>
                {/* Same question */}
                <input type="button" value="Cancel" onClick={this.props.refresh}/> 

            </form>
        ) 
    }

}

export default EntryForm; 