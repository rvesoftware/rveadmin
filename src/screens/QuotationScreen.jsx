import React, { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listComputers } from '../actions/computerActions';
import productsActions from '../actions/productsActions';
import { listCategories } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import DivisaFormater from '../components/DivisaFormater';
import {
  addToCart,
  createQuotation,
  listQuotations,
  removeItem,
  removeItems,
} from '../actions/quotationActions';
import { QUOTATION_CREATE_RESET } from '../constants/quotationConstants';
import ReactToPdf from 'react-to-pdf';
import '../styles/invoice.css';
export default function QuotationScreen(props) {
  const [note, setNote] = useState(
    'Real Visión Enterprise garantiza a sus clientes el servicio de reparación sin costo por repuesto o mano de obra, por un periodo de 3 meses los cuales inician a partir de la fecha de compra del computador, de igual modo se le proporciona una garantía de 12 meses, la cual inicia a partir de la fecha de compra del equipo.'
  );
  const [name, setName] = useState('');
  const [type, setType] = useState('products');

  const quotationState = useSelector((state) => state.quotation);

  const computerList = useSelector((state) => state.computerList);
  const { loading, computers } = computerList;

  const productList = useSelector((state) => state.productList);
  const { loading: loadingProducts, data: products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategories, categories } = categoryList;

  const quotationList = useSelector((state) => state.quotationList);
  const { loading: loadingQuotations, quotations } = quotationList;

  const quotationCreate = useSelector((state) => state.quotationCreate);
  const { success: successCreate } = quotationCreate;

  let code = 10434;
  if (!loadingQuotations) {
    if (quotations.length > 0) {
      code = quotations[quotations.length - 1].code + 1;
    }
  }

  const dispatch = useDispatch();

  quotationState.price = quotationState.items.reduce(
    (a, c) => a + Number(c.price) * Number(c.qty),
    0
  );

  const createHandler = () => {
    console.log('entro');
    dispatch(
      createQuotation({
        ...quotationState,
        code,
        clientName: name,
        note,
      })
    );
    // dispatch(removeItems());
  };

  const clearScreen = () => {
    dispatch(removeItems());
  };

  const addItem = (name, qty, id, pos) => {
    if (name === '') {
      dispatch(removeItem(id));
    } else {
      dispatch(addToCart(name, qty, pos));
    }
  };

  const setQuotationType = () => {
    setType(type === 'products' ? 'computer' : 'products');
    dispatch(removeItems());
    dispatch({ type: QUOTATION_CREATE_RESET });
  };


  const ref = createRef();
  const options = {
    orientation: 'portrait',
    unit: 'px',
    // format: [8, 4],
  };
  const date = new Date();
  const componentRef = useRef();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: QUOTATION_CREATE_RESET });
      dispatch(removeItems());
      setName('');
    }
    dispatch(listQuotations());
    dispatch(listComputers());
    dispatch(listCategories());
    dispatch(productsActions.list());
  }, [dispatch, props.history, successCreate]);

  return (
    <div>
       <div className="section__header">
       <button className="btn" onClick={() => createHandler()}>
            Save Quotation
          </button>
            <div>
            <div className="select_quotation-type">
            <div className="check__button">
              <label htmlFor="computer">Computer</label>
              <div className="ball" onClick={() => setQuotationType()}>
                <div
                  className={type === 'products' ? 'check-left' : 'check'}
                ></div>
              </div>
              <label htmlFor="products">Products</label>
            </div>
          </div>

            <ReactToPdf
            targetRef={ref}
            filename={`${name}-${code}`}
            options={options}
            x={0}
            y={0}
            scale={1}
          >
            {({ toPdf }) => <button className="btn-none" onClick={toPdf}>Generate pdf</button>}
          </ReactToPdf>
          <button className="btn-none" onClick={() => clearScreen()}>
            Clear
          </button>
            </div>
          </div>
      <div className="clean__body">
        <div className="flex">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="text" value={code} readOnly className="form-control" />
          </div>
          <p className="total">
            <DivisaFormater
              value={quotationState.items.reduce(
                (a, c) => a + Number(c.price) * Number(c.qty),
                0
              )}
            ></DivisaFormater>
          </p>
        </div>

        <div className="flex p-20">
         
        </div>

        <div className={type === 'computer' ? 'computer' : 'display-none'}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : (
            <div>
              <div className="form-group">
                <select name="" id="" className="form-control">
                  <option value="">None</option>
                  {computers.map((computer) => (
                    <option>{computer.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div
          ref={componentRef}
          className={type === 'products' ? 'card pb-50 products' : 'display-none'}
        >
          <div className="division">

          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : (
              <tbody>
                {categories.filter((category, index) => index < categories.length/2  )
                .map((category) => (
                  <tr id={category._id}>
                    {loadingProducts ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        <td>
                          <div className="form-group">
                            <select
                              name=""
                              id=""
                              className="form-control"
                              onChange={(e) =>
                                addItem(
                                  e.target.value,
                                  1,
                                  e.target.itemname,
                                  category.length
                                )
                              }
                            >
                              <option value="">{category.name}</option>
                              {products
                                .filter(
                                  (product) => product.category === category._id
                                )

                                .map((product) => (
                                  <option
                                    itename={product.name}
                                    value={product._id}
                                  >
                                    {product.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              value={quotationState.items
                                .filter((q) => q.product === category._id)
                                .map((q) =>
                                  q.product === category._id ? q.qty : 1
                                )}
                              onChange={(e) =>
                                quotationState.items
                                  .filter((q) => q.product === category._id)
                                  .map((q) =>
                                    q.product === category._id
                                      ? addItem(
                                          q.id,
                                          e.target.value,
                                          q.name,
                                          category.length
                                        )
                                      : 1
                                  )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              id="price"
                              value={quotationState.items
                                .filter((q) => q.product === category._id)
                                .map((q) =>
                                  q.product === category._id
                                    ? Number(q.price)
                                    : 0
                                )}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              value={quotationState.items
                                .filter((q) => q.product === category._id)
                                .map((q) =>
                                  q.product === category._id
                                    ? Number(q.price * q.qty)
                                    : 0
                                )}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
              <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : (
              <tbody>
                {categories.filter((category, index) => index > categories.length/2  )
                .map((category) => (
                  <tr id={category._id}>
                    {loadingProducts ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        <td>
                          <div className="form-group">
                            <select
                              name=""
                              id=""
                              className="form-control"
                              onChange={(e) =>
                                addItem(
                                  e.target.value,
                                  1,
                                  e.target.itemname,
                                  category.length
                                )
                              }
                            >
                              <option value="">{category.name}</option>
                              {products
                                .filter(
                                  (product) => product.category === category._id
                                )

                                .map((product) => (
                                  <option
                                    itename={product.name}
                                    value={product._id}
                                  >
                                    {product.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              value={quotationState.items
                                .filter((q) => q.product === category._id)
                                .map((q) =>
                                  q.product === category._id ? q.qty : 1
                                )}
                              onChange={(e) =>
                                quotationState.items
                                  .filter((q) => q.product === category._id)
                                  .map((q) =>
                                    q.product === category._id
                                      ? addItem(
                                          q.id,
                                          e.target.value,
                                          q.name,
                                          category.length
                                        )
                                      : 1
                                  )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              id="price"
                              value={quotationState.items
                                .filter((q) => q.product === category._id)
                                .map((q) =>
                                  q.product === category._id
                                    ? Number(q.price)
                                    : 0
                                )}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              value={quotationState.items
                                .filter((q) => q.product === category._id)
                                .map((q) =>
                                  q.product === category._id
                                    ? Number(q.price * q.qty)
                                    : 0
                                )}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          </div>

          <div className="notes">
            <label htmlFor="">Aditional Note</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="form-control-text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          {/* <ReactToPrint
            trigger={() => (
              <button className="btn" onClick={() => createHandler()}>
                Print Out
              </button>
            )}
            content={() => componentRef.current}
          /> */}

          <div className="invoice" ref={ref}>
            <div className="invoice__header">
              <div className="left">
                <div className="logo">
                  <img src="/img/rve-logo.png" alt="" />
                </div>
              </div>
              <div className="right">
                <ul>
                  <h2>Real Vision Enterprise</h2>
                </ul>
                <ul>
                  <p>Carrera 81 # 45-168</p>
                </ul>
                <ul>
                  <p>Medellin</p>
                </ul>
                <ul>
                  <p>Colombia</p>
                </ul>
                <ul>
                  <p>050005</p>
                </ul>
              </div>
            </div>
            <div className="invoice__top">
              <ul className="left">
                <li>
                  <h2>{name}</h2>
                </li>
              </ul>
              <ul className="right">
                <li>
                  <h2 className="title">COTIZACION</h2>
                </li>
                <li>#AA-{code}</li>
                <li>
                  {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/
                  {date.getMonth() < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1}
                  /{date.getFullYear()}{' '}
                </li>
              </ul>
            </div>
            <div className="line"></div>
            <table className="even__table">
              <thead>
                <th>Articulo</th>
                <th className="right">Unidades</th>
                <th className="right">Precio Unitario</th>
                <th className="right">Total</th>
              </thead>
              <tbody>
                {quotationState.items.map((item) => (
                  <>
                    <tr key={item.id}>
                      <td classNam="td">{item.name}</td>
                      <td className="td number">{item.qty}</td>
                      <td className="td number">
                        <DivisaFormater
                          value={Number(item.price).toFixed(0)}
                        ></DivisaFormater>
                      </td>
                      <td className="number">
                        <DivisaFormater
                          value={Number(item.qty * item.price).toFixed(0)}
                        ></DivisaFormater>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className="invoice__bottom">
              <p className="invoice__notes left">
                <strong> NOTA: </strong> {note}
              </p>
              <h2 className="total__price right">
                <DivisaFormater
                  value={quotationState.items.reduce(
                    (a, c) => a + Number(c.price) * Number(c.qty),
                    0
                  )}
                ></DivisaFormater>
              </h2>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
