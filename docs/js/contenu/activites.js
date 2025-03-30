class Activites extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/activites.json';
  }

  init2() {
    this.init();
  }

  selecteur() {
    return '.mettre-activites-ici';
  }

  variables() {
    // Voir l'URL pour détais. Sont dans template, par exemple {{nom}}
    return {
      'title': 'string',
      'image': 'image',
    };
  }

  template() {
    return `
<div class="col-lg-4 col-md-6 col-12 mb-4">
    <div class="custom-block-wrap">
        <img src="__image__"
            class="custom-block-image img-fluid" alt="Children Education">

        <div class="custom-block">
            <div class="custom-block-body">
                <h5 class="mb-3">__title__</h5>
                <p>Lorem Ipsum dolor sit amet, consectetur adipsicing kengan omeg
                    kohm tokito</p>
                <div class="progress mt-4">
                    <div class="progress-bar w-75" role="progressbar"
                        aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
                <div class="d-flex align-items-center my-2">
                    <p class="mb-0"><strong>Raised:</strong> $18,500</p>
                    <p class="ms-auto mb-0"><strong>Goal:</strong> $32,000</p>
                </div>
            </div>
            <a href="donate.html" class="custom-btn btn">Donate now</a>
        </div>
    </div>
</div>
`;
  }
}
