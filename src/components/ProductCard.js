import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card" variant="outlined" key={product._id}>
      <CardMedia component="img" image={product.image} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          color="text.primary"
        >
          ${product.cost}
        </Typography>
      </CardContent>
      <CardContent>
        <Rating
          name="half-rating-read"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button
          className="card-button"
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
