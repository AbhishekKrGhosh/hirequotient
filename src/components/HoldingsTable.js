import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  styled,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const Component = styled(TableRow)`
  background-color: #f0f5fa;
`;

const StyledArrowUp = styled(KeyboardArrowUp)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  color: white;
  font-size: 16px;
  margin: 2px 20px 0px 15px;
`;

const StyledKeyboardArrowDown = styled(KeyboardArrowDown)`
  background-color: #d7deea; 
  border-radius: 50%;
  color: white;
  font-size: 16px;
  margin: 2px 20px 0px 15px;
`;

const TableCellNew = styled(TableCell)`
  font-size: 12px;
  font-weight: bold;
  color: grey;
  padding: 10px; 
`;

const TableCellNewData = styled(TableCell)`
  font-size: 12px;
  font-weight: bold;
  padding: 10px; 
  background-color: ${({ index }) => (index % 2 === 0 ? '#f0f5fa' : 'white')}; 
`;

const TypographyNew = styled(Typography)`
  font-size: 16px;
`;

const StyledTableContainer = styled(TableContainer)`
  padding: 20px;
`;

const StyledHoldDiv = styled('div')`
  background-color: white;
  padding: 10px;
  margin-right:40px;
  margin-bottom: 2px;
  border-top-left-radius: ${({ isFirst }) => (isFirst ? '10px' : '0px')}; 
  border-top-right-radius: ${({ isFirst }) => (isFirst ? '10px' : '0px')}; 
  border-bottom-left-radius: ${({ isLast }) => (isLast ? '10px' : '0px')}; 
  border-bottom-right-radius: ${({ isLast }) => (isLast ? '10px' : '0px')}; 
`;

const HoldingsTable = () => {
  const [holdingsData, setHoldingsData] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
        setHoldingsData(response.data.payload);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleGroup = (assetClass) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [assetClass]: !prevState[assetClass],
    }));
  };

  const groupedHoldings = holdingsData.reduce((groups, holding) => {
    const { asset_class: assetClass } = holding;
    groups[assetClass] = groups[assetClass] || [];
    groups[assetClass].push(holding);
    return groups;
  }, {});

  return (
    <StyledTableContainer> 
      {Object.entries(groupedHoldings).map(([assetClass, holdings], index, array) => (
        <StyledHoldDiv key={assetClass} isFirst={index === 0} isLast={index === array.length - 1}>
          <TypographyNew variant="h6" fontWeight="bold" onClick={() => toggleGroup(assetClass)}>
            {expandedGroups[assetClass] ? <StyledArrowUp /> : <StyledKeyboardArrowDown />}
            {assetClass.toUpperCase()} ({holdings.length})
          </TypographyNew>
          <Collapse in={expandedGroups[assetClass]} timeout="auto" unmountOnExit>
            <TableContainer component={Paper}>
            <Table aria-label="holding table">
              <TableHead>
                <TableRow>
                  <TableCellNew>NAME OF THE HOLDINGS</TableCellNew>
                  <TableCellNew>TICKER</TableCellNew>
                  <TableCellNew>AVERAGE PRICE</TableCellNew>
                  <TableCellNew>MARKET PRICE</TableCellNew>
                  <TableCellNew>LATEST CHANGE PERCENTAGE</TableCellNew>
                  <TableCellNew>MARKET VALUE IN BASE CCY</TableCellNew>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.map((holding, idx) => (
                  <Component key={holding.ticker}>
                    <TableCellNewData index={idx}>{holding.name}</TableCellNewData>
                    <TableCellNewData index={idx}>{holding.ticker}</TableCellNewData>
                    <TableCellNewData index={idx}>{holding.avg_price}</TableCellNewData>
                    <TableCellNewData index={idx}>{holding.market_price}</TableCellNewData>
                    <TableCellNewData index={idx}>{holding.latest_chg_pct}</TableCellNewData>
                    <TableCellNewData index={idx}>{holding.market_value_ccy}</TableCellNewData>
                  </Component>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </Collapse>
        </StyledHoldDiv>
      ))}
    </StyledTableContainer>
  );
};

export default HoldingsTable;
