import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', signups: 12, logins: 89 },
  { name: 'Tue', signups: 19, logins: 103 },
  { name: 'Wed', signups: 8, logins: 78 },
  { name: 'Thu', signups: 27, logins: 134 },
  { name: 'Fri', signups: 23, logins: 156 },
  { name: 'Sat', signups: 15, logins: 67 },
  { name: 'Sun', signups: 9, logins: 45 },
];

export function OverviewChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            className="text-muted-foreground"
            fontSize={12}
          />
          <YAxis 
            className="text-muted-foreground"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Bar 
            dataKey="signups" 
            fill="hsl(var(--chart-1))" 
            radius={[2, 2, 0, 0]}
            name="Signups"
          />
          <Bar 
            dataKey="logins" 
            fill="hsl(var(--chart-2))" 
            radius={[2, 2, 0, 0]}
            name="Logins"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}