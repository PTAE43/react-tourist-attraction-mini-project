export default function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="ค้นหาสถานที่เที่ยว..."
            className="w-full p-2 text-center rounded-md border-2 shadow-2xs border-gray-100"
        />
    );
}