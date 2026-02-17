export const products = [
  { id: "p1", name: "Vintage Camera", priceCents: 5999, image: "camera.jpg" },
  { id: "p2", name: "Leather Journal", priceCents: 1500, image: "journal.jpg" },
  { id: "p3", name: "Wireless Earbuds", priceCents: 8900, image: "earbuds.jpg" },
  { id: "id-001", name: "Modern Headphones", priceCents: 8999, image: "images/audio.jpg" },
  { id: "id-002", name: "Minimalist Watch", priceCents: 12550, image: "images/watch.jpg" },
  { id: "id-003", name: "Ergonomic Mouse", priceCents: 4500, image: "images/mouse.jpg" }
];

// Helper to find a product by ID without repeating logic in pages
export function getProduct(productId) {
  return products.find(product => product.id === productId);
}