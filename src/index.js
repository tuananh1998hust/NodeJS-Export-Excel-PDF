import express from 'express';
import xl from 'excel4node';
import PDFDocument from 'pdfkit';

const app = express();
const wb = new xl.Workbook();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('/index.html');
});

app.get('/api/v1/excel', function(req, res) {
  const data = [
    { id: 0, name: 'Tuan Anh', age: 20 },
    { id: 1, name: 'Van Huy', age: 20 },
    { id: 2, name: 'Dinh Loi', age: 20 },
    { id: 3, name: 'Van Tuan', age: 20 },
    { id: 4, name: 'Son Tung', age: 20 }
  ];
  // Add Worksheets to the workbook
  let ws = wb.addWorksheet('Sheet 1');

  // Create a reusable style
  const headerStyle = wb.createStyle({
    font: {
      color: '#FF0800',
      size: 18
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
  });

  const normalStyle = wb.createStyle({
    font: {
      size: 14
    }
  });

  ws.cell(1, 1)
    .string('STT')
    .style(headerStyle);

  ws.cell(1, 2)
    .string('Name')
    .style(headerStyle);

  ws.cell(1, 3)
    .string('Age')
    .style(headerStyle);

  for (let i = 0; i < data.length; i++) {
    ws.cell(i + 2, 1)
      .number(data[i].id)
      .style(normalStyle);

    ws.cell(i + 2, 2)
      .string(data[i].name)
      .style(normalStyle);

    ws.cell(i + 2, 3)
      .number(data[i].age)
      .style(normalStyle);
  }

  wb.write('Excel.xlsx', res);

  return ws;
});

app.get('/api/v1/pdf', function(req, res) {
  const doc = new PDFDocument();

  doc
    .image('public/images/node.png', 100, 15, {
      fit: [150, 150],
      align: 'center',
      valign: 'center'
    })
    .stroke();

  doc
    .image('public/images/golang.png', 350, 15, {
      fit: [150, 150],
      align: 'center',
      valign: 'center'
    })
    .stroke();

  doc
    .rect(100, 200, 200, 30)
    .lineWidth(1)
    .stroke();
  doc
    .rect(300, 200, 200, 30)
    .lineWidth(1)
    .stroke();
  doc
    .rect(100, 230, 200, 30)
    .lineWidth(1)
    .stroke();
  doc
    .rect(300, 230, 200, 30)
    .lineWidth(1)
    .stroke();

  doc.text('Node JS', 200, 215);
  doc.text('Golang', 400, 215);
  doc.text('console.log("Hello World");', 115, 245);
  doc.text('fmt.Println("Hello World")', 315, 245);

  doc.pipe(res);
  doc.end();

  res.setHeader('Content-disposition', 'inline');
  res.setHeader('Content-type', 'application/pdf');

  return doc;
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
