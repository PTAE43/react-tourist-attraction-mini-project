import "./App.css";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/Search/SearchBar";
import TripPost from "./components/Post/TripPost";

function App() {

  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      getData(search || "");
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  async function getData(input = "") {
    const query = encodeURIComponent((input ?? "").trim()); //แปลงคำค้นหา
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
      const arr = search.split(" ").filter(Boolean); //แยกข้อความด้วย " " และตัดช่องเวลาเกินข้างหลัง
      if (arr.includes(arg)) {
        setSearch(arr.filter((w) => w !== arg).join(" "));
      } else {
        setSearch([...arr, arg].join(" "));
      }
      return;
    }
  }

  return (
    <div className="flex flex-col mx-auto md:w-[1200px]">

      <div className="flex justify-center items-center mt-[50px] text-5xl text-sky-500">เที่ยวไหนดี</div>
      <div className="flex md:px-20 text-left">ค้นหาที่เที่ยว</div>
      <div className="p-2 md:px-20">
        <SearchBar value={search} onChange={updateSearch} />
      </div>

      <div className="flex flex-col mt-2">
        {locations.map((item, index) => (
          <TripPost
            key={item.id} // ?? `${item.title}-${index}`
            item={item}
            onClickTag={updateSearch}
          />
        ))}
        <ToastContainer />
      </div>
    </div>
  )

}

export default App;
