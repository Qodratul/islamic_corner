import "../../../App.css";
import {useNavigate} from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className=" w-full bg-[#8ba378] p-2 flex justify-between items-center shadow-md z-10">
            <span className="text-[2.5rem] font-bold text-center flex items-center cursor-pointer" onClick={() => {
                navigate(`/`);
            }}>
                Islamic Corner
            </span>
        </div>
    </>
    );
};

export default NavBar