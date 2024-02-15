import { useNavigate } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { toast } from "react-toastify";
// import { Container } from "@nextui-org/react";

function LogInPage() {
    const navigate = useNavigate();
    const acc = useAccount({
        onConnect({ address, connector, isReconnected }) {
            toast(`Account with ${address} ${isReconnected ? "Reconected" : "Connected"}!`);
            navigate("/");
        }
    });
    return (  
        
            <ConnectButton/>
        
    );
}

export default LogInPage;