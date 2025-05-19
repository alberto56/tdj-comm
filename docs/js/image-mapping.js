// Provide a function to map unoptimized-to-optimized image URLs.

/**
 * Function to load and process image data
 *
 * @param {string} imageServerDomain - The domain of the image server
 *   For example 'https://images.example.com/' or 'http://localhost:8705/'.
 * @param {string} imageFileUrl - The URL of the JSON file containing the image
 *   mapping. For example '/unversioned-image-mapping.json'.
 */
 function loadImages(imageServerDomain, imageFileUrl) {
  // Select all <img> elements in the document
  const images = document.querySelectorAll('img');
  // Shared carousel size (width/height) first carousel image size set to subsequent
  // carousel image
  let carouselSize = { height: null };

  // Fetch the JSON file once
  fetch(imageFileUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch JSON');
          }
          return response.json();
      })
      .then(mappingData => {
          // Iterate over each <img> element
          images.forEach(img => {
            optimizeImage(img, mappingData, imageServerDomain, carouselSize);
          });
      })
      .catch(error => {
          console.error('Error fetching or processing JSON:', error);
          // Optionally handle error, e.g., set a fallback image for all images
      });
}

/**
 * Extracts width and height from the inline style attribute,
 * only if they're in fixed pixels. If width is '100%', sets width to 0.
 * @param {HTMLImageElement} img - The image element.
 * @returns {{width: number, height: number}} - Dimensions parsed from style.
 */
function getDimensionsFromStyle(img) {
  const style = img.getAttribute('style') || '';
  let width = 0, height = 0;

  // Handle width
  const widthMatch = style.match(/width:\s*([^;]+)/);
  if (widthMatch) {
    const widthVal = widthMatch[1].trim();
    if (widthVal.endsWith('px')) {
      width = parseInt(widthVal, 10);
    } else if (widthVal === '100%') {
      width = 0; // force fallback
    }
    // You can add more rules here if needed
  }

  // Handle height
  const heightMatch = style.match(/height:\s*([^;]+)/);
  if (heightMatch) {
    const heightVal = heightMatch[1].trim();
    if (heightVal.endsWith('px')) {
      height = parseInt(heightVal, 10);
    }
  }

  return { width, height };
}

/**
 * Extracts the image source if it starts with '/media'.
 * @param {HTMLImageElement} img - The image element.
 * @returns {string|null} - The valid image source or null.
 */
function getImageSource(img) {
  const dataSrc = img.getAttribute('src');
  if (!dataSrc || !dataSrc.startsWith('/media')) return null;
  return dataSrc;
}

/**
 * Determines if the image has the 'carousel-image' class.
 * @param {HTMLImageElement} img - The image element.
 * @returns {boolean} - True if image is part of a carousel.
 */
function isCarouselImage(img) {
  return img.classList.contains('carousel-image');
}

/**
 * Gets the height of a visible carousel image by measuring its bounding box.
 * @param {HTMLImageElement} img - The image element.
 * @returns {number|null} - Height if visible, else null.
 */
function getCarouselHeightIfVisible(img) {
  if (img.offsetParent !== null) {
    const rect = img.getBoundingClientRect();
    if (rect.height) {
      return Math.round(rect.height);
    }
  }
  return null;
}

/**
 * Gets rendered dimensions of the image if it's fully loaded.
 * @param {HTMLImageElement} img - The image element.
 * @returns {{width: number, height: number}} - The dimensions.
 */
function getRenderedDimensions(img) {
  if (img.complete) {
    const rect = img.getBoundingClientRect();
    if (rect.width && rect.height) {
      return { width: Math.round(rect.width), height: Math.round(rect.height) };
    }
  }
  return { width: 0, height: 0 };
}

/**
 * Constructs the optimized image URL using mapping data and dimensions.
 * Falls back to original image source if optimized version is not found.
 * @param {string} dataSrc - Original image source.
 * @param {number} width - Width of the image.
 * @param {number} height - Height of the image.
 * @param {Object} mappingData - Mapping of original to optimized image URLs.
 * @param {string} imageServerDomain - Domain for optimized images.
 * @returns {string} - Optimized or fallback image URL.
 */
function getOptimizedImageUrl(dataSrc, width, height, mappingData, imageServerDomain) {
  const dataSize = `${width}x${height}` || '800x';
  const optimizedSrc = mappingData[dataSrc.replace('/media', '')];

  if (optimizedSrc && optimizedSrc[dataSize]) {
    return imageServerDomain + optimizedSrc[dataSize];
  }

  console.warn("Optimized image path not found for size:", dataSize);
  return dataSrc;
}

/**
 * Optimizes the image source by calculating its size and replacing it
 * with a mapped, optimized URL if available.
 * @param {HTMLImageElement} img - The image element.
 * @param {Object} mappingData - Image size to URL mapping data.
 * @param {string} imageServerDomain - Domain for optimized image assets.
 * @param {{height: number}|null} carouselSize - Optional cached carousel size.
 */
function optimizeImage(img, mappingData, imageServerDomain, carouselSize) {
  const dataSrc = getImageSource(img);
  if (!dataSrc) return;

  const isCarousel = isCarouselImage(img);

  let { width, height } = getDimensionsFromStyle(img);

  // Try carousel-specific dimension detection
  if ((!width || !height) && isCarousel) {
    if (carouselSize.height === null) {
      const carouselHeight = getCarouselHeightIfVisible(img);
      if (carouselHeight) {
        carouselSize.height = carouselHeight;
      }
    }
    if (carouselSize.height !== null) {
      width = 0;
      height = carouselSize.height;
    }
  }

  // Fallback for non-carousel images
  if ((!width || !height) && !isCarousel) {
    const rendered = getRenderedDimensions(img);
    width = width === 0 ? width: rendered.width;
    height = rendered.height;
  }

  width = width === 0 ? "": width;
  height = height === 0 ? "": height;

  const optimizedUrl = getOptimizedImageUrl(dataSrc, width, height, mappingData, imageServerDomain);
  img.src = optimizedUrl;
}
