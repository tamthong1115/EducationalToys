import { Bell, Search } from 'lucide-react'
import React from 'react'
import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import HeaderDashBoard from '../Header/HeaderDashBoard'
import SideBarAdmin from '../SideBar/SideBarAdmin'

const barChartData = [
    { name: '01', lastWeek: 30, last5Days: 40 },
    { name: '02', lastWeek: 25, last5Days: 35 },
    { name: '03', lastWeek: 35, last5Days: 30 },
    { name: '04', lastWeek: 20, last5Days: 25 },
    { name: '05', lastWeek: 40, last5Days: 35 }
]

const pieChartData = [
    { name: 'Age 0-3', value: 30, color: '#8884d8' },
    { name: 'Age 4-7', value: 40, color: '#ffc658' },
    { name: 'Age 8-12', value: 30, color: '#82ca9d' },
]

const lineChartData = [
    { name: '01', value: 30 },
    { name: '02', value: 35 },
    { name: '03', value: 40 },
    { name: '04', value: 35 },
    { name: '05', value: 45 },
    { name: '06', value: 60 },
]

const mostRentedToys = [
    {
        name: 'LEGO Classic Set',
        price: 45000,
        image: 'https://i.pinimg.com/564x/cc/13/de/cc13de4f5caecaf8c7bc6a4334453eaf.jpg',
    },
    {
        name: 'Barbie Dreamhouse',
        price: 75000,
        image: 'https://i.pinimg.com/736x/12/54/67/125467f657e969c036c841c636bc125f.jpg',
    },
    {
        name: 'Nintendo Switch',
        price: 100000,
        image: 'https://i.pinimg.com/control/564x/4e/00/0a/4e000af426cea9e3f5c375141aeb81cf.jpg',
    },
    {
        name: 'Hot Wheels Track Set',
        price: 50000,
        image: 'https://i.pinimg.com/564x/57/e1/83/57e183a9fb4dae66cc1e84b196c2d7af.jpg',
    },
]
.sort((a, b) => b.price - a.price) 
.map(toy => ({
    ...toy,
    price: `$${toy.price.toLocaleString()}/day`
}));

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
          <SideBarAdmin/>
            <div className="flex-1 overflow-y-auto">
                <HeaderDashBoard Bell={Bell} Search={Search}/>
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Revenue
                            </h2>
                            <p className="text-3xl font-bold text-gray-900">
                                 $7.852.000
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                                ↑ 2.1% vs last week
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Rentals from 1-12 Dec, 2023
                            </p>
                            <div className="mt-4 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barChartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar
                                            dataKey="lastWeek"
                                            fill="#8884d8"
                                        />
                                        <Bar
                                            dataKey="last5Days"
                                            fill="#82ca9d"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Rental Duration
                            </h2>
                            <p className="text-sm text-gray-600">
                                From 1-6 Dec, 2023
                            </p>
                            <div className="mt-4 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: '1-3 Days', value: 40 },
                                                { name: '4-7 Days', value: 32 },
                                                { name: '8+ Days', value: 28 },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label
                                        >
                                            <Cell fill="#8884d8" />
                                            <Cell fill="#82ca9d" />
                                            <Cell fill="#ffc658" />
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 flex justify-between text-sm">
                                <span>1-3 Days: 40%</span>
                                <span>4-7 Days: 32%</span>
                                <span>8+ Days: 28%</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Age Group Distribution
                            </h2>
                            <p className="text-sm text-gray-600">
                                Based on toy categories rented
                            </p>
                            <div className="mt-4 flex justify-center">
                                <PieChart width={200} height={200}>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </div>
                            <div className="mt-4 flex justify-between text-sm">
                                <span className="flex items-center">
                                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                                    <span className="text-gray-600 white ">Age 0-3: 30%</span>
                                </span>
                                <span className="flex items-center">
                                    <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                                      <span className="text-gray-600 ">Age 4-7: 40%</span>
                                </span>
                                <span className="flex items-center">
                                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                                
                                    <span className="text-gray-600 ">Age 8-12: 30%</span>
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Most Rented Toys
                            </h2>
                            <p className="text-sm text-gray-600">
                                Top performers this month
                            </p>
                            <ul className="mt-4 space-y-4">
                                {mostRentedToys.map((toy, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <img
                                            src={toy.image}
                                            alt={toy.name}
                                            className="w-8 h-8 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {toy.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {toy.price}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Total Rentals
                            </h2>
                            <p className="text-3xl font-bold text-gray-900">
                                2,568
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                                ↑ 5.2% vs last week
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Rentals from 1-6 Dec, 2023
                            </p>
                            <div className="mt-4 h-48">
                              <ResponsiveContainer width="100%" height="100%">
    <BarChart data={barChartData.slice(0, 6)}> 
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
            dataKey="lastWeek"
            fill="#8884d8"
            barSize={40} 
        />
        <Bar
            dataKey="last5Days"
            fill="#82ca9d"
            barSize={40} 
        />
    </BarChart>
</ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
