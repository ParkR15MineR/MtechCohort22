// Calculates area of circle
function calculateArea(radius) {
  return Math.PI * Math.pow(radius, 2);
}
// Random Password Generator
function generatePassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
// Sales tax calculator
function calculateSalesTax(price, taxRate) {
  return price + (price * taxRate);
}
