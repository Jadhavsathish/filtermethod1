import { useEffect, useState } from "react";
import "./card.css";
import ReactDOM from "react-dom";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const api = "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093";
export default function Card() {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  console.log(tempData);
  console.log(data);
  const updatedSearch = (e) => {
    const val = e.target.value;
    if (val) {
      const filter = data.filter((item) => {
        const keys = Object.keys(item);
        const any = keys.some(
          (key) =>
            item[key] &&
            item[key].toString().toLowerCase().includes(val.toLowerCase())
        );
        return any;
      });
      setTempData(filter);
    } else {
      setTempData(data);
    }
  };

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((fetchdata) => {
        console.log(fetchdata);
        setData(fetchdata.data);
        setTempData(fetchdata.data);
        console.log(fetchdata);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-container">
      <div className="wrapper">
        <div className="inner-container">
          <section className="header">
            <h1 className="main-heading">PLP</h1>
            <div className="searchBar">
              <input
                onChange={updatedSearch}
                className="typeBar"
                type="text"
                placeholder="Type something to search ..."
              />
              {/* <FontAwesomeIcon icon="fa-light fa-grid-2" />
                          <FontAwesomeIcon icon="fa-light fa-list" /> */}
              <span> == </span>
              <span> == </span>
            </div>
          </section>
          {tempData.map((list, index) => {
            return (
              <section className="sub-card">
                {console.log(list)}
                <div className="card" key={index}>
                  <span className="sub-heading">NEW</span>
                  <img
                    src={list.product_image}
                    alt="cap"
                    width="175px"
                    height="175px"
                    className="image"
                  />
                </div>
                <div className="content">
                  <h2 className="head">{list.product_title}</h2>
                  <p className="value">{list.product_variants[0].v1}</p>
                  <p className="value">{list.product_variants[1].v2}</p>
                  <p className="value">{list.product_variants[2].v3}</p>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
