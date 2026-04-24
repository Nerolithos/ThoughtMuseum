import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MuseumBackground } from './components/Background';
import { Header } from './components/Header';
import './index.css';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/Home'));
const CaveAllegoryPage = React.lazy(() => import('./pages/experiments/CaveAllegory'));
const ShipOfTheseusPage = React.lazy(() => import('./pages/experiments/ShipOfTheseus'));
const TrolleyProblemPage = React.lazy(() => import('./pages/experiments/TrolleyProblem'));
const PrisonersDilemmaPage = React.lazy(() => import('./pages/experiments/PrisonersDilemma'));
const ChineseRoomPage = React.lazy(() => import('./pages/experiments/ChineseRoom'));
const SchrodingersCatPage = React.lazy(() => import('./pages/experiments/SchrodingersCat'));

const LoadingScreen: React.FC = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl mb-4">🏛️</div>
      <div className="text-xl text-museum-muted animate-pulse">加载中...</div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <MuseumBackground />
      <Header />
      <main className="pt-20">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cave-allegory" element={<CaveAllegoryPage />} />
            <Route path="/ship-of-theseus" element={<ShipOfTheseusPage />} />
            <Route path="/trolley-problem" element={<TrolleyProblemPage />} />
            <Route path="/prisoners-dilemma" element={<PrisonersDilemmaPage />} />
            <Route path="/chinese-room" element={<ChineseRoomPage />} />
            <Route path="/schrodingers-cat" element={<SchrodingersCatPage />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
