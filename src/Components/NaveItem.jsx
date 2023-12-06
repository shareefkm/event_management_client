import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userLogout } from '../Redex/Auth/UserSlice';

const NavItem = ({icon,name,path}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleRoute = () => {
        if (name === 'LOGOUT') {
            if (path === '/login') {
                dispatch(userLogout())
            }
        }
        navigate(`${path}`);
    }
    return(
        <>
            <div onClick={handleRoute} className="flex  items-center justify-between p-4 hover:bg-gray-100 cursor-pointer ">
                <p className="flex items-center space-x-2" href="/admin/brand-dashboard">
                    {icon}
                    <span className="text-black font-bold  ">{name}</span>
                </p>

            </div>
        </>
    )
};

export default NavItem;