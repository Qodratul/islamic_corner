import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
import "../../../App.css"

const SlideSurah = ({ onSelect }) => {
    const [surah, setSurah] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurah = async () => {
            try {
                const response = await fetch("https://equran.id/api/v2/surat");
                const data = await response.json();
                setSurah(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSurah();
    }, []);

    const filteredSurah = surah.filter((s) =>
        s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nomor.toString().includes(searchTerm.toString())
    );

    const handleSearch = (surah) => {
        setIsOpen(false);
        onSelect(surah);
        navigate(`/quranpage/${surah.nomor}`);
    };

    return (
        <div className="relative">
            {/* Dropdown Button */}
            <div
                className="bg-white px-4 py-2 flex items-center justify-between w-89 rounded-lg shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-black">{onSelect.namaLatin}</span>
                <ArrowRight size={20} className="text-green-700" />
            </div>

            {/* Dropdown List */}
            {isOpen && (
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-full max-h-[400px] w-89 bg-white rounded-lg shadow-lg mt-2 p-4 overflow-y-auto scrollbar-hide"
                >
                    <input
                        type="text"
                        placeholder="Search Surah"
                        className="w-full p-2 border-b focus:outline-none rounded-full border border-gray-300 text-black"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className="py-2 text-black">
                        {filteredSurah.map((surah) => (
                            <li
                                key={surah.nomor}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSearch(surah)}
                            >
                                {surah.nomor}. {surah.namaLatin}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default SlideSurah;
