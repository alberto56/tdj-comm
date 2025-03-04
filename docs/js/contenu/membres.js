class Membres extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/bios.json';
  }

  loadDefault() {
    return '.mettre-membres-ici';
  }

  variables() {
    // Voir l'URL pour détais. Sont dans template, par exemple {{nom}}
    return {
      'nom': 'string',
      'image': 'image',
    };
  }

  template() {
    return `
<div class="swiper-slide py-2 p-0">
    <div class="bg-white rounded-lg shadow-md p-2">
        <div class="bio-image-wrapper">
          <img src="{{image}}" alt="Membre 1" class="mb-4 rounded-full mx-auto" style="border-radius: 10%;">
        </div>
        <h3 class="text-lg font-semibold text-center">{{nom}}</h3>
        <p class="text-center text-gray-600">Secr</p>
        <p class="text-center">Biographie: Brève description du membre.</p>
        <p class="text-center text-gray-500">Spécialité: Spécialité 1</p>
        <ul class="social-icon mt-4">
            <li class="social-icon-item">
                <a href="#" class="social-icon-link bi-twitter"></a>
            </li>

            <li class="social-icon-item">
                <a href="#" class="social-icon-link bi-facebook"></a>
            </li>

            <li class="social-icon-item">
                <a href="#" class="social-icon-link bi-instagram"></a>
            </li>
        </ul>
    </div>
</div>
`;
  }
}
