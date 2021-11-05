require("dotenv").config();
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const services = require('./api/cursos')

const bot = new Telegraf(process.env.BOT_TOKEN)

// // Register session middleware
bot.use(session())

// Register logger middleware
bot.use((ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    console.log('response time %sms', ms)
  })
})

bot.hears(/notas (.+)/, ({ match, reply }) => {
  const nombre = match[1];
  //hacer llamada al API
  reply(nombre);
});

bot.hears(/cursos (.+)/, ({ match, reply }) => {
  const nombre = match[1];
  //hacer llamada al API
  services
    .getCursos(nombre)
    .then(({ data }) => {
      console.log(data);
      reply(JSON.stringify(data.Cursos));
    })
    .catch((err) =>
      reply(
        err.message,
        "Escribe /notas o /cursos seguido del nombre del estuidante, Eje. * /notas juan *"
      )
    );
});

bot.on("message", (ctx) =>
  ctx.reply(
    "Escribe /notas o /cursos seguido del nombre del estuidante, Eje. * /notas juan *"
  )
);

bot.launch()