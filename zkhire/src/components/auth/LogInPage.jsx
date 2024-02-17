import { useNavigate } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { toast } from "react-toastify";

function LogInPage() {
    const navigate = useNavigate();
    const acc = useAccount({
        onConnect({ address, isReconnected }) {
            toast(`Account with ${address} ${isReconnected ? "Reconected" : "Connected"}!`);
            navigate("/");
        }
    });
    return (  
        <div className='grid flex items-center'>
            <ConnectButton/>
        </div>
    );
}

export default LogInPage;