import AppProvider from './Context'
import Index from './routes'

export default function App() {
  return (
    <AppProvider>
      <Index />
    </AppProvider>
  )
}