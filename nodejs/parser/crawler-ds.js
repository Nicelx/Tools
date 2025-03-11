const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

class SiteCrawler {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.visited = new Set();
    this.results = [];
    this.maxDepth = 3;
    this.requestDelay = 1000; // 1s между запросами
  }

  async crawl(url = this.baseUrl, depth = 1) {
    if (depth > this.maxDepth || this.visited.has(url)) return;

    this.visited.add(url);
    console.log(`Crawling: ${url}`);

    try {
      // Загружаем страницу
      const { data } = await axios.get(url, {
        timeout: 5000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      // Парсим HTML
      const $ = cheerio.load(data);
      
      // Извлекаем h1
      const h1 = $('h1').first().text().trim() || 'No H1 found';
      this.results.push({ url, h1 });

      // Находим все ссылки
      const links = [];
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href) {
          try {
            const absoluteUrl = new URL(href, url).href;
            if (this.isInternalLink(absoluteUrl)) {
              links.push(absoluteUrl);
            }
          } catch (e) {}
        }
      });

      // Рекурсивный обход
      for (const link of links) {
        await new Promise(resolve => setTimeout(resolve, this.requestDelay));
        await this.crawl(link, depth + 1);
      }

    } catch (error) {
      console.error(`Error crawling ${url}:`, error.message);
    }
  }

  isInternalLink(url) {
    try {
      const baseHost = new URL(this.baseUrl).hostname;
      const currentHost = new URL(url).hostname;
      return baseHost === currentHost;
    } catch (e) {
      return false;
    }
  }

  printResults() {
    console.log('\nРезультаты сканирования:');
    console.table(this.results);
  }
}

// Использование
(async () => {
  const crawler = new SiteCrawler('https://salusmed.clinic');
  await crawler.crawl();
  crawler.printResults();
})();