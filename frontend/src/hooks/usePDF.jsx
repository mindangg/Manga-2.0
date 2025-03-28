export const usePDF = () => {
  const generatePDF = async (order) => {
    try {
        const response = await fetch('http://localhost:4000/api/pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order })
        })

        const data = await response.json()
        if (response.ok) {
            alert('PDF saved successfully!')
            window.open(data.filePath, '_blank')
        } 
        else
            throw new Errow('PDF Generation Error:', data.error)
    } 
    catch (error) {
        console.error('Error generating PDF:', error)
    }
}

  return { generatePDF } 
}
