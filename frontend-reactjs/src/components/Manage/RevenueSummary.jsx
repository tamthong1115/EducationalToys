import { Bell, Search } from 'lucide-react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import HeaderDashBoard from '../Header/HeaderDashBoard';
import SideBarAdmin from '../SideBar/SideBarAdmin';
const monthlyRevenue = [
    { month: 'January', year: 2023, revenue: 12000 },
    { month: 'February', year: 2023, revenue: 15000 },
    { month: 'March', year: 2023, revenue: 18000 },
    { month: 'April', year: 2023, revenue: 20000 },
    { month: 'May', year: 2023, revenue: 22000 },
    { month: 'June', year: 2023, revenue: 25000 },
    { month: 'July', year: 2023, revenue: 30000 },
    { month: 'August', year: 2023, revenue: 28000 },
    { month: 'September', year: 2023, revenue: 32000 },
    { month: 'October', year: 2023, revenue: 35000 },
    { month: 'November', year: 2023, revenue: 37000 },
    { month: 'December', year: 2023, revenue: 40000 },
    { month: 'January', year: 2024, revenue: 15000 },
    { month: 'February', year: 2024, revenue: 16000 },
    { month: 'March', year: 2024, revenue: 17000 },
];

const RevenueSummary = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [sortOrder, setSortOrder] = useState('year');
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 6;

    const handleSearch = () => {
        setCurrentPage(0);
    };

    const sortRevenue = (data) => {
    return data.sort((a, b) => {
        if (sortOrder === 'year') {
            return b.year - a.year || b.revenue - a.revenue;
        } else if (sortOrder === 'month') {
            const monthOrder = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month) || b.revenue - a.revenue;
        }
        return 0;
    });
};
    const filteredRevenue = monthlyRevenue.filter(item =>
        item.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.year.toString().includes(searchTerm)
    );

    const sortedRevenue = sortRevenue([...filteredRevenue]);
    const pageCount = Math.ceil(sortedRevenue.length / itemsPerPage);
    const displayedRevenue = sortedRevenue.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="flex h-screen bg-gray-100">
            <SideBarAdmin />
            <div className="flex-1 overflow-y-auto">
              <HeaderDashBoard Search={Search} Bell={Bell} />
                <main className="max-w-7xl mx-auto py-6 px-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Revenue Summary</h2>
                    <div className="mb-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Search for month or year..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                        >
                           <Search className="w-5 h-5" />
                        </button>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="ml-3 border border-gray-300 rounded-md p-2"
                        >
                            <option value="year">Sort by Year</option>
                            <option value="month">Sort by Month</option>
                        </select>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Month</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Year</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Revenue</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedRevenue.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-700">{item.month}</td>
                                        <td className="py-3 px-4 text-gray-700">{item.year}</td>
                                        <td className="py-3 px-4 text-gray-700">${item.revenue.toLocaleString()}</td>
                                          <td className="py-3 px-4 text-gray-700">
                                             <button className=" bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition">
                                                Report
                                            </button>
                                          </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(selected) => setCurrentPage(selected.selected)}
                            containerClassName={"flex justify-center items-center mt-4"}
                            pageClassName={"mx-2"}
                            activeClassName={"rounded bg-blue-300 text-white px-4 py-2"}
                            previousClassName={"mr-2"}
                            nextClassName={"ml-2"}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RevenueSummary;
