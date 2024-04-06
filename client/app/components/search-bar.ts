import { action } from '@ember/object';
import Component from '@glimmer/component';
import type Category from 'myTypes/category';
import { tracked } from '@glimmer/tracking';

export interface SearchBarSignature {
  Args: {
    category: Category;
  };
}

export default class SearchBarComponent extends Component<SearchBarSignature> {
  @tracked searching: string = '';
  @tracked results: string[] = [];
  @tracked selected: string[] = [];
  lastType = 0;

  condition(searching: string, el: string) {
    const re = RegExp(`.*${searching.toLowerCase().split('').join('.*')}.*`);
    return el.toLowerCase().match(re);
  }

  result() {
    return 'this.results';
  }

  anySelected() {
    return this.selected.length;
  }

  @action
  select(value: string) {
    if (this.selected.indexOf(value) == -1) {
      this.args.category.selected.push(value);
      this.selected = this.args.category.selected;
    }
    this.searching = '';
    this.results = [];
  }

  @action
  unselect(value: string) {
    const index = this.selected.indexOf(value);
    if (index > -1) {
      this.args.category.selected.splice(index, 1);
      this.selected = this.args.category.selected;
    }
  }

  @action
  updateValue(event: any) {
    this.lastType = Date.now();
    if (event.target.value.length == 0) {
      this.results = [];
    } else {
      setTimeout(() => {
        if (this.args.category.values && Date.now() - this.lastType > 200) {
          this.results = this.args.category.values.filter((el) =>
            this.condition(event.target.value, el),
          );
        }
      }, 200);
    }
  }
}
