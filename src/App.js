import React, { Component } from 'react';
import './App.css';
import './table.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 


class Products extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };

    }
    
    handleClick(event) {
    event.preventDefault();
    console.log("Hazem");
  }
    
    componentDidMount() {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(json=> {
                this.setState({products: json });
            });
    }
    
    render() {        
        return(
          <div>
          <h1>Products</h1>
           <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0">
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
                
                <table cellPadding="0" cellSpacing="0">
                <tbody>
                {
                  this.state.products.map(function(product){
                    return (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.serialNumber}</td>
                          <td>{product.quantity}</td>
                          <td>{product.price}</td>
                          <td>{product.dateAdded}</td>
                          <td><span className="fa fa-trash fa-2x" ></span></td>
                        </tr>
                    )
                  })
              }
              </tbody>
              </table>
            </div>
            <button type="button" className="btn-class" onClick={this.handleClick.bind(this)}>Add New Product</button>
            </div>
        );
    }
}
export default Products;