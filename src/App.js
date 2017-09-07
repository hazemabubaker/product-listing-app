import React, { Component } from 'react';
import './App.css';
import './table.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import $ from 'jquery'; 


export class Modal extends React.Component {
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#FFFFFF',
      width: '400px',
      height: '500px',
      padding: '10px'
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    return (
      <div>
        <div style={modalStyle}>{this.props.children}</div>
        <div style={backdropStyle} onClick={e => this.close(e)}/>}
      </div>
    )
    
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}

export default class Products extends React.Component {
    constructor() {
        super();
        this.state = { products: [], isModalOpen: false };
        this.addProduct = this.addProduct.bind(this);


    }

    addProduct(e) {
      
      const name = (this.refs.name).value;
      const serialNumber = (this.refs.serialNumber).value;
      const quantity = (this.refs.quantity).value;
      const price = (this.refs.price).value;
      const dateAdded = (this.refs.dateAdded).value;
      
      const product = {name, serialNumber, quantity, price, dateAdded};
      
      e.preventDefault();
      $.post('http://localhost:5000/products', product) 
      alert("Product " + name + " has been added");
        
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
    
    openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
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
            
            <div>
            <form onSubmit={this.addProduct}>
              <button type="button" className="btn-class" onClick={() => this.openModal()}>Add New Product</button>
              <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                <h2>Add New Product</h2>
                <p>Product name</p>
                <input type="text" id="name" ref="name" /> 
                <p>Product serial number</p>
                <input type="text" id="serialNumber" ref="serialNumber"/>
                <p>Product quantity</p>
                <input type="text" id="quantity" ref="quantity"/>
                <p>Product price</p>
                <input type="text" id="price" ref="price"/>
                <p>Product date added</p>
                <input type="date" id="dateAdded" ref="dateAdded"/> <br />
                <button type="submit" className="btn-class">Add</button>
                
              </Modal>
              </form>
            </div>

            </div>
            
        );
    }
}