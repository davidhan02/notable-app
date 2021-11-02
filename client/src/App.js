import "./App.css";
import AuthState from "./context/authContext/AuthState";
import AppointmentState from "./context/appointmentContext/AppointmentState";
import setAuthToken from "./utils/setAuthToken";
import Home from "./components/pages/Home";
import PhysicianState from "./context/physicianContext/PhysicianState";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => (
    <AuthState>
        <AppointmentState>
            <PhysicianState>
                <Home />
            </PhysicianState>
        </AppointmentState>
    </AuthState>
);

export default App;
