// Import the package
import httpStatusMeaning from '../../../src/index.mjs';

export default function handler(req, res) {
  try {
    const { description, language = 'en' } = req.query;
    
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    
    const statusCode = httpStatusMeaning.findStatusCodeByDescription(description);
    
    if (!statusCode) {
      return res.status(404).json({ error: 'No matching status code found' });
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