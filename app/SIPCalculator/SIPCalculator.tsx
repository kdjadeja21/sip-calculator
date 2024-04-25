"use client";
import React, { useState } from "react";
import InvestmentChart from "../InvestmentChart/InvestmentChart";
import {
  Button,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import styles from "../page.module.css";

interface Result {
  id: number;
  year: number;
  invested_amount: string;
  amount: string;
  interest: string;
  total_amount: string;
}

// const useStyles = makeStyles(() => ({
//   card: {
//     maxWidth: 400,
//     margin: "auto",
//     marginTop: "15px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     borderRadius: "9px",
//     backgroundColor: "#f5f5f5",
//   },
//   formItem: {
//     marginBottom: "9px",
//   },
// }));

const SIPCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("60000");
  const [returns, setReturns] = useState<string>("29.24");
  const [investingTill, setInvestingTill] = useState<string>("15");
  const [withdrawAfter, setWithdrawAfter] = useState<string>("15");
  const [results, setResults] = useState<Result[]>([]);
  const [tabValue, setTabValue] = useState<number>(0);

  const calculateCompoundInterest = () => {
    const resultsArray: Result[] = [];
    let totalAmount: any = 0;

    for (let year = 1; year <= parseInt(withdrawAfter); year++) {
      if (resultsArray.length > 0) {
        totalAmount = parseFloat(
          resultsArray[resultsArray.length - 1].total_amount
        );
      } else {
        totalAmount = parseFloat(investmentAmount);
      }

      const amountValue: any =
        resultsArray.length > 0
          ? year > parseInt(investingTill)
            ? parseFloat(totalAmount).toFixed(0)
            : parseFloat(totalAmount) + parseFloat(investmentAmount)
          : investmentAmount;
      const interest: any =
        (parseFloat(amountValue) * parseFloat(returns)) / 100;
      const result: Result = {
        id: year,
        year,
        invested_amount:
          year > parseInt(investingTill)
            ? resultsArray[resultsArray.length - 1].invested_amount
            : (parseFloat(investmentAmount) * year).toFixed(0),
        amount: parseFloat(amountValue).toFixed(0),
        interest: parseFloat(interest).toFixed(0),
        total_amount: (parseFloat(amountValue) + parseFloat(interest)).toFixed(
          0
        ),
      };
      resultsArray.push(result);
    }

    setResults(resultsArray);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        SIP Calculator
      </Typography>
      <Card className={styles.card}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Investment Amount(Yearly)"
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Returns(%)"
                type="number"
                value={returns}
                onChange={(e) => setReturns(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Investing Till (Year)"
                type="number"
                value={investingTill}
                onChange={(e) => setInvestingTill(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Withdraw After (Year)"
                type="number"
                value={withdrawAfter}
                onChange={(e) => setWithdrawAfter(e.target.value)}
              />
            </Grid>
          </Grid>

          <br />
          <Button variant="contained" onClick={calculateCompoundInterest}>
            Calculate
          </Button>
        </CardContent>
      </Card>
      <br />
      {results.length ? (
        <Card>
          <CardContent>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Chart" />
              <Tab label="Table" />
            </Tabs>
            <div role="tabpanel" hidden={tabValue !== 0}>
              <InvestmentChart data={[...results]} />
            </div>
            <div role="tabpanel" hidden={tabValue !== 1}>
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
                        <TableCell>{result.year}</TableCell>
                        <TableCell>{result.invested_amount}</TableCell>
                        <TableCell>{result.amount}</TableCell>
                        <TableCell>{result.interest}</TableCell>
                        <TableCell>{result.total_amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SIPCalculator;
