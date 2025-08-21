import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  async function getData(input) {
    let query = input;
    try {
      const res = await axios.get(`http://localhost:4001/trips?keywords=${query}`);
      // console.log(res.data.data);
      setLocations(res.data.data);
    } catch (e) {
      console.log(`Error: ${e}`);
      setLocations([]);
    }
  }

  // const handleClickTags = (e) => {
  //   const [name,value] = e.target;
  //   setSearch(() => ...pr)
  // }

  useEffect(() => {
    const t = setTimeout(() => {
      getData(search);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="App">
      <div className="">เที่ยวไหนดี</div>
      <div className="">ค้นหาที่เที่ยว</div>
      <div className="">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาสถานที่เที่ยว..."
        ></input>
      </div>
      <div className="">
        <div className="">
          {locations.map((item, index) => (
            <li key={index}>
              <div className="">
                <div className="">
                  <img src={item.photos[0]} alt={item.title} className="" />
                </div>
                <div className="">
                  <div className="">{item.title}</div>
                  <div className="">{item.description}</div>
                  <div className="">{item.description}</div>
                  <div className="">อ่านต่อ</div>
                  <div className="">หมวดหมู่: {item.tags.map((tag, index) => (
                    <p key={index}><span>{tag}</span></p>
                  ))}</div>
                  <div className="">หมวดหมู่: {item.photos.slice(1, 4).map((photo, index) => (
                    <img key={index} src={photo} alt={`photos-${index}-${item.title}`} className="" />
                  ))}</div>
                </div>
              </div>
            </li>

          ))}
        </div>
      </div>

    </div>
  )

}

export default App;
