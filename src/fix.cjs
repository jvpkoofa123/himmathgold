const fs = require('fs');
let str = fs.readFileSync('App.jsx', 'utf8');

str = str.replace(/<ResponsiveContainer width="100%" height="100%">([\s\S]*?)<\/ResponsiveContainer>/g, 
  `<div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">$1</ResponsiveContainer>
    </div>
  </div>`);

fs.writeFileSync('App.jsx', str, 'utf8');
console.log('App.jsx successfully wrapped with horizontal scrollers.');
