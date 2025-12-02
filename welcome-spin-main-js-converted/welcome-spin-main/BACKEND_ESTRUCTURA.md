# 📚 ESTRUCTURA BACKEND NODE.JS + MONGODB PARA CASINO

## 🎯 Estructura del Proyecto Backend

```
casino-backend/
├── node_modules/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración MongoDB
│   ├── models/
│   │   ├── User.js              # Modelo de Usuario
│   │   ├── Game.js              # Modelo de Juego
│   │   └── Transaction.js       # Modelo de Transacciones
│   ├── routes/
│   │   ├── auth.js              # Rutas de autenticación
│   │   ├── games.js             # Rutas de juegos
│   │   └── users.js             # Rutas de usuarios
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticación
│   │   ├── gamesController.js   # Lógica de juegos
│   │   └── usersController.js   # Lógica de usuarios
│   ├── middleware/
│   │   ├── auth.js              # Middleware de autenticación
│   │   └── errorHandler.js      # Manejo de errores
│   └── server.js                # Punto de entrada
├── .env                         # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## 📦 1. Inicialización del Proyecto

### Crear carpeta y proyecto
```bash
mkdir casino-backend
cd casino-backend
npm init -y
```

### Instalar dependencias
```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
npm install --save-dev nodemon
```

### Configurar package.json
```json
{
  "name": "casino-backend",
  "version": "1.0.0",
  "description": "Backend API REST para Royal Casino",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🔧 2. Archivo .env

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/royal-casino
JWT_SECRET=tu_clave_secreta_super_segura_123
NODE_ENV=development
```

---

## 🗄️ 3. Configuración de MongoDB

### src/config/database.js
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 📋 4. Modelos (Schemas de MongoDB)

### src/models/User.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  balance: {
    type: Number,
    default: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### src/models/Game.js
```javascript
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameType: {
    type: String,
    enum: ['roulette', 'slots'],
    required: true
  },
  betAmount: {
    type: Number,
    required: true,
    min: 0
  },
  result: {
    type: String,
    required: true
  },
  winAmount: {
    type: Number,
    default: 0
  },
  profit: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);
```

### src/models/Transaction.js
```javascript
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['bet', 'win', 'deposit', 'withdrawal'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  balanceBefore: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
```

---

## 🔐 5. Middleware de Autenticación

### src/middleware/auth.js
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No hay token de autenticación' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = auth;
```

### src/middleware/errorHandler.js
```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Ya existe un registro con esos datos'
    });
  }

  res.status(500).json({
    error: 'Error interno del servidor'
  });
};

module.exports = errorHandler;
```

---

## 🎮 6. Controladores

### src/controllers/authController.js
```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance
      },
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener perfil
exports.getProfile = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      balance: req.user.balance,
      createdAt: req.user.createdAt
    }
  });
};
```

### src/controllers/gamesController.js
```javascript
const Game = require('../models/Game');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Jugar ruleta
exports.playRoulette = async (req, res) => {
  try {
    const { betAmount, betType, betValue, result } = req.body;
    const userId = req.user._id;

    // Verificar saldo
    if (req.user.balance < betAmount) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    // Calcular ganancia
    let winAmount = 0;
    let won = false;

    if (betType === 'number' && betValue === result.num) {
      won = true;
      winAmount = betAmount * 35 + betAmount;
    } else if (betType === 'red' && result.color === 'red') {
      won = true;
      winAmount = betAmount * 1 + betAmount;
    } else if (betType === 'black' && result.color === 'black') {
      won = true;
      winAmount = betAmount * 1 + betAmount;
    } else if (betType === 'even' && result.num % 2 === 0 && result.num !== 0) {
      won = true;
      winAmount = betAmount * 1 + betAmount;
    } else if (betType === 'odd' && result.num % 2 === 1) {
      won = true;
      winAmount = betAmount * 1 + betAmount;
    }

    const profit = winAmount - betAmount;

    // Crear registro de juego
    const game = new Game({
      userId,
      gameType: 'roulette',
      betAmount,
      result: JSON.stringify(result),
      winAmount,
      profit
    });
    await game.save();

    // Actualizar saldo
    const balanceBefore = req.user.balance;
    req.user.balance += profit;
    await req.user.save();

    // Crear transacción
    await Transaction.create({
      userId,
      type: won ? 'win' : 'bet',
      amount: Math.abs(profit),
      balanceBefore,
      balanceAfter: req.user.balance,
      gameId: game._id
    });

    res.json({
      message: won ? '¡Ganaste!' : 'Perdiste',
      game: {
        id: game._id,
        result,
        winAmount,
        profit
      },
      newBalance: req.user.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Jugar slots
exports.playSlots = async (req, res) => {
  try {
    const { betAmount, result } = req.body;
    const userId = req.user._id;

    if (req.user.balance < betAmount) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    // El frontend ya calculó el resultado, aquí lo registramos
    const { winAmount, profit } = result;

    const game = new Game({
      userId,
      gameType: 'slots',
      betAmount,
      result: JSON.stringify(result.reels),
      winAmount,
      profit
    });
    await game.save();

    const balanceBefore = req.user.balance;
    req.user.balance += profit;
    await req.user.save();

    await Transaction.create({
      userId,
      type: profit > 0 ? 'win' : 'bet',
      amount: Math.abs(profit),
      balanceBefore,
      balanceAfter: req.user.balance,
      gameId: game._id
    });

    res.json({
      message: profit > 0 ? '¡Ganaste!' : 'Perdiste',
      game: {
        id: game._id,
        result: result.reels,
        winAmount,
        profit
      },
      newBalance: req.user.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener historial
exports.getHistory = async (req, res) => {
  try {
    const games = await Game.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### src/controllers/usersController.js
```javascript
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Obtener balance
exports.getBalance = async (req, res) => {
  res.json({ balance: req.user.balance });
};

// Reiniciar balance
exports.resetBalance = async (req, res) => {
  try {
    const balanceBefore = req.user.balance;
    req.user.balance = 1000;
    await req.user.save();

    await Transaction.create({
      userId: req.user._id,
      type: 'deposit',
      amount: 1000,
      balanceBefore,
      balanceAfter: 1000
    });

    res.json({
      message: 'Balance reiniciado',
      newBalance: 1000
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener transacciones
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(100)
      .populate('gameId');

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🛣️ 7. Rutas

### src/routes/auth.js
```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, authController.getProfile);

module.exports = router;
```

### src/routes/games.js
```javascript
const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const auth = require('../middleware/auth');

router.post('/roulette', auth, gamesController.playRoulette);
router.post('/slots', auth, gamesController.playSlots);
router.get('/history', auth, gamesController.getHistory);

module.exports = router;
```

### src/routes/users.js
```javascript
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.get('/balance', auth, usersController.getBalance);
router.post('/balance/reset', auth, usersController.resetBalance);
router.get('/transactions', auth, usersController.getTransactions);

module.exports = router;
```

---

## 🚀 8. Servidor Principal

### src/server.js
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/users', usersRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '🎰 Royal Casino API funcionando correctamente' });
});

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

---

## 📝 9. .gitignore

```
node_modules/
.env
.DS_Store
*.log
```

---

## 🔌 10. Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere token)

### Juegos
- `POST /api/games/roulette` - Jugar ruleta (requiere token)
- `POST /api/games/slots` - Jugar slots (requiere token)
- `GET /api/games/history` - Historial de juegos (requiere token)

### Usuarios
- `GET /api/users/balance` - Obtener balance (requiere token)
- `POST /api/users/balance/reset` - Reiniciar balance (requiere token)
- `GET /api/users/transactions` - Transacciones (requiere token)

---

## 🚦 11. Ejecutar el Backend

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

---

## 🗄️ 12. Instalar y Configurar MongoDB

### Opción A: MongoDB Local
```bash
# En Windows con Chocolatey
choco install mongodb

# En macOS con Homebrew
brew install mongodb-community

# Iniciar MongoDB
mongod
```

### Opción B: MongoDB Atlas (Cloud)
1. Crear cuenta en https://www.mongodb.com/cloud/atlas
2. Crear cluster gratuito
3. Obtener connection string
4. Actualizar `.env` con el connection string

---

## 📚 13. Conectar Frontend con Backend

En tu frontend Lovable, actualiza las llamadas API:

```javascript
// Ejemplo de configuración
const API_URL = 'http://localhost:5000/api';

// Login
const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

// Jugar ruleta
const playRoulette = async (betData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/games/roulette`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(betData)
  });
  return await response.json();
};
```

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] MongoDB instalado o Atlas configurado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Base de datos MongoDB corriendo
- [ ] Servidor backend corriendo (`npm run dev`)
- [ ] Endpoints probados con Postman o Thunder Client
- [ ] Frontend conectado al backend
- [ ] CORS configurado correctamente
- [ ] Código subido a GitHub/GitLab

---

## 🎓 Presentación del Proyecto

Para cumplir con los requisitos del PDF:

1. ✅ **Backend con Node.js**: ✓
2. ✅ **API REST**: ✓
3. ✅ **Base de datos MongoDB**: ✓
4. ✅ **Frontend modular React**: ✓
5. ✅ **Repositorio GitHub**: Pendiente de subir

---

¡Buena suerte con vuestro proyecto! 🎰🍀
