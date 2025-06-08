const express = require("express")
const usuariosController = require("./controllers/usuarios-controller")
const turmaController = require("./controllers/turmas-controller")
const pagamentosController = require("./controllers/pagamentos-controller")
const modulosController = require("./controllers/modulos-controller")
const redacoesController = require("./controllers/redacoes-controller")
const propostasController = require("./controllers/propostas-controller")
const uploadRedacoes = require("./middlewares/upload-redacoes")
const uploadPropostas = require("./middlewares/upload-propostas")
const uploadCorrecoes = require("./middlewares/upload-correcoes")
const frequenciasController = require("./controllers/frequencias-controller")
const correcoesController = require("./controllers/correcoes-controller")
const rankingController = require("./controllers/ranking-controller")
const videosController = require("./controllers/videos-controller")
const simuladoController = require("./controllers/simulado-controller")
const notasSimuladoController = require("./controllers/notasSimulado-Controller")
const uploadImagens = require('./middlewares/upload-imagens')
const adminMiddleware = require("./middlewares/admin-middleware")
const authMiddleware = require("./middlewares/auth-middleware")

const router = express.Router()

// Rota de teste
router.get("/teste", (req, res) => {
  res.status(200).json({ message: "Se você está lendo essa mensagem, é porque a api está funcionando." })
})

// Rotas relacionadas a usuários (OK)
router.post("/usuarios/login", usuariosController.login)
router.get("/usuarios", usuariosController.index)
router.get("/usuarios/:id", authMiddleware, usuariosController.show)
router.post("/usuarios", usuariosController.create)
router.put("/usuarios/:id", usuariosController.update)
router.delete("/usuarios/:id", usuariosController.delete)
router.post("/usuarios/:id/trocar-senha", usuariosController.updatePassword) 
router.post("/usuarios/:id", uploadImagens.single('file'), usuariosController.profileUpload)
router.get("/usuarios/:id/profile-image", usuariosController.getProfileImage)

// Rotas relacionadas a turmas (OK)
router.get("/turmas", turmaController.index)
router.get("/turmas/:id", turmaController.show)
router.post("/turmas", turmaController.create)
router.put("/turmas/:id", turmaController.update)
router.delete("/turmas/:id", turmaController.delete)

// Rotas relacionadas a pagamentos
router.get("/pagamentos", pagamentosController.index ) 
router.post('/pagamentos', pagamentosController.create)
router.put('/pagamentos/:id',pagamentosController.update)
router.delete('/pagamentos/:id', pagamentosController.delete)
router.get("/pagamentos/:id", pagamentosController.show) 

// Rotas relacionadas a modulos
router.get("/modulos", modulosController.index)
router.get("/modulos/:id", modulosController.show)
router.post("/modulos", modulosController.create)
router.delete("/modulos/:id", modulosController.delete)
router.put("/modulos/:id", modulosController.update)

// Rotas relacionadas a redações
router.get("/redacoes", redacoesController.index)
router.get("/redacoes/:id", redacoesController.show)
router.post("/redacoes/:usuarioId/upload", uploadRedacoes.single("file"), redacoesController.create)
router.get("/redacoes/download/:id", redacoesController.download)

//Rotas relacionadas a propostas

router.post("/propostas", uploadPropostas.single("file"), propostasController.create)
router.get("/propostas", propostasController.index);
router.get("/propostas/download", propostasController.download)
router.get("/propostas/:id", propostasController.show)
router.delete("/propostas/:id", propostasController.delete)

// Rotas relacionadas a correções
router.get("/correcoes", correcoesController.index)
router.post("/correcoes/:usuarioId/upload", uploadCorrecoes.single("file"), correcoesController.create)
router.get("/correcoes/download/:id", correcoesController.download)

// Rotas relacionadas a frequencia
router.get("/frequencias", frequenciasController.index) 
router.post("/frequencias", frequenciasController.create)
router.get("/frequencias/:id", frequenciasController.show)
router.put ("/frequencias/:id", frequenciasController.update)
router.delete("/frequencias/:id", frequenciasController.delete)
router.get("/frequencias/aluno/:id", frequenciasController.showByAluno) 

// Rota que retorna o ranking de alunos
router.get("/ranking", rankingController.index)

// Rota que retorna um vídeo
router.get("/videos/:id", videosController.show)

// rotas do simulado 
router.post("/simulados", simuladoController.create)
router.get("/simulados", simuladoController.index)
router.get("/simulados/:id", simuladoController.show)
// criar uma rota que recebe o id da turma e retorna todos os simulados dessa turma
router.get("/simulados/turmaId/:id", simuladoController.showByTurma)

router.delete("/simulados/:id", simuladoController.delete)

// rotas das notas de simulado
router.post ("/notaSimulado", notasSimuladoController.create)
router.get("/notaSimulado", notasSimuladoController.index)
router.get("/notaSimulado/:id", notasSimuladoController.show)
router.delete("/notaSimulado/:id", notasSimuladoController.delete)
// buscar notas de um simulado especifico
router.get("/notaSimulado/simuladoId/:id", notasSimuladoController.showBySimulado)

module.exports = router