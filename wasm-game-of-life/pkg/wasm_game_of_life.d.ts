/* tslint:disable */
/* eslint-disable */
/**
*/
export class Cell {
  free(): void;
}
/**
*/
export class Universe {
  free(): void;
/**
* @returns {Universe}
*/
  static new(): Universe;
/**
* @param {number} row
* @param {number} col
*/
  toggle_cell(row: number, col: number): void;
/**
* Set the width of the universe.
*
* Resets all cells to the dead state.
* @param {number} width
*/
  set_width(width: number): void;
/**
* Set the height of the universe.
*
* Resets all cells to the dead state.
* @param {number} height
*/
  set_height(height: number): void;
/**
* @param {number} center_row
* @param {number} center_col
*/
  insert_glider(center_row: number, center_col: number): void;
/**
* @param {number} center_row
* @param {number} center_col
*/
  insert_pulsar(center_row: number, center_col: number): void;
/**
*/
  tick(): void;
/**
* @returns {string}
*/
  render(): string;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  cells(): number;
}
