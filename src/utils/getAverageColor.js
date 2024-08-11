async function getAverageColor(imageUrl) {
  try {
    // Crée une nouvelle promesse pour charger l'image
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Cette ligne est nécessaire pour éviter les problèmes de CORS
      img.src = imageUrl;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

    // Crée un canvas et dessine l'image dessus
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);

    // Récupère les données des pixels de l'image
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Initialise les valeurs pour calculer la couleur moyenne
    let r = 0,
      g = 0,
      b = 0;

    // Parcourt tous les pixels et additionne les valeurs des couleurs
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    // Calcule le nombre total de pixels
    const pixelCount = data.length / 4;

    // Calcule la couleur moyenne
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Retourne la couleur moyenne en format RGB
    return `rgb(${r}, ${g}, ${b})`;
  } catch (error) {
    console.error("Error loading image:", error);
    return null; // ou une valeur par défaut
  }
}

export default getAverageColor;
