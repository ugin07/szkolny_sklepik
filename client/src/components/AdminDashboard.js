import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ theme }) => {
  return (
    <div
      className={`container mt-4 ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
    >
      <h2>Panel Administratora</h2>
      <div className="list-group">
        <Link 
          to="/product-manager" 
          className={`list-group-item list-group-item-action ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
        >
          Zarządzaj produktami
        </Link>
        <Link 
          to="/order-manager" 
          className={`list-group-item list-group-item-action ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
        >
          Zarządzaj zamówieniami
        </Link>
        <Link 
          to="/sales-report" 
          className={`list-group-item list-group-item-action ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
        >
          Raport sprzedaży
        </Link>
        <Link 
          to="/category-manager" 
          className={`list-group-item list-group-item-action ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
        >
          Zarządzaj kategoriami
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
