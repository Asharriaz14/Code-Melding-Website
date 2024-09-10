
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Blog from "./components/blog/Blog";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegistrationForm from './components/auth/Register'
import Login from './components/auth/Signin'
import Dashboard from "./components/home/Dashboard";
import PrivateRoute from "./components/home/PrivateRoute";
const queryClient = new QueryClient()


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
    
      
    </Routes>
  </Router>
  </QueryClientProvider>
  )
}