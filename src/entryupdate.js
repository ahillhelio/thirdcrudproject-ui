import React from 'react';

class EntryUpdate extends React.Component {
    state = { 
        name: this.props.entry.name,
        definition: this.props.entry.definition,
        //WHAT ABOUT THESE TWO BELOW? .sources?
        displayName: this.props.entry.sources.displayName,
        link:this.props.entry.link
    }

    handleChange = ( {target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/catalog_entries/${this.props.entry._id}`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(
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
            ) 
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            name: "",
            definition: "",
            displayName: "",
            link:""
        }));
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}> 
                 <input 
                    name="name" 
                    type="text"
                    value={this.state.name}
                    //placeholder= "Updated Entry Name "
                    onChange={this.handleChange}/>
                
                <input 
                    name="definition" 
                    type="text"
                    value={this.state.definition}
                    //placeholder= "Update Definition"
                    onChange={this.handleChange}/>
            
                <input 
                    name="displayName" 
                    type="text"
                    value={this.state.displayName} //WHAT NEEDS TO BE CHANGED? 
                    placeholder= "Update Display Name"
                    onChange={this.handleChange}/>
               
                <input 
                    name="link" 
                    type="text"
                    value={this.state.link}
                    placeholder= "Link"
                    onChange={this.handleChange}/>

                <input type="submit" value="Edit/Update Entry"/>
                <input type="button" value="Cancel" onClick={this.props.refresh}/>
            </form>
        )
    }
}

export default EntryUpdate; 