const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

// Ensure the pdfs folder exists
const pdfDir = path.join(__dirname, '../pdfs')
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir)

// Generate PDF Function
const generatePDF = async (req, res) => {
  const { order, method } = req.body

  if (!order) 
    return res.status(400).json({ error: 'Order data is required' })

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    let htmlContent = ''
    // Order Details HTML Template
    if (method == 'order') {
        htmlContent = `
        <html lang='en'>
        <head>
            <title>Order Details</title>
            <style>
                .order-approve {
                    position: relative;
                    background-color: black;
                    width: 90%;
                    max-width: 450px;
                    min-height: 300px;
                    max-height: 80vh;
                    margin: 90px auto;
                    padding: 20px 20px 10px;
                    color: white;
                    bottom: unset;
                    border-radius: 10px;
                    box-shadow: 0px 4px 10px rgba(0,0,0,0.4);
                    overflow-y: auto;
                    text-align: left;
                }
        
                .order-approve i {
                    position: absolute;
                    right: 3%;
                    top: 3%;
                    color: rgba(255, 255, 255, 0.75);
                    cursor: pointer;
                }
        
                .order-approve img {
                    width: 50px;
                }
        
                .order-approve div {
                    margin: 20px 0;
                }
        
                .order-approve button {
                    margin-top: 10px;
                    padding: 10px;
                    width: 120px;
                    border-radius: 20px;
                    cursor: pointer;
                    color: white;
                    border: none;
                }
        
                .order-approve button i {
                    color: white;
                    position: static;
                }
            </style>
        </head>
        <body>
            <div class='order-approve'>
                <h2 style='text-align: center;'>Order: ${order.orderNumber}</h2>
                <div>Customer: ${order.userID.email}</div>
                <div>Phone number: ${order.userID.phone}</div>
                <div>Address: ${order.userID.address}</div>
                <h3>Items:</h3>
                ${order.items.map(o => `
                    <div>
                        <div style='display: flex; align-items: center; gap: 10px;'>
                            <img src='http://localhost:4000/${o.mangaID.cover1}' alt='Product Image' />
                            ${o.mangaID.title}
                        </div>
                        <div>Quantity: ${o.quantity} <span style='margin-left: 50px;'>Order Price: $${o.price}</span></div>
                    </div>
                `).join('')}
                <h3>Total: $${order.totalPrice}</h3>
                <h3>Status: ${order.status}</h3>
            </div>
        </body>
        </html>
        `;
    }

    else if (method == 'stock') {
        htmlContent = `
        <html lang='en'>
        <head>
            <title>Stock Details</title>
            <style>
                .stock-details {
                    position: relative;
                    background-color: #1a1a1a;
                    width: 90%;
                    max-width: 450px;
                    min-height: 300px;
                    max-height: 80vh;
                    margin: 90px auto;
                    padding: 20px 20px 10px;
                    color: white;
                    bottom: unset;
                    border-radius: 10px;
                    box-shadow: 0px 4px 10px rgba(0,0,0,0.4);
                    overflow-y: auto;
                    text-align: left;
                }

                .stock-details i {
                    position: absolute;
                    right: 3%;
                    top: 3%;
                    color: rgba(255, 255, 255, 0.75);
                    cursor: pointer;
                }

                .stock-details img {
                    width: 50px;
                    border-radius: 5px;
                }

                .stock-details div {
                    margin: 20px 0;
                }

                .stock-details button {
                    margin-top: 10px;
                    padding: 10px;
                    width: 120px;
                    border-radius: 20px;
                    cursor: pointer;
                    color: white;
                    background-color: #28a745;
                    border: none;
                }

                .stock-details button i {
                    color: white;
                    position: static;
                }
            </style>
        </head>
        <body>
            <div class='stock-details'>
                <h2 style='text-align: center;'>Stock In: ${order.stockNumber}</h2>
                <div>Employee: ${order.employeeID.fullname}</div>
                <h3>Items:</h3>
                ${order.items.map(o => `
                    <div>
                        <div style='display: flex; align-items: center; gap: 10px;'>
                            <img src='http://localhost:4000/${o.mangaID.cover1}' alt='Product Image' />
                            ${o.mangaID.title}
                        </div>
                        <div>Quantity: ${o.stockQuantity} <span style='margin-left: 50px;'>Stock Price: $${o.mangaID.priceIn}</span></div>
                    </div>
                `).join('')}
                <h3>Total: $${order.totalPrice}</h3>
            </div>
        </body>
        </html>
        `;
    }

    await page.setContent(htmlContent)

    const pdfFileName = method === "order" ? `order_${order.orderNumber}.pdf` : `stock_${order.stockNumber}.pdf`
    const pdfPath = path.join(pdfDir, pdfFileName)

    await page.pdf({ path: pdfPath, format: "A4" })
    await browser.close()

    res.json({ message: "PDF Generated", filePath: `http://localhost:4000/pdfs/${pdfFileName}` })
    } 
    catch (error) {
        console.error('Error generating PDF:', error)
        res.status(500).json({ error: 'Failed to generate PDF' })
    }
}

module.exports = { generatePDF }
