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
        category: 'Marvel_Staff/Writers',
        selected: [],
        values: null,
      },
      {
        name: 'pencilers',
        category: 'Marvel_Staff/Pencilers',
        selected: [],
        values: null,
      },
      {
        name: 'inkers',
        category: 'Marvel_Staff/Inkers',
        selected: [],
        values: null,
      },
      {
        name: 'colorists',
        category: 'Marvel_Staff/Colorists',
        selected: [],
        values: null,
      },
      {
        name: 'letterers',
        category: 'Marvel_Staff/Letterers',
        selected: [],
        values: null,
      },
      {
        name: 'editors',
        category: 'Marvel_Staff/Editors',
        selected: [],
        values: null,
      },
    ];

    for (let category of categories) {
      fetch('http://localhost:3000/api/list/' + category.category)
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
