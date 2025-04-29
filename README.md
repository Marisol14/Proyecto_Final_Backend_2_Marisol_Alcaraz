# Proyecto E‑commerce – Entrega Final

**Descripción:**
Un servidor backend para un e‑commerce construído con Node.js, Express y MongoDB. Cuenta con:
- Arquitectura limpia: DAO, Repositories, DTOs, Services, Controllers, Middlewares.
- Autenticación y autorización con Passport (Local + JWT en cookies).
- Modelos: Users, Products, Carts, Tickets.
- Roles `admin` y `user` para proteger rutas.
- Flujo de carrito: crear carrito, añadir/quitar productos.
- Lógica de compra: restar stock, generar ticket, devolver no procesados.
- Envío de email de confirmación vía Ethereal (desarrollo).

---

## 📂 Estructura del proyecto

```bash
├── src
│   ├── config
│   │   ├── db.js             # Conexión a MongoDB
│   │   └── passport.js       # Estrategias Passport
│   ├── controllers
│   ├── dao
│   ├── dtos
│   ├── middlewares
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── services
│   └── app.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Requisitos previos

- Node.js v14+ y npm
- MongoDB corriendo local o remoto
- (Opcional) Git para clonar repositorio

---

## 🛠️ Instalación y configuración

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/proyecto-ecommerce.git
    cd proyecto-ecommerce
    ```
2. Instala dependencias:
    ```bash
    npm install
    ```
3. Crea un archivo `.env` en la raíz y define:
    ```dotenv
    PORT=8080
    MONGODB_URI=mongodb://localhost:27017/ecommerce
    JWT_SECRET=tu_secreto_jwt
    JWT_COOKIE_NAME=jwtCookie
    # Mailer Ethereal (opción desarrollo)
    # Opcional variables de Mailtrap si lo prefieres
    EMAIL_HOST=smtp.ethereal.email
    EMAIL_PORT=587
    EMAIL_USER=usuario_ethereal
    EMAIL_PASS=pass_ethereal
    ```
4. Inicia MongoDB (local o tu conexión remota).
5. Arranca el servidor en modo desarrollo:
    ```bash
    npm run dev
    ```
6. Verifica en consola:
    ```text
    ✅ MongoDB conectado
    🚀 Server corriendo en http://localhost:8080
    ```

---

## 🚀 Endpoints disponibles

### Autenticación

- **POST** `/api/users/register`  
  Registra un usuario. Body JSON:
  ```json
  {
    "first_name": "Ana",
    "last_name":  "Gómez",
    "email":      "ana@test.com",
    "age":        30,
    "password":   "MiPass123"
  }
  ```

- **POST** `/api/sessions/login`  
  Login; emite cookie `jwtCookie`. Body JSON:
  ```json
  { "email":"ana@test.com","password":"MiPass123" }
  ```

- **GET** `/api/users/current`  
  Devuelve datos del usuario autenticado (DTO), protegido con JWT.

### Productos (solo admin)

- **GET** `/api/products`  – Lista todos los productos.
- **GET** `/api/products/:pid`  – Detalle de un producto.
- **POST** `/api/products`  – Crea un producto. Body JSON:
  ```json
  {
    "title":"Zapatos",
    "description":"Cómodos",
    "price":50,
    "stock":100,
    "code":"ZAP001"
  }
  ```
- **PUT** `/api/products/:pid`  – Actualiza producto.
- **DELETE** `/api/products/:pid`  – Elimina producto.

### Carritos y compra

- **POST** `/api/carts`  – Crea un carrito vacío.
- **GET** `/api/carts/:cid`  – Ver carrito.
- **POST** `/api/carts/:cid/product/:pid`  – Añade producto (rol `user`).
- **DELETE** `/api/carts/:cid/product/:pid`  – Quita producto.
- **POST** `/api/carts/:cid/purchase`  – Finaliza compra: genera ticket, ajusta stock y devuelve `failedProducts`.

### Tickets

- **GET** `/api/tickets/:tid`  – Opcional, obtener ticket por ID.

---

## 📧 Email de confirmación

En desarrollo usamos **Ethereal**:

- Tras purchase verás en consola:
  ```text
  Preview URL: https://ethereal.email/message/...  
  ```
- Abre ese link para ver el correo HTML de confirmación.

---

## 🌟 Patrones y buenas prácticas

- **DAO**: `src/dao/*.js` abstrae acceso a la BD.
- **Repository**: `src/repositories/*.js` integra DAO y aplica DTOs.
- **DTO**: `src/dtos/*.js` filtra campos sensibles.
- **Controllers/Services**: separación de lógica de negocio.
- **Middlewares**: `authorize(roles…)` para rutas protegidas.
- **Passport**: LocalStrategy para login, JwtStrategy para rutas.

---

## 📝 Licencia

Proyecto académico para Coderhouse. 

Marisol alcaraz
