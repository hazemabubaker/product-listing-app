import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './table.js';
import $ from 'jquery'
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 


class ProductLister extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
    }
    
    componentDidMount() {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(json=> {
              console.log(json);
                this.setState({products: json });
            });
    }
    
    render() {        
        return(
          <div>
          <h1>Products</h1>
           <div className="tbl-header">
              <table cellpadding="0" cellspacing="0" border="0">
                <thead>
                  <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Serial Number</th> 
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Date Added</th>
                  <th>Action</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
                
                <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                {
                  this.state.products.map(function(product){
                    return (
                      // <li key={product.id}><span>{product.name}</span></li>
                    
                        <tr>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.serialNumber}</td>
                          <td>{product.quantity}</td>
                          <td>{product.price}</td>
                          <td>{product.dateAdded}</td>
                          <td><button type="button" className="fa fa-trash-o">Delete Product</button></td>
                        </tr>
                    )
                  })
              }
              </tbody>
              </table>
            </div>
            </div>
        );
    }
}
export default ProductLister;