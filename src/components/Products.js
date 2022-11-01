import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);
  const [delay, setDelay] = useState(0);

  // const[items, setItems]=useState([])
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */

  const performAPICall = async () => {
    const url = `${config.endpoint}/products`;
    setLoader(true);
    try {
      const response = await axios.get(url);
      const productData = response.data;
      setProductData(productData);
      console.log(productData);
      setSuccess(true);
      setLoader(false);
    } catch (e) {
      enqueueSnackbar(e.response.statusText, { variant: "error" });
      setLoader(false);
    }
  };
  useEffect(() => {
    performAPICall();
  }, []);
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    const searchProduct = text.target.value;
    setLoader(true);
    try {
      const response = await axios.get(
        `${config.endpoint}/products/search?value=${searchProduct}`
      );
      setProductData(response.data);
      setLoader(false);
      setSuccess(true);
    } catch (e) {
      if (e.response.status === 404)
      {
        setSuccess(false);
      }
      else {
        enqueueSnackbar(
          'Could not fetch results from backend',
          {
            variant: 'error',
          },
        )
      }
      setLoader(false);
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    if (delay !== 0) {
      clearTimeout(delay);
    }
    const timer = setTimeout(() => performSearch(event), debounceTimeout);
    setDelay(timer);
  };

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <Box>
          <TextField
            className="search-desktop"
            size="small"
            type="text"
            sx={{ width: "20vw" }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for items/categories"
            name="search"
            // value={searchKey}
            onChange={(e) => debounceSearch(e, 500)}
          ></TextField>
        </Box>
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        type="text"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        // value={searchKey}
        onChange={(e) => debounceSearch(e, 500)}
      />
      <Grid container>
        <Grid item className="product-grid">
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>
        </Grid>
      </Grid>
      {!loader ? (
        !success ? (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="loading"
          >
            <Box className="loading">
              <SentimentDissatisfied color="action" />
              <h4 style={{ color: '#636363' }}> No products found </h4>{' '}
            </Box>
          </Grid>
        ) : (
          <Box>
            <Grid container spacing={2}>
              {productData.map((item) => (
                <Grid item xs={6} md={3} key={item._id}>
                  <ProductCard product={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      ) : (
        <Box className="loading">
          <CircularProgress />
          <p>Loading Data...</p>
        </Box>
      )}
      <Footer />
    </div>
  );
};

export default Products;
