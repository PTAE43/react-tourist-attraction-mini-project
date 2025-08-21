import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
        <input
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="ค้นหาสถานที่เที่ยว..."
          w
          className="w-full p-2 text-center rounded-md border-2 shadow-2xs border-gray-100"
        ></input>
      </div>

      <div className="flex flex-col mt-2">
        {locations.map((item, index) => (
          <div key={index} className="my-6">
            <div className="flex flex-col md:flex-row">

              <div className="w-2/6">
                <img src={item.photos[0]} alt={item.title} className="w-[350px] h-[240px] rounded-3xl object-cover shadow-2xs" />
              </div>

              <div className="flex relative flex-col w-4/6">
                <div className="text-2xl font-bold">
                  <a
                    href={item.url}
                    target="_blank"
                    className="hover:underline"
                  >
                    {item.title}
                  </a>
                </div>

                <div className="w-full my-2 text-[16px]">
                  {/* array.slice(start, end); */}
                  {item.description.length >= 100 ? item.description.slice(0, 100) + "..." : item.description}
                </div>

                <button
                  className="flex text-sky-600 underline cursor-pointer"
                  onClick={() => window.open(item.url, "_blank")}
                >
                  อ่านต่อ
                </button>

                <div className="">หมวดหมู่: {item.tags.map((tag, index) => (
                  <button
                    className="p-4 underline cursor-pointer"
                    key={index}
                    onClick={() => updateSearch(tag)}
                  >
                    {tag}
                  </button>
                ))}</div>

                <div className="flex gap-4">{item.photos.slice(1, 4).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`photos-${index}-${item.title}`}
                    className="w-[80px] h-[80px] rounded-2xl object-cover shadow-2xs" />
                ))}</div>

                {/* onClick={() => { navigator.clipboard.writeText(this.state.textToCopy) }} */}
                <button
                  className="flex absolute right-5 bottom-5 text-sky-600 underline cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    alert("คัดลอกลิงก์แล้ว: " + item.url);
                  }}
                >
                  <img src="/icon/clipboard.png"
                    alt="clipboard"
                    className="w-[40px] h-[40px]"
                  />
                </button>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  )

}

export default App;
