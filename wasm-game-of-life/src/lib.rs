mod utils;

extern crate fixedbitset;
use fixedbitset::FixedBitSet;
use wasm_bindgen::prelude::*;
extern crate web_sys;
use web_sys::console;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
#[allow(unused_macros)]
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

pub struct Timer<'a> {
    name: &'a str,
}

impl<'a> Timer<'a> {
    pub fn new(name: &'a str) -> Timer<'a> {
        console::time_with_label(name);
        Timer { name }
    }
}

impl<'a> Drop for Timer<'a> {
    fn drop(&mut self) {
        console::time_end_with_label(self.name);
    }
}

#[wasm_bindgen]
//#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell(bool);

impl Cell {
    const ALIVE: Cell = Cell(true);
    const DEAD: Cell = Cell(false);

    fn toggle(&mut self) {
        *self = match *self {
            Cell::ALIVE => Cell::DEAD,
            Cell::DEAD => Cell::ALIVE,
        };
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: FixedBitSet,
}

#[wasm_bindgen]
impl Universe {
    pub fn new() -> Universe {
        utils::set_panic_hook();

        let width = 64;
        let height = 64;

        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            // cells.set(i, i % 2 == 0 || i % 7 == 0);
            cells.set(i, js_sys::Math::random() < 0.5);
        }

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn toggle_cell(&mut self, row: u32, col: u32) {
        let idx = self.get_index(row, col);
        let mut cell = Cell(self.cells[idx]);
        cell.toggle();
        self.cells.set(idx, cell.0);
    }

    /// Set the width of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        let size: usize = (self.height * self.width) as usize;
        self.cells = FixedBitSet::with_capacity(size);
        for i in 0..size {
            self.cells.set(i, false);
        }
    }

    /// Set the height of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        let size: usize = (self.height * self.width) as usize;
        self.cells = FixedBitSet::with_capacity(size);
        for i in 0..size {
            self.cells.set(i, false);
        }
    }

    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }

    fn get_index_with_offset(
        &self,
        center_row: u32,
        center_col: u32,
        row_offset: i32,
        col_offset: i32,
    ) -> usize {
        assert!(
            col_offset.unsigned_abs() <= self.width && row_offset.unsigned_abs() <= self.height,
            "out of bounds!"
        );

        let row = (center_row as i32 + row_offset + self.height as i32) as u32 % self.height;
        let col = (center_col as i32 + col_offset + self.width as i32) as u32 % self.width;

        (row * self.width + col) as usize
    }

    fn insert(
        &mut self,
        center_row: u32,
        center_col: u32,
        data_height: u32,
        data_width: u32,
        data: &[u8],
    ) {
        assert!(
            data_width % 2 == 1 && data_height % 2 == 1,
            "dimensions must be odd!"
        );
        assert!(
            data_width <= self.width && data_height <= self.height,
            "too big!"
        );

        for row_offset in -(data_height as i32 - 1) / 2..=(data_height as i32 - 1) / 2 {
            for col_offset in -(data_width as i32 - 1) / 2..=(data_width as i32 - 1) / 2 {
                let universe_idx: usize =
                    self.get_index_with_offset(center_row, center_col, row_offset, col_offset);

                let data_idx = {
                    //row * width + col
                    let data_row = (row_offset + (data_height as i32 - 1) / 2) as u32;
                    let data_col = (col_offset + (data_width as i32 - 1) / 2) as u32;

                    (data_row * data_width + data_col) as usize
                };

                self.cells.set(universe_idx, data[data_idx] == 1)
            }
        }
    }

    pub fn insert_glider(&mut self, center_row: u32, center_col: u32) {
        let mut glider: Vec<u8> = Vec::new();

        glider.append(&mut vec![0, 0, 0, 0, 0]);
        glider.append(&mut vec![0, 0, 1, 0, 0]);
        glider.append(&mut vec![0, 0, 0, 1, 0]);
        glider.append(&mut vec![0, 1, 1, 1, 0]);
        glider.append(&mut vec![0, 0, 0, 0, 0]);

        self.insert(center_row, center_col, 5, 5, glider.as_slice());
    }

    pub fn insert_pulsar(&mut self, center_row: u32, center_col: u32) {
        let mut pulsar = Vec::new();

        pulsar.append(&mut vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        pulsar.append(&mut vec![0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]);
        pulsar.append(&mut vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        pulsar.append(&mut vec![0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0]);
        pulsar.append(&mut vec![0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0]);
        pulsar.append(&mut vec![0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0]);
        pulsar.append(&mut vec![0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]);
        pulsar.append(&mut vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        pulsar.append(&mut vec![0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]);
        pulsar.append(&mut vec![0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0]);
        pulsar.append(&mut vec![0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0]);
        pulsar.append(&mut vec![0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0]);
        pulsar.append(&mut vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        pulsar.append(&mut vec![0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]);
        pulsar.append(&mut vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

        self.insert(center_row, center_col, 15, 15, pulsar.as_slice());
    }

    fn live_neighbor_count(&self, row: u32, col: u32) -> u8 {
        let mut count: u8 = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (col + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);

                if self.cells[idx] {
                    //Alive
                    count += 1;
                }
            }
        }
        // log_to_console(format!("live_neighbor_count: {}", count));
        count
    }

    pub fn tick(&mut self) {
        let _timer = Timer::new("Universe::tick");

        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                // log!(
                //     "cell[{}, {}] is initially {:?} and has {} live neighbors",
                //     row,
                //     col,
                //     cell,
                //     live_neighbors
                // );

                next.set(
                    idx,
                    match (cell, live_neighbors) {
                        (true, live_neighbors) if live_neighbors < 2 => false,
                        (true, 2) | (true, 3) => true,
                        (true, live_neighbors) if live_neighbors > 3 => false,
                        (false, 3) => true,
                        (otherwise, _) => otherwise,
                    },
                );

                // log!("    it becomes {:?}", next[idx]);
            }
        }

        self.cells = next;
    }

    pub fn render(&self) -> String {
        self.to_string()
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }
}

impl Default for Universe {
    fn default() -> Self {
        Self::new()
    }
}

use std::fmt;

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == 0 { "◻️" } else { "◼️" };
                write!(f, "{}", symbol)?;
            }
            writeln!(f)?;
        }

        Ok(())
    }
}

impl Universe {
    /// Get the dead and alive values of the entire universe.
    pub fn get_cells(&self) -> &FixedBitSet {
        &self.cells
    }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells.set(idx, true);
        }
    }
}
