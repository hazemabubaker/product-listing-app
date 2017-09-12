import React from 'react';
import './App.css';
import './table.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/sweetalert2/dist/sweetalert2.css'; 
import swal from '../node_modules/sweetalert2/dist/sweetalert2.js'; 
import $ from 'jquery';
import Modal from './Modal.js';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
 en:{
   product: "Product",
   language: "العربية",
   productId: "Product Id",
   productName: "Product Name",
   serialNumber: "Serial Number",
   quantity: "Quantity",
   price: "Price",
   dateAdded: "Date Added",
   action: "Action",
   deleteAction: "Delete",
   addAction: "Add New Product",
   add: "Add",
   successAdd: "Product successfully added",
   successHeader: "Success",
   failedAdd: "Adding product failed",
   errorHeader: "Oops...",
   deleteConfirmationTitle: "Are you sure? you want to delete the product",
   deleteConfirmationBody: "You won't be able to revert this!",
   confirmButtonText: "Yes, delete it!",
   deleted: "Deleted!",
   deletedMsg: "Product has been deleted.",
   failedDelet: "Deleting product failed"
 },
 ar: {
   product:"المنتجات",
   language: "English",
   productId: "رقم المنتج",
   productName: "اسم النتج",
   serialNumber: "الرقم التسلسلي",
   quantity: "كمية",
   price: "السعر",
   dateAdded: "تاريخ الاضافة",
   action: "العمليات",
   deleteAction: "حذف",
   addAction: "اضافة منتج",
   add: "اضافة",
   successAdd: "تمت اضافة المنتج بنجاح",
   successHeader: "تم",
   failedAdd: "فشل إضافة المنتج",
   errorHeader: "عفوا ...",
   deleteConfirmationTitle: "هل أنت واثق؟ تريد حذف المنتج",
   deleteConfirmationBody: "!لن تكون قادرة على اعادة هذا المنتج",
   confirmButtonText: "نعم، احذفه!",
   deleted: "!تم الحذف",
   deletedMsg: ".تم حذف المنتج",
   failedDelet: "أخفق حذف المنتج"
 }
});

let divDirection = "ltr";

export default class Products extends React.Component {
    constructor() {
        super();
        this.state = { products: [], isModalOpen: false };
        this.handleProduct = this.handleProduct.bind(this);

    }
    switchLanguage() {
      if (strings.getLanguage() === 'en') {
        strings.setLanguage('ar');
        divDirection = "rtl"
      }
      else if (strings.getLanguage() === 'ar') {
        strings.setLanguage('en');
        divDirection = "ltr"
      }
      this.setState({})
    }
    
    handleProduct(e) {
      
      const name = (this.refs.name).value;
      const serialNumber = (this.refs.serialNumber).value;
      const quantity = (this.refs.quantity).value;
      const price = (this.refs.price).value;
      const dateAdded = (this.refs.dateAdded).value;
      
      const product = {name, serialNumber, quantity, price, dateAdded};
      this.closeModal();
      e.preventDefault();
      $.post('http://localhost:5000/products', product).then((response) => {    
          swal(
            strings.successHeader,
            strings.successAdd,
            "success"
          );
      })
      .catch((error) => {
        swal(
          strings.errorHeader, 
          strings.failedAdd, 
          "error"
        );
        console.log(error);
      });
    }
    
    handleDelete(id) {
      
      swal({
        title: strings.deleteConfirmationTitle,
        text: strings.deleteConfirmationBody,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: strings.confirmButtonText
      }).then(function () {
        $.ajax({
        url: 'http://localhost:5000/products/' + id,
        type: 'DELETE',
        success: function (){swal(strings.deleted, strings.deletedMsg, 'success')},
        error: function (){swal(strings.errorHeader, strings.failedDelet,  "error")}
      });
    });
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
          <div dir={divDirection}>
          <input type="button" onClick={() => this.switchLanguage()} value={strings.language} className="btn-class"/> 
          <h1>{strings.product}</h1>
           <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0">
                <thead>
                  <tr>
                  <th>{strings.productId}</th>
                  <th>{strings.productName}</th>
                  <th>{strings.serialNumber}</th> 
                  <th>{strings.quantity}</th>
                  <th>{strings.price}</th>
                  <th>{strings.dateAdded}</th>
                  <th>{strings.action}</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
                <table cellPadding="0" cellSpacing="0">
                <tbody>
                {
                  this.state.products.map((product) => {
                    return (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.serialNumber}</td>
                          <td>{product.quantity}</td>
                          <td>{product.price}</td>
                          <td>{product.dateAdded}</td>
                          <td><span onClick={() => { this.handleDelete(product.id) }} className="fa fa-trash fa-2x" title={strings.deleteAction}></span></td>
                        </tr>
                    )
                  })
              }
              </tbody>
              </table>
              
            </div>
            
            <div>
            <form onSubmit={this.handleProduct}>
              
              <button type="button" className="btn-class" onClick={() => this.openModal()}>{strings.addAction}</button>
              
              <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                <h2>{strings.addAction}</h2>
                <p>{strings.productName}</p>
                <input type="text" id="name" ref="name" required/> 
                <p>{strings.serialNumber}</p>
                <input type="text" id="serialNumber" ref="serialNumber" required/>
                <p>{strings.quantity}</p>
                <input type="text" id="quantity" ref="quantity" required/>
                <p>{strings.price}</p>
                <input type="text" id="price" ref="price" required/>
                <p>{strings.dateAdded}</p>
                <input type="date" id="dateAdded" ref="dateAdded" required/> <br />
                <button type="submit" className="btn-class">{strings.add}</button>
              </Modal>
            </form>
            </div>
          </div>
        );
    }
  }