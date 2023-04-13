import React, { useEffect } from "react";
import SideBar from "./SideBar.jsx";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import MetaDeta from "../Layout/MetaDeta.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart,
  Legend,
  Tooltip,
  ArcElement,
} from "chart.js";

import "./DashBoard.css";
import { getAdminProducts } from "../../actions/productAction.js";
Chart.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  [Tooltip]
);
const DashBoard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAdminProducts());
    // dispatch(getAllOrders());
    // dispatch(getAllUsers());
  }, [dispatch]);
  let outOfStock = 0;
  // console.log(products);
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  const options = {
    responsive: true,
    plugins: {
      legend: true,
      tooltip: {
        enabled: true, // Set this to true to enable tooltips
        mode: "index", // Set the tooltip display mode
        callbacks: {
          label: function (context) {
            // Custom tooltip content
            return `Value: ${context.formattedValue}`;
          },
        },
      },
      interactions: {
        intersect: false,
      },
    },
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 40000],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaDeta title="Dashboard - Admin Panel" />
      <SideBar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>{/* Total Amount <br /> ₹{totalAmount} */}</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* <p>{users && users.length}</p> */}
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line options={options} data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
