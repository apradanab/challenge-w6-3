### Week 7 - Challenge 1

## API REST Things I already know / Lo que queráis (II)

Continuamos el API REST del Challenge anterior, que se conecte a un fichero JSON, para manipular recursos de tipo _cosas que ya sé_ (o cualquier otro).

Recordemos que el JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp (o cualquier otro modelo).

- El modelo de datos estará representado como "entity" en una carpeta/fichero independiente.
- Dos opciones
  - El repositorio y el controller son clases que se instancian en el Router.
  - El repositorio, el controller y el router son clases que se instancian en app.
- Les errores se controlan mediante un middleware de errores.
- Añadimos validación con Joi
- Se testa el 100% del backend.

Intentamos deploy a Render.

### Week 7 - Challenge 2

## API REST Things I already know / Lo que queráis (III)

Continuamos el API REST del Challenge anterior, que se conecte a un fichero JSON, para manipular recursos de tipo _cosas que ya sé_ (o cualquier otro).

Recordemos que el JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp (o cualquier otro modelo).

Añadimos un segundo endpoint de Films (o lo que quieras) con un repo que conecta con **PostgreSql** usando **Prisma**

- El modelo de datos estará representado como "entity" en una carpeta/fichero independiente.
- El router, el repositorio y el controller son clases que se instancian en app.
- El interface del repositorio se inyecta en el controller (inversión de dependencias).
- Les errores se controlan mediante un middleware de errores.

Se testa el 100% del backend completo: Things & Films.

Se publica en Render (https://render.com/)

### Week 7 - Challenge 3

## API REST Things I already know / Lo que queráis (IV)

Continuamos el API REST del Challenge anterior, que:

- se conecte a un fichero JSON, para manipular recursos de tipo _cosas que ya sé_ (o cualquier otro).
- un segundo endpoint de Films (??) utiliza un repo que conecta con PostgreSql usando Prisma

Añadimos **Users** relacionándolo con Films (??)

- El modelo de datos estará representado como "entity" en una carpeta/fichero independiente.
- Las rutas son /register y /login
- El repositorio y el controller son clases que se instancian en el Router.
- El interface del repositorio se inyecta en el controller (inversión de dependencias).
- Les errores se controlan mediante un middleware de errores.

**/register** registra usuarios
**/login** comprueba el login y si es correcto devuelve los datos del usuario (sin token)

Actualizamos [Post] /Films (??) -> **create Films (??)**

Se testa el 100% del backend completo: Things & Films & User & All.

Se publica en Render (https://render.com/)
