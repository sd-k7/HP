import React from 'react';
import { Users, Clock, Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import AttendanceChart from '../components/Dashboard/AttendanceChart';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { useAttendance } from '../hooks/useAttendance';
import { useProducts } from '../hooks/useProducts';

const Dashboard: React.FC = () => {
  const { attendance } = useAttendance();
  const { products } = useProducts();

  // Calculate today's stats
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(record => {
    const recordDate = new Date(record.date).toISOString().split('T')[0];
    return recordDate === today;
  });

  const presentToday = todayAttendance.filter(record => 
    record.status === 'present' || record.status === 'late'
  ).length;

  const totalEmployees = Array.from(
    new Map(attendance.map(record => [record.user?.id, record.user])).values()
  ).filter(Boolean).length;

  const lowStockItems = products.filter(product => 
    product.quantity <= (product.low_stock_threshold || 5)
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, Mr. Sandeep Khurana</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={totalEmployees.toString()}
          icon={Users}
          color="blue"
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Today's Attendance"
          value={`${presentToday}/${totalEmployees}`}
          icon={Clock}
          color="green"
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockItems.toString()}
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Monthly Revenue"
          value="₹2,45,000"
          icon={DollarSign}
          color="purple"
          trend={{ value: 12.5, isPositive: true }}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-hp-blue hover:bg-hp-dark-blue text-white rounded-lg transition-colors duration-200 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">Mark Attendance</span>
          </button>
          <button className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-center">
            <Package className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">Add Product</span>
          </button>
          <button className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">View Sales</span>
          </button>
          <button className="p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">Process Payroll</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;