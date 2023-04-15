import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaDeta from "../Layout/MetaDeta";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 120,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const { error, products } = useSelector((state) => state.products);
  const rows = [];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: "delete_product_reset" });
    }
    dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaDeta title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
