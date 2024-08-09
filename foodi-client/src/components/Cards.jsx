import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const [isHeartfilled, setIsHeartfilled] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();


  //add to cart btn
  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: item._id, // Use 'item' here to refer to the correct object
        name: item.name,
        quantity: 1,
        image: item.image,
        price: item.price,
        email: user.email,
      };
  
      // console.log(cartItem)
      fetch("http://localhost:6001/carts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Item has been added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login!",
        text: "Without an account items cannot be added to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Up",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };


  const handleHeartClick = () => {
    setIsHeartfilled(!isHeartfilled);
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl relative">
        <div
          className={`rating gap-1 absolute right-2 p-4 top-2 heartStar bg-green ${
            isHeartfilled ? "text-rose-500" : "text-white"
          }`}
          onClick={handleHeartClick}
        >
          <FaHeart className="h-5 w-5 cursor-pointer" />
        </div>
        <Link to={`/menu/${item._id}`}>
          <figure>
            <img
              src={item.image}
              alt=""
              className="hover:scale-105 transition-all duration-200 md:h-72"
            />
          </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p>Description</p>

          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold ">
              <span className="text-sm text-red">$</span>
              {item.price}
            </h5>
            <button
              className="btn btn-primary bg-green text-white"
              onClick={() => handleAddtoCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
