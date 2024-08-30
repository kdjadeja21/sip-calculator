"use client";
import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";

import styles from "../page.module.css";
import {
  formatIndianRupees,
  CroresLacsFormatter,
  calculatePresentValue,
} from "../utils/utils";
const TableView = lazy(() => import("../TableView/TableView"));
const InvestmentChart = lazy(
  () => import("../InvestmentChart/InvestmentChart")
);
const InvestmentPieChart = lazy(
  () => import("../InvestmentPieChart/InvestmentPieChart")
);

export interface Result {
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
  const [inflation, setInflation] = useState<string>("6");
  const [investingTill, setInvestingTill] = useState<string>("5");
  const [withdrawAfter, setWithdrawAfter] = useState<string>("15");
  const [results, setResults] = useState<Result[]>([]);
  const [tabValue, setTabValue] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [pieData, setPieData] = useState<any>([]);
  const [chartType, setChartType] = useState<string>("AreaChart");
  const [investmentType, setInvestmentType] = useState<string>("yearly");

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

    if (isNaN(parseFloat(inflation)) || parseFloat(inflation) < 1) {
      errorMessage +=
        "\n Inflation should be a positive number and at least 1%. ";
    }

    if (errorMessage !== "") {
      setError(errorMessage);
      return false;
    }
    return true;
  };

  const handleModeChange = (mode: string): void => {
    if (mode === "yearly" && investmentType !== "lumpsum") {
      setInvestmentAmount((parseFloat(investmentAmount) * 12).toString());
    } else if (mode === "monthly" && investmentType !== "lumpsum") {
      setInvestmentAmount((parseFloat(investmentAmount) / 12).toString());
    }
    setInvestmentType(mode);
  };

  useEffect(
    () => {
      validateInputs() && setError("");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [investmentAmount, returns, investingTill, withdrawAfter, inflation]
  );

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

      const investment =
        investmentType === "monthly"
          ? parseFloat(investmentAmount) * 12
          : parseFloat(investmentAmount);

      const amountValue: any =
        resultsArray.length > 0
          ? investmentType === "lumpsum"
            ? parseFloat(totalAmount).toFixed(0)
            : investmentType !== "lumpsum" && year > parseInt(investingTill)
            ? parseFloat(totalAmount).toFixed(0)
            : investmentType === "monthly"
            ? investment + parseFloat(totalAmount)
            : parseFloat(totalAmount) + parseFloat(investmentAmount)
          : investmentType === "monthly"
          ? parseFloat(investmentAmount) * 12
          : investmentAmount;

      const interest: any =
        (parseFloat(amountValue) * parseFloat(returns)) / 100;
      const result: Result = {
        id: year,
        year,
        invested_amount:
          investmentType === "lumpsum"
            ? parseFloat(investmentAmount).toFixed(0)
            : year > parseInt(investingTill) && investmentType !== "lumpsum"
            ? resultsArray[resultsArray.length - 1].invested_amount
            : investmentType === "monthly"
            ? (parseFloat(investmentAmount) * 12 * year).toFixed(0)
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
          color: "#00b386",
          textAlign: "center",
          letterSpacing: "2px",
          margin: "15px",
        }}
      >
        SIP Calculator
      </Typography>
      <Card className={styles.card}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Investment Amount"
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                InputProps={{
                  endAdornment: investmentType !== "lumpsum" && (
                    <InputAdornment style={{ color: "gray" }} position="end">
                      /{investmentType.replace(/ly$/, "")}
                    </InputAdornment>
                  ),
                }}
              />
              <Typography style={{ marginLeft: "10px" }}>
                {parseFloat(investmentAmount) > 1 &&
                  CroresLacsFormatter(parseFloat(investmentAmount))}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="mode-select-label">Mode of Premium</InputLabel>
                <Select
                  labelId="mode-select-label"
                  id="mode-select"
                  value={investmentType}
                  onChange={(e) => handleModeChange(e.target.value)}
                  size="medium"
                  aria-label="mode of premium"
                  label="Mode of Premium"
                >
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="lumpsum">Lumpsum</MenuItem>
                </Select>
              </FormControl>
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
            {investmentType !== "lumpsum" && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Investing Till"
                  type="number"
                  value={investingTill}
                  onChange={(e) => setInvestingTill(e.target.value)}
                  InputProps={{
                    endAdornment: investmentType !== "lumpsum" && (
                      <InputAdornment style={{ color: "gray" }} position="end">
                        Years
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Withdraw After"
                type="number"
                value={withdrawAfter}
                onChange={(e) => setWithdrawAfter(e.target.value)}
                InputProps={{
                  endAdornment: investmentType !== "lumpsum" && (
                    <InputAdornment style={{ color: "gray" }} position="end">
                      Years
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Inflation rate (p.a) %"
                type="number"
                value={inflation}
                onChange={(e) => setInflation(e.target.value)}
                placeholder="%"
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
            color="success"
          >
            Calculate
          </Button>
        </CardContent>
      </Card>
      <br />
      {results.length ? (
        <Card>
          <CardContent>
            <Typography>
              After <strong>{withdrawAfter}</strong> years, your investment of{" "}
              <strong>₹ {formatIndianRupees(pieData[0].value)}</strong> will
              grow to{" "}
              <strong className={styles.green}>
                ₹{formatIndianRupees(pieData[1].value)}*
              </strong>{" "}
              @ {returns}% p.a.
            </Typography>
            <br />
            <Typography>
              The value of{" "}
              <strong>₹{formatIndianRupees(pieData[1].value)}*</strong> after{" "}
              <strong>{withdrawAfter}</strong> years, considering a{" "}
              <strong>{inflation}%</strong> annual inflation rate, would be
              approximately
              <strong className={styles.green}>
                ₹
                {formatIndianRupees(
                  calculatePresentValue(
                    pieData[1].value,
                    Number(inflation),
                    Number(withdrawAfter)
                  )
                )}
              </strong>{" "}
              in today&apos;s terms.
            </Typography>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Chart" />
              <Tab label="Table" />
            </Tabs>
            <div role="tabpanel" hidden={tabValue !== 0}>
              {/* <div style={{ margin: "15px" }}>
                <Select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  size="small"
                >
                  <MenuItem value="AreaChart">Area Chart</MenuItem>
                  <MenuItem value="PieChart">Pie Chart</MenuItem>
                </Select>
              </div>
              <br /> */}
              {chartType === "PieChart" ? (
                <Suspense fallback={<div>Loading...</div>}>
                  <InvestmentPieChart data={[...pieData]} />
                </Suspense>
              ) : (
                <Suspense fallback={<div>Loading...</div>}>
                  <InvestmentChart data={[...results]} />
                </Suspense>
              )}
            </div>
            <div role="tabpanel" hidden={tabValue !== 1}>
              <Suspense fallback={<div>Loading...</div>}>
                <TableView results={results} />
              </Suspense>
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
