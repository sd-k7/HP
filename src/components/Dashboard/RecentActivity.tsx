import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Package } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'attendance',
    message: 'Priya marked attendance',
    time: '2 minutes ago',
    icon: Clock,
    color: 'text-blue-600',
  },
  {
    id: 2,
    type: 'task',
    message: 'Rahul completed "Inventory Update"',
    time: '15 minutes ago',
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    id: 3,
    type: 'inventory',
    message: 'Low stock alert: HP Laptop Model X',
    time: '1 hour ago',
    icon: AlertTriangle,
    color: 'text-red-600',
  },
  {
    id: 4,
    type: 'order',
    message: 'New order received from Customer ABC',
    time: '2 hours ago',
    icon: Package,
    color: 'text-purple-600',
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-hp-blue hover:text-hp-dark-blue font-medium">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;