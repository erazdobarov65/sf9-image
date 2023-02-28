const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // If the user goes to the root URL, display the input form
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
      <form method="post" action="/generate">
        <label for="num">Enter a number between 1 and 100:</label>
        <input type="number" id="num" name="num" min="1" max="100" required>
        <button type="submit">Generate</button>
      </form>
    `);
    res.end();
  } else if (req.url === '/generate' && req.method === 'POST') {
    // If the user submits the input form, generate an array of random numbers
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const num = parseInt(body.split('=')[1]);
      const numbers = Array.from({length: num}, () => Math.floor(Math.random() * 100) + 1);
      const max = Math.max(...numbers);
      const average = numbers.reduce((total, num) => total + num, 0) / numbers.length;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(`
        <p>Generated ${numbers.length} random numbers between 1 and 100:</p>
        <ul>
          ${numbers.map(n => `<li>${n}</li>`).join('\n')}
        </ul>
        <p>Max number: ${max}</p>
        <p>Average: ${average.toFixed(2)}</p>
      `);
      res.end();
    });
  } else {
    // If the user goes to any other URL, display a 404 error
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
});

server.listen(8080, '0.0.0.0', () => {
  console.log('Server running at http://127.0.0.1:8080/');
});

