[![Build Status](https://travis-ci.org/exacs/fiupm_bot-server.svg?branch=master)](https://travis-ci.org/exacs/fiupm_bot-server)
[![Code Climate](https://codeclimate.com/github/exacs/fiupm_bot-server/badges/gpa.svg)](https://codeclimate.com/github/exacs/fiupm_bot-server)

# Bot (no oficial) de la FIUPM para Telegram
Un *sencillo* bot de Telegram con cosas útiles para los alumnos de la ETSIINF-UPM.

Pruébalo en telegram: [@fiupm_bot](https://telegram.me/fiupm_bot)

## Participar
Existen varias maneras de contribuir con esta aplicación.

* Desarrollar: arreglar errores, implementar funcionalidades.
* Mejorar el código.
* Aportar ideas: errores y/o comandos

[Consulta el Planificador de la aplicación](https://github.com/exacs/fiupm_bot-server/issues)

## Mini-guía de desarrollo
El núcleo de la aplicación consta de las siguientes partes:

* `index.js`. Recibe las peticiones POST de los usuarios de Telegram
* `router.js`. Ejecuta un módulo u otro dependiendo del mensaje recibido
* `sendMessage.js`. Envía el mensaje de respuesta al usuario que ha enviado el mensaje.

Por otro lado, el directorio `modules` incluye, en ficheros `.js` diferentes, cada uno de los módulos (comandos) de la aplicación.

Hasta que escribamos una ayuda mejor de desarrollo, recomendamos ver el fichero `hello.js` como referencia.

### Calidad del código
Todo el código de la aplicación debe estar escrito de forma que pueda ser *probado* mediante pruebas automáticas.

> En la versión actual faltan por implementar pruebas para los ficheros del núcleo del bot.

## Desplegar la aplicación
Si deseas tener este bot en tu propio servidor necesitas:

* Un [bot de Telegram](https://core.telegram.org/bots)
* Un servidor [Node.js](https://nodejs.org/) configurado como se detalla a continuación.

### Configurar el servidor
Se deben configurar dos variables de entorno con la información del *token* del bot. El token es algo así como `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`. Las variables de entorno quedan así:

* `TELEGRAM_KEY`. La parte *izquierda* del `:`. En este caso `110201543`.
* `TELEGRAM_SECRET`. La parte *derecha* del `:`. En este caso `AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`.

También puedes desplegar el servidor en un PaaS como Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/exacs/fiupm_bot-server)
