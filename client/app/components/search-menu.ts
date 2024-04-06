import Component from '@glimmer/component';
import type Category from 'myTypes/category';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export interface SearchMenuSignature {
  Args: {
    categories: Category[];
  };
}

export default class SearchMenuComponent extends Component<SearchMenuSignature> {
  @tracked results: string[] | null = null;
  @tracked loading = false;

  @action
  searchComics() {
    this.results = null;
    this.loading = true;

    const url = new URL('https://comicbooksfinder.com/api/appearances/');
    for (let category of this.args.categories) {
      if (category.selected.length) {
        url.searchParams.set(category.name, category.selected.join(','));
      }
    }
    fetch(url)
      .then((data) => {
        data.json().then((value) => {
          this.results = value;
        });
        this.loading = false;
      })
      .catch((error) => console.log(error));
  }
}
