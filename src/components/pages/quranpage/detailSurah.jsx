import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ArrowLeft, Speech} from "lucide-react";
import "../../../App.css"

const DetailSurah = () => {
    const {nomorSurah}  = useParams();
    const [ayat, setAyat] = useState([]);
    const [surah, setSurah] = useState([]);
    const [selectedQari, setSelectedQari] = useState("01");
    const [audioPlaying, setAudioPlaying] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchAyat = async () => {
            try {
                const response = await fetch(`https://equran.id/api/v2/surat/${nomorSurah}`);
                const data = await response.json();
                setAyat(data.data.ayat);
                setSurah(data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAyat();
    }, [nomorSurah]);

    const qariList = [
        { id: "01", name: "Abdullah" },
        { id: "02", name: "Abdul" },
        { id: "03", name: "Abdurrahman" },
        { id: "04", name: "Ibrahim" },
        { id: "05", name: "Misyari" },
    ];

    const playAudio = (url) => {
        if (audioPlaying) {
            audioPlaying.pause();
        }
        const newAudio = new Audio(url);
        newAudio.play();
        setAudioPlaying(newAudio);
    };

    return (
       <>
           <div className="min-h-screen bg-[#8ba378] p-4 rounded-2xl">
               {/* Header */}
               <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg shadow-md">
                   <div
                       className=" flex items-center gap-2 font-semibold bg-white rounded-full p-2 cursor-pointer"
                       onClick={() => navigate(-1)}
                   >
                       <ArrowLeft size={20} className="text-green-700 bg-white" />
                   </div>
                   <span className="text-green-700 font-bold text-[2rem]">{surah?.namaLatin}</span>
               </div>

               {/* Pilihan Qari */}
               <div className="bg-orange-100 rounded-lg p-4 mt-4 flex gap-2 justify-center">
                   {qariList.map((qari) => (
                       <div
                           key={qari.id}
                           className={`px-4 py-2 rounded-lg font-medium  cursor-pointer ${
                               selectedQari === qari.id ? "bg-green-700 text-white" : "bg-[#F8F6E3] text-green-700"
                           }`}
                           onClick={() => setSelectedQari(qari.id)}
                       >
                           {qari.name}
                       </div>
                   ))}
               </div>

               {/* Daftar Ayat */}
               <div className="mt-4">
                   {ayat.map((ayat) => (
                       <div key={ayat.nomorAyat} className="bg-orange-100 p-4 rounded-lg shadow-md mb-3">
                           <div className="flex  items-center">
                            <span className="bg-white text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                                {ayat.nomorAyat.toString().padStart(3, "0")}
                            </span>
                               <div
                                   className="bg-white text-gray-600 p-1 rounded-full ml-2 cursor-pointer"
                                   onClick={() => playAudio(ayat.audio[selectedQari])}
                               >
                                   <Speech size={20} className={"text-green-700"}/>
                               </div>
                           </div>
                           <p className="text-right text-3xl font-semibold text-justify text-green-700 mt-3 arabic">{ayat.teksArab}</p>
                           <p className="text-gray-600 italic text-justify mt-2">{ayat.teksLatin}</p>
                           <p className="text-gray-800 text-justify">{ayat.teksIndonesia}</p>
                       </div>
                   ))}
               </div>
           </div>
       </>
    );
}

export default DetailSurah