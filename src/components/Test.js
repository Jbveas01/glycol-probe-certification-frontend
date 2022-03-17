import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from './Card';
import './Test.css'

const Test = () => {
    const data = [
        { name: 'Probes', Certified: 400, Uncertified: 800 },
    ];
    return (
        <div>
            {/* <Card title={'Total probes on hand'} stats={'4000'} /> */}
            < div style={{ width: 200, height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Certified" stackId="a" fill="#0067b9" />
                        <Bar dataKey="Uncertified" stackId="a" fill="#ff3838" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div >
    )
}

export default Test