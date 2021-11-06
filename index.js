require("dotenv").config();
const Telegraf = require("telegraf");
const session = require("telegraf/session");
const services = require("./api/Consultas");

const bot = new Telegraf(process.env.BOT_TOKEN);
const textAyuda =
  "Escribe /notas o /cursos seguido del numero de carnet del estuidante, Eje. * /notas 09051612345 *";

// // Register session middleware
bot.use(session());

// Register logger middleware
bot.use((ctx, next) => {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log("response time %sms", ms);
  });
});

bot.hears(/notas (.+)/, ({ match, reply }) => {
  const carnet = match[1];
  //hacer llamada al API
  services
    .getNotasByCarnet(carnet)
    .then((data) => {
      reply(data);
    })
    .catch((err) => reply(err.message, textAyuda));
});

bot.hears(/cursos (.+)/, ({ match, reply }) => {
  const carnet = match[1];
  //hacer llamada al API
  services
    .getCursosByCarnet(carnet)
    .then((data) => {
      reply(data);
    })
    .catch((err) => reply(err.message, textAyuda));
});

bot.on("message", (ctx) => ctx.reply(textAyuda));

bot.launch();
