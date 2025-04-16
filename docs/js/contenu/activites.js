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
    <div class="custom-block-wrap shadow">
        <img src="__image__"
            class="custom-block-image img-fluid" alt="Children Education" style="object-fit: cover; height: 200px; transition: transform 0.3s;">
        
        <div class="custom-block">
            <div class="custom-block-body">
                <h5 class="mb-3" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%;">__title__</h5>
                <p>Vrais informations ici.........</p>
            </div>
            <a href="donate.html" class="custom-btn btn">En savoir plus</a>
        </div>
    </div>
</div>

<style>
    .custom-block-wrap {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        transition: transform 0.3s;
    }

    .custom-block-wrap:hover {
        transform: scale(1.05);
    }

    .shadow {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .custom-btn {
        background-color:rgb(3, 15, 27);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        transition: background-color 0.3s;
    }

    .custom-btn:hover {
        background-color: #027933;
    }
</style>
`;
}

}
