import { AnimalList } from './lib/animal-list'

export type Animal = {
  id: number
  name: string
  numberOfLegs: number
  naturalHabitat: string
}

function App() {
  return <AnimalList />
}

export default App
