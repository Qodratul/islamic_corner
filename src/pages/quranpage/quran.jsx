import DetailSurah from "../../components/pages/quranpage/detailSurah.jsx";
import Footer from "../../components/pages/homepage/footer.jsx";
import NavBar from "../../components/pages/homepage/navBar.jsx";
import SlideSurah from "../../components/pages/quranpage/slideSearch.jsx";

const Quran = () => {
  return (
    <div className={"bg-orange-100 min-h-screen min-w-screen flex flex-col"}>
      <NavBar />
      <div className="p-4">
        <SlideSurah
          onSelect={(surah) => console.log("Surah dipilih:", surah)}
        />
      </div>
      <div className=" flex flex-col w-200 mx-auto ">
        <DetailSurah />
      </div>
      <Footer />
    </div>
  );
};

export default Quran;
