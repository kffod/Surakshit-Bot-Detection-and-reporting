import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
    </RouterRoutes>
  );
} 