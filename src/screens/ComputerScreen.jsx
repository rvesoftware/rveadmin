import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  createComputer,
  deleteComputer,
  listComputers,
  removeList,
} from "../actions/computerActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import DivisaFormater from "../components/DivisaFormater";
import * as timeago from "timeago.js";
import swal from "sweetalert";
import {
  COMPUTER_CREATE_RESET,
  COMPUTER_DELETE_RESET,
} from "../constants/computerConstants";
import { listCategories } from "../actions/categoryActions";
import productActions from "../actions/productsActions";

export default function ComputerScreen(props) {
  const computerList = useSelector((state) => state.computerList);
  const { loading, computers } = computerList;

  const productList = useSelector((state) => state.productList);
  const { loading: loadingProducts, data: products } = productList;

  const computerState = useSelector((state) => state.computer);

  computerState.price = computerState.specs.reduce(
    (a, c) => a + Number(c.price) * Number(c.qty),
    0
  );

  console.log(computerState.price);
  const computerCreate = useSelector((state) => state.computerCreate);
  const { success: successCreate } = computerCreate;

  const computerDelete = useSelector((state) => state.computerDelete);
  const { success: successDelete } = computerDelete;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [search, setSearch] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const addList = (name, qty, id) => {
    dispatch(addToList(name, qty));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: COMPUTER_CREATE_RESET });
      setName("");
      setBrand("");
      setPrice("");
      setImage("./img/default.png");
      dispatch(removeList());
    }
    if (successDelete) {
      dispatch({ type: COMPUTER_DELETE_RESET });
    }
    dispatch(listCategories());
    dispatch(listComputers());
    dispatch(productActions.list());
  }, [dispatch, props.history, successDelete, successCreate]);

  console.log(computerState);
  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(
      createComputer({
        ...computerState,
        name,
        brand,
        description,
        image,
        price: computerState.price,
      })
    );
  };

  const deleteHandler = (computer) => {
    swal("Are you sure to delete " + computer.name + "?", {
      icon: "warning",
      buttons: ["Obviously not", "Do that!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! " + computer.name + " deleted", {
          icon: "success",
        });
        dispatch(deleteComputer(computer._id));
      }
    });
  };

  return (
    <>
      {loadingCategories && <LoadingBox></LoadingBox>}
      {errorCategories && (
        <MessageBox variant="danger">{errorCategories}</MessageBox>
      )}
      <div>
        <div className="section__header">
          <button className="btn" onClick={() => setOpenModal(!openModal)}>
            Add Computer
          </button>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : (
              <select
                name=""
                id=""
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">ALL</option>

                {categories.map((categorie) => (
                  <option key={categorie._id} value={categorie._id}>
                    {categorie.name.toUpperCase()}
                  </option>
                ))}
              </select>
            )}
            <select
              name=""
              id=""
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            >
              <option value="">ALL</option>
              <option value="AMD">AMD</option>
              <option value="INTEL">INTEL</option>
            </select>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
              <input
                type="text"
                className="input"
                placeholder="Search a computer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
          </div>
          <table>
            <thead>
              <tr className="thead">
                <th>Image</th>
                <th>Name</th>
                <th>Specs</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Create At</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* {error && <MessageBox>{error}</MessageBox>} */}
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : (
              <tbody>
                {computers.map((computer) => (
                  <tr key={computer._id}>
                    <td className="product__image">
                      <img src={computer.image} alt="" />
                    </td>
                    <td>{computer.name}</td>
                    {loadingProducts ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <td>
                        <details>
                          <>
                            <summary>
                              Specs
                              {/* {computer.specs.map((spec) => (
                                <span> {spec.name}</span>
                              ))} */}
                            </summary>
                            {computer.specs.map((spec) => (
                              <p>
                                <span>{spec.name}</span>
                              </p>
                            ))}
                          </>
                        </details>
                      </td>
                    )}

                    <td>{computer.brand}</td>
                    <td>
                      <DivisaFormater value={computer.price} />
                    </td>
                    <td>{timeago.format(computer.createdAt, "en_US")}</td>
                    <td>
                      <button className="btn-icon">
                        <i className="bx bx-pencil"></i>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => deleteHandler(computer)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <div className={openModal ? "modal active" : "modal"}>
        <div className="doble-modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Add Computer</h2>
              <button
                className="card__title btn-icon"
                onClick={() => setOpenModal(!openModal)}
              >
                <i className="bx bxs-x-circle"></i>
              </button>
            </div>
            <div className="card__body">
              <div>
                <form action="">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value.toUpperCase())}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name=""
                      id=""
                      onChange={(e) => setImage(e.target.value)}
                    >
                      <option value="./img/cases/unitec.png">Unitec</option>
                      <option value="./img/cases/rve02.png">
                        RVE Sport 02
                      </option>
                      <option value="./img/cases/rve03.png">
                        RVE Sport 03
                      </option>
                      <option value="./img/cases/rve04.png">
                        RVE Sport 04
                      </option>
                      <option value="./img/cases/rve05.png">
                        RVE Sport 05
                      </option>
                      <option value="./img/cases/rockstar.png">Rockstar</option>
                      <option value="./img/cases/optical.png">
                        Gamemax Optical
                      </option>
                      <option value="./img/cases/invader.png">
                        XPG Invader
                      </option>
                      <option value="./img/cases/elysium.png">
                        Gamemax Elysium
                      </option>
                      <option value="./img/cases/diamond.png">
                        Gamemax Diamond
                      </option>
                      <option value="./img/cases/blackhole.png">
                        Gamemax Black Hole
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Price"
                      value={computerState.price}
                      readOnly
                    />
                  </div>
                </form>
              </div>
              <form action="">
                {loadingProducts ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        // value={cpu}
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">CPU</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614277871873780023b43881"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">WATER COOLING</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614298665bd5c90023262c17"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">MOTHERBOARD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "6142778e1873780023b43885"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">RAM</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614277b71873780023b4388d"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">SSD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614277c41873780023b43891"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value={1}>HDD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614277cf1873780023b43895"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">GRAPHICS CARD</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614277a41873780023b43889"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">POWER SUPPLY</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "6148de305b1d5d00233599c1"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">CASE</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614277da1873780023b43899"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        name=""
                        id=""
                        onChange={(e) => addList(e.target.value, 1)}
                      >
                        <option value="">MONITOR</option>

                        {products
                          .filter(
                            (product) =>
                              product.category === "614f6e4e3bc91d0023852308"
                          )
                          .map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="card__footer">
              <button className="btn" onClick={submitHandler}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
