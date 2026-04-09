import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity } from 'lucide-react';
import './Analytics.css';

function Analytics() {
  const jobs = useLiveQuery(() => db.jobs.toArray()) || [];
  
  const tennisCount = jobs.filter(j => j.sport === 'Tennis').length;
  const badmintonCount = jobs.filter(j => j.sport === 'Badminton').length;

  const data = [
    { name: 'Tennis', value: tennisCount },
    { name: 'Badminton', value: badmintonCount }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6'];

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Business Analytics</h1>
        <p className="text-muted">Metrics to track your growth.</p>
      </header>

      <div className="analytics-grid">
        <div className="glass-panel chart-card">
          <h3>Sport Ratio</h3>
          <div className="chart-container">
            {(tennisCount === 0 && badmintonCount === 0) ? (
              <p className="text-muted">No data available yet. Please complete some jobs.</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="chart-legend">
            <span style={{ color: COLORS[0] }}>● Tennis ({tennisCount})</span>
            <span style={{ color: COLORS[1] }}>● Badminton ({badmintonCount})</span>
          </div>
        </div>

        <div className="glass-panel chart-card">
          <h3>Efficiency Tracking</h3>
          <div className="efficiency-metric">
            <Activity size={48} className="text-muted" />
            <div className="metric-data">
              <h1>22<span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>m / racket</span></h1>
              <p className="text-muted">Average stringing speed over last 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
