import './App.css'
import { lazy, Suspense } from 'react';
import LoadingSpinner from './shared/LoadingSpinner';


const ScreenManager = lazy(() => {return import("./ScreenManager")});
function App() {
  return(
    <Suspense fallback={<LoadingSpinner />}>
      <ScreenManager />
    </Suspense>
  )
}

export default App
