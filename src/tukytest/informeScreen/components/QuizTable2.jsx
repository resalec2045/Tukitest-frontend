import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";

const QuizTable2 = ({ data }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("NOMBRE_GRUPO");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedData = sortData(data, getComparator(order, orderBy));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "PERSONA"}
                direction={orderBy === "PERSONA" ? order : "asc"}
                onClick={() => handleRequestSort("PERSONA")}
              >
                PERSONA
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "GRUPO"}
                direction={orderBy === "GRUPO" ? order : "asc"}
                onClick={() => handleRequestSort("GRUPO")}
              >
                Nombre del Quiz
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "NOTA"}
                direction={orderBy === "NOTA" ? order : "asc"}
                onClick={() => handleRequestSort("NOTA")}
              >
                Nota
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((quiz, index) => (
            <TableRow key={index}>
              <TableCell>{quiz.PERSONA}</TableCell>
              <TableCell>{quiz.GRUPO}</TableCell>
              <TableCell>{quiz.NOTA}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizTable2;
