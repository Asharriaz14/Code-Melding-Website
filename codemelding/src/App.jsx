import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Blog from "./components/blog/Blog";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      
    </Routes>
  </Router>
  </QueryClientProvider>
  )
}