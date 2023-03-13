import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import NewUser from "./components/NewUser";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Outlet />}>
						<Route index element={<NewUser />} />
						<Route path="contact" element={<Contact />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
