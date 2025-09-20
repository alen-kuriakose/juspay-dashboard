/* eslint-disable */
"use client";
import { orderHistory } from "@/utils/helper";
import {} from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { StatusIndicator } from "./ui/statusindicator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";

import add from "@/assets/icons/Add.svg";
import filter from "@/assets/icons/FunnelSimple.svg";
import sort from "@/assets/icons/ArrowsDownUp.svg";
import clipboard from "@/assets/icons/ClipboardText.svg";

import calendar from "@/assets/icons/CalendarBlank.svg";
import Image from "next/image";
import { Search } from "./search";
import { TextSmallSemibold } from "./typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SortConfig = {
  key: string | null;
  direction: 'asc' | 'desc' | null;
};

type FilterConfig = {
  status: string[];
  users: string[];
  projects: string[];
  dateRange: string;
};

type orderListProps = {
  data: Array<any>;
  itemsPerPage: number;
};

export const OderList = ({ data, itemsPerPage }: orderListProps) => {
  const [hover, setHoverState] = useState(false);
  const [activeRow, setActiveRow] = useState<number>();
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  const [orderData, setOrderData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    status: [],
    users: [],
    projects: [],
    dateRange: 'all'
  });
  const [newOrder, setNewOrder] = useState({
    orderId: '',
    user: '',
    project: '',
    address: '',
    date: '',
    status: 'Pending'
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  // Update local data when prop data changes
  React.useEffect(() => {
    setOrderData(data);
  }, [data]);

  // Sorting function
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      } else {
        direction = 'asc';
      }
    }
    
    setSortConfig({ key: direction ? key : null, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig.key || !sortConfig.direction) {
      return orderData;
    }

    return [...orderData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      if (sortConfig.direction === 'asc') {
        if (typeof aValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        if (typeof aValue === 'string') {
          return bValue.localeCompare(aValue);
        }
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  // Get filtered and sorted data
  const getFilteredData = () => {
    const sortedData = getSortedData();
    
    let filteredData = sortedData;

    // Apply search filter
    if (searchTerm.trim()) {
      const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
      filteredData = filteredData.filter((order) => {
        return (
          order.orderId?.toString().toLowerCase().includes(lowercaseSearchTerm) ||
          order.user?.toLowerCase().includes(lowercaseSearchTerm) ||
          order.project?.toLowerCase().includes(lowercaseSearchTerm) ||
          order.address?.toLowerCase().includes(lowercaseSearchTerm) ||
          order.date?.toLowerCase().includes(lowercaseSearchTerm) ||
          order.status?.toLowerCase().includes(lowercaseSearchTerm)
        );
      });
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filteredData = filteredData.filter(order => 
        filters.status.includes(order.status)
      );
    }

    // Apply user filter
    if (filters.users.length > 0) {
      filteredData = filteredData.filter(order => 
        filters.users.includes(order.user)
      );
    }

    // Apply project filter
    if (filters.projects.length > 0) {
      filteredData = filteredData.filter(order => 
        filters.projects.includes(order.project)
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const orderDate = new Date();

      filteredData = filteredData.filter(order => {
        const dateText = order.date.toLowerCase();
        
        switch (filters.dateRange) {
          case 'today':
            return dateText.includes('just now') || dateText.includes('minute') || dateText.includes('hour');
          case 'yesterday':
            return dateText.includes('yesterday');
          case 'week':
            return !dateText.includes('2023') && !dateText.includes('2024') && !dateText.includes('2025');
          case 'month':
            return dateText.includes('feb') || dateText.includes('jan') || dateText.includes('mar') || 
                   dateText.includes('apr') || dateText.includes('may') || dateText.includes('jun') ||
                   dateText.includes('jul') || dateText.includes('aug') || dateText.includes('sep') ||
                   dateText.includes('oct') || dateText.includes('nov') || dateText.includes('dec') ||
                   !dateText.includes('2022') && !dateText.includes('2021');
          default:
            return true;
        }
      });
    }

    return filteredData;
  };

  // Get unique values for filter options
  const getUniqueValues = (key: string) => {
    return [...new Set(orderData.map(order => order[key]))].sort();
  };

  // Handle filter changes
  const handleFilterChange = (filterType: keyof FilterConfig, value: string, isChecked: boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'dateRange') {
        newFilters.dateRange = value;
      } else {
        const currentArray = newFilters[filterType] as string[];
        if (isChecked) {
          newFilters[filterType] = [...currentArray, value] as any;
        } else {
          newFilters[filterType] = currentArray.filter(item => item !== value) as any;
        }
      }
      
      return newFilters;
    });
    
    // Reset to first page when filters change
    setCurrentPage(1);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      status: [],
      users: [],
      projects: [],
      dateRange: 'all'
    });
    setCurrentPage(1);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.status.length > 0 || 
           filters.users.length > 0 || 
           filters.projects.length > 0 || 
           filters.dateRange !== 'all';
  };

  // Handle status change
  const handleStatusChange = (order: any, newStatus: string) => {
    // Find the index of this order in the original data
    const originalIndex = orderData.findIndex(item => 
      item.orderId === order.orderId && 
      item.user === order.user &&
      item.date === order.date
    );
    
    if (originalIndex !== -1) {
      const updatedData = [...orderData];
      updatedData[originalIndex] = { ...updatedData[originalIndex], status: newStatus };
      setOrderData(updatedData);
    }
  };
  
  const handleClick = (index: number) => {
    setActiveRow(index);
    setHoverState(!hover);
  };
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get filtered data
  const filteredData = getFilteredData();
  
  // Calculate total pages based on the filtered data length
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Function to get the current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
    setSelectedRows(new Set()); // Clear selections when searching
    setSelectAll(false);
  };

  // Generate new order ID
  const generateOrderId = () => {
    const existingIds = orderData.map(order => parseInt(order.orderId.replace('#CM', '')));
    const maxId = Math.max(...existingIds);
    return `#CM${(maxId + 1).toString().padStart(4, '0')}`;
  };

  // Handle adding new order
  const handleAddOrder = () => {
    const errors: string[] = [];
    
    if (!newOrder.user.trim()) errors.push('User name is required');
    if (!newOrder.project.trim()) errors.push('Project name is required');
    if (!newOrder.address.trim()) errors.push('Address is required');
    
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear any previous errors
    setFormErrors([]);

    // Get default icon (using the first available icon from helper data)
    const defaultIcon = data[0]?.icon || "/assets/images/3D05.png";
    
    const orderToAdd = {
      ...newOrder,
      orderId: generateOrderId(),
      date: newOrder.date.trim() || "Just now",
      icon: defaultIcon
    };

    // Add the new order to the beginning of the list
    setOrderData([orderToAdd, ...orderData]);
    
    // Reset form and close modal
    setNewOrder({
      orderId: '',
      user: '',
      project: '',
      address: '',
      date: '',
      status: 'Pending'
    });
    setIsAddOrderOpen(false);
    
    // Reset to first page to show the new order
    setCurrentPage(1);
    setSearchTerm('');
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setNewOrder(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  // Reset form when modal opens
  const handleOpenChange = (open: boolean) => {
    setIsAddOrderOpen(open);
    if (open) {
      // Reset form and errors when opening
      setNewOrder({
        orderId: '',
        user: '',
        project: '',
        address: '',
        date: '',
        status: 'Pending'
      });
      setFormErrors([]);
    }
  };

  // Handle individual row selection
  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(index);
    } else {
      newSelectedRows.delete(index);
    }
    setSelectedRows(newSelectedRows);
    
    // Update select all state based on whether all rows are selected
    const currentPageData = getCurrentPageData();
    const allRowsSelected = currentPageData.every((_, i) => 
      newSelectedRows.has((currentPage - 1) * itemsPerPage + i)
    );
    setSelectAll(allRowsSelected);
  };

  // Handle select all functionality
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const newSelectedRows = new Set(selectedRows);
    const currentPageData = getCurrentPageData();
    
    if (checked) {
      // Select all rows on current page
      currentPageData.forEach((_, i) => {
        newSelectedRows.add((currentPage - 1) * itemsPerPage + i);
      });
    } else {
      // Deselect all rows on current page
      currentPageData.forEach((_, i) => {
        newSelectedRows.delete((currentPage - 1) * itemsPerPage + i);
      });
    }
    setSelectedRows(newSelectedRows);
  };

  // Update select all state when page changes or search changes
  React.useEffect(() => {
    const currentPageData = getCurrentPageData();
    const allRowsSelected = currentPageData.length > 0 && currentPageData.every((_, i) => 
      selectedRows.has((currentPage - 1) * itemsPerPage + i)
    );
    setSelectAll(allRowsSelected);
  }, [currentPage, selectedRows, searchTerm]);

  return (
    <Card className="w-[100vw] md:w-auto flex p-7 pb-0 rounded-2xl  shadow-none h-full border-0 gap-3 flex-col">
      <div className="px-2 py-1 mb-5 flex justify-between items-center">
        <TextSmallSemibold className="text-dark dark:text-white">
          Order List
        </TextSmallSemibold>
        {/* <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredData.length} {filteredData.length === 1 ? 'order' : 'orders'}
          {(searchTerm || hasActiveFilters()) && orderData.length !== filteredData.length && (
            <span> of {orderData.length}</span>
          )}
        </div> */}
      </div>
      <CardHeader className="p-0 bg-[#F7F9FB] dark:bg-[#FFFFFF0D]/5 rounded-lg ">
        <div className="flex justify-between w-full p-2 flex-col-reverse sm:flex-row">
          <div className="flex justify-between gap-2  w-auto">
            <div className="p-1">
              <Sheet open={isAddOrderOpen} onOpenChange={handleOpenChange}>
                <SheetTrigger asChild>
                  <button className="p-1 hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 rounded" aria-label="Add new order">
                    <Image src={add} alt="add" className="dark:invert dark:hover:invert-0" />
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] bg-white dark:bg-black/80 ">
                  <SheetHeader>
                    <SheetTitle className="text-dark dark:text-white">Add New Order</SheetTitle>
                    <SheetDescription className="text-gray-600 dark:text-gray-300">
                      Create a new order by filling out the information below. Fields marked with * are required.
                    </SheetDescription>
                  </SheetHeader>
                  
                  {formErrors.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mt-4">
                      <div className="text-sm text-red-800 dark:text-red-200">
                        <strong>Please fix the following errors:</strong>
                        <ul className="mt-1 list-disc list-inside">
                          {formErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="user" className="text-right font-medium text-dark dark:text-white">
                        User *
                      </label>
                      <Input
                        id="user"
                        placeholder="Enter user name"
                        className="col-span-3 bg-white dark:bg-black border-gray-300 dark:border-gray-600 text-dark dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        value={newOrder.user}
                        onChange={(e) => handleInputChange('user', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="project" className="text-right font-medium text-dark dark:text-white">
                        Project *
                      </label>
                      <Input
                        id="project"
                        placeholder="Enter project name"
                        className="col-span-3 bg-white dark:bg-black border-gray-300 dark:border-gray-600 text-dark dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        value={newOrder.project}
                        onChange={(e) => handleInputChange('project', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="address" className="text-right font-medium text-dark dark:text-white">
                        Address *
                      </label>
                      <Input
                        id="address"
                        placeholder="Enter address"
                        className="col-span-3 bg-white dark:bg-black border-gray-300 dark:border-gray-600 text-dark dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        value={newOrder.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="date" className="text-right font-medium text-dark dark:text-white">
                        Date
                      </label>
                      <Input
                        id="date"
                        placeholder="Leave empty for 'Just now'"
                        className="col-span-3 bg-white dark:bg-black border-gray-300 dark:border-gray-600 text-dark dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        value={newOrder.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="status" className="text-right font-medium text-dark dark:text-white">
                        Status
                      </label>
                      <Select
                        value={newOrder.status}
                        onValueChange={(value) => handleInputChange('status', value)}
                      >
                        <SelectTrigger className="col-span-3 bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-700">
                          <SelectItem value="Pending" className="text-gray-900 dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
                            Pending
                          </SelectItem>
                          <SelectItem value="In Progress" className="text-gray-900 dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Complete" className="text-gray-900 dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
                            Complete
                          </SelectItem>
                          <SelectItem value="Approved" className="text-gray-900 dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
                            Approved
                          </SelectItem>
                          <SelectItem value="Rejected" className="text-gray-900 dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
                            Rejected
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <SheetFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddOrderOpen(false)}
                      className="bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddOrder}
                      className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      Add Order
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
            <div className="p-1">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <button className={`p-1 hover:!text-[#1a1a1a] hover:!bg-[#f5f5f5] dark:hover:bg-[#374151] rounded relative transition-colors ${hasActiveFilters() ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-[#6b7280] dark:text-[#9ca3af]'}`} aria-label="Filter orders">
                    <Image src={filter} alt="filter" className="dark:invert dark:hover:invert-0" />
                    {hasActiveFilters() && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] bg-[#fafafa] dark:bg-[#0a0a0a] border-l border-[#f0f0f0] dark:border-[#1a1a1a]">
                  <SheetHeader>
                    <SheetTitle className="text-[#1a1a1a] dark:text-[#fafafa]">Filter Orders</SheetTitle>
                    <SheetDescription className="text-[#6b7280] dark:text-[#9ca3af]">
                      Filter your orders by status, user, project, or date range.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="py-4 space-y-6">
                    {/* Status Filter */}
                    <div>
                      <h4 className="font-medium text-[#1a1a1a] dark:text-[#fafafa] mb-3">Status</h4>
                      <div className="space-y-2">
                        {['Pending', 'In Progress', 'Complete', 'Approved', 'Rejected'].map((status) => (
                          <div key={status} className="flex items-center space-x-2 p-2 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition-colors">
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.status.includes(status)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('status', status, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={`status-${status}`} 
                              className="text-sm text-[#6b7280] dark:text-[#9ca3af] cursor-pointer"
                            >
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* User Filter */}
                    <div>
                      <h4 className="font-medium text-[#1a1a1a] dark:text-[#fafafa] mb-3">Users</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {getUniqueValues('user').map((user) => (
                          <div key={user} className="flex items-center space-x-2 p-2 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition-colors">
                            <Checkbox
                              id={`user-${user}`}
                              checked={filters.users.includes(user)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('users', user, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={`user-${user}`} 
                              className="text-sm text-[#6b7280] dark:text-[#9ca3af] cursor-pointer"
                            >
                              {user}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Filter */}
                    <div>
                      <h4 className="font-medium text-[#1a1a1a] dark:text-[#fafafa] mb-3">Projects</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {getUniqueValues('project').map((project) => (
                          <div key={project} className="flex items-center space-x-2 p-2 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition-colors">
                            <Checkbox
                              id={`project-${project}`}
                              checked={filters.projects.includes(project)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('projects', project, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={`project-${project}`} 
                              className="text-sm text-[#6b7280] dark:text-[#9ca3af] cursor-pointer"
                            >
                              {project}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <h4 className="font-medium text-[#1a1a1a] dark:text-[#fafafa] mb-3">Date Range</h4>
                      <Select
                        value={filters.dateRange}
                        onValueChange={(value) => handleFilterChange('dateRange', value, true)}
                      >
                        <SelectTrigger className="bg-[#ffffff] dark:bg-[#1a1a1a] border-[#e5e7eb] dark:border-[#374151] text-[#6b7280] dark:text-[#9ca3af] hover:border-[#d1d5db] dark:hover:border-[#4b5563]">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#ffffff] dark:bg-[#1a1a1a] border-[#e5e7eb] dark:border-[#374151]">
                          <SelectItem value="all" className="text-[#6b7280] dark:text-[#9ca3af] hover:!text-[#1a1a1a] hover:!bg-[#f9fafb] dark:hover:bg-[#374151] dark:hover:text-[#fafafa]">
                            All Time
                          </SelectItem>
                          <SelectItem value="today" className="text-[#6b7280] dark:text-[#9ca3af] hover:!text-[#1a1a1a] hover:!bg-[#f9fafb] dark:hover:bg-[#374151] dark:hover:text-[#fafafa]">
                            Today
                          </SelectItem>
                          <SelectItem value="yesterday" className="text-[#6b7280] dark:text-[#9ca3af] hover:!text-[#1a1a1a] hover:!bg-[#f9fafb] dark:hover:bg-[#374151] dark:hover:text-[#fafafa]">
                            Yesterday
                          </SelectItem>
                          <SelectItem value="week" className="text-[#6b7280] dark:text-[#9ca3af] hover:!text-[#1a1a1a] hover:!bg-[#f9fafb] dark:hover:bg-[#374151] dark:hover:text-[#fafafa]">
                            This Week
                          </SelectItem>
                          <SelectItem value="month" className="text-[#6b7280] dark:text-[#9ca3af] hover:!text-[#1a1a1a] hover:!bg-[#f9fafb] dark:hover:bg-[#374151] dark:hover:text-[#fafafa]">
                            This Month
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <SheetFooter className="border-t border-[#f0f0f0] dark:border-[#374151] pt-4">
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="bg-[#ffffff] dark:bg-[#1a1a1a] border-[#e5e7eb] dark:border-[#374151] text-[#6b7280] dark:text-[#9ca3af] hover:!text-[#1a1a1a] hover:!bg-[#f9fafb] dark:hover:bg-[#374151] dark:hover:text-[#fafafa]"
                      disabled={!hasActiveFilters()}
                    >
                      Clear All
                    </Button>
                    <Button 
                      onClick={() => setIsFilterOpen(false)}
                      className="bg-[#1a1a1a] dark:bg-[#fafafa] text-[#fafafa] dark:text-[#1a1a1a] hover:bg-[#374151] dark:hover:bg-[#e5e7eb]"
                    >
                      Apply Filters
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
            <div className="p-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:!text-gray-800 hover:!bg-gray-200  dark:hover:bg-gray-700 rounded" aria-label="Sort orders">
                    <Image 
                      src={sort} 
                      alt="sort" 
                      className="dark:invert dark:hover:invert-0" 
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white dark:bg-black border-gray-200 dark:border-gray-700">
                  <DropdownMenuItem 
                    onClick={() => handleSort('orderId')}
                    className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700  dark:hover:text-white"
                  >
                    Sort by Order ID
                    {sortConfig.key === 'orderId' && (
                      <span className="ml-auto text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleSort('user')}
                    className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700  dark:hover:text-white"
                  >
                    Sort by User
                    {sortConfig.key === 'user' && (
                      <span className="ml-auto text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleSort('project')}
                    className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700  dark:hover:text-white"
                  >
                    Sort by Project
                    {sortConfig.key === 'project' && (
                      <span className="ml-auto text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleSort('date')}
                    className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700  dark:hover:text-white"
                  >
                    Sort by Date
                    {sortConfig.key === 'date' && (
                      <span className="ml-auto text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleSort('status')}
                    className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700  dark:hover:text-white"
                  >
                    Sort by Status
                    {sortConfig.key === 'status' && (
                      <span className="ml-auto text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </DropdownMenuItem>
                  {sortConfig.key && (
                    <>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                      <DropdownMenuItem 
                        onClick={() => setSortConfig({ key: null, direction: null })}
                        className="cursor-pointer text-gray-500 dark:text-gray-400 hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      >
                        Clear Sort
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="p-1">
            <Search 
              keyboardActionReq={false} 
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search orders..."
            />
          </div>
        </div>
      </CardHeader>
      
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="px-4 py-3 bg-[#f8fafc] dark:bg-[#1a1a1a]/50 rounded-lg mb-3 w-[100%] border border-[#e2e8f0] dark:border-[#374151]">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-[#1a1a1a] dark:text-[#fafafa]">Active filters:</span>
            
            {filters.status.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.status.map((status) => (
                  <span
                    key={status}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#e0f2fe] dark:bg-[#0a4a5c] text-[#0369a1] dark:text-[#67e8f9] border border-[#bae6fd] dark:border-[#164e63]"
                  >
                    Status: {status}
                    <button
                      onClick={() => handleFilterChange('status', status, false)}
                      className="ml-1 hover:text-[#0284c7] dark:hover:text-[#a5f3fc] transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {filters.users.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.users.map((user) => (
                  <span
                    key={user}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#f0fdf4] dark:bg-[#0a3d0a] text-[#166534] dark:text-[#86efac] border border-[#bbf7d0] dark:border-[#15803d]"
                  >
                    User: {user}
                    <button
                      onClick={() => handleFilterChange('users', user, false)}
                      className="ml-1 hover:text-[#15803d] dark:hover:text-[#bbf7d0] transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {filters.projects.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.projects.map((project) => (
                  <span
                    key={project}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#fdf4ff] dark:bg-[#3d0a3d] text-[#86198f] dark:text-[#f0abfc] border border-[#f3e8ff] dark:border-[#7c2d12]"
                  >
                    Project: {project}
                    <button
                      onClick={() => handleFilterChange('projects', project, false)}
                      className="ml-1 hover:text-[#a21caf] dark:hover:text-[#f3e8ff] transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#fff7ed] dark:bg-[#3d2a0a] text-[#c2410c] dark:text-[#fdba74] border border-[#fed7aa] dark:border-[#9a3412]">
                Date: {filters.dateRange === 'today' ? 'Today' : 
                       filters.dateRange === 'yesterday' ? 'Yesterday' :
                       filters.dateRange === 'week' ? 'This Week' :
                       filters.dateRange === 'month' ? 'This Month' : filters.dateRange}
                <button
                  onClick={() => handleFilterChange('dateRange', 'all', true)}
                  className="ml-1 hover:text-[#ea580c] dark:hover:text-[#fed7aa] transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#6366f1] dark:text-[#a78bfa] hover:text-[#4f46e5] dark:hover:text-[#c4b5fd] ml-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
      
      <CardContent className="p-0  overflow-x-scroll md:overflow-auto">
        <Table className="pb-0 min-w-[800px] md:min-w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 px-3 py-[11px]">
                <Checkbox 
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-24 px-2 py-[11px] md:px-3">
                Order ID
                {sortConfig.key === 'orderId' && (
                  <span className="ml-1 text-xs">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead className="w-48 px-2 py-[11px] md:px-3">
                User
                {sortConfig.key === 'user' && (
                  <span className="ml-1 text-xs">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead className="w-36 px-2 py-[11px] md:px-3">
                Project
                {sortConfig.key === 'project' && (
                  <span className="ml-1 text-xs">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead className="w-64 px-2 py-[11px] md:px-3">Address</TableHead>
              <TableHead className="w-28 px-2 py-[11px] md:px-3">
                Date
                {sortConfig.key === 'date' && (
                  <span className="ml-1 text-xs">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead className="w-24 px-2 py-[11px] md:px-3">
                Status
                {sortConfig.key === 'status' && (
                  <span className="ml-1 text-xs">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead className="w-12 px-1 py-[11px] md:px-3"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {getCurrentPageData().length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {searchTerm || hasActiveFilters() ? (
                    <>
                      No orders found{searchTerm ? ` matching "${searchTerm}"` : ' with current filters'}
                      <br />
                      <div className="flex justify-center gap-2 mt-2">
                        {searchTerm && (
                          <button 
                            onClick={() => handleSearch("")}
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Clear search
                          </button>
                        )}
                        {hasActiveFilters() && (
                          <button 
                            onClick={clearAllFilters}
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    "No orders available"
                  )}
                </TableCell>
              </TableRow>
            ) : (
              getCurrentPageData().map((order: any, index: any) => {
                const globalIndex = (currentPage - 1) * itemsPerPage + index;
                const isSelected = selectedRows.has(globalIndex);
                
                return (
                  <React.Fragment key={index}>
                    <TableRow 
                      className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 ${
                        isSelected 
                          ? 'bg-gray-100 dark:bg-white/10' 
                          : ''
                      }`} 
                      onClick={() => handleClick(index)}
                      onMouseEnter={() => setActiveRow(index)}
                      onMouseLeave={() => setActiveRow(undefined)}
                    >
                      <TableCell 
                        onClick={(e) => e.stopPropagation()} 
                        className="w-12 rounded-l-xl"
                      >
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={(checked) => handleRowSelect(globalIndex, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="w-24 px-2 md:px-3">
                        <div className="truncate">{order.orderId}</div>
                      </TableCell>
                      <TableCell className="w-48 px-2 md:px-3">
                        <div className="flex gap-1 items-center">
                          <div className="flex-shrink-0">
                            <Image src={order.icon} alt={`${order.user} avatar`} className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                          <span className="truncate">{order.user}</span>
                        </div>
                      </TableCell>
                      <TableCell className="w-36 px-2 md:px-3">
                        <div className="truncate">{order.project}</div>
                      </TableCell>
                      <TableCell className="w-64 px-2 md:px-3">
                        <div className="flex items-center">
                          <span className="truncate">{order.address}</span>
                          {activeRow == index ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(order.address).then(() => {
                                  // You could add a toast notification here
                                  console.log('Address copied to clipboard:', order.address);
                                }).catch((err) => {
                                  console.error('Failed to copy address:', err);
                                });
                              }}
                              className="ml-1 flex-shrink-0 w-3 h-3 md:w-4 md:h-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-0.5 transition-colors"
                              title="Copy address to clipboard"
                              aria-label="Copy address to clipboard"
                            >
                              <Image
                                src={clipboard}
                                alt="Copy to clipboard"
                                className="dark:invert w-full h-full"
                              />
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="w-28 px-2 md:px-3">
                        <div className="flex gap-1 items-center">
                          <div className="flex-shrink-0">
                            <Image
                              src={calendar}
                              alt="Calendar icon"
                              className="dark:invert w-3 h-3 md:w-4 md:h-4"
                            />
                          </div>
                          <span className="truncate">{order.date}</span>
                        </div>
                      </TableCell>

                      <TableCell className="w-24 px-2 md:px-3">
                        <StatusIndicator
                          className="text-xs"
                          variant={
                            order.status.toLowerCase().replace(" ", "-") as any
                          }
                        >
                          {order.status}
                        </StatusIndicator>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "w-12 px-1 text-center md:px-3 rounded-r-xl",
                          activeRow == index ? "opacity-100" : "opacity-0"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="inline-block w-full text-center hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 rounded px-1 py-1 md:px-2">
                              ...
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white dark:bg-black border-gray-200 dark:border-gray-700">
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order, "In Progress")}
                              className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order, "Pending")}
                              className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order, "Complete")}
                              className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order, "Approved")}
                              className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              Approved
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order, "Rejected")}
                              className="cursor-pointer text-gray-900 dark:bg-black dark:text-white hover:!text-gray-800 hover:!bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              Rejected
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
        {filteredData.length > 0 && totalPages > 1 && (
          <div className="pt-3 w-full">
            <Pagination className=" mt-4 justify-end pb-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
