import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, TrendingUp, DollarSign, Activity, PieChart, Briefcase, Award } from 'lucide-react';
import { allYearsData, globalSalesData, globalPurchasesData } from './data';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, LabelList
} from 'recharts';

const currencySymbol = '';

// Format Values
const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  if (value >= 1000000000) return (value / 1000000000).toFixed(2) + 'B';
  if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'k';
  return value.toFixed(2);
};

const AlternatingLabel = (props) => {
  const { x, y, value, formatter, fontSize } = props;
  const formattedValue = formatter ? formatter(value) : value;
  
  if (!formattedValue) return null;
  
  return (
    <text x={x} y={y - 15} fill="#FFFFFF" fontSize={fontSize || 10} textAnchor="middle" dy={0}>
      {formattedValue}
    </text>
  );
};

const formatGrams = (value) => {
  if (value === null || value === undefined) return '';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'k g';
  return value.toFixed(1) + ' g';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip p-3" style={{ background: '#143532', border: '1px solid #F1E095', padding: '10px', borderRadius: '5px' }}>
        <p className="text-white mb-2 font-bold" style={{color: '#fff', margin: '0 0 5px 0'}}>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color, margin: 0, fontSize: '0.9rem', direction: 'ltr' }}>
            {entry.name}: {entry.value !== null ? entry.value.toLocaleString() : 'N/A'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const GramTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip p-3" style={{ background: '#143532', border: '1px solid #F1E095', padding: '10px', borderRadius: '5px' }}>
        <p className="text-white mb-2 font-bold" style={{color: '#fff', margin: '0 0 5px 0'}}>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color, margin: 0, fontSize: '0.9rem' }}>
            {entry.name}: {entry.value !== null ? entry.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Grams' : 'N/A'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Tooltip formatting is covered above.

function TitleSlide() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="slide"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="glass-panel"
        style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img src="/logo.png" alt="Himmath logo" style={{ height: '180px', marginBottom: '2rem' }} onError={(e) => { e.target.onerror = null; e.target.src="/logo.svg";}} />
        <h1 className="gold-gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
          Annual Financial Report
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', letterSpacing: '0.05em' }}>
          PERFORMANCE & GROWTH OVERVIEW
        </p>
        <div style={{ marginTop: '3rem', width: '60px', height: '2px', background: 'var(--primary-gold)' }}></div>
      </motion.div>
    </motion.div>
  );
}

function DashboardSlide({ dataObj }) {
  const { year, data } = dataObj;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="slide"
      style={{ overflowY: 'auto' }}
    >
      <div className="logo-container" style={{ marginBottom: "1rem" }}>
        <img src="/logo.png" alt="Himmath logo" className="header-logo" style={{ height: '80px' }} onError={(e) => { e.target.onerror = null; e.target.src="/logo.svg";}} />
      </div>

      <div className="text-center mb-6">
        <h2 className="gold-gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Financial Overview</h2>
        <p style={{ fontSize: '1.4rem', color: 'var(--light-gold)' }}>Year {year}</p>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '80px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Net Profit */}
        <div className="glass-panel chart-card" style={{ height: '400px' }}>
          <h3 style={{ color: '#F1E095' }}><Briefcase color="#F1E095" /> Net Profit (AED)</h3>
          <div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F1E095" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F1E095" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" tickMargin={15} />
              <YAxis tickFormatter={formatCurrency} stroke="var(--text-muted)" width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="netProfit" name="Net Profit" stroke="#F1E095" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" dot={{ r: 4, fill: '#FFFFFF', strokeWidth: 2 }}>
                <LabelList dataKey="netProfit" content={(props) => <AlternatingLabel {...props} formatter={formatCurrency} fontSize={11} />} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
    </div>
  </div>
        </div>

        {/* Investor Profit */}
        <div className="glass-panel chart-card" style={{ height: '400px' }}>
          <h3 style={{ color: '#10B981' }}><DollarSign color="#10B981" /> Investors Profit (AED)</h3>
          <div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorInv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" tickMargin={15} />
              <YAxis tickFormatter={formatCurrency} stroke="var(--text-muted)" width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="investorProfit" name="Investor Profit" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorInv)" connectNulls dot={{ r: 4, fill: '#FFFFFF', strokeWidth: 2 }}>
                 <LabelList dataKey="investorProfit" content={(props) => <AlternatingLabel {...props} formatter={formatCurrency} fontSize={11} />} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
    </div>
  </div>
        </div>

        {/* Investment (Grams) */}
        <div className="glass-panel chart-card" style={{ height: '400px' }}>
          <h3 style={{ color: '#F1E095' }}><PieChart color="#F1E095" /> Investment (Grams)</h3>
          <div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">
             <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" tickMargin={15}/>
              <YAxis tickFormatter={formatGrams} stroke="var(--text-muted)" width={70} />
              <Tooltip content={<GramTooltip />} cursor={{fill: 'rgba(241, 224, 149, 0.1)'}} />
              <Bar dataKey="investment" name="Investment" fill="#F1E095" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="investment" content={(props) => <AlternatingLabel {...props} formatter={formatGrams} fontSize={11} />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
    </div>
  </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Total Fixed Costs */}
          <div className="glass-panel chart-card" style={{ height: '400px' }}>
            <h3 style={{ color: '#EF4444' }}><Activity color="#EF4444" /> Total Fixed Costs (AED)</h3>
            <div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" tickMargin={15} />
                <YAxis tickFormatter={formatCurrency} stroke="var(--text-muted)" width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="stepAfter" dataKey="fixedCost" name="Fixed Costs" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#FFFFFF', stroke: '#EF4444', strokeWidth: 2 }} activeDot={{ r: 6 }}>
                   <LabelList dataKey="fixedCost" content={(props) => <AlternatingLabel {...props} formatter={formatCurrency} fontSize={10} />} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
    </div>
  </div>
          </div>
          
          {/* Per KG Profit */}
          <div className="glass-panel chart-card" style={{ height: '400px' }}>
            <h3 style={{ color: '#8B5CF6' }}><TrendingUp color="#8B5CF6" /> Per KG Profit (AED)</h3>
            <div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" tickMargin={15}/>
                <YAxis tickFormatter={formatCurrency} stroke="var(--text-muted)" width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="perKgProfit" name="Per KG Profit" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: '#FFFFFF', stroke: '#8B5CF6', strokeWidth: 2 }} activeDot={{ r: 6 }}>
                  <LabelList dataKey="perKgProfit" content={(props) => <AlternatingLabel {...props} formatter={formatCurrency} fontSize={10} />} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
    </div>
  </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function AnalysisSlide({ allData }) {
  // Compute some derived metrics where possible
  let netProfitSum = 0;
  let netProfitCount = 0;
  let fixedCostSum = 0;
  let fixedCostCount = 0;
  let investorProfitPerKgSum = 0;
  let investorProfitPerKgCount = 0;
  
  allData.forEach(yearObj => {
    yearObj.data.forEach(m => {
      if(m.netProfit != null) { netProfitSum += m.netProfit; netProfitCount++; }
      if(m.fixedCost != null) { fixedCostSum += m.fixedCost; fixedCostCount++; }
      if(m.investorProfit != null && m.investment != null && m.investment > 0) {
        // approx per kg for investor
        investorProfitPerKgSum += (m.investorProfit / (m.investment / 1000));
        investorProfitPerKgCount++;
      }
    });
  });

  const avgNetProfit = netProfitSum / (netProfitCount || 1);
  const avgFixedCost = fixedCostSum / (fixedCostCount || 1);
  const avgInvestorPerKg = investorProfitPerKgSum / (investorProfitPerKgCount || 1);

  const analysisItems = [
    { id: 1, title: 'TOTAL SALES', subtitle: '(IN KGS)', value: '72,336.18 KGs', icon: <TrendingUp size={24} color="#F1E095" /> },
    { id: 2, title: 'TOTAL SALES', subtitle: '(IN AED)', value: formatCurrency(14829931209.37), icon: <DollarSign size={24} color="#F1E095" /> },
    { id: 3, title: 'TOTAL PURCHASES', subtitle: '(IN KGS)', value: '70,020.42 KGs', icon: <Briefcase size={24} color="#F1E095" /> },
    { id: 4, title: 'TOTAL PURCHASES', subtitle: '(IN AED)', value: formatCurrency(14406604882.28), icon: <DollarSign size={24} color="#F1E095" /> },
    { id: 10, title: 'TOTAL NET PROFIT', subtitle: '(COMPUTED)', value: formatCurrency(netProfitSum), icon: <DollarSign size={24} color="#10B981" /> },
    { id: 11, title: 'AVERAGE NET PROFIT', subtitle: 'PER MONTH', value: formatCurrency(avgNetProfit), icon: <TrendingUp size={24} color="#10B981" /> },
    { id: 12, title: 'AVG PROFIT FOR INVESTORS', subtitle: 'PER MONTH (PER KG)', value: formatCurrency(avgInvestorPerKg), icon: <Award size={24} color="#F1E095" /> },
    { id: 13, title: 'TOTAL FIXED COST', subtitle: '(COMPUTED)', value: formatCurrency(fixedCostSum), icon: <Activity size={24} color="#EF4444" /> },
    { id: 14, title: 'AVERAGE FIXED COST', subtitle: 'PER MONTH', value: formatCurrency(avgFixedCost), icon: <Activity size={24} color="#EF4444" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="slide"
      style={{ overflowY: 'auto' }}
    >
      <div className="logo-container" style={{ marginBottom: "1rem" }}>
        <img src="/logo.png" alt="Himmath logo" className="header-logo" style={{ height: '80px' }} onError={(e) => { e.target.onerror = null; e.target.src="/logo.svg";}} />
      </div>

      <div className="text-center mb-12" style={{ marginBottom: '4rem' }}>
        <h2 className="gold-gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Overall Business Analysis</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Consolidated Metrics & Key Performance Indicators</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '80px' }}>
        {analysisItems.map((item) => (
          <motion.div whileHover={{ scale: 1.02 }} key={item.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
            <div style={{ marginBottom: '1rem', background: 'rgba(212, 175, 55, 0.1)', padding: '15px', borderRadius: '50%' }}>
              {item.icon}
            </div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-gold)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>{item.subtitle}</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function GlobalChartSlide({ title, subtitle, dataChunks, dataKeyAed, dataKeyGrams, colorAed, colorGrams }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.6 }}
      className="slide" style={{ overflowY: 'auto' }}
    >
      <div className="logo-container" style={{ marginBottom: "1rem" }}>
        <img src="/logo.png" alt="Himmath logo" className="header-logo" style={{ height: '80px' }} onError={(e) => { e.target.onerror = null; e.target.src="/logo.svg";}} />
      </div>

      <div className="text-center mb-6" style={{ marginBottom: '4rem' }}>
        <h2 className="gold-gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{title}</h2>
        <p style={{ fontSize: '1.4rem', color: 'var(--light-gold)' }}>{subtitle}</p>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '80px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {dataChunks.map((chunk, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ textAlign: 'center', color: 'var(--primary-gold)', fontSize: '1.8rem', margin: 0, borderBottom: '1px solid rgba(241, 224, 149, 0.2)', paddingBottom: '1rem' }}>
              {chunk.year}
            </h3>
            
            <motion.div whileHover={{ scale: 1.01 }} className="glass-panel chart-card" style={{ height: '400px' }}>
              <h3 style={{ color: colorAed }}><TrendingUp color={colorAed} /> Total in AED</h3>
              <div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chunk.data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id={`grad${dataKeyAed}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colorAed} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colorAed} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" tickMargin={15} interval={"preserveStartEnd"} minTickGap={20} />
                  <YAxis tickFormatter={formatCurrency} stroke="var(--text-muted)" width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey={dataKeyAed} name="Amount (AED)" stroke={colorAed} strokeWidth={3} fillOpacity={1} fill={`url(#grad${dataKeyAed})`} dot={{ r: 4, fill: '#FFFFFF', stroke: colorAed, strokeWidth: 2 }}>
                    <LabelList dataKey={dataKeyAed} content={(props) => <AlternatingLabel {...props} formatter={formatCurrency} fontSize={11} />} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
    </div>
  </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} className="glass-panel chart-card" style={{ height: '400px' }}>
              <h3 style={{ color: colorGrams }}><PieChart color={colorGrams} /> Volume in Grams</h3>
              <div className="chart-responsive-wrapper">
    <div className="chart-responsive-inner">
      <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chunk.data} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" tickMargin={15} interval={"preserveStartEnd"} minTickGap={20}/>
                  <YAxis tickFormatter={formatGrams} stroke="var(--text-muted)" width={70} />
                  <Tooltip content={<GramTooltip />} cursor={{fill: 'rgba(241, 224, 149, 0.1)'}} />
                  <Bar dataKey={dataKeyGrams} name="Volume" fill={colorGrams} radius={[4, 4, 0, 0]}>
                     <LabelList dataKey={dataKeyGrams} content={(props) => <AlternatingLabel {...props} formatter={formatGrams} fontSize={11} />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
    </div>
  </div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function App() {
  const [slide, setSlide] = useState(0);
  
  const salesChunks = [
    { year: '2023-2024', data: globalSalesData.slice(0, 7) },
    { year: '2024-2025', data: globalSalesData.slice(7, 19) },
    { year: '2025-2026', data: globalSalesData.slice(19, 31) }
  ];

  const purchaseChunks = [
    { year: '2023-2024', data: globalPurchasesData.slice(0, 6) },
    { year: '2024-2025', data: globalPurchasesData.slice(6, 19) },
    { year: '2025-2026', data: globalPurchasesData.slice(19, 31) }
  ];

  // Title + SalesSlide + PurchasesSlide + Years Slides + Final Analysis Slide
  const totalSlides = allYearsData.length + 4; 

  const nextSlide = () => setSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="presentation-container">
      <AnimatePresence mode="wait">
        {slide === 0 && <TitleSlide key="title" />}
        {slide === 1 && <GlobalChartSlide key="salesSlide" title="Sales Performance" subtitle="Year by Year Overview" dataChunks={salesChunks} dataKeyAed="salesAed" dataKeyGrams="salesGrams" colorAed="#F1E095" colorGrams="#F1E095" />}
        {slide === 2 && <GlobalChartSlide key="purchasesSlide" title="Purchasing Overview" subtitle="Year by Year Overview" dataChunks={purchaseChunks} dataKeyAed="purchaseAed" dataKeyGrams="purchaseGrams" colorAed="#10B981" colorGrams="#10B981" />}
        {slide > 2 && slide <= allYearsData.length + 2 && <DashboardSlide key={`dashboard-${slide}`} dataObj={allYearsData[slide - 3]} />}
        {slide === totalSlides - 1 && <AnalysisSlide key="analysis" allData={allYearsData} />}
      </AnimatePresence>

      <div className="nav-buttons">
        <button className="btn" onClick={prevSlide} disabled={slide === 0}>
          <ChevronLeft size={20} /> Previous
        </button>
        <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-serif)', letterSpacing: '2px' }}>
          {slide + 1} / {totalSlides}
        </div>
        <button className="btn" onClick={nextSlide} disabled={slide === totalSlides - 1}>
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
