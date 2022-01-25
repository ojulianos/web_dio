try {
    const http = require('http');
    const host = 'http://localhost';
    const port = 8000;
    const stats = require('./ramUsage.js');
    const routes = {
        '/': {
            title: 'Página Inicial',
            text: 'Ola, bem vindo, voce pode navegar nas urls /, /sobre, /contato e /status'
        }, 
        '/sobre': {
            title: 'Sobre Mim',
            text: 'Oi meu nome eh Juliano, sou desenvovedor e aventureiro de software, baterista, faixa roxa de jiu-jitsu e estudante de eng. de software.'
        }, 
        '/contato': {
            title: 'Contato',
            text: 'Email: juliano@mybelt.com.br | Telefone: 48 9 9134-5850 | Site: mybelt.com.br'
        }, 
        '/status': {
            title: 'Status',
            text: JSON.stringify(stats, null, 2)
        }
    };

    http.createServer((req, res) => {
        res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');

        let url = req.url;
        let title = routes[url] != undefined ? routes[url].title : 'Página Inicial';
        let text = routes[url] != undefined ? routes[url].text : routes['/'].text;

        return res.end(renderTemplate(title, text));
    }).listen(port, () => console.log(`Servidor rodando em ${host}:${port}`));

} catch (error) {
    console.log(error);    
}

function renderTemplate(title, content) {
    const header = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        </head>
    <body>
        <section class="section">
            <div class="container">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/sobre">Sobre</a></li>
                        <li><a href="/contato">Contato</a></li>
                        <li><a href="/status">Status</a></li>
                    </ul>
                </nav>`;

    const footer = `
            </div>
        </section>
    </body>
    </html>`;

    
  return header + content + footer;
    
}