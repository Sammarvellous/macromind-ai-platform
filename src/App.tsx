import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EvidenceEngine } from './pages/EvidenceEngine';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EvidenceEngine />} />
          <Route path="/evidence" element={<EvidenceEngine />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
