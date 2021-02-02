export class DurationModel {
  column: Column;
  columnLabel: {
    name: string,
    options: [
      {
        value: string,
        text: string
      }
    ]
  }

  constructor() {
    this.column = {
      name: '',
      options: [],
      selectedIndex: 0
    }
    this.columnLabel = {
      name: '',
      options: [
        {
          value: '',
          text: ''
        }
      ]
    }
  }
}

export interface Option {
  value: number,
  text: string
}

export interface Column {
  name: string,
  options: Option[],
  selectedIndex: number,
}