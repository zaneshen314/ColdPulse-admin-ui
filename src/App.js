import './App.css';
import router from './router'
import { RouterProvider } from 'react-router-dom'

function App() {
    return (
        <div className="qpp">
            <RouterProvider router={router} />

        </div>
    );
}

export default App;
