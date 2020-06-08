import app from './src/App.js';
const porta = ( process.env.PORT || 8080 );

try {
    app.listen(porta);
    console.log(`Servidor rodando na porta ${porta}`);
} catch (error) {
    console.log(error);
}