import Route from '@ember/routing/route';
import type Category from 'myTypes/category';

export default class IndexRoute extends Route {
  model() {
    const categories: Category[] = [
      {
        name: 'characters',
        category: 'Characters',
        selected: [],
        values: null,
      },
      {
        name: 'writers',
        category: 'Creators/Writers',
        selected: [],
        values: null,
      },
      {
        name: 'pencilers',
        category: 'Creators/Pencilers',
        selected: [],
        values: null,
      },
      {
        name: 'inkers',
        category: 'Creators/Inkers',
        selected: [],
        values: null,
      },
      {
        name: 'colorists',
        category: 'Creators/Colorists',
        selected: [],
        values: null,
      },
      {
        name: 'letterers',
        category: 'Creators/Letterers',
        selected: [],
        values: null,
      },
      {
        name: 'editors',
        category: 'Creators/Editors',
        selected: [],
        values: null,
      },
    ];

    for (let category of categories) {
      fetch('https://comicbooksfinder.com/api/list/' + category.category)
        .then((data) => {
          data.json().then((value) => {
            category.values = value;
          });
        })
        .catch((error) => console.log(error));
    }

    return categories;
  }
}
