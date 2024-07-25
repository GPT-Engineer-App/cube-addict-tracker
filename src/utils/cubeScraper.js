import axios from 'axios';

const fetchCubeDetails = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract cube details
    const name = doc.querySelector('h1').textContent.trim();
    const price = doc.querySelector('[data-price]').getAttribute('data-price');
    const image = doc.querySelector('img[itemprop="image"]').src;
    
    // Extract features
    const features = [];
    const descriptionElement = doc.querySelector('[data-product-description]');
    if (descriptionElement) {
      const descriptionText = descriptionElement.textContent.toLowerCase();
      if (descriptionText.includes('maglev')) features.push('Maglev');
      if (descriptionText.includes('core to corner magnets')) features.push('Core to Corner Magnets');
      if (descriptionText.includes('magnets')) features.push('Magnets');
    }

    // Extract size
    let size = '3x3'; // Default size
    if (name.includes('2x2')) size = '2x2';
    if (name.includes('4x4')) size = '4x4';
    // Add more size checks as needed

    return {
      id: Date.now(),
      name,
      price: parseFloat(price),
      image,
      size,
      features
    };
  } catch (error) {
    console.error('Error fetching cube details:', error);
    throw error;
  }
};

export { fetchCubeDetails };