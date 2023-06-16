import { sayHi } from "@pnpm-monorepo/shared";
import Upload from '@/components/upload';
import './App.css'

function App() {
  sayHi("Vedansh");
  return (
    <Upload />
  )
}

export default App
