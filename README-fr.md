# css-spinner

[Démonstration en direct](https://loading.io/css/)

Collection de 12 petites animations de chargement élégantes en CSS pur pour l'animation de chargement de votre site web.

![css spinner](https://raw.githubusercontent.com/loadingio/css-spinner/master/web/static/thumbnail.gif)


## Caractéristiques

* Vanilla - aucune dépendance externe et aucune bibliothèque supplémentaire requise.
* Autonome - utilisez-les séparément.
* Personnalisable - utilisez les variables Stylus pour les personnaliser rapidement en fonction de vos besoins.
* Facile à utiliser - copiez-collez simplement, et facile à utiliser avec des mixins pug.
* Léger - taille moyenne de 1 Ko par spinner non minifié, non compressé.

## Utilisation

[loading.io](https://loading.io/) propose une [interface web](https://loading.io/css/) pour choisir rapidement et copier les spinners souhaités, mais vous pouvez toujours trouver le code source dans ce référentiel. L'utilisation de base est la suivante :

1. Trouvez et téléchargez les fichiers HTML du loader souhaité dans le dossier [dist](https://github.com/loadingio/css-spinner/tree/master/dist/).
2. Copiez le contenu dans l'endroit où vous souhaitez utiliser ce loader.

Des fichiers CSS et HTML séparés sont également disponibles dans le dossier [build](https://github.com/loadingio/css-spinner/tree/master/dist/entries) pour réutiliser les codes CSS et réduire la taille de la charge utile.

Nous fournissons également des fichiers source Stylus et pug pour intégrer ces spinners plus facilement dans votre projet. Trouvez les fichiers Stylus et pug correspondants pour les spinners souhaités dans les dossiers [src/](https://github.com/loadingio/css-spinner/tree/master/src).

Pour utiliser uniquement les fichiers Stylus, vous devrez fournir les variables répertoriées dans [vars.styl](https://github.com/loadingio/css-spinner/blob/master/vars.styl).

## Package npm

Ce module est également disponible via npm sous le nom [@loadingio/css-spinner](https://www.npmjs.com/package/@loadingio/css-spinner).


## Compilation

Vous pouvez également personnaliser tous ces loaders en les compilant vous-même.

* Tout d'abord, mettez à jour `vars.styl` en fonction de vos besoins.
* Assurez-vous que les packages requis sont installés avec `npm install`. Vous devez avoir NPM / NodeJS préinstallé.
* Compilez avec la commande suivante : `npm run build`
   - Les fichiers générés se trouveront dans le dossier `dist/`.


## Compatibilité des navigateurs

Ces spinners utilisent les animations et les transformations CSS, largement pris en charge par les principaux navigateurs modernes, à l'exception de IE<=9. Pour prendre en charge les anciens navigateurs tels que IE9, veuillez utiliser [loading.io](https://loading.io/animation/icon/) pour générer des chargeurs GIF alternatifs.

## Licence

Tous les fichiers de loader ici sont publiés sous la licence CC0. Cependant, vous pouvez mentionner ce lien : [loading.io css spinner ( https://loading.io/css/ )](https://loading.io/css/) pour montrer votre soutien à loading.io.

Les autres codes source sont publiés sous la licence MIT.


## Autres ressources

Si vous souhaitez créer une animation de chargement personnalisée en CSS, loading.io propose également [loading.css](https://loading.io/animation/) - une bibliothèque d'animation de chargement en CSS pur, ainsi qu'un [constructeur GIF d'aide](https://loading.io/animation/icon/). N'oubliez pas de le consulter et de partager vos loaders personnalisés avec nous !
