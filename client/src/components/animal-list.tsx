import { AddAnimal } from '@/components/AddAnimal'
import { Animal } from '../lib/types'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { DeleteAnimal } from '@/components/DeleteAnimal'
import { EditAnimal } from '@/components/EditAnimal'
import { useState, useEffect } from 'react'

export function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/animals', {
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
            <TableHead className="center">Natural Occurrences</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell className="font-medium">{animal.id}</TableCell>
              <TableCell>{animal.name}</TableCell>
              <TableCell>{animal.numberOfLegs}</TableCell>
              <TableCell className="center">{animal.naturalHabitat}</TableCell>
              <TableCell className="text-end">
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
