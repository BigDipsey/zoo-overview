import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Animal } from './App'

const handleChange = (
  animalId: number,
  animalName: string,
  animalNumberOfLegs: number,
  animalNaturalHabitat: string
) => {
  fetch(`http://localhost:3000/updateAnimal/${animalId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      name: animalName,
      numberOfLegs: animalNumberOfLegs,
      naturalHabitat: animalNaturalHabitat,
    }),
  }).then((data) => {
    console.log(data)
  })
}

export function EditAnimal(animal: Animal) {
  const [animalId] = useState(animal.id)
  const [animalName, setAnimalName] = useState(animal.name)
  const [animalNumberOfLegs, setAnimalNumberOfLegs] = useState(
    animal.numberOfLegs
  )
  const [animalNaturalHabitat, setAnimalNaturalHabitat] = useState(
    animal.naturalHabitat
  )
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Animal</SheetTitle>
          <SheetDescription>
            Make changes to the Animal here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={animalName}
              placeholder={animalName}
              className="col-span-3"
              onChange={(e) => setAnimalName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Number of Legs
            </Label>
            <Input
              id="numberOfLegs"
              value={animalNumberOfLegs}
              placeholder={`${animalNumberOfLegs}`}
              className="col-span-3"
              onChange={(e) => setAnimalNumberOfLegs(parseInt(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Natural Occurrences
            </Label>
            <Input
              id="naturalHabitat"
              value={animalNaturalHabitat}
              placeholder={animalNaturalHabitat}
              className="col-span-3"
              onChange={(e) => setAnimalNaturalHabitat(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={() =>
                handleChange(
                  animalId,
                  animalName,
                  animalNumberOfLegs,
                  animalNaturalHabitat
                )
              }
              type="submit"
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
