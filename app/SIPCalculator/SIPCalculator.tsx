"use client";
import React, { useEffect, useState } from "react";

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
  Select,
  MenuItem,
} from "@mui/material";
import InvestmentChart from "../InvestmentChart/InvestmentChart";
import InvestmentPieChart from "../InvestmentPieChart/InvestmentPieChart";
import styles from "../page.module.css";

interface Result {
  id: number;
  year: number;
  invested_amount: string;
  amount: string;
  interest: string;
  total_amount: string;
}

const SIPCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("60000");
  const [returns, setReturns] = useState<string>("29.24");
  const [investingTill, setInvestingTill] = useState<string>("15");
  const [withdrawAfter, setWithdrawAfter] = useState<string>("15");
  const [results, setResults] = useState<Result[]>([]);
  const [tabValue, setTabValue] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [pieData, setPieData] = useState<any>([]);
  const [chartType, setChartType] = useState("AreaChart");

  const validateInputs = () => {
    let errorMessage = "";

    if (
      isNaN(parseFloat(investmentAmount)) ||
      parseFloat(investmentAmount) < 500
    ) {
      errorMessage +=
        "Investment Amount should be a positive number and at least 500. ";
    }

    if (isNaN(parseFloat(returns)) || parseFloat(returns) < 1) {
      errorMessage +=
        "\n Returns should be a positive number and at least 1%. ";
    }

    if (isNaN(parseInt(investingTill)) || parseInt(investingTill) < 5) {
      errorMessage +=
        "\n Investing Till should be a positive integer and at least 5. ";
    }

    if (
      isNaN(parseInt(withdrawAfter)) ||
      parseInt(withdrawAfter) < parseInt(investingTill)
    ) {
      errorMessage +=
        "\n Withdraw After should be a positive integer greater than Investing Till. ";
    }

    if (errorMessage !== "") {
      setError(errorMessage);
      return false;
    }
    return true;
  };

  useEffect(() => {
    validateInputs() && setError("");
  }, [investmentAmount, returns, investingTill, withdrawAfter]);

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
    const pieData = [
      {
        name: "Invested Amount",
        value: Number(resultsArray[resultsArray.length - 1].invested_amount),
      },
      {
        name: "Total Value",
        value: Number(resultsArray[resultsArray.length - 1].total_amount),
      },
    ];
    setPieData([...pieData]);
    setResults(resultsArray);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Typography
        variant="h2"
        gutterBottom
        style={{
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          fontSize: "2.5rem",
          color: "#333", // Change color as needed
          textAlign: "center",
          letterSpacing: "2px",
        }}
      >
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
                label="Expected return rate (p.a) %"
                type="number"
                value={returns}
                onChange={(e) => setReturns(e.target.value)}
                placeholder="%"
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
          <Typography
            style={{ color: "red", width: "100%", maxWidth: "100%" }}
            sx={{ whiteSpace: "pre-line" }}
          >
            {error}
          </Typography>
          <br />
          <Button
            variant="contained"
            onClick={calculateCompoundInterest}
            disabled={Boolean(error.length)}
          >
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
              <div>
                <label>Chart Type:</label>
                <Select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  size="small"
                >
                  <MenuItem value="PieChart">Pie Chart</MenuItem>
                  <MenuItem value="AreaChart">Area Chart</MenuItem>
                </Select>
              </div>
              <br />
              {chartType === "PieChart" ? (
                <InvestmentPieChart data={[...pieData]} />
              ) : (
                <InvestmentChart data={[...results]} />
              )}
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
