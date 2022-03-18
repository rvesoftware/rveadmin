import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions.js";
import productActions from "../actions/productsActions.js";
import * as timeago from "timeago.js";
import DivisaFormater from "../components/DivisaFormater.jsx";
import swal from "sweetalert";
import constantsTemplate from "../constants/constantsTemplate.js";


export default function ProductScreen() {

  const productList = useSelector((state) => state.productList);
  const { loading, data } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading : loadingSuccess, success: successDelete } = productDelete;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategories, categories } = categoryList;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading : loadingCreate, success: successCreate } = productCreate;


  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [wattage, setWattage] = useState("");

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {

    if(successDelete){
      const productConstants = new constantsTemplate("PRODUCT");
      dispatch({type: productConstants.constants().DELETE_RESET})
    }

    if(successCreate){
      const productConstants = new constantsTemplate("PRODUCT");
      dispatch({type: productConstants.constants().CREATE_RESET});
      setName("");
      setCategory("");
      setBrand("");
      setImage("");
      setPrice("");
      setWattage("");
    }
    dispatch(listCategories());
    dispatch(productActions.list());
  }, [dispatch, successDelete, successCreate]);

  const deleteHandler = (product) => {
    swal("Are you sure to delete " + product.name + "?", {
      icon: "warning",
      buttons: ["Obviously not", "Do that!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! " + product.name + " deleted", {
          icon: "success",
        });
        dispatch(productActions.delete(product._id));
      }
    });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(productActions.create({name, category, brand, image, price, wattage}));
  };



  return (
    <>
      {loading ? (
        <p>CARGANDO...</p>
      ) : (
        <div>
          <div className="section__header">
            <button className="btn" onClick={() => setOpenModal(true)}>Add Product</button>
            <div>
              <select name="" id="">
                <option value="">FILTER</option>
              </select>
              <button className="btn-none">EXPORT</button>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <input type="text" className="input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loadingCategories ? (
                <h3>Cargando...</h3>
              ) : (
                <tbody className="list-over">
                  {data.filter((product) => product.name.toUpperCase().includes(search.toUpperCase()))
                  .map((product, index) => (
                    <tr key={product._id}>
                      <th>{index + 1}</th>
                      <th>{product.name}</th>
                      {categories
                        .filter((category) => category._id === product.category)
                        .map((category) => (
                          <th key={category._id}>{category.name}</th>
                        ))}
                      <th>{product.brand}</th>
                      <th><DivisaFormater value={product.price} /></th>
                      <th>{product.status? <span className="status-active">Active</span>: <span className="status-inactive">Inactive</span>}</th>
                    <td>{timeago.format(product.createdAt)}</td>

                      <th>                      <button className="btn-icon">
                        <i className="bx bx-pencil"></i>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => deleteHandler(product)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button></th>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}

<div className={openModal ? "modal active" : "modal"}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title" >Add Product</h2>
              <button
                className="card__title btn-icon"
                onClick={() => setOpenModal(!openModal)}
              >
                <i className="bx bxs-x-circle"></i>
              </button>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  {loadingCategories? <h3>Loading...</h3> : (

                    <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">CATEGORY</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                      ))}
                  </select>
                    )}
                </div>
                          <div className="form-group">
                  <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="wattage"
                    value={wattage}
                    onChange={(e) => setWattage(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="card__footer">
              <button className="btn" onClick={submitHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
