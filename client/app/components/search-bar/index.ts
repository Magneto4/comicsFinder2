import { action } from '@ember/object';
import Component from '@glimmer/component';
import type Category from 'myTypes/category';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';

export interface SearchBarSignature {
  Args: {
    category: Category;
  };
}

export default class SearchBarComponent extends Component<SearchBarSignature> {
  @tracked searching: string = '';
  @tracked results: string[] = [];
  @tracked selected: string[] = [];
  @tracked tooManyResults: boolean = false;
  lastType = 0;
  event: InputEvent | null = null;

  condition(searching: string, item: string) {
    let separator = /[ \(\-\)]+/;
    const queryWords = searching.toLowerCase().split(separator);

    const itemWords = item.toLowerCase().split(separator);
    return queryWords.every((qWord) =>
      itemWords.some((iWord) => iWord.startsWith(qWord)),
    );
  }

  anySelected() {
    console.log('here');
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

  updateSearchResults() {
    if (this.args.category.values) {
      this.results = this.args.category.values.filter((el) =>
        this.condition((this.event!.target as HTMLTextAreaElement).value, el),
      );
      this.tooManyResults = this.results.length > 10000;
    }
  }

  @action
  updateValue(event: InputEvent) {
    if ((event.target as HTMLTextAreaElement)?.value.length == 0) {
      this.results = [];
    } else {
      this.event = event;
      // @ts-ignore
      debounce(this, this.updateSearchResults, 500);
    }
  }
}
