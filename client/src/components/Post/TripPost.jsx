import { toast } from "react-toastify";

export default function TripPost({ item, onClickTag }) {

    const handleCopy = () => {
        navigator.clipboard.writeText(item.url);
        toast("คัดลอกแล้ว!!");
    }

    return (
        <div className="my-6">
            <div className="flex flex-col md:flex-row">
                <div className="w-2/6">
                    <img src={item.photos[0]} alt={item.title} className="w-[350px] h-[240px] rounded-3xl object-cover shadow-2xs" />
                </div>
                <div className="flex relative flex-col w-4/6">
                    <div className="text-2xl font-bold">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            {item.title}
                        </a>
                    </div>

                    <div className="w-full my-2 text-[16px]">
                        {item.description.length >= 100 ? item.description.slice(0, 100) + "..." : item.description}
                    </div>
                    <button
                        className="flex text-sky-600 underline cursor-pointer"
                        onClick={() => window.open(item.url, "_blank")}
                    >
                        อ่านต่อ
                    </button>

                    <div className="">
                        หมวดหมู่:
                        {item.tags.map((tag, index) => (
                            <button
                                className="p-4 underline cursor-pointer"
                                key={index}
                                onClick={() => onClickTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}</div>

                    <div className="flex gap-4">
                        {item.photos.slice(1, 4).map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`photos-${index}-${item.title}`}
                                className="w-[80px] h-[80px] rounded-2xl object-cover shadow-2xs" />
                        ))}
                    </div>

                    <button
                        className="flex absolute right-5 bottom-5 text-sky-600 underline cursor-pointer"
                        onClick={handleCopy}
                    >
                        <img
                            src="/icon/clipboard.png"
                            alt="clipboard"
                            className="w-[40px] h-[40px]"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

