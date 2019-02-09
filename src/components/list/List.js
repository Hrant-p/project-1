import React, { Component } from 'react';
import Loading from '../common/Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import Table from './Table';
import './Table.css';
import Pagination from './Pagination';



class List extends Component {
    constructor(){
        super();

    this.state = {
        error: null,
        currencies: [],
        loading: false,
        page: 1,
        totalPages: 0
        }

    this.handlePaginationClick = this.handlePaginationClick.bind(this)
    }


    fetchCurrency() {

        this.setState({
            loading: true
        })

    
        const { page } = this.state

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse) 
            .then((data) => {
                
                const { currencies, totalPages, page } = data
    
                this.setState({
                    currencies,
                    page,
                    totalPages,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error.errorMessage
                });
            });
    }


    
    componentDidMount() {

        this.fetchCurrency();
    }  

    handlePaginationClick(direction) {
            
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => this.fetchCurrency())};




        render() {

        const { loading, error, currencies, page, totalPages } = this.state;

            if (error) {
                return <div className="error">{error}</div>
            }


            if (loading) {
                return <div className="loading-container"><Loading/></div>
            }

            console.log(this.state)


        return <div>
            <Table 
                currencies={currencies}
                />
            <Pagination 
                page={page}
                totalPages={totalPages}
                handlePaginationClick={this.handlePaginationClick}
                />
        </div>
    }
}



export default List;