"use client";

import { useMemo, useState } from "react";
import { Slider } from "./slider";
import { Card, CardContent } from "./card";
import { FiInfo } from "react-icons/fi";

export function Rent2ownCalculator() {
  const [scooters, setScooters] = useState(160);
  const [monthlyRent, setMonthlyRent] = useState(6800);
  const [months, setMonths] = useState(6);
  const [postFee, setPostFee] = useState(1000);
  const [error, setError] = useState<string | null>(null);

  const LOAN_PRINCIPAL = 26910;
  const SERVICE_COST = 1889;
  const ANNUAL_INTEREST = 0.10;
  const monthlyInterest = ANNUAL_INTEREST / 12;

  const {
    totalCustomerPayment,
    totalInterest,
    netRevenue,
    minRequiredRent,
    monthCountUsed,
    remainingBalance,
    optimalMonths
  } = useMemo(() => {
    try {
      let balance = LOAN_PRINCIPAL;
      let totalInterest = 0;
      let month = 0;
      const effectivePayment = monthlyRent - SERVICE_COST;
      const minPayment = (LOAN_PRINCIPAL * monthlyInterest) + SERVICE_COST;

      if (effectivePayment <= 0) {
        throw new Error(`Rent must exceed service fee (₹${SERVICE_COST})`);
      }

      while (balance > 0 && month < months) {
        const interest = balance * monthlyInterest;
        const principal = effectivePayment - interest;
        balance -= principal;
        totalInterest += interest;
        month++;
      }

      let optimal = month;
      if (balance > 0) {
        let tempBalance = LOAN_PRINCIPAL;
        let tempMonth = 0;
        while (tempBalance > 0 && tempMonth < 60) {
          const tempInterest = tempBalance * monthlyInterest;
          const tempPrincipal = effectivePayment - tempInterest;
          tempBalance -= tempPrincipal;
          tempMonth++;
        }
        optimal = tempMonth;
      }

      return {
        totalCustomerPayment: monthlyRent * month,
        totalInterest,
        netRevenue: (monthlyRent * month) - LOAN_PRINCIPAL - totalInterest - (SERVICE_COST * month),
        minRequiredRent: Math.ceil(minPayment),
        monthCountUsed: month,
        remainingBalance: Math.max(balance, 0),
        optimalMonths: optimal
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return {
        totalCustomerPayment: 0,
        totalInterest: 0,
        netRevenue: 0,
        minRequiredRent: 0,
        monthCountUsed: 0,
        remainingBalance: 0,
        optimalMonths: 0
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyRent, months]);

  const allCustomerPayment = totalCustomerPayment * scooters;
  const allNetRevenue = netRevenue * scooters;
  const postOwnershipIncome = postFee * scooters;

  const handleAutoFix = () => {
    if (optimalMonths > months) {
      setMonths(optimalMonths);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
        🛵 Ridezzy Rent-to-Own Calculator
      </h2>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
          <p className="flex items-center gap-2">
            <FiInfo className="text-red-500" />
            <span>{error}</span>
          </p>
        </div>
      )}

      {/* Auto-fix banner */}
      {remainingBalance > 0 && optimalMonths > months && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 mb-8 flex items-center justify-between rounded-lg shadow-md">
          <div>
            <p className="text-xl font-semibold">Optimal repayment period: {optimalMonths} months</p>
            <p className="text-sm">Remaining balance: ₹{remainingBalance.toLocaleString()}</p>
          </div>
          <button
            onClick={handleAutoFix}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
          >
            <span>Auto-fix</span>
          </button>
        </div>
      )}

      {/* Flex container for left and right sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Side (Sliders) */}
        <div className="space-y-10">
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              Scooters (batches of 160): <span className="font-medium text-yellow-600">{scooters}</span>
            </label>
            <Slider
              defaultValue={[scooters]}
              min={160}
              max={960}
              step={160}
              onValueChange={([val]) => setScooters(val)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              Monthly Rent: ₹<span className="font-medium text-yellow-600">{monthlyRent}</span>
            </label>
            <Slider
              defaultValue={[monthlyRent]}
              min={3000}
              max={15000}
              step={100}
              onValueChange={([val]) => setMonthlyRent(val)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600"
            />
            <p className="text-sm text-gray-600 mt-1">
              Minimum required: ₹{minRequiredRent.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              Ownership Period: <span className="font-medium text-yellow-600">{months}</span> months
            </label>
            <Slider
              defaultValue={[months]}
              min={3}
              max={Math.max(optimalMonths, 36)}
              step={1}
              onValueChange={([val]) => setMonths(val)}
              className="bg-gradient-to-r from-yellow-600 to-yellow-700"
            />
            <p className="text-sm text-gray-600 mt-1">
              Effective months used: {monthCountUsed}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-800">
              Post-Ownership Fee: ₹<span className="font-medium text-yellow-600">{postFee}</span>
            </label>
            <Slider
              defaultValue={[postFee]}
              min={500}
              max={2000}
              step={100}
              onValueChange={([val]) => setPostFee(val)}
              className="bg-gradient-to-r from-yellow-700 to-yellow-800"
            />
          </div>
        </div>

        {/* Right Side (Financial Cards) */}
        <div className="grid grid-cols-2 gap-8">
          <Card className="border border-gray-300 rounded-lg shadow-md bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Total Customer Payments</h3>
                <FiInfo className="text-gray-500 cursor-pointer" title="Total amount received before ownership transfer" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                ₹{allCustomerPayment.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 rounded-lg shadow-md bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Total Interest Cost</h3>
                <FiInfo className="text-gray-500 cursor-pointer" title="Total interest paid across all scooters" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                ₹{(totalInterest * scooters).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 rounded-lg shadow-md bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Net Revenue</h3>
                <FiInfo className="text-gray-500 cursor-pointer" title="Profit after all costs (principal, interest, service)" />
              </div>
              <p className={`text-3xl font-bold ${allNetRevenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{allNetRevenue.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 rounded-lg shadow-md bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Post-Ownership Income</h3>
                <FiInfo className="text-gray-500 cursor-pointer" title="Monthly recurring revenue after ownership transfer" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">
                ₹{postOwnershipIncome.toLocaleString()}/month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Rent2ownCalculator;
