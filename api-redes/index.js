// importamos el framework express
import express from "express";

// creamos la app de express y el puerto donde correra el servidor
const app = express();
const PORT = 3000;

// middleware para poder leer JSON en las solicitudes
app.use(express.json());

// base de datos simulada
let brainrot = [
  {
    id: 1,
    name: "tungtungtung sahur",
    base: "gasok82",
  },
  {
    id: 2,
    name: "tralalero tralala",
    base: "icesprinkle98",
  },
  {
    id: 3,
    name: "vaca saturno saturnita",
    base: "rohgamer23",
  },
];

// GET : obtener TODOS los brainrots
app.get("/", (req, res) => {
  try {
    // respondemos con status 200 y enviamos el array de brainrots
    res.status(200).json({
      message: "los brainrots de las bases han sido encontrados exitosamente",
      brainrot,
    });
  } catch (error) {
    console.log(error);
    // si hay un error respondemos con status 500 y un mensaje de error
    res.status(500).json({
      message: "error al buscar los brainrots",
    });
  }
});

// GET : obtener UN brainrot por su ID
app.get("/:id", (req, res) => {
  try {
    // sacamos el id de los parametros de la solicitud
    const { id } = req.params;

    // buscamos el brainrot con el id correspondiente (convertimos el id a numero)
    const foundBrainrot = brainrot.find((b) => b.id === parseInt(id));

    // si no lo encontramos respondemos con status 404
    if (!foundBrainrot) {
      return res.status(404).json({
        message: "brainrot no encontrado",
      });
    }

    // si si existe respondemos con status 200 y el brainrot encontrado
    res.status(200).json({
      message: "el braintrot de la base ha sido encontrado exitosamente",
      brainrot: foundBrainrot,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error al buscar el brainrot",
    });
  }
});

// POST : crear un nuevo brainrot
app.post("/", (req, res) => {
  try {
    // sacamos name y base del cuerpo de la solicitud
    const { name, base } = req.body;

    // validamos que vengan ambos datos
    if (!name || !base) {
      return res.status(400).json({
        message: "faltan datos",
      });
    }

    // Crear nuevo brainrot
    const newBrainrot = {
      // tomamos el id como la longitud del array + 1
      id: brainrot.length + 1,
      name,
      base,
    };

    // Agregar a la lista de brainrots
    brainrot.push(newBrainrot);

    // Respondemos con status 201 y el nuevo brainrot
    res.status(201).json({
      message: "el brainrot ha sido robado exitosamente",
      brainrot: newBrainrot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error al buscar el brainrot",
    });
  }
});

// PUT : actualizar un brainrot por su ID
app.put("/:id", (req, res) => {
  try {
    // ID que viene en url
    const { id } = req.params;

    // datos que vienen en el body
    const { name, base } = req.body;

    // validamos que vengan ambos datos
    if (!name || !base) {
      return res.status(400).json({
        message: "faltan datos",
      });
    }

    // buscamos el brainrot con el id correspondiente (convertimos el id a numero)
    const foundBrainrot = brainrot.find((b) => b.id === parseInt(id));

    // si no lo encontramos respondemos con status 404
    if (!foundBrainrot) {
      return res.status(404).json({
        message: "brainrot no encontrado",
      });
    }

    // actualizamos los datos
    foundBrainrot.name = name;
    foundBrainrot.base = base;

    // respondemos con status 200 y el brainrot actualizado
    res.status(200).json({
      message: "el estado de tu brainrot ha sido actualizado exitosamente",
      brainrot: foundBrainrot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error al obtener la informacion",
    });
  }
});

// DELETE : eliminar un brainrot por su ID
app.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    // buscamos el brainrot con el id correspondiente (convertimos el id a numero)
    const foundBrainrot = brainrot.find((b) => b.id === parseInt(id));

    if (!foundBrainrot) {
      return res.status(404).json({
        message: "brainrot no encontrado",
      });
    }

    // filtramos el array para eliminar el brainrot con el id dado
    brainrot = brainrot.filter((b) => b.id !== parseInt(id));
    res.status(200).json({
      message: "tu brainrot ha sido robado",
      brainrot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error al obtener la informacion",
    });
  }
});

// arrancamos el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
