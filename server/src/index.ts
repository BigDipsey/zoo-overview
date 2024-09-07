import { Elysia, t } from "elysia";
import { db } from "../prisma";
import { cors } from '@elysiajs/cors'


type Animal = {
  id: string;
  name: string;
  numberOfLegs: number;
  naturalHabitat: string;
}

const PATH = 'src/animals.json'

const app = new Elysia()
.use(cors())

app.get("/", () => {
  return "ZOO API"
})




app.get('/allAnimals', async () => {

  return(
  await db.animal.findMany()
)
}
)


app.get('/animal/:id', async ({ params }) => {

  return (await db.animal.findUnique({
    where: { id: parseInt(params.id, 10) }, 
  }))
  }, 
  )

app.post('/newAnimal', async ({ body }) => {

await db.animal.create({
  data: body
})
}, {
  body: t.Object({
    name: t.String(),
    numberOfLegs: t.Optional(t.Integer()),
    naturalHabitat: t.Optional(t.String()),
  })
}
)



app.put('/updateAnimal/:id', async ({ params, body }) =>{
  
  await db.animal.update({
    where: { id: parseInt(params.id, 10) }, 
    data: body,
  });
  
  }, {
    body: t.Object({
      id: t.Integer(),
      name: t.Optional(t.String()),
      numberOfLegs: t.Optional(t.Integer()),
      naturalHabitat: t.Optional(t.String()),
    })
  }
  )

  app.delete('/removeAnimal/:id', async ({ params, body }) =>{
  
    await db.animal.delete({
      where: { id: parseInt(params.id, 10) },
    });
    
    }, {
      body: t.Object({
        id: t.Integer(),
        name: t.Optional(t.String()),
      numberOfLegs: t.Optional(t.Integer()),
      naturalHabitat: t.Optional(t.String()),
      })
    }
    )

app.listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);



// import { promises as fs } from 'fs';  // Ensure you're using the promises version of fs

// app.post('/addAllAnimals', async () => {
//   // Read the JSON file
//   const data: string = await fs.readFile('src/animals.json', 'utf-8');

//   // Parse the JSON content into an array of animals
//   const animals: { name: string; number_of_legs: number; natural_habitat: string }[] = JSON.parse(data);

//   // Insert all animals into the database
//   await db.animal.createMany({
//     data: animals.map((animal) => ({
//       name: animal.name,
//       numberOfLegs: animal.number_of_legs,
//       naturalHabitat: animal.natural_habitat,
//     })),
//   });

//   return { message: 'All animals added successfully!' };
// });
