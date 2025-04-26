// Import the package
import httpStatusMeaning from '../../../src/index.mjs';

export default function handler(req, res) {
  try {
    const { code, language = 'en' } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Status code is required' });
    }
    
    const statusCode = parseInt(code, 10);
    if (isNaN(statusCode)) {
      return res.status(400).json({ error: 'Invalid status code format' });
    }
    
    const meaning = httpStatusMeaning.getStatusMeaning(statusCode, language);
    const category = httpStatusMeaning.getStatusCategory(statusCode, language);
    const useCases = httpStatusMeaning.getStatusCodeUseCases(statusCode);
    
    res.status(200).json({
      code: statusCode,
      meaning,
      category,
      useCases,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 