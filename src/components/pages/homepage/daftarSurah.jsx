import React, { useState, useEffect } from "react";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const DaftarSurah = () => {
  const navigate = useNavigate();
  const [surah, setSurah] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSurah, setFilteredSurah] = useState([]);

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

  useEffect(() => {
    const filtered = surah.filter(
      (s) =>
        s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.arti.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    console.log("filteredSurah:", filtered);
    setFilteredSurah(filtered);
  }, [searchTerm, surah]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("searchTerm:", searchTerm);
  };

  return (
    <>
      {/* Searching */}
      <div className=" bg-white p-2 rounded-3xl shadow-md mt-4 flex items-center">
        <Search className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search Surah"
          className="w-full ml-2 outline-none text-black"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {/* Daftar Surah */}
      <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
        {filteredSurah.length > 0 ? (
          filteredSurah.map((surah) => (
            <div
              key={surah.nomor}
              className="flex items-center bg-white shadow-md rounded-lg p-4 border border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                navigate(`/quranpage/${surah.nomor}`);
              }}
            >
              {/* Nomor Surah */}
              <div className="w-10 h-10 bg-[#8ba378] text-white flex items-center justify-center font-bold text-lg rounded-md transform rotate-45">
                <span className="transform -rotate-45">{surah.nomor}</span>
              </div>
              {/* Nama Surah dan Arti-nya */}
              <div className="ml-3 flex-1 text-black">
                <h2 className="text-[15px] font-semibold">{surah.namaLatin}</h2>
                <p className="text-[13px] text-gray-500">{surah.arti}</p>
              </div>
              {/* Nama Surah Arab dan Jumlah Ayat */}
              <div className="text-right text-black">
                <h3 className="text-[15px] font-semibold">{surah.nama}</h3>
                <p className="text-[12px]">{surah.jumlahAyat} Ayat</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Surah tidak ditemukan.</p>
        )}
      </div>
    </>
  );
};

export default DaftarSurah;
