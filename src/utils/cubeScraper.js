import axios from 'axios';

const fetchCubeDetails = async (url) => {
  try {
    // Use a CORS proxy to bypass CORS restrictions
    const corsProxy = 'https://corsproxy.io/?';
    const response = await axios.get(corsProxy + encodeURIComponent(url));
    const html = response.data;

    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    let name, price, image, size, features;

    if (url.includes('speedcubeshop.com')) {
      name = doc.querySelector('h1.product-single__title')?.textContent.trim();
      price = doc.querySelector('span.price-item--regular')?.textContent.trim().replace('$', '');
      image = doc.querySelector('img.product-featured-media')?.src;
      size = extractSize(name);
      features = extractFeatures(doc.querySelector('.product-single__description')?.textContent);
    } else if (url.includes('thecubicle.com')) {
      name = doc.querySelector('h1.product-title')?.textContent.trim();
      price = doc.querySelector('span.price')?.textContent.trim().replace('$', '');
      image = doc.querySelector('img.product-image')?.src;
      size = extractSize(name);
      features = extractFeatures(doc.querySelector('.product-description')?.textContent);
    } else {
      throw new Error('Unsupported website');
    }

    if (!name || !price || !image) {
      throw new Error('Failed to extract cube details');
    }

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
    throw new Error('Failed to fetch cube details. Please try again.');
  }
};

const extractSize = (name) => {
  if (!name) return 'Unknown';
  const sizes = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'];
  for (const size of sizes) {
    if (name.toLowerCase().includes(size)) return size;
  }
  return 'Unknown';
};

const extractFeatures = (description) => {
  if (!description) return [];
  const features = [];
  const lowerDesc = description.toLowerCase();
  if (lowerDesc.includes('maglev')) features.push('Maglev');
  if (lowerDesc.includes('core to corner magnets')) features.push('Core to Corner Magnets');
  if (lowerDesc.includes('magnets')) features.push('Magnets');
  return features;
};

export { fetchCubeDetails };