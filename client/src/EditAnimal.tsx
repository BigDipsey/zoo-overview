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

type Props = {
  animal: Animal
}

export function EditAnimal({ animal }: Props) {
  const [animalName, setAnimalName] = useState(animal.name)
  const [animalNumberOfLegs, setAnimalNumberOfLegs] = useState(
    animal.numberOfLegs
  )
  const [animalNaturalHabitat, setAnimalNaturalHabitat] = useState(
    animal.naturalHabitat
  )

  const handleChange = () => {
    fetch(`http://localhost:3000/updateAnimal/${animal.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        id: animal.id,
        name: animalName,
        numberOfLegs: animalNumberOfLegs,
        naturalHabitat: animalNaturalHabitat,
      }),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log(data)
        window.location.reload() //LEVIN FRAGEN OB SINNVOLL
      })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-xl overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          Edit
        </Button>
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
            <Button onClick={handleChange}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
