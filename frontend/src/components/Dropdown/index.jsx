import { useNavigate } from 'react-router-dom';
import LinkDrop from '../LinksDrop';
import './style.css';
import { LuSettings,LuDoorOpen } from "react-icons/lu";
export default function Dropdown(){
    // Fazer Logout
        const navigate = useNavigate();
    
        const handleLogout = () => {
            localStorage.removeItem("token");
            navigate('/login')
        }
    return(
        <div className="containerDrop">
            <LinkDrop nomeLink={'Configurações'} href={'/config'} icon={LuSettings}/>
            <button onClick={handleLogout} className='buttonSair'>
            <LuDoorOpen size={18}/>    
            Sair</button>
        </div>
    )
}