import DaftarSurah from "../../components/pages/homepage/daftarSurah.jsx";
import NavBar from "../../components/pages/homepage/navBar.jsx";
import TimeInfo from "../../components/pages/homepage/timeInfo.jsx";
import Footer from "../../components/pages/homepage/footer.jsx";

const Home = () => {
  return (
    <div className={"bg-orange-100 min-h-screen min-w-screen flex flex-col"}>
      <NavBar />
      <div className="flex flex-col w-200 mx-auto -mt-1">
        <TimeInfo />
        <DaftarSurah />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
