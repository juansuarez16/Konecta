## Prueba Técnica Konecta

Este proyecto fue creado con el fin de demostrar mis habilidades para el cargo.

## Comenzando 🚀
Para abordar este proyecto, primero analicé las necesidades y los requerimientos planteados para determinar qué arquitecturas y patrones de diseño serían más adecuados. Tras este análisis, decidí emplear una arquitectura limpia y patrones de diseño recomendados para garantizar la escalabilidad, mantenibilidad y facilidad de prueba de la aplicación.

## Backend
-Arquitectura Hexagonal o de Puertos y Adaptadores
Decidí utilizar la Arquitectura Hexagonal (también conocida como Arquitectura de Puertos y Adaptadores) para el backend. Esta arquitectura separa las preocupaciones del software en capas, lo que permite que los componentes de alto nivel (dominio de la aplicación) no dependan de los componentes de bajo nivel (detalles de la infraestructura).
Esto facilita la escalabilidad de la aplicación, ya que los cambios en una capa no afectan a las otras. Además, mejora la mantenibilidad del código, ya que cada capa puede ser modificada o probada de forma independiente.

-Patrón de Diseño Repository
Para gestionar el acceso a los datos, implementé el patrón de diseño Repository. Este patrón encapsula la lógica de acceso a los datos, proporcionando una abstracción del almacenamiento de datos subyacente.
Esto permite que el código del dominio de la aplicación sea agnóstico respecto a cómo se almacenan y recuperan los datos, lo que facilita la realización de cambios en la infraestructura de datos sin afectar 
al código del dominio. Además, al aplicar los principios SOLID en la implementación de este patrón, se mejora la mantenibilidad del código, 
ya que cada repositorio tiene una única responsabilidad y es abierto a la extensión pero cerrado a la modificación. Esto reduce el riesgo de introducir errores cuando se realizan cambios en el código.

## Frontend
Para el frontend, también opté por una arquitectura limpia y el patrón de diseño Domain-Driven Design (DDD).

Arquitectura Limpia
La Arquitectura Limpia se centra en la separación de preocupaciones y la organización del código en capas con responsabilidades específicas. Esto permite que cada parte del sistema pueda ser desarrollada, 
probada y mantenida de forma independiente. En el contexto del frontend, esto puede implicar la separación del estado de la aplicación, la lógica de la interfaz de usuario y 
los efectos secundarios (como las llamadas a la API).

Patrón de Diseño Domain-Driven Design (DDD)
El Domain-Driven Design es un enfoque para el desarrollo de software que se centra en la modelización del dominio del problema y su lógica de negocio. 
En el frontend, esto puede implicar la creación de modelos de dominio que representen los conceptos y las operaciones de negocio, y servicios de dominio que encapsulen la lógica de negocio. 
Esto ayuda a mantener la lógica de negocio coherente y centralizada, lo que facilita la comprensión y la evolución del sistema.

Estos enfoques ayudan a crear un código más modular, mantenible y escalable, lo que es especialmente valioso en proyectos grandes y complejos.


## Seguridad y Despliegue
Autenticación JWT
Para garantizar la seguridad y el control de acceso a la aplicación, implementé la autenticación con JSON Web Tokens (JWT).
Cuando un usuario inicia sesión, se le emite un token JWT que incluye una firma digital para verificar su autenticidad. 
Este token se envía en el encabezado de las solicitudes HTTP para autenticar al usuario y autorizar el acceso a los recursos protegidos.

Dockerización
Para facilitar el despliegue y garantizar la consistencia del entorno de ejecución, dockericé la aplicación. 
Docker permite empaquetar la aplicación y sus dependencias en un contenedor, que puede ser ejecutado en cualquier sistema que tenga Docker instalado. 
Esto elimina los problemas de "funciona en mi máquina" y facilita el despliegue en diferentes entornos, desde el desarrollo hasta la producción. 
Además, los contenedores de Docker son aislados y tienen sus propios sistemas de archivos, lo que mejora la seguridad al limitar el acceso a otros contenedores y al sistema host.

Para gestionar los contenedores de la aplicación, utilicé Docker Compose, que permite definir y ejecutar múltiples contenedores Docker con un solo comando. 
Esto es especialmente útil en aplicaciones con múltiples servicios, como una aplicación con un frontend y un backend separados.

### Pre-requisitos 📋

Necesitarás tener instalado lo siguiente en tu máquina:

- Node.js
- PostgreSQL
- Visual Studio Code

Puedes descargar Node.js desde [aquí](https://nodejs.org/), PostgreSQL desde [aquí](https://www.postgresql.org/download/) y Visual Studio Code desde [aquí](https://code.visualstudio.com/download).

### Instalación 🔧

Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutándose.

Clona el repositorio:


https://github.com/juansuarez16/Konecta.git


Instala las dependencias:


npm install bcrypt
npm install 


Inicia el servidor:
npm run dev

El frontend se ejecuta en el puerto 3000 y el backend en el puerto 8080.

para ejecutar las pruebas del backend utilice Jest.js

npm run test

## Despliegue 📦

Agrega notas adicionales sobre cómo hacer deploy.

## Construido con 🛠️

* [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript
* [Express](https://expressjs.com/) - Framework de Node.js
* [PostgreSQL](https://www.postgresql.org/) - Sistema de gestión de bases de datos relacional
* [Sequelize](https://sequelize.org/) - ORM para Node.js

## Autores ✒️

Juan Manuel Suarez Guazman - *Trabajo Inicial* - [juansuarez16](https://github.com/juansuarez16)



