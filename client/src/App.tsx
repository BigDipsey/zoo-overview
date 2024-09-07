import { AddAnimal } from './AddAnimal'
import { AnimalList } from './lib/animal-list'

export type Animal = {
  id: number
  name: string
  numberOfLegs: number
  naturalHabitat: string
}

function App() {
  return (
    <>
      <AddAnimal />
      <AnimalList />
    </>
  )
}

export default App
