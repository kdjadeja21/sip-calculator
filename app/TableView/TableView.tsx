import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { Result } from "../SIPCalculator/SIPCalculator";

const TableView: React.FC<{ results: Result[] }> = ({ results }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Invested Amount</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{`${result.year} (${
                new Date().getFullYear() - 1 + result.id
              })`}</TableCell>
              <TableCell>{`₹${new Intl.NumberFormat("en-IN").format(
                parseFloat(result.invested_amount)
              )}`}</TableCell>
              <TableCell>
                {`₹${new Intl.NumberFormat("en-IN").format(
                  parseFloat(result.amount)
                )}`}
              </TableCell>
              <TableCell>
                {`₹${new Intl.NumberFormat("en-IN").format(
                  parseFloat(result.interest)
                )}`}
              </TableCell>
              <TableCell>
                {`₹${new Intl.NumberFormat("en-IN").format(
                  parseFloat(result.total_amount)
                )}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
