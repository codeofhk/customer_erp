import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faTag,
  faIndustry,
  faUsers,
  faTruck,
  faCheckSquare,
  faChartBar,
  faCog,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

const DashboardMenu: React.FC = () => {
  return (
    <nav className="text-black p-4 h-full">
      <ul className="space-y-4">
        <MenuItem icon={faHome} label="Home" />
        <MenuItemWithSubMenu icon={faBriefcase} label="Financials">
          <SubMenuItem label="Cash Flow" />
          <SubMenuItem label="Revenue" />
          <SubMenuItem label="Profit Margin" />
          <SubMenuItem label="Accounts Receivable" />
          <SubMenuItem label="Accounts Payable" />
        </MenuItemWithSubMenu>
        <MenuItemWithSubMenu icon={faTag} label="Sales & Marketing">
          <SubMenuItem label="Sales Orders" />
          <SubMenuItem label="Customer Information" />
          <SubMenuItem label="Leads" />
          <SubMenuItem label="Opportunities" />
          <SubMenuItem label="Campaigns" />
        </MenuItemWithSubMenu>
        <MenuItemWithSubMenu icon={faIndustry} label="Production & Inventory">
          <SubMenuItem label="Production Orders" />
          <SubMenuItem label="Work in Progress" />
          <SubMenuItem label="Stock Levels" />
          <SubMenuItem label="Materials Management" />
        </MenuItemWithSubMenu>
        <MenuItemWithSubMenu icon={faUsers} label="Human Resources">
          <SubMenuItem label="Employee Records" />
          <SubMenuItem label="Recruitment" />
          <SubMenuItem label="Performance Evaluations" />
          <SubMenuItem label="Absences" />
          <SubMenuItem label="Payroll" />
        </MenuItemWithSubMenu>
        <MenuItemWithSubMenu icon={faTruck} label="Supply Chain & Logistics">
          <SubMenuItem label="Purchase Orders" />
          <SubMenuItem label="Vendor Information" />
          <SubMenuItem label="Transportation" />
          <SubMenuItem label="Warehousing" />
        </MenuItemWithSubMenu>
        <MenuItemWithSubMenu icon={faCheckSquare} label="Project Management">
          <SubMenuItem label="Project Schedules" />
          <SubMenuItem label="Budgets" />
          <SubMenuItem label="Resources" />
          <SubMenuItem label="Progress Reports" />
        </MenuItemWithSubMenu>
        <MenuItem icon={faChartBar} label="Reports" />
        <MenuItem icon={faCog} label="Settings" />
      </ul>
    </nav>
  );
};

interface MenuItemProps {
  icon: any;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label }) => (
  <li className="flex items-center space-x-2">
    <FontAwesomeIcon icon={icon} className="text-lg" />
    <span>{label}</span>
  </li>
);

interface MenuItemWithSubMenuProps {
  icon: any;
  label: string;
  children: React.ReactNode;
}

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({ icon, label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="space-y-2">
      <div
        className="flex items-center justify-between space-x-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={icon} className="text-lg" />
          <span>{label}</span>
        </div>
        <FontAwesomeIcon icon={faAngleDown} className={`text-lg transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <ul className="pl-6 space-y-2">
          {children}
        </ul>
      )}
    </li>
  );
};

interface SubMenuItemProps {
  label: string;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ label }) => (
  <li className="flex items-center space-x-2">
    <span>{label}</span>
  </li>
);

export default DashboardMenu;