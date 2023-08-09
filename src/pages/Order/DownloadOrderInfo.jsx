import React from 'react'
import api from '../../redux/api'
import './order.scss'

export default function DownloadOrderInfo() {

  const generateAndDownloadPDF = async () => {
    try {
      const response = await api.get('/extra/download-orderInfo', {
        responseType: 'blob',
      });

      const pdfUrl = window.URL.createObjectURL(new Blob([response.data]));

      // Створюємо посилання для завантаження та відкриття PDF файлу
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank'; // Відкриваємо у новому вікні
      link.download = 'orders.pdf';
      link.click();

      // Видаляємо URL об'єкту після завантаження
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Error while generating PDF:', error);
    }
  };

  return (
    <div className='downloadorderinfo'>
      <button onClick={generateAndDownloadPDF}>Generate and Download PDF</button>
    </div>
  )
}
