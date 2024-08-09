import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  //load data
  useEffect(() => {
    //fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        //console.log(data)
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    //call the functions
    fetchData();
  }, []);

  //filter data based on category

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  //show all data
  const showAll = () => {
    setFilteredItems(menu);
    selectedCategory("all");
    setCurrentPage(1);
  };

  // sorting

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    //logic

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localecompare(b.name));
        break;

      case "Z-A":
        sortedItems.sort((a, b) => b.name.localecompare(a.name));
        break;

      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;

      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/*menu banner*/}

      <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center gap-8">
          {/* texts */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For The Love Of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a reasonable price
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>


        {/* filter and sort */}

        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-2 px-2 flex-wrap">
            {/* all category btns */}
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>
        </div>

        {/* sorting base filter */}
        <div className="flex justify-end mb-4 rounded-sm">
          <div className="bg-black p-2">
            <FaFilter className="h-4 w-4 text-white" />
          </div>

          {/* sorting options */}
          <select
            name="sort"
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className="bg-black text-white px-2 py-1 rounded-sm "
          >
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Low-To-High</option>
            <option value="high-to-low">High-To-Low</option>
          </select>
        </div>

        {/* product cards */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
        {/*menu shop sections */}
        <div className="section-container">
        {/* pagination section */}

        <div className="flex justify-center my-8">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full 
                    ${
                      currentPage === index + 1
                        ? "bg-green text-white"
                        : "bg-gray-200"
                    } `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;

