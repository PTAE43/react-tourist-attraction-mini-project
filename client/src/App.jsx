import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData(search);
  }, [search]);

  async function getData(input) {
    let query = `${encodeURIComponent((input ?? "").trim())}`; //แปลงคำค้นหา
    try {
      const res = await axios.get(`http://localhost:4001/trips?keywords=${query}`);
      // console.log(res.data.data);
      setLocations(res.data.data);
    } catch (e) {
      console.log(`Error: ${e}`);
      setLocations([]);
    }
  }

  //เพิ่มเติมข้อ Requirement โจทย์เสริม การคลิกปุ่ม หมวดหมู่ ให้เป็นคำค้นหา และเว้นวรรคคำ
  function updateSearch(arg) {
    
    // onChange
    if (arg && arg.target) {
      setSearch(arg.target.value);
    }

    // onClick
    if (typeof arg === "string") {
      const arr = search.split(" ").filter(Boolean);
      if (arr.includes(arg)) {
        setSearch(arr.filter((w) => w !== arg).join(" "));
      } else {
        setSearch([...arr, arg].join(" "));
      }
      return;
    }
  }


  return (
    <div className="App">
      <div className="">เที่ยวไหนดี</div>
      <div className="">ค้นหาที่เที่ยว</div>
      <div className="w-[1200px]">
        <input
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="ค้นหาสถานที่เที่ยว..."
        ></input>
      </div>
      <div className="">
        <div className="flex flex-col">
          {locations.map((item, index) => (
            <li key={index}>
              <div className="">
                <div className="w-[300px] h-[300px]">
                  <img src={item.photos[0]} alt={item.title} className="" />
                </div>
                <div className="flex flex-col">
                  <div className="">{item.title}</div>
                  <div className="">{item.description}</div>
                  <div className="">{item.description}</div>
                  <div className="">อ่านต่อ</div>
                  <div className="">หมวดหมู่: {item.tags.map((tag, index) => (
                    <button
                      className="p-4 underline cursor-pointer"
                      key={index}
                      onClick={() => updateSearch(tag)}
                    >
                      {tag}
                    </button>
                  ))}</div>
                  <div className="flex">{item.photos.slice(1, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`photos-${index}-${item.title}`}
                      className="w-[300px] h-[300px]" />
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
