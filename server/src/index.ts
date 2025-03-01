import { Elysia, t } from "elysia";
import { db } from "../prisma";
import { cors } from '@elysiajs/cors'


const app = new Elysia()
.use(cors())

app.get("/", () => {
  return "ZOO API"
})




app.get('/animals', async () => {

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

app.post('/animal', async ({ body }) => {

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



app.put('/animal/:id', async ({ params, body }) =>{
  
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

  app.delete('/animal/:id', async ({ params, body }) =>{
  
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

app.listen(5000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
