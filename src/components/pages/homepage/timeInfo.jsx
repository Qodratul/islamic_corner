import React, {useEffect, useState} from "react";
import "../../../App.css";
import {MapPin} from "lucide-react";

const TimeInfo = () => {
    const [waktu, setWaktu] = useState(''); // State untuk menyimpan waktu (coming soon)
    const [tanggal, setTanggal] = useState(''); // State untuk menyimpan tanggal sekarang
    const [hijri, setHijri] = useState(''); // State untuk menyimpan tanggal hijriah
    const [sholat, setSholat] = useState(''); // State untuk menyimpan waktu sholat (coming soon)

    useEffect(() => {
        const waktu = new Date();
        const hari = waktu.toLocaleString('id-ID', { weekday: 'long' });
        const tanggal = waktu.getDate();
        const bulan = waktu.toLocaleString('id-ID', { month: 'long' });
        const tahun = waktu.getFullYear();
        const jam = waktu.getHours();
        const menit = waktu.getMinutes();
        const detik = waktu.getSeconds();

        setTanggal(`${hari}, ${tanggal} ${bulan} ${tahun}`);
        setWaktu(`${jam}:${menit}:${detik}`);
        const curDate = '${waktu.getFullYear()}/0${waktu.getMonth()+1}/${waktu.getDate()}';

        const fetchSholat = async () => {
            try {
                const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/0412/${curDate}`);
                const data = await response.json();
                setSholat(data.data.jadwal);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSholat();

        // Update waktu setiap detik
        const intervalId = setInterval(() => {
            const waktu = new Date();
            const jam = waktu.getHours();
            const menit = waktu.getMinutes();
            const detik = waktu.getSeconds();
            setWaktu(`${jam}:${menit}:${detik}`);
        }, 1000); // 1000ms = 1 detik

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const fetchHijri = async () => {
            try {
                const response = await fetch('https://api.myquran.com/v2/cal/hijr');
                const data = await response.json();
                setHijri(data.data.date);
            } catch (error) {
                console.error(error);
            }
        }
        fetchHijri();
    }, []);

    return (
        <div className=" p-4 bg-[#8ba378] rounded-bl-4xl rounded-b-4xl mt-1 shadow-lg">
            {/* Bagian Atas: Tanggal & Lokasi */}
            <div className="flex justify-between items-start">
                {/* Tanggal */}
                <div>
                    <p className="text-lg font-semibold">{hijri[0]}, {hijri[1]}</p>
                    <p className="text-sm">{tanggal}</p>
                </div>
                {/* Lokasi (masih static) */}
                <div className="bg-orange-100  text-black px-3 py-1 rounded-full flex items-center shadow-md">
                    <MapPin size={20} />
                    <span className="ml-1 font-semibold">Pekanbaru</span>
                </div>
            </div>
        </div>
    );
};

export default TimeInfo