import { AddAnimal } from '@/components/AddAnimal'
import { DeleteAnimal } from '@/components/DeleteAnimal'
import { EditAnimal } from '@/components/EditAnimal'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Animal } from '../lib/types'

export function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    fetch('http://localhost:9000/animals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setAnimals(data))
      .then((data) => console.log(data))
  }, [])

  return (
    <>
      <AddAnimal />
      <Table>
        <TableCaption>Animals in the ZOO</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Leg Count</TableHead>
            <TableHead>Natural Occurrences</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell className="font-medium">{animal.id}</TableCell>
              <TableCell>{animal.name}</TableCell>
              <TableCell>{animal.numberOfLegs}</TableCell>
              <TableCell>{animal.naturalHabitat}</TableCell>
              <TableCell className="flex gap-2">
                <EditAnimal animal={animal} />
                <DeleteAnimal animal={animal} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
