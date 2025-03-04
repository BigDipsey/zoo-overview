import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function AddAnimal() {
  const [animalName, setAnimalName] = useState('')
  const [animalNumberOfLegs, setAnimalNumberOfLegs] = useState<number>(0)
  const [animalNaturalHabitat, setAnimalNaturalHabitat] = useState('')
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false)

  const handleChange = () => {
    if (animalName === '') return setIsErrorMessageVisible(true)
    fetch(`http://localhost:9000/animal`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: animalName,
        numberOfLegs: animalNumberOfLegs,
        naturalHabitat: animalNaturalHabitat,
      }),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data)
        setAnimalName('')
        setAnimalNumberOfLegs(0)
        setAnimalNaturalHabitat('')
        setIsErrorMessageVisible(false)
        window.location.reload() //LEVIN FRAGEN OB SINNVOLL
      })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Animal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Animal</DialogTitle>
          <DialogDescription>Add a new Animal to the site.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Monkey"
              className="col-span-3"
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Number of Legs</Label>
            <Input
              id="numberOfLegs"
              type="number"
              placeholder="2"
              className="col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setAnimalNumberOfLegs(parseInt(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Natural Occurencess</Label>
            <Input
              id="numberOfLegs"
              type="text"
              placeholder="Jungle"
              className="col-span-3"
              value={animalNaturalHabitat}
              onChange={(e) => setAnimalNaturalHabitat(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {isErrorMessageVisible ? <div>You have to Provide a name</div> : null}
          <Button onClick={handleChange}>Add Animal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
