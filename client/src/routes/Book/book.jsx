import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Book() {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if (selectCategory) {
          url += `?category=${selectCategory}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          //Data fetching mongodb
          throw new Error("Failed to fetch data.");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };
    

    fetchData(); // Call fetchData function to trigger data fetching
  }, [selectCategory]); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Books</h1>
      <p>
        This is the place you can buy varity of books in one spot
      </p>
      <Link to="/createbook">+ Add New Book</Link>

      <h2>Fetch Example</h2>
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}

      <div className="filter">
        <label>categories</label>
        <select onChange={(e) => setSelectCategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="crime">Crime</option>
          <option value="adventure">Adventure</option>
          <option value="food">Food</option>
          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="classic">Classic</option>
          <option value="science">Science</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />

                <h3>{item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Book;
