import React, { Component } from 'react';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import './Search.css';
import './search.png';

 class Search extends Component {
    constructor() {
        super();
    
        this.state = {
            error: null,
            loading: false,
            searchResults: [],
            searchQuery: ""
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    };
  
    handleChange(event) {
        const searchQuery = event.target.value

        this.setState({ searchQuery })

        if (!searchQuery) {
            return '';
        }


        this.setState({ loading: true});

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then((result) => {
            console.log(result)

            this.setState({
                searchResults: result,
                loading: false,
                error: null,
                });
            })
        .catch((error) => {
            this.setState({
                loading: false,
                error: error.errorMessage
                    })
            })
        }


    handleRedirect(cuurrencyId) {
            
        this.setState({
                searchQuery: '',
                searchResults: []
            });

            this.props.history.push(`/currency/${cuurrencyId}`)
        }

    renderSearchResult() {
        const { searchResults, searchQuery, loading } = this.state;

        if(!searchQuery) {
            return ''
        };
        
        if(searchResults.length > 0) { 
            return (
                <div className="Search-result-container">
                    {searchResults.map((result) => {
                        return (
                            <div 
                                className="Search-result"
                                key={result.id}
                                onClick={() => this.handleRedirect(result.id)}
                                >
                                    {result.name} ({result.symbol})
                            </div>
                        )}
                    )}
                </div>
            )}


            if (!loading) {
                return (
                  <div className="Search-result-container">
                    <div className="Search-no-result">
                      No results found.
                    </div>
                  </div>
                );
              }
    } 
  
    render() {

        const { loading, searchQuery } = this.state

    return (
      <div className="Search">
        <span className="Search-icon"/>

        <input 
            type="text"
            className="Search-input"
            placeholder="Currency name"
            onChange={this.handleChange}
            value={searchQuery}
            />

        {loading &&
            <div className="Search-loading">
                <Loading 
                    width='14px'
                    height='14px'
                />
            </div> 
        }
        {this.renderSearchResult()}
      </div>
    )
  }
}



export default withRouter(Search);