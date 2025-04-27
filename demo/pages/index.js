import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// We would normally import from the npm package
// import httpStatusMeaning from 'http-status-meaning';
// But for local development, we'll import from the parent directory
import httpStatusMeaning from '../../src/index.mjs';

export default function Home() {
  const [statusCode, setStatusCode] = useState('404');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('lookup');
  const [result, setResult] = useState(null);

  const languages = httpStatusMeaning.getSupportedLanguages();

  const handleStatusCodeLookup = () => {
    try {
      const code = parseInt(statusCode, 10);
      if (isNaN(code)) {
        setResult({
          error: true,
          message: 'Please enter a valid HTTP status code'
        });
        return;
      }

      setResult({
        code,
        meaning: httpStatusMeaning.getStatusMeaning(code, language),
        category: httpStatusMeaning.getStatusCategory(code, language),
        useCases: httpStatusMeaning.getStatusCodeUseCases(code),
      });
    } catch (error) {
      setResult({
        error: true,
        message: error.message
      });
    }
  };

  const handleDescriptionLookup = () => {
    try {
      if (!description.trim()) {
        setResult({
          error: true,
          message: 'Please enter a description'
        });
        return;
      }

      const code = httpStatusMeaning.findStatusCodeByDescription(description);
      if (!code) {
        setResult({
          error: true,
          message: 'No matching status code found for this description'
        });
        return;
      }

      setResult({
        code,
        meaning: httpStatusMeaning.getStatusMeaning(code, language),
        category: httpStatusMeaning.getStatusCategory(code, language),
        useCases: httpStatusMeaning.getStatusCodeUseCases(code),
      });
    } catch (error) {
      setResult({
        error: true,
        message: error.message
      });
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Informational': '#0066cc',
      'Success': '#4caf50',
      'Redirection': '#00bcd4',
      'Client Error': '#ff9800',
      'Server Error': '#f44336',
      'Unknown': '#9e9e9e'
    };
    return colors[category] || colors['Unknown'];
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>HTTP Status Meaning Demo</title>
        <meta name="description" content="Demo for HTTP Status Meaning package" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HTTP Status Meaning
        </h1>

        <p className={styles.description}>
          A comprehensive library for HTTP status codes with internationalization support
        </p>

        <div className={styles.tabs}>
          <button 
            className={activeTab === 'lookup' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('lookup')}
          >
            Status Code Lookup
          </button>
          <button 
            className={activeTab === 'description' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('description')}
          >
            Description Lookup
          </button>
        </div>

        <div className={styles.card}>
          {activeTab === 'lookup' ? (
            <div className={styles.formGroup}>
              <label htmlFor="statusCode">HTTP Status Code:</label>
              <input
                id="statusCode"
                type="text"
                value={statusCode}
                onChange={(e) => setStatusCode(e.target.value)}
                placeholder="e.g. 404"
                className={styles.input}
              />
              <div className={styles.formGroup}>
                <label htmlFor="language">Language:</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={styles.select}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleStatusCodeLookup}
                className={styles.button}
              >
                Lookup
              </button>
            </div>
          ) : (
            <div className={styles.formGroup}>
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Not Found"
                className={styles.input}
              />
              <div className={styles.formGroup}>
                <label htmlFor="language">Language:</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={styles.select}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleDescriptionLookup}
                className={styles.button}
              >
                Find Status Code
              </button>
            </div>
          )}
        </div>

        {result && (
          <div className={styles.resultContainer}>
            {result.error ? (
              <div className={styles.error}>{result.message}</div>
            ) : (
              <>
                <div className={styles.resultHeader}>
                  <div 
                    className={styles.statusCode}
                    style={{ backgroundColor: getCategoryColor(result.category) }}
                  >
                    {result.code}
                  </div>
                  <h2 className={styles.statusMeaning}>{result.meaning}</h2>
                </div>
                <div className={styles.statusCategory}>
                  Category: <span style={{ color: getCategoryColor(result.category) }}>{result.category}</span>
                </div>
                {result.useCases && result.useCases.length > 0 && (
                  <div className={styles.useCases}>
                    <h3>Common Use Cases:</h3>
                    <ul>
                      {result.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Lukman10a/http-status-meaning"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
} 