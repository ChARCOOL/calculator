const resultBox = document.querySelector('.wrapper__solution--matrix');
resultBox.style.border = 'none';

const decimalPlaces = (num) => {
  let decimalSeparator = '.',
    tmp = num.toString(),
    idx = tmp.indexOf(decimalSeparator);

  if (idx >= 0) return tmp.length - idx - 1;
  return 0;
};

class Matrix {
  constructor(row, column, matrix) {
    this.row = row;
    this.column = column;
    this.matrix = matrix;
    this.determinant;
  }

  determinant() {
    let determinant;
    if (this.row && this.column === 3) {
      determinant =
        this.matrix[0][0] * this.matrix[1][1] * this.matrix[2][2] +
        this.matrix[0][1] * this.matrix[1][2] * this.matrix[2][0] +
        this.matrix[0][2] * this.matrix[1][0] * this.matrix[2][1] -
        this.matrix[0][2] * this.matrix[1][1] * this.matrix[2][0] -
        this.matrix[0][0] * this.matrix[1][2] * this.matrix[2][1] -
        this.matrix[0][1] * this.matrix[1][0] * this.matrix[2][2];
      this.determinant = determinant;
      return determinant;
    }
  }

  inverse() {
    let inverse;
    if (this.row && this.column === 3) {
      inverse = [
        [
          this.matrix[1][1] * this.matrix[2][2] - this.matrix[1][2] * this.matrix[2][1],
          -(this.matrix[1][0] * this.matrix[2][2] - this.matrix[1][2] * this.matrix[2][0]),
          this.matrix[1][0] * this.matrix[2][1] - this.matrix[1][1] * this.matrix[2][0],
        ],
        [
          -(this.matrix[0][1] * this.matrix[2][2] - this.matrix[0][2] * this.matrix[2][1]),
          this.matrix[0][0] * this.matrix[2][2] - this.matrix[0][2] * this.matrix[2][0],
          -(this.matrix[0][0] * this.matrix[2][1] - this.matrix[0][1] * this.matrix[2][0]),
        ],
        [
          this.matrix[0][1] * this.matrix[1][2] - this.matrix[0][2] * this.matrix[1][1],
          -(this.matrix[0][0] * this.matrix[1][2] - this.matrix[0][2] * this.matrix[1][0]),
          this.matrix[0][0] * this.matrix[1][1] - this.matrix[0][1] * this.matrix[1][0],
        ],
      ];
      this.matrix = inverse;
      return inverse;
    }
  }

  transpose() {
    const transpose = [];
    for (let i = 0; i < this.row; i++) {
      transpose[i] = [];
      for (let j = 0; j < this.column; j++) {
        transpose[i][j] = this.matrix[j][i];
      }
    }
    this.matrix = transpose;
    return transpose;
  }

  divide() {
    const divide = [];
    for (let i = 0; i < this.row; i++) {
      divide[i] = [];
      for (let j = 0; j < this.column; j++) {
        divide[i][j] = `${this.matrix[i][j]}/${this.determinant}`;
      }
    }
    return divide;
  }
}

const createTable = (row, column) => {
  const tbl = document.createElement('table');
  tbl.className = 'wrapper__table--table';

  for (let i = 0; i < row; i++) {
    const tRow = document.createElement('tr');

    for (let j = 0; j < column; j++) {
      const tCell = document.createElement('td');

      tCell.innerHTML = '<input>';
      tCell.className = 'wrapper__table--input';
      tRow.appendChild(tCell);
    }

    tbl.appendChild(tRow);
  }
  return tbl;
};

const showTable = () => {
  const shwTbl = document.querySelector('.wrapper__table--matrix');
  const shwBtn = document.querySelector('.wrapper__btn--matrix');

  shwBtn.style.display = 'block';

  shwTbl.innerHTML = '';
  shwTbl.appendChild(createTable(3, 3));
};

const solveTable = () => {
  const tblInput = document.querySelector('.wrapper__table--table');
  const resultBox = document.querySelector('.wrapper__solution--matrix');

  const matrix = [];

  for (let i = 0; i < 3; i++) {
    matrix[i] = [];
    for (let j = 0; j < 3; j++) {
      matrix[i][j] = tblInput.rows[i].cells[j].firstChild.value;
    }
  }

  const newMatrix = new Matrix(3, 3, matrix);
  const MatrixDeterminant = newMatrix.determinant();
  const MatrixInverse = newMatrix.inverse();
  const MatrixTranspose = newMatrix.transpose();
  const MatrixDivide = newMatrix.divide();

  resultBox.style.display = 'block';
  resultBox.innerHTML = '';
  resultBox.innerHTML = `
  A=(■(${matrix[0][0]}&${matrix[0][1]}&${matrix[0][2]}@${matrix[1][0]}&${matrix[1][1]}&${
    matrix[1][2]
  }@${matrix[2][0]}&${matrix[2][1]}&${matrix[2][2]})),A^(-1)=?
  det⁡A=|■(${matrix[0][0]}&${matrix[0][1]}&${matrix[0][2]}@${matrix[1][0]}&${matrix[1][1]}&${
    matrix[1][2]
  }@${matrix[2][0]}&${matrix[2][1]}&${matrix[2][2]})| ■(${matrix[0][0]}&${matrix[0][1]}@${
    matrix[1][0]
  }&${matrix[1][1]}@${matrix[2][0]}&${matrix[2][1]})
  det⁡A=${matrix[0][0]}.${matrix[1][1]}.${matrix[2][2]}+${matrix[0][1]}.${matrix[1][2]}.${
    matrix[2][0]
  }+${matrix[0][2]}.${matrix[1][0]}.${matrix[2][1]}-(${matrix[0][1]}.${matrix[1][0]}.${
    matrix[2][2]
  }+${matrix[0][0]}.${matrix[1][2]}.${matrix[2][1]}+${matrix[0][2]}.${matrix[1][1]}.${
    matrix[2][0]
  })=${matrix[0][0] * matrix[1][1] * matrix[2][2]}+${matrix[0][1] * matrix[1][2] * matrix[2][0]}+${
    matrix[0][2] * matrix[1][0] * matrix[2][1]
  }-(${matrix[0][1] * matrix[1][0] * matrix[2][2]}+${matrix[0][0] * matrix[1][2] * matrix[2][1]}+${
    matrix[0][2] * matrix[1][1] * matrix[2][0]
  })=${
    matrix[0][0] * matrix[1][1] * matrix[2][2] +
    matrix[0][1] * matrix[1][2] * matrix[2][0] +
    matrix[0][2] * matrix[1][0] * matrix[2][1]
  }-(${
    matrix[0][1] * matrix[1][0] * matrix[2][2] +
    matrix[0][0] * matrix[1][2] * matrix[2][1] +
    matrix[0][2] * matrix[1][1] * matrix[2][0]
  })=${MatrixDeterminant}

  A_11=(-1)^(1+1) |■(${matrix[1][1]}&${matrix[1][2]}@${matrix[2][1]}&${matrix[2][2]})|=${
    matrix[1][1]
  }.${matrix[2][2]}-(${matrix[1][2]}.${matrix[2][1]})=${matrix[1][1] * matrix[2][2]}-${
    matrix[1][2] * matrix[2][1]
  }=${MatrixInverse[0][0]}
  A_12=(-1)^(1+2) |■(${matrix[1][0]}&${matrix[1][2]}@${matrix[2][0]}&${matrix[2][2]})|=${
    matrix[1][0]
  }.${matrix[2][2]}-(${matrix[1][2]}.${matrix[2][0]})=${matrix[1][0] * matrix[2][2]}-${
    matrix[1][2] * matrix[2][0]
  }=-1(${matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]})=${MatrixInverse[0][1]}
  A_13=(-1)^(1+3) |■(${matrix[1][0]}&${matrix[1][1]}@${matrix[2][0]}&${matrix[2][1]})|=${
    matrix[1][0]
  }.${matrix[2][1]}-(${matrix[1][1]}.${matrix[2][0]})=${matrix[1][0] * matrix[2][1]}-${
    matrix[1][1] * matrix[2][0]
  }=${MatrixInverse[0][2]}

  A_21=(-1)^(2+1) |■(${matrix[0][1]}&${matrix[0][2]}@${matrix[2][1]}&${matrix[2][2]})|=${
    matrix[0][1]
  }.${matrix[2][2]}-(${matrix[0][2]}.${matrix[2][1]})=${matrix[0][1] * matrix[2][2]}-${
    matrix[0][2] * matrix[2][1]
  }=-1(${matrix[0][1] * matrix[2][2] - matrix[0][2] * matrix[2][1]})=${MatrixInverse[1][0]}
  A_22=(-1)^(2+2) |■(${matrix[0][0]}&${matrix[0][2]}@${matrix[2][0]}&${matrix[2][2]})|=${
    matrix[0][0]
  }.${matrix[2][2]}-(${matrix[0][2]}.${matrix[2][0]})=${matrix[0][0] * matrix[2][2]}-${
    matrix[0][2] * matrix[2][0]
  }=${MatrixInverse[1][1]}
  A_23=(-1)^(2+3) |■(${matrix[0][0]}&${matrix[0][1]}@${matrix[2][0]}&${matrix[2][1]})|=${
    matrix[0][0]
  }.${matrix[2][1]}-(${matrix[0][1]}.${matrix[2][0]})=${matrix[0][0] * matrix[2][1]}-${
    matrix[0][1] * matrix[2][0]
  }=-1(${matrix[0][0] * matrix[2][1] - matrix[0][1] * matrix[2][0]})=${MatrixInverse[1][2]}

  A_31=(-1)^(3+1) |■(${matrix[0][1]}&${matrix[0][2]}@${matrix[1][1]}&${matrix[1][2]})|=${
    matrix[0][1]
  }.${matrix[1][2]}-(${matrix[0][2]}.${matrix[1][1]})=${matrix[0][0] * matrix[1][2]}-${
    matrix[0][2] * matrix[2][1]
  }=${MatrixInverse[2][0]}
  A_32=(-1)^(3+2) |■(${matrix[0][0]}&${matrix[0][2]}@${matrix[1][0]}&${matrix[1][2]})|=${
    matrix[0][0]
  }.${matrix[1][2]}-(${matrix[0][2]}.${matrix[1][0]})=${matrix[0][0] * matrix[1][2]}-${
    matrix[0][2] * matrix[1][0]
  }=-1(${matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0]})=${MatrixInverse[2][1]}
  A_33=(-1)^(3+3) |■(${matrix[0][0]}&${matrix[0][1]}@${matrix[1][0]}&${matrix[1][1]})|=${
    matrix[0][0]
  }.${matrix[1][1]}-(${matrix[0][1]}.${matrix[1][0]})=${matrix[0][0] * matrix[1][1]}-${
    matrix[0][1] * matrix[1][0]
  }=${MatrixInverse[2][2]}

  A^(-1)=1/${MatrixDeterminant} (■(${MatrixTranspose[0][0]}&${MatrixTranspose[0][1]}&${
    MatrixTranspose[0][2]
  }@${MatrixTranspose[1][0]}&${MatrixTranspose[1][1]}&${MatrixTranspose[1][2]}@${
    MatrixTranspose[2][0]
  }&${MatrixTranspose[2][1]}&${MatrixTranspose[2][2]}))^T=(■(${MatrixDivide[0][0]}&${
    MatrixDivide[0][1]
  }&${MatrixDivide[0][2]}@${MatrixDivide[1][0]}&${MatrixDivide[1][1]}&${MatrixDivide[1][2]}@${
    MatrixDivide[2][0]
  }&${MatrixDivide[2][1]}&${MatrixDivide[2][2]}))`;
};
