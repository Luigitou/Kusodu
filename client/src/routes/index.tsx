import {createFileRoute} from '@tanstack/react-router'
import {useEffect} from "react";

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {

    useEffect(() => {
        // Check if the api is correctly responding
        fetch(`${import.meta.env.VITE_API_URL}/health/status`).then(r => {
            console.log(r);
        })
    }, []);
    
    return (
        <div className="p-2">
            <h3>Welcome Home!!!</h3>
        </div>
    )
}
