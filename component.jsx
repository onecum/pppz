import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash2, Settings, Calendar, ChevronLeft, ChevronRight, X, AlertTriangle, Package2, History, Users, Store, Database, FileText, Menu, Bell, Search, Filter, Eye, Edit3, MoreVertical, Link, BookOpen, ExternalLink } from 'lucide-react';

const { useStoredState } = hatch;

const OrderManagementSystem = () => {
  // Persistent state using localStorage
  const [ipList, setIpList] = useStoredState('ipList', []);
  const [pvzList, setPvzList] = useStoredState('pvzList', []);
  const [storesDatabase, setStoresDatabase] = useStoredState('storesDatabase', []);
  const [modelsDatabase, setModelsDatabase] = useStoredState('modelsDatabase', []);
  const [orders, setOrders] = useStoredState('orders', {});
  const [orderHistory, setOrderHistory] = useStoredState('orderHistory', []);
  
  // UI state (not persistent)
  const [currentView, setCurrentView] = useState('main');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editorTab, setEditorTab] = useState('ip');
  const [databaseTab, setDatabaseTab] = useState('stores');
  const [statsPeriod, setStatsPeriod] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statisticsTab, setStatisticsTab] = useState('pvz');
  const [expandedPvz, setExpandedPvz] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [pvzTimePeriod, setPvzTimePeriod] = useState('all');
  const [customerTimePeriod, setCustomerTimePeriod] = useState('all');
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historyFilterStatus, setHistoryFilterStatus] = useState('all');
  const [toolsData, setToolsData] = useStoredState('toolsData', []);
  const [newOrder, setNewOrder] = useState({
    pvzId: '',
    orderNumber: '',
    customer: '',
    store: '',
    purchaseDate: '',
    expectedDeliveryDate: '',
    brand: '',
    model: '',
    productLine: '',
    memory: '',
    color: '',
    quantity: 1,
    amount: 0
  });

  // Инициализация базы данных с iPhone моделями
  useEffect(() => {
    const initializeDatabase = () => {
      const iPhoneModels = [
        // iPhone 16 Pro 512GB
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '512GB', color: 'Натуральный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '512GB', color: 'Черный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '512GB', color: 'Белый титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '512GB', color: 'Песочный титан' },
        
        // iPhone 16 Pro 1TB
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '1TB', color: 'Натуральный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '1TB', color: 'Черный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '1TB', color: 'Белый титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro', memory: '1TB', color: 'Песочный титан' },
        
        // iPhone 16 Pro Max 512GB
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '512GB', color: 'Натуральный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '512GB', color: 'Черный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '512GB', color: 'Белый титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '512GB', color: 'Песочный титан' },
        
        // iPhone 16 Pro Max 1TB
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '1TB', color: 'Натуральный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '1TB', color: 'Черный титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '1TB', color: 'Белый титан' },
        { brand: 'Apple', model: 'iPhone', productLine: '16 Pro Max', memory: '1TB', color: 'Песочный титан' }
      ];

      if (modelsDatabase.length === 0) {
        const modelsWithIds = iPhoneModels.map((model, index) => ({
          id: Date.now() + index,
          ...model,
          createdAt: new Date().toISOString()
        }));
        setModelsDatabase(modelsWithIds);
      }
    };

    initializeDatabase();
  }, []);

  useEffect(() => {
    checkOrderAlerts();
  }, [orders]);

  useEffect(() => {
    const moveOldOrdersToHistory = () => {
      const now = new Date();
      let hasChanges = false;
      const newOrders = { ...orders };
      const newHistory = [...orderHistory];

      Object.keys(newOrders).forEach(pvzId => {
        newOrders[pvzId] = newOrders[pvzId].filter(order => {
          if (order.deliveryStatus && order.actualDeliveryDate) {
            const deliveryDate = new Date(order.actualDeliveryDate);
            const daysDiff = Math.floor((now - deliveryDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff >= 7) {
              newHistory.push({
                ...order,
                pvzAddress: pvzList.find(p => p.id === parseInt(pvzId))?.address || 'Неизвестно',
                movedToHistoryDate: now.toISOString().split('T')[0]
              });
              hasChanges = true;
              return false;
            }
          }
          return true;
        });
      });

      if (hasChanges) {
        setOrders(newOrders);
        setOrderHistory(newHistory);
      }
    };

    const interval = setInterval(moveOldOrdersToHistory, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [orders, orderHistory, pvzList]);

  const checkOrderAlerts = () => {
    const now = new Date();
    let alertCount = 0;

    Object.values(orders).forEach(pvzOrders => {
      pvzOrders.forEach(order => {
        if (order.deliveryStatus && order.actualDeliveryDate && order.overallStatus !== 'Готов') {
          const deliveryDate = new Date(order.actualDeliveryDate);
          const daysDiff = Math.floor((now - deliveryDate) / (1000 * 60 * 60 * 24));
          if (daysDiff >= 5) alertCount++;
        }
      });
    });

    return alertCount;
  };

  const getOrderColor = (order) => {
    if (order.overallStatus === 'Возврат Ян' && order.previousStatus !== 'Готов') {
      return 'bg-red-50 border-red-200 shadow-red-100';
    }
    
    if (order.overallStatus === 'Готов') return 'bg-white border-gray-200';
    if (!order.deliveryStatus || !order.actualDeliveryDate) return 'bg-white border-gray-200';

    const now = new Date();
    const deliveryDate = new Date(order.actualDeliveryDate);
    const daysDiff = Math.floor((now - deliveryDate) / (1000 * 60 * 60 * 24));

    if (daysDiff >= 7) return 'bg-red-100 border-red-400 shadow-red-200';
    if (daysDiff >= 6) return 'bg-red-75 border-red-300 shadow-red-100';
    if (daysDiff >= 5) return 'bg-red-50 border-red-200 shadow-red-100';
    if (daysDiff >= 4) return 'bg-orange-50 border-orange-200 shadow-orange-100';
    if (daysDiff >= 3) return 'bg-yellow-50 border-yellow-200 shadow-yellow-100';
    if (daysDiff >= 2) return 'bg-yellow-25 border-yellow-100';
    
    return 'bg-white border-gray-200';
  };

  // Database management functions
  const saveToStoresDatabase = (storeName) => {
    if (!storeName || storesDatabase.some(s => s.name.toLowerCase() === storeName.toLowerCase())) return;
    
    const newStore = {
      id: Date.now(),
      name: storeName,
      type: 'unknown',
      notes: '',
      deliveryNotes: '',
      createdAt: new Date().toISOString()
    };
    
    setStoresDatabase([...storesDatabase, newStore]);
  };

  const saveToModelsDatabase = (brand, model, productLine, memory, color) => {
    if (!brand && !model && !productLine && !memory && !color) return;
    
    const modelKey = `${brand}-${model}-${productLine}-${memory}-${color}`.toLowerCase();
    if (modelsDatabase.some(m => `${m.brand}-${m.model}-${m.productLine}-${m.memory}-${m.color}`.toLowerCase() === modelKey)) return;

    const newModel = {
      id: Date.now(),
      brand: brand || '',
      model: model || '',
      productLine: productLine || '',
      memory: memory || '',
      color: color || '',
      createdAt: new Date().toISOString()
    };
    
    setModelsDatabase([...modelsDatabase, newModel]);
  };

  // IP Management
  const addIp = () => {
    const newIp = {
      id: Date.now(),
      name: '',
      phone: '',
      createdAt: new Date().toISOString()
    };
    setIpList([...ipList, newIp]);
  };

  const updateIp = (id, field, value) => {
    setIpList(ipList.map(ip => 
      ip.id === id ? { ...ip, [field]: value } : ip
    ));
  };

  const deleteIp = (id) => {
    setIpList(ipList.filter(ip => ip.id !== id));
    setPvzList(pvzList.filter(pvz => pvz.ipId !== id));
  };

  // PVZ Management
  const addPvz = (ipId) => {
    const newPvz = {
      id: Date.now(),
      ipId: ipId,
      address: '',
      createdAt: new Date().toISOString()
    };
    setPvzList([...pvzList, newPvz]);
  };

  const updatePvz = (id, field, value) => {
    setPvzList(pvzList.map(pvz => 
      pvz.id === id ? { ...pvz, [field]: value } : pvz
    ));
  };

  const deletePvz = (id) => {
    setPvzList(pvzList.filter(pvz => pvz.id !== id));
    const newOrders = { ...orders };
    delete newOrders[id];
    setOrders(newOrders);
  };

  // Store Database Management
  const addStoreToDatabase = () => {
    const newStore = {
      id: Date.now(),
      name: '',
      type: 'unknown',
      notes: '',
      deliveryNotes: '',
      createdAt: new Date().toISOString()
    };
    setStoresDatabase([...storesDatabase, newStore]);
  };

  const updateStoreInDatabase = (id, field, value) => {
    setStoresDatabase(storesDatabase.map(store => 
      store.id === id ? { ...store, [field]: value } : store
    ));
  };

  const deleteStoreFromDatabase = (id) => {
    setStoresDatabase(storesDatabase.filter(store => store.id !== id));
  };

  // Model Database Management
  const addModelToDatabase = () => {
    const newModel = {
      id: Date.now(),
      brand: '',
      model: '',
      productLine: '',
      memory: '',
      color: '',
      createdAt: new Date().toISOString()
    };
    setModelsDatabase([...modelsDatabase, newModel]);
  };

  const updateModelInDatabase = (id, field, value) => {
    setModelsDatabase(modelsDatabase.map(model => 
      model.id === id ? { ...model, [field]: value } : model
    ));
  };

  const deleteModelFromDatabase = (id) => {
    setModelsDatabase(modelsDatabase.filter(model => model.id !== id));
  };

  const handleAddOrder = () => {
    if (!newOrder.pvzId || !newOrder.orderNumber) {
      alert('Заполните обязательные поля: ПВЗ и номер заказа');
      return;
    }

    const order = {
      id: Date.now(),
      ...newOrder,
      deliveryStatus: false,
      cellNumber: '',
      isReturn: false,
      overallStatus: 'В обработке',
      actualDeliveryDate: '',
      statusDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const pvzId = newOrder.pvzId;
    setOrders(prev => ({
      ...prev,
      [pvzId]: [...(prev[pvzId] || []), order]
    }));

    saveToStoresDatabase(newOrder.store);
    saveToModelsDatabase(newOrder.brand, newOrder.model, newOrder.productLine, newOrder.memory, newOrder.color);

    setNewOrder({
      pvzId: '',
      orderNumber: '',
      customer: '',
      store: '',
      purchaseDate: '',
      expectedDeliveryDate: '',
      brand: '',
      model: '',
      productLine: '',
      memory: '',
      color: '',
      quantity: 1,
      amount: 0
    });

    setShowOrderForm(false);
  };

  const updateOrder = (pvzId, orderId, field, value) => {
    setOrders(prev => ({
      ...prev,
      [pvzId]: prev[pvzId].map(order => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, [field]: value };
          
          if (field === 'deliveryStatus' && value === true && !order.cellNumber) {
            const cellNumber = prompt('Введите номер ячейки:');
            if (cellNumber) {
              updatedOrder.cellNumber = cellNumber;
              updatedOrder.actualDeliveryDate = new Date().toISOString().split('T')[0];
              updatedOrder.overallStatus = 'Поступил на пункт';
              updatedOrder.statusDate = new Date().toISOString();
            } else {
              updatedOrder.deliveryStatus = false;
              return order;
            }
          }

          if (field === 'overallStatus') {
            updatedOrder.statusDate = new Date().toISOString();
          }

          if (field === 'overallStatus' && (value === 'Выдан' || value === 'Возврат Ян')) {
            const historyOrder = {
              ...updatedOrder,
              pvzAddress: pvzList.find(p => p.id === parseInt(pvzId))?.address || 'Неизвестно',
              movedToHistoryDate: new Date().toISOString().split('T')[0]
            };
            
            setOrderHistory(prevHistory => [...prevHistory, historyOrder]);
            
            setTimeout(() => {
              setOrders(prevOrders => ({
                ...prevOrders,
                [pvzId]: prevOrders[pvzId].filter(o => o.id !== orderId)
              }));
            }, 100);
          }
          
          return updatedOrder;
        }
        return order;
      })
    }));
  };

  const deleteOrder = (pvzId, orderId) => {
    setOrders(prev => ({
      ...prev,
      [pvzId]: prev[pvzId].filter(order => order.id !== orderId)
    }));
  };

  const returnOrder = (pvzId, orderId) => {
    const order = orders[pvzId]?.find(o => o.id === orderId);
    if (order) {
      const historyOrder = {
        ...order,
        isReturn: true,
        previousStatus: order.overallStatus,
        overallStatus: 'Возврат Ян',
        returnDate: new Date().toISOString().split('T')[0],
        statusDate: new Date().toISOString(),
        pvzAddress: pvzList.find(p => p.id === parseInt(pvzId))?.address || 'Неизвестно',
        movedToHistoryDate: new Date().toISOString().split('T')[0]
      };
      
      setOrderHistory(prev => [...prev, historyOrder]);
      
      setOrders(prev => ({
        ...prev,
        [pvzId]: prev[pvzId].filter(o => o.id !== orderId)
      }));
    }
  };

  const getAllOrders = () => {
    const allOrders = [];
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find(p => p.id === parseInt(pvzId));
      const ip = ipList.find(i => i.id === pvz?.ipId);
      pvzOrders.forEach(order => {
        allOrders.push({
          ...order,
          pvzId: parseInt(pvzId),
          pvzAddress: pvz?.address || 'Неизвестно',
          ipName: ip?.name || 'Неизвестно'
        });
      });
    });

    // Apply filters
    let filteredOrders = allOrders;

    if (searchQuery) {
      filteredOrders = filteredOrders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filteredOrders = filteredOrders.filter(order => {
        switch (filterStatus) {
          case 'pending': return !order.deliveryStatus;
          case 'delivered': return order.deliveryStatus && order.overallStatus !== 'Готов';
          case 'ready': return order.overallStatus === 'Готов';
          case 'inquiry': return order.hasInquiry;
          case 'claim': return order.hasClaim;
          default: return true;
        }
      });
    }

    return filteredOrders.sort((a, b) => {
      if (a.deliveryStatus !== b.deliveryStatus) {
        return a.deliveryStatus ? 1 : -1;
      }
      
      if (a.actualDeliveryDate && b.actualDeliveryDate) {
        return new Date(a.actualDeliveryDate) - new Date(b.actualDeliveryDate);
      }
      
      if (a.expectedDeliveryDate && b.expectedDeliveryDate) {
        return new Date(a.expectedDeliveryDate) - new Date(b.expectedDeliveryDate);
      }
      
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    });
  };

  const getOrdersForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayOrders = [];
    
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find(p => p.id === parseInt(pvzId));
      pvzOrders.forEach(order => {
        if (order.expectedDeliveryDate === dateStr) {
          dayOrders.push({
            ...order,
            pvzId: parseInt(pvzId),
            pvzAddress: pvz?.address || `ПВЗ #${pvzId}`,
            pvz: pvz
          });
        }
      });
    });
    
    return dayOrders;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getStoreStatus = (storeName) => {
    const store = storesDatabase.find(s => s.name.toLowerCase().includes(storeName.toLowerCase()));
    
    if (store) {
      if (store.type === 'good') return { status: 'good', color: 'bg-green-100 text-green-800 border-green-200', store };
      if (store.type === 'bad') return { status: 'bad', color: 'bg-red-100 text-red-800 border-red-200', store };
    }
    
    return { status: 'unknown', color: 'bg-gray-100 text-gray-800 border-gray-200', store: null };
  };

  const getStoreStatistics = () => {
    const storeStats = {};
    
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find(p => p.id === parseInt(pvzId));
      const ip = ipList.find(i => i.id === pvz?.ipId);
      
      pvzOrders.forEach(order => {
        if (!storeStats[order.store]) {
          storeStats[order.store] = { 
            total: 0, 
            amount: 0, 
            pvzBreakdown: {} 
          };
        }
        
        const pvzKey = `${ip?.name || 'Неизвестно'} - ${pvz?.address || `ПВЗ #${pvzId}`}`;
        if (!storeStats[order.store].pvzBreakdown[pvzKey]) {
          storeStats[order.store].pvzBreakdown[pvzKey] = { total: 0, amount: 0 };
        }
        
        storeStats[order.store].total += order.quantity;
        storeStats[order.store].amount += order.amount;
        storeStats[order.store].pvzBreakdown[pvzKey].total += order.quantity;
        storeStats[order.store].pvzBreakdown[pvzKey].amount += order.amount;
      });
    });
    
    orderHistory.forEach(order => {
      if (!storeStats[order.store]) {
        storeStats[order.store] = { 
          total: 0, 
          amount: 0, 
          pvzBreakdown: {} 
        };
      }
      
      const pvzKey = order.pvzAddress;
      if (!storeStats[order.store].pvzBreakdown[pvzKey]) {
        storeStats[order.store].pvzBreakdown[pvzKey] = { total: 0, amount: 0 };
      }
      
      storeStats[order.store].total += order.quantity;
      storeStats[order.store].amount += order.amount;
      storeStats[order.store].pvzBreakdown[pvzKey].total += order.quantity;
      storeStats[order.store].pvzBreakdown[pvzKey].amount += order.amount;
    });
    
    return storeStats;
  };

  const getPvzStatistics = (period = 'all') => {
    const now = new Date();
    const pvzStats = {};
    
    const isInPeriod = (dateStr) => {
      if (period === 'all') return true;
      
      const date = new Date(dateStr);
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (period) {
        case 'week': return diffDays <= 7;
        case '2weeks': return diffDays <= 14;
        case 'month': return diffDays <= 30;
        default: return true;
      }
    };
    
    pvzList.forEach(pvz => {
      const ip = ipList.find(i => i.id === pvz.ipId);
      pvzStats[pvz.id] = {
        pvzAddress: pvz.address,
        ipName: ip?.name || 'Неизвестно',
        totalOrders: 0,
        deliveredOrders: 0,
        totalAmount: 0,
        returns: 0,
        inquiries: 0,
        claims: 0
      };
    });
    
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      if (!pvzStats[pvzId]) return;
      
      pvzOrders.forEach(order => {
        if (isInPeriod(order.createdAt)) {
          pvzStats[pvzId].totalOrders += 1;
          pvzStats[pvzId].totalAmount += order.amount;
          if (order.deliveryStatus) pvzStats[pvzId].deliveredOrders += 1;
          if (order.hasInquiry) pvzStats[pvzId].inquiries += 1;
          if (order.hasClaim) pvzStats[pvzId].claims += 1;
        }
      });
    });
    
    orderHistory.forEach(order => {
      const pvzId = pvzList.find(p => p.address === order.pvzAddress)?.id;
      if (!pvzStats[pvzId] || !isInPeriod(order.createdAt)) return;
      
      pvzStats[pvzId].totalOrders += 1;
      pvzStats[pvzId].deliveredOrders += 1;
      pvzStats[pvzId].totalAmount += order.amount;
      if (order.overallStatus === 'Возврат Ян') pvzStats[pvzId].returns += 1;
      if (order.hasInquiry) pvzStats[pvzId].inquiries += 1;
      if (order.hasClaim) pvzStats[pvzId].claims += 1;
    });
    
    return Object.values(pvzStats).filter(stat => stat.totalOrders > 0);
  };

  // Export functions
  const exportToCSV = (data, filename) => {
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportStores = () => {
    const data = storesDatabase.map(store => ({
      'Название': store.name,
      'Тип': store.type === 'good' ? 'Хороший' : store.type === 'bad' ? 'Плохой' : 'Неопределенный',
      'Заметки': store.notes,
      'Нюансы доставки': store.deliveryNotes,
      'Дата создания': new Date(store.createdAt).toLocaleDateString('ru-RU')
    }));
    exportToCSV(data, 'stores_database.csv');
  };

  const exportModels = () => {
    const data = modelsDatabase.map(model => ({
      'Бренд': model.brand,
      'Модель': model.model,
      'Линейка': model.productLine || '',
      'Память': model.memory,
      'Цвет': model.color,
      'Дата создания': new Date(model.createdAt).toLocaleDateString('ru-RU')
    }));
    exportToCSV(data, 'models_database.csv');
  };

  const exportActiveOrders = () => {
    const data = getAllOrders().map(order => ({
      'Номер заказа': order.orderNumber,
      'Покупатель': order.customer,
      'ИП': order.ipName,
      'ПВЗ': order.pvzAddress,
      'Магазин': order.store,
      'Бренд': order.brand,
      'Модель': order.model,
      'Линейка': order.productLine || '',
      'Память': order.memory,
      'Цвет': order.color,
      'Количество': order.quantity,
      'Сумма': order.amount,
      'Дата покупки': order.purchaseDate,
      'Ожидаемая доставка': order.expectedDeliveryDate,
      'Фактическая доставка': order.actualDeliveryDate,
      'Ячейка': order.cellNumber,
      'Статус доставки': order.deliveryStatus ? 'Доставлен' : 'Ожидает',
      'Общий статус': order.overallStatus,
      'Запрос': order.hasInquiry ? 'Да' : 'Нет',
      'Претензия': order.hasClaim ? 'Да' : 'Нет',
      'Дата создания': new Date(order.createdAt).toLocaleDateString('ru-RU')
    }));
    exportToCSV(data, 'active_orders.csv');
  };

  const exportOrderHistory = () => {
    const data = orderHistory.map(order => ({
      'Номер заказа': order.orderNumber,
      'Покупатель': order.customer,
      'ПВЗ': order.pvzAddress,
      'Магазин': order.store,
      'Бренд': order.brand,
      'Модель': order.model,
      'Линейка': order.productLine || '',
      'Память': order.memory,
      'Цвет': order.color,
      'Количество': order.quantity,
      'Сумма': order.amount,
      'Дата покупки': order.purchaseDate,
      'Дата доставки': order.actualDeliveryDate,
      'Ячейка': order.cellNumber,
      'Статус': order.overallStatus,
      'Предыдущий статус': order.previousStatus || '',
      'Запрос': order.hasInquiry ? 'Да' : 'Нет',
      'Претензия': order.hasClaim ? 'Да' : 'Нет',
      'Дата архивирования': order.movedToHistoryDate
    }));
    exportToCSV(data, 'order_history.csv');
  };

  const exportDeliveredOrders = () => {
    const deliveredActive = getAllOrders().filter(order => order.deliveryStatus);
    const deliveredHistory = orderHistory.filter(order => order.actualDeliveryDate);
    
    const allDelivered = [...deliveredActive, ...deliveredHistory];
    
    const data = allDelivered.map(order => ({
      'Номер заказа': order.orderNumber,
      'Покупатель': order.customer,
      'ПВЗ': order.pvzAddress || order.pvzAddress,
      'Магазин': order.store,
      'Бренд': order.brand,
      'Модель': order.model,
      'Линейка': order.productLine || '',
      'Память': order.memory,
      'Цвет': order.color,
      'Количество': order.quantity,
      'Сумма': order.amount,
      'Дата покупки': order.purchaseDate,
      'Дата доставки': order.actualDeliveryDate,
      'Ячейка': order.cellNumber,
      'Текущий статус': order.overallStatus,
      'Запрос': order.hasInquiry ? 'Да' : 'Нет',
      'Претензия': order.hasClaim ? 'Да' : 'Нет',
      'В истории': orderHistory.some(h => h.orderNumber === order.orderNumber) ? 'Да' : 'Нет'
    }));
    
    exportToCSV(data, 'delivered_orders.csv');
  };

  const alertCount = checkOrderAlerts();

  // Statistics functions
  const getPvzStatisticsDetailed = (period = 'all') => {
    const now = new Date();
    const pvzStats = {};
    
    const isInPeriod = (dateStr) => {
      if (period === 'all') return true;
      
      const date = new Date(dateStr);
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (period) {
        case 'week': return diffDays <= 7;
        case 'month': return diffDays <= 30;
        default: return true;
      }
    };
    
    // Initialize PVZ stats
    pvzList.forEach(pvz => {
      const ip = ipList.find(i => i.id === pvz.ipId);
      pvzStats[pvz.id] = {
        id: pvz.id,
        address: pvz.address,
        ipName: ip?.name || 'Неизвестно',
        totalItems: 0,
        orders: [],
        productBreakdown: {}
      };
    });
    
    // Process active orders
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      if (!pvzStats[pvzId]) return;
      
      pvzOrders.forEach(order => {
        if (isInPeriod(order.createdAt)) {
          pvzStats[pvzId].totalItems += order.quantity;
          pvzStats[pvzId].orders.push(order);
          
          const productKey = `${order.brand} ${order.model} ${order.productLine}`;
          if (!pvzStats[pvzId].productBreakdown[productKey]) {
            pvzStats[pvzId].productBreakdown[productKey] = {
              quantity: 0,
              amount: 0,
              memory: order.memory,
              color: order.color
            };
          }
          pvzStats[pvzId].productBreakdown[productKey].quantity += order.quantity;
          pvzStats[pvzId].productBreakdown[productKey].amount += order.amount;
        }
      });
    });
    
    // Process order history
    orderHistory.forEach(order => {
      const pvzId = pvzList.find(p => p.address === order.pvzAddress)?.id;
      if (!pvzStats[pvzId] || !isInPeriod(order.createdAt)) return;
      
      pvzStats[pvzId].totalItems += order.quantity;
      pvzStats[pvzId].orders.push(order);
      
      const productKey = `${order.brand} ${order.model} ${order.productLine}`;
      if (!pvzStats[pvzId].productBreakdown[productKey]) {
        pvzStats[pvzId].productBreakdown[productKey] = {
          quantity: 0,
          amount: 0,
          memory: order.memory,
          color: order.color
        };
      }
      pvzStats[pvzId].productBreakdown[productKey].quantity += order.quantity;
      pvzStats[pvzId].productBreakdown[productKey].amount += order.amount;
    });
    
    return Object.values(pvzStats).filter(stat => stat.totalItems > 0).sort((a, b) => b.totalItems - a.totalItems);
  };

  const getCustomerStatistics = (period = 'all') => {
    const now = new Date();
    const customerStats = {};
    
    const isInPeriod = (dateStr) => {
      if (period === 'all') return true;
      
      const date = new Date(dateStr);
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return period === 'month' ? diffDays <= 30 : true;
    };
    
    // Process active orders
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find(p => p.id === parseInt(pvzId));
      const ip = ipList.find(i => i.id === pvz?.ipId);
      
      pvzOrders.forEach(order => {
        if (!order.customer || !isInPeriod(order.createdAt)) return;
        
        if (!customerStats[order.customer]) {
          customerStats[order.customer] = {
            name: order.customer,
            totalItems: 0,
            totalAmount: 0,
            pvzBreakdown: {},
            orders: []
          };
        }
        
        customerStats[order.customer].totalItems += order.quantity;
        customerStats[order.customer].totalAmount += order.amount;
        customerStats[order.customer].orders.push(order);
        
        const pvzKey = `${ip?.name || 'Неизвестно'} - ${pvz?.address || `ПВЗ #${pvzId}`}`;
        if (!customerStats[order.customer].pvzBreakdown[pvzKey]) {
          customerStats[order.customer].pvzBreakdown[pvzKey] = {
            quantity: 0,
            amount: 0,
            orders: 0
          };
        }
        customerStats[order.customer].pvzBreakdown[pvzKey].quantity += order.quantity;
        customerStats[order.customer].pvzBreakdown[pvzKey].amount += order.amount;
        customerStats[order.customer].pvzBreakdown[pvzKey].orders += 1;
      });
    });
    
    // Process order history
    orderHistory.forEach(order => {
      if (!order.customer || !isInPeriod(order.createdAt)) return;
      
      if (!customerStats[order.customer]) {
        customerStats[order.customer] = {
          name: order.customer,
          totalItems: 0,
          totalAmount: 0,
          pvzBreakdown: {},
          orders: []
        };
      }
      
      customerStats[order.customer].totalItems += order.quantity;
      customerStats[order.customer].totalAmount += order.amount;
      customerStats[order.customer].orders.push(order);
      
      const pvzKey = order.pvzAddress;
      if (!customerStats[order.customer].pvzBreakdown[pvzKey]) {
        customerStats[order.customer].pvzBreakdown[pvzKey] = {
          quantity: 0,
          amount: 0,
          orders: 0
        };
      }
      customerStats[order.customer].pvzBreakdown[pvzKey].quantity += order.quantity;
      customerStats[order.customer].pvzBreakdown[pvzKey].amount += order.amount;
      customerStats[order.customer].pvzBreakdown[pvzKey].orders += 1;
    });
    
    return Object.values(customerStats).sort((a, b) => b.totalItems - a.totalItems);
  };

  // Tools management functions
  const addToolsSection = () => {
    const newSection = {
      id: Date.now(),
      title: '',
      description: '',
      subsections: [],
      createdAt: new Date().toISOString()
    };
    setToolsData([...toolsData, newSection]);
  };

  const updateToolsSection = (id, field, value) => {
    setToolsData(toolsData.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const deleteToolsSection = (id) => {
    setToolsData(toolsData.filter(section => section.id !== id));
  };

  const addSubsection = (sectionId) => {
    const newSubsection = {
      id: Date.now(),
      title: '',
      description: '',
      links: [],
      createdAt: new Date().toISOString()
    };
    
    setToolsData(toolsData.map(section => 
      section.id === sectionId 
        ? { ...section, subsections: [...section.subsections, newSubsection] }
        : section
    ));
  };

  const updateSubsection = (sectionId, subsectionId, field, value) => {
    setToolsData(toolsData.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            subsections: section.subsections.map(sub =>
              sub.id === subsectionId ? { ...sub, [field]: value } : sub
            )
          }
        : section
    ));
  };

  const deleteSubsection = (sectionId, subsectionId) => {
    setToolsData(toolsData.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            subsections: section.subsections.filter(sub => sub.id !== subsectionId)
          }
        : section
    ));
  };

  const addLink = (sectionId, subsectionId) => {
    const newLink = {
      id: Date.now(),
      title: '',
      url: '',
      description: '',
      createdAt: new Date().toISOString()
    };
    
    setToolsData(toolsData.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            subsections: section.subsections.map(sub =>
              sub.id === subsectionId 
                ? { ...sub, links: [...sub.links, newLink] }
                : sub
            )
          }
        : section
    ));
  };

  const updateLink = (sectionId, subsectionId, linkId, field, value) => {
    setToolsData(toolsData.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            subsections: section.subsections.map(sub =>
              sub.id === subsectionId 
                ? {
                    ...sub,
                    links: sub.links.map(link =>
                      link.id === linkId ? { ...link, [field]: value } : link
                    )
                  }
                : sub
            )
          }
        : section
    ));
  };

  const deleteLink = (sectionId, subsectionId, linkId) => {
    setToolsData(toolsData.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            subsections: section.subsections.map(sub =>
              sub.id === subsectionId 
                ? { ...sub, links: sub.links.filter(link => link.id !== linkId) }
                : sub
            )
          }
        : section
    ));
  };

  // Navigation items
  const navigationItems = [
    { id: 'main', label: 'Рабочая зона', icon: Package2, count: getAllOrders().length },
    { id: 'statistics', label: 'Статистика', icon: FileText },
    { id: 'tools', label: 'Инструменты', icon: Settings },
    { id: 'editor', label: 'Редактор', icon: Edit3 },
    { id: 'database', label: 'База данных', icon: Database },
    { id: 'reports', label: 'Отчеты', icon: Download },
    { id: 'history', label: 'История', icon: History, count: orderHistory.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo and Title */}
            <div className="flex items-center min-w-0">
              <button
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="ml-2 md:ml-0 min-w-0">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  Система учёта ПВЗ
                </h1>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {alertCount > 0 && (
                <div className="flex bg-red-100 border border-red-300 text-red-700 px-2 py-1 md:px-3 md:py-2 rounded-lg items-center text-xs md:text-sm">
                  <Bell className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                  <span className="hidden lg:inline">Внимание! </span>
                  <span className="truncate">{alertCount} заказов лежат более 5 дней</span>
                </div>
              )}
              
              {currentView === 'main' && (
                <button
                  onClick={() => setShowOrderForm(!showOrderForm)}
                  className="bg-green-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-green-700 flex items-center text-xs md:text-sm transition-colors"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">Новый заказ</span>
                  <span className="sm:hidden">Заказ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Navigation Overlay */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-30 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowMobileMenu(false)} />
            <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Навигация</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <nav className="p-4 space-y-1 overflow-y-auto h-full pb-20">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      currentView === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count !== undefined && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        currentView === item.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-shrink-0">
          <div className="w-64 lg:w-72 bg-white border-r border-gray-200 shadow-sm">
            <nav className="p-4 space-y-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm transform scale-[1.02]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-gray-50">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-full">
            {/* Tools Section */}
            {currentView === 'tools' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 md:px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">Инструменты и ссылки</h3>
                        <p className="text-sm text-gray-600 mt-1">Управление разделами, ссылками и описаниями</p>
                      </div>
                      <button
                        onClick={addToolsSection}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить раздел
                      </button>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="space-y-6">
                      {toolsData.map(section => (
                        <div key={section.id} className="border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50">
                          <div className="p-4 md:p-6">
                            {/* Section Header */}
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0 mb-6">
                              <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Название раздела</label>
                                    <input
                                      type="text"
                                      value={section.title}
                                      onChange={(e) => updateToolsSection(section.id, 'title', e.target.value)}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                      placeholder="Например: Магазины FBY"
                                    />
                                  </div>
                                  <div className="flex items-end">
                                    <button
                                      onClick={() => deleteToolsSection(section.id)}
                                      className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Удалить раздел
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-700">Описание раздела</label>
                                  <textarea
                                    value={section.description}
                                    onChange={(e) => updateToolsSection(section.id, 'description', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                    placeholder="Описание раздела (необязательно)"
                                    rows="2"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Subsections */}
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">Подразделы и ссылки</h4>
                                <button
                                  onClick={() => addSubsection(section.id)}
                                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Добавить подраздел
                                </button>
                              </div>

                              {section.subsections.map(subsection => (
                                <div key={subsection.id} className="bg-white p-4 rounded-lg border border-gray-200">
                                  <div className="space-y-4">
                                    {/* Subsection Header */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Название подраздела</label>
                                        <input
                                          type="text"
                                          value={subsection.title}
                                          onChange={(e) => updateSubsection(section.id, subsection.id, 'title', e.target.value)}
                                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                          placeholder="Например: iPhone"
                                        />
                                      </div>
                                      <div className="flex items-end space-x-2">
                                        <button
                                          onClick={() => addLink(section.id, subsection.id)}
                                          className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center"
                                        >
                                          <Link className="w-3 h-3 mr-1" />
                                          Добавить ссылку
                                        </button>
                                        <button
                                          onClick={() => deleteSubsection(section.id, subsection.id)}
                                          className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700">Описание подраздела</label>
                                      <textarea
                                        value={subsection.description}
                                        onChange={(e) => updateSubsection(section.id, subsection.id, 'description', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Описание подраздела (необязательно)"
                                        rows="2"
                                      />
                                    </div>

                                    {/* Links */}
                                    {subsection.links.length > 0 && (
                                      <div className="space-y-3">
                                        <h5 className="font-medium text-gray-700 text-sm">Ссылки:</h5>
                                        {subsection.links.map(link => (
                                          <div key={link.id} className="bg-gray-50 p-3 rounded-lg border">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                              <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-600">Название ссылки</label>
                                                <input
                                                  type="text"
                                                  value={link.title}
                                                  onChange={(e) => updateLink(section.id, subsection.id, link.id, 'title', e.target.value)}
                                                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                  placeholder="16 Pro Max"
                                                />
                                              </div>
                                              <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-600">URL</label>
                                                <input
                                                  type="url"
                                                  value={link.url}
                                                  onChange={(e) => updateLink(section.id, subsection.id, link.id, 'url', e.target.value)}
                                                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                  placeholder="https://example.com"
                                                />
                                              </div>
                                              <div className="flex items-end">
                                                <button
                                                  onClick={() => deleteLink(section.id, subsection.id, link.id)}
                                                  className="bg-red-600 text-white px-2 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                                                >
                                                  <Trash2 className="w-3 h-3" />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="space-y-1">
                                              <label className="text-xs font-medium text-gray-600">Описание</label>
                                              <textarea
                                                value={link.description}
                                                onChange={(e) => updateLink(section.id, subsection.id, link.id, 'description', e.target.value)}
                                                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                placeholder="Описание ссылки (необязательно)"
                                                rows="1"
                                              />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}

                              {section.subsections.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                  <p>Нет подразделов. Добавьте первый подраздел.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {toolsData.length === 0 && (
                        <div className="text-center py-12">
                          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg">Нет разделов инструментов</p>
                          <p className="text-gray-400 text-sm">Добавьте первый раздел для организации ссылок и информации</p>
                        </div>
                      )}
                    </div>

                    {/* Tools Display Section */}
                    {toolsData.length > 0 && (
                      <div className="mt-8 border-t pt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Просмотр инструментов</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                          {toolsData.map(section => (
                            <div key={`display-${section.id}`} className="bg-white border border-gray-200 rounded-xl p-4">
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 text-lg">{section.title}</h4>
                                {section.description && (
                                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                                )}
                              </div>

                              <div className="space-y-4">
                                {section.subsections.map(subsection => (
                                  <div key={`display-sub-${subsection.id}`} className="border-l-2 border-blue-200 pl-4">
                                    <h5 className="font-medium text-gray-800">{subsection.title}</h5>
                                    {subsection.description && (
                                      <p className="text-sm text-gray-600 mb-2">{subsection.description}</p>
                                    )}
                                    
                                    {subsection.links.map(link => (
                                      <div key={`display-link-${link.id}`} className="mb-2">
                                        <a
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800 underline flex items-center text-sm"
                                        >
                                          <ExternalLink className="w-3 h-3 mr-1" />
                                          {link.title}
                                        </a>
                                        {link.description && (
                                          <p className="text-xs text-gray-500 ml-4">{link.description}</p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Section */}
            {currentView === 'statistics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200">
                    <div className="flex flex-wrap space-x-0 sm:space-x-8 px-4 sm:px-6 py-4">
                      <button
                        onClick={() => setStatisticsTab('pvz')}
                        className={`pb-2 border-b-2 font-medium text-sm transition-colors mb-2 sm:mb-0 ${
                          statisticsTab === 'pvz'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Package2 className="inline-block w-4 h-4 mr-2" />
                        Статистика ПВЗ
                      </button>
                      <button
                        onClick={() => setStatisticsTab('customers')}
                        className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                          statisticsTab === 'customers'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Users className="inline-block w-4 h-4 mr-2" />
                        Статистика покупателей
                      </button>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    {statisticsTab === 'pvz' && (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Статистика по ПВЗ</h3>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setPvzTimePeriod('all')}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                pvzTimePeriod === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              За все время
                            </button>
                            <button
                              onClick={() => setPvzTimePeriod('week')}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                pvzTimePeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              За неделю
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {getPvzStatisticsDetailed(pvzTimePeriod).map(pvzStat => (
                            <div key={pvzStat.id} className="border border-gray-200 rounded-xl bg-gray-50">
                              <div 
                                className="p-4 md:p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => setExpandedPvz(expandedPvz === pvzStat.id ? null : pvzStat.id)}
                              >
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h4 className="text-lg font-semibold text-gray-900">{pvzStat.ipName}</h4>
                                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                        ПВЗ
                                      </span>
                                    </div>
                                    <div className="text-gray-600 mb-3">{pvzStat.address}</div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-blue-600">{pvzStat.totalItems}</div>
                                        <div className="text-sm text-gray-600">Товаров</div>
                                      </div>
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-green-600">{pvzStat.orders.length}</div>
                                        <div className="text-sm text-gray-600">Заказов</div>
                                      </div>
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-purple-600">
                                          {Object.keys(pvzStat.productBreakdown).length}
                                        </div>
                                        <div className="text-sm text-gray-600">Позиций</div>
                                      </div>
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-orange-600">
                                          {pvzStat.orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()} ₽
                                        </div>
                                        <div className="text-sm text-gray-600">Сумма</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <ChevronRight className={`w-5 h-5 transition-transform ${
                                      expandedPvz === pvzStat.id ? 'rotate-90' : ''
                                    }`} />
                                  </div>
                                </div>
                              </div>

                              {expandedPvz === pvzStat.id && (
                                <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
                                  <h5 className="font-semibold text-gray-800 mb-4">Детализация по товарам:</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {Object.entries(pvzStat.productBreakdown).map(([product, stats]) => (
                                      <div key={product} className="bg-gray-50 p-4 rounded-lg border">
                                        <div className="font-medium text-gray-900 mb-2">{product}</div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                          <div>Количество: <span className="font-medium">{stats.quantity}</span></div>
                                          <div>Сумма: <span className="font-medium">{stats.amount.toLocaleString()} ₽</span></div>
                                          <div>Память: <span className="font-medium">{stats.memory}</span></div>
                                          <div>Цвет: <span className="font-medium">{stats.color}</span></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          {getPvzStatisticsDetailed(pvzTimePeriod).length === 0 && (
                            <div className="text-center py-12">
                              <Package2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 text-lg">Нет данных для выбранного периода</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {statisticsTab === 'customers' && (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Статистика по покупателям</h3>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setCustomerTimePeriod('all')}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                customerTimePeriod === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              За все время
                            </button>
                            <button
                              onClick={() => setCustomerTimePeriod('month')}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                customerTimePeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              За месяц
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {getCustomerStatistics(customerTimePeriod).map((customerStat, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl bg-gray-50">
                              <div 
                                className="p-4 md:p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => setExpandedCustomer(expandedCustomer === customerStat.name ? null : customerStat.name)}
                              >
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                      <h4 className="text-lg font-semibold text-gray-900">{customerStat.name}</h4>
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Покупатель
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-blue-600">{customerStat.totalItems}</div>
                                        <div className="text-sm text-gray-600">Товаров</div>
                                      </div>
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-green-600">{customerStat.orders.length}</div>
                                        <div className="text-sm text-gray-600">Заказов</div>
                                      </div>
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-purple-600">
                                          {Object.keys(customerStat.pvzBreakdown).length}
                                        </div>
                                        <div className="text-sm text-gray-600">ПВЗ</div>
                                      </div>
                                      <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-2xl font-bold text-orange-600">
                                          {customerStat.totalAmount.toLocaleString()} ₽
                                        </div>
                                        <div className="text-sm text-gray-600">Сумма</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <ChevronRight className={`w-5 h-5 transition-transform ${
                                      expandedCustomer === customerStat.name ? 'rotate-90' : ''
                                    }`} />
                                  </div>
                                </div>
                              </div>

                              {expandedCustomer === customerStat.name && (
                                <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
                                  <h5 className="font-semibold text-gray-800 mb-4">Распределение по ПВЗ:</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {Object.entries(customerStat.pvzBreakdown).map(([pvz, stats]) => (
                                      <div key={pvz} className="bg-gray-50 p-4 rounded-lg border">
                                        <div className="font-medium text-gray-900 mb-2">{pvz}</div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                          <div>Товаров: <span className="font-medium">{stats.quantity}</span></div>
                                          <div>Заказов: <span className="font-medium">{stats.orders}</span></div>
                                          <div>Сумма: <span className="font-medium">{stats.amount.toLocaleString()} ₽</span></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          {getCustomerStatistics(customerTimePeriod).length === 0 && (
                            <div className="text-center py-12">
                              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 text-lg">Нет данных для выбранного периода</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Main Working Area */}
            {currentView === 'main' && (
              <div className="space-y-6">
                {/* Add Order Form */}
                {showOrderForm && (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 md:px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Добавить новый заказ</h2>
                          <p className="text-sm text-gray-600 mt-1">Заполните информацию о заказе</p>
                        </div>
                        <button
                          onClick={() => setShowOrderForm(false)}
                          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">ПВЗ *</label>
                          <select
                            value={newOrder.pvzId}
                            onChange={(e) => setNewOrder({...newOrder, pvzId: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            <option value="">Выберите ПВЗ</option>
                            {pvzList.map(pvz => {
                              const ip = ipList.find(i => i.id === pvz.ipId);
                              return (
                                <option key={pvz.id} value={pvz.id}>
                                  {ip?.name} - {pvz.address || `ПВЗ #${pvz.id}`}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Номер заказа *</label>
                          <input
                            type="text"
                            value={newOrder.orderNumber}
                            onChange={(e) => setNewOrder({...newOrder, orderNumber: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Введите номер заказа"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Покупатель</label>
                          <input
                            type="text"
                            value={newOrder.customer}
                            onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Имя покупателя"
                          />
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Магазин</label>
                          <input
                            type="text"
                            value={newOrder.store}
                            onChange={(e) => setNewOrder({...newOrder, store: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Название магазина"
                            list="stores-list"
                          />
                          <datalist id="stores-list">
                            {storesDatabase.map(store => (
                              <option key={store.id} value={store.name} />
                            ))}
                          </datalist>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Дата покупки</label>
                          <input
                            type="date"
                            value={newOrder.purchaseDate}
                            onChange={(e) => setNewOrder({...newOrder, purchaseDate: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Ожидаемая доставка</label>
                          <input
                            type="date"
                            value={newOrder.expectedDeliveryDate}
                            onChange={(e) => setNewOrder({...newOrder, expectedDeliveryDate: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Бренд</label>
                          <input
                            type="text"
                            value={newOrder.brand}
                            onChange={(e) => setNewOrder({...newOrder, brand: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Бренд (Apple)"
                            list="brands-list"
                          />
                          <datalist id="brands-list">
                            {[...new Set(modelsDatabase.map(m => m.brand).filter(Boolean))].map(brand => (
                              <option key={brand} value={brand} />
                            ))}
                          </datalist>
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Модель</label>
                          <input
                            type="text"
                            value={newOrder.model}
                            onChange={(e) => setNewOrder({...newOrder, model: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Модель (iPhone)"
                            list="models-list"
                          />
                          <datalist id="models-list">
                            {[...new Set(modelsDatabase.filter(m => !newOrder.brand || m.brand === newOrder.brand).map(m => m.model).filter(Boolean))].map(model => (
                              <option key={model} value={model} />
                            ))}
                          </datalist>
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Линейка</label>
                          <input
                            type="text"
                            value={newOrder.productLine}
                            onChange={(e) => setNewOrder({...newOrder, productLine: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Линейка (16 Pro / 16 Pro Max)"
                            list="productlines-list"
                          />
                          <datalist id="productlines-list">
                            {[...new Set(modelsDatabase.filter(m => 
                              (!newOrder.brand || m.brand === newOrder.brand) && 
                              (!newOrder.model || m.model === newOrder.model)
                            ).map(m => m.productLine).filter(Boolean))].map(line => (
                              <option key={line} value={line} />
                            ))}
                          </datalist>
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Объем памяти</label>
                          <input
                            type="text"
                            value={newOrder.memory}
                            onChange={(e) => setNewOrder({...newOrder, memory: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Объем памяти"
                            list="memory-list"
                          />
                          <datalist id="memory-list">
                            {[...new Set(modelsDatabase.map(m => m.memory).filter(Boolean))].map(memory => (
                              <option key={memory} value={memory} />
                            ))}
                          </datalist>
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Цвет</label>
                          <input
                            type="text"
                            value={newOrder.color}
                            onChange={(e) => setNewOrder({...newOrder, color: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Цвет"
                            list="color-list"
                          />
                          <datalist id="color-list">
                            {[...new Set(modelsDatabase.map(m => m.color).filter(Boolean))].map(color => (
                              <option key={color} value={color} />
                            ))}
                          </datalist>
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Количество</label>
                          <input
                            type="number"
                            value={newOrder.quantity}
                            onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value)})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Количество"
                            min="1"
                          />
                        </div>
                      
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Сумма</label>
                          <input
                            type="number"
                            value={newOrder.amount}
                            onChange={(e) => setNewOrder({...newOrder, amount: parseFloat(e.target.value)})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Сумма"
                            step="0.01"
                          />
                        </div>
                        
                        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 pt-4">
                          <button
                            onClick={handleAddOrder}
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                          >
                            <Plus className="w-4 h-4 mr-2 inline" />
                            Добавить заказ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 md:px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Поиск по заказам, клиентам, товарам..."
                            className="pl-10 pr-4 py-3 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm"
                          />
                        </div>
                        
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm appearance-none"
                          >
                            <option value="all">Все статусы</option>
                            <option value="pending">Ожидают доставки</option>
                            <option value="delivered">Доставлены</option>
                            <option value="ready">Готовы к выдаче</option>
                            <option value="inquiry">С запросами</option>
                            <option value="claim">С претензиями</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm border">
                          <span className="font-medium">Найдено:</span> {getAllOrders().length} заказов
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendar Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">Календарь поставок</h2>
                    <div className="flex items-center justify-center sm:justify-end space-x-4">
                      <button
                        onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-lg font-medium min-w-48 text-center">
                        {selectedDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
                      <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(selectedDate).map((day, index) => {
                      const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
                      const isToday = day.toDateString() === new Date().toDateString();
                      const dayOrders = getOrdersForDate(day);
                      
                      return (
                        <div
                          key={index}
                          className={`min-h-24 p-1 border rounded-lg transition-colors ${
                            isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                          } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                        >
                          <div className={`text-sm font-medium mb-1 ${
                            isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {day.getDate()}
                          </div>
                          
                          {dayOrders.map(order => (
                            <div
                              key={`${order.pvzId}-${order.id}`}
                              onClick={() => setSelectedOrder(order)}
                              className="text-xs p-1 mb-1 bg-blue-100 hover:bg-blue-200 rounded cursor-pointer truncate transition-colors"
                              title={`${order.pvzAddress} - ${order.orderNumber}`}
                            >
                              <div className="font-medium">{order.pvzAddress}</div>
                              <div className="text-blue-600">#{order.orderNumber}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Список заказов</h2>
                  
                  <div className="space-y-3">
                    {getAllOrders().map(order => {
                      const storeStatus = getStoreStatus(order.store);
                      return (
                        <div
                          key={`${order.pvzId}-${order.id}`}
                          className={`p-4 border rounded-xl shadow-sm transition-all hover:shadow-md ${getOrderColor(order)}`}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900">#{order.orderNumber}</div>
                                <div className="text-sm text-gray-600">{order.customer}</div>
                                <div className="flex flex-wrap gap-1">
                                  {order.hasInquiry && (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                      Запрос
                                    </span>
                                  )}
                                  {order.hasClaim && (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                      Претензия
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-xs text-gray-500 uppercase tracking-wide">ИП / ПВЗ</div>
                                <div className="text-sm font-medium">{order.ipName}</div>
                                <div className="text-sm text-gray-600">{order.pvzAddress}</div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Магазин</div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium">{order.store}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs border ${storeStatus.color}`}>
                                    {storeStatus.status === 'good' ? '✓' : storeStatus.status === 'bad' ? '✗' : '?'}
                                  </span>
                                </div>
                                {storeStatus.store?.deliveryNotes && (
                                  <div className="text-xs text-orange-600 bg-orange-50 p-1 rounded">
                                    📝 {storeStatus.store.deliveryNotes}
                                  </div>
                                )}
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Товар</div>
                                <div className="text-sm font-medium">{order.brand} {order.model}</div>
                                <div className="text-xs text-gray-600">{order.productLine} {order.memory} {order.color}</div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Даты</div>
                                <div className="text-sm">Ожидается: {order.expectedDeliveryDate}</div>
                                {order.actualDeliveryDate && (
                                  <div className="text-sm text-green-600">Доставлен: {order.actualDeliveryDate}</div>
                                )}
                                {order.cellNumber && (
                                  <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    Ячейка: {order.cellNumber}
                                  </div>
                                )}
                              </div>
                              
                              <div className="space-y-2">
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Управление</div>
                                <div className="space-y-2">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={order.deliveryStatus}
                                      onChange={(e) => updateOrder(order.pvzId, order.id, 'deliveryStatus', e.target.checked)}
                                      className="rounded"
                                    />
                                    <span className="text-sm">Доставлен</span>
                                  </label>
                                  
                                  {order.deliveryStatus && (
                                    <select
                                      value={order.overallStatus}
                                      onChange={(e) => updateOrder(order.pvzId, order.id, 'overallStatus', e.target.value)}
                                      className="text-xs p-2 border border-gray-300 rounded w-full"
                                    >
                                      <option value="Поступил на пункт">Поступил на пункт</option>
                                      <option value="Готов">Готов</option>
                                      <option value="Выдан">Выдан</option>
                                      <option value="Возврат Ян">Возврат Ян</option>
                                    </select>
                                  )}
                                  
                                  <div className="flex space-x-1">
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={order.hasInquiry || false}
                                        onChange={(e) => updateOrder(order.pvzId, order.id, 'hasInquiry', e.target.checked)}
                                        className="mr-1 rounded"
                                      />
                                      <span className="text-xs">Запрос</span>
                                    </label>
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={order.hasClaim || false}
                                        onChange={(e) => updateOrder(order.pvzId, order.id, 'hasClaim', e.target.checked)}
                                        className="mr-1 rounded"
                                      />
                                      <span className="text-xs">Претензия</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-blue-700 transition-colors flex items-center"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Детали
                              </button>
                              
                              {order.overallStatus === 'Готов' && !order.isReturn && (
                                <button
                                  onClick={() => returnOrder(order.pvzId, order.id)}
                                  className="bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-yellow-700 transition-colors"
                                >
                                  Возврат
                                </button>
                              )}
                              
                              <button
                                onClick={() => deleteOrder(order.pvzId, order.id)}
                                className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-red-700 transition-colors flex items-center"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Удалить
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {getAllOrders().length === 0 && (
                      <div className="text-center py-12">
                        <Package2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Заказы не найдены</p>
                        <p className="text-gray-400 text-sm">Попробуйте изменить параметры поиска или добавьте новый заказ</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Editor Section */}
            {currentView === 'editor' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6 py-4">
                      <button
                        onClick={() => setEditorTab('ip')}
                        className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                          editorTab === 'ip'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Users className="inline-block w-4 h-4 mr-2" />
                        ИП и ПВЗ
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {editorTab === 'ip' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">Управление ИП и ПВЗ</h3>
                          <button
                            onClick={addIp}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить ИП
                          </button>
                        </div>

                        <div className="space-y-6">
                          {ipList.map(ip => (
                            <div key={ip.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                              <div className="flex gap-4 items-start">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={ip.name}
                                    onChange={(e) => updateIp(ip.id, 'name', e.target.value)}
                                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Наименование ИП"
                                  />
                                  <input
                                    type="text"
                                    value={ip.phone}
                                    onChange={(e) => updateIp(ip.id, 'phone', e.target.value)}
                                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Телефон"
                                  />
                                </div>
                                <button
                                  onClick={() => deleteIp(ip.id)}
                                  className="bg-red-600 text-white px-3 py-3 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="mt-6">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium text-gray-700">ПВЗ этого ИП</h4>
                                  <button
                                    onClick={() => addPvz(ip.id)}
                                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Добавить ПВЗ
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  {pvzList.filter(pvz => pvz.ipId === ip.id).map(pvz => (
                                    <div key={pvz.id} className="flex gap-3 items-center">
                                      <input
                                        type="text"
                                        value={pvz.address}
                                        onChange={(e) => updatePvz(pvz.id, 'address', e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Адрес ПВЗ"
                                      />
                                      <button
                                        onClick={() => deletePvz(pvz.id)}
                                        className="bg-red-600 text-white px-3 py-3 rounded-lg hover:bg-red-700 transition-colors"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Database Section */}
            {currentView === 'database' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200">
                    <div className="flex flex-wrap space-x-0 sm:space-x-8 px-4 sm:px-6 py-4">
                      <button
                        onClick={() => setDatabaseTab('stores')}
                        className={`pb-2 border-b-2 font-medium text-sm transition-colors mb-2 sm:mb-0 ${
                          databaseTab === 'stores'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Store className="inline-block w-4 h-4 mr-2" />
                        Магазины ({storesDatabase.length})
                      </button>
                      <button
                        onClick={() => setDatabaseTab('models')}
                        className={`pb-2 border-b-2 font-medium text-sm transition-colors mb-2 sm:mb-0 ${
                          databaseTab === 'models'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Package2 className="inline-block w-4 h-4 mr-2" />
                        Модели ({modelsDatabase.length})
                      </button>
                      <button
                        onClick={() => setDatabaseTab('orders')}
                        className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                          databaseTab === 'orders'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <History className="inline-block w-4 h-4 mr-2" />
                        История ({orderHistory.length})
                      </button>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    {databaseTab === 'stores' && (
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                          <h3 className="text-lg font-semibold text-gray-900">База данных магазинов</h3>
                          <button
                            onClick={addStoreToDatabase}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить магазин
                          </button>
                        </div>
                        
                        {/* Store Statistics */}
                        <div className="mb-6 p-4 md:p-6 bg-blue-50 rounded-xl border border-blue-100">
                          <h4 className="font-semibold text-blue-900 mb-4">Статистика покупок по магазинам</h4>
                          <div className="space-y-4">
                            {Object.entries(getStoreStatistics()).map(([storeName, stats]) => (
                              <div key={storeName} className="bg-white p-4 md:p-6 rounded-lg border border-blue-200">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <div className="font-medium text-gray-900 text-lg">{storeName}</div>
                                    <div className="text-sm text-gray-600">
                                      Всего товаров: <span className="font-medium">{stats.total}</span>
                                      {' | '}
                                      Сумма: <span className="font-medium">{stats.amount.toLocaleString()} ₽</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="border-t pt-4">
                                  <h5 className="font-medium text-gray-700 mb-3">Разбивка по ПВЗ:</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                    {Object.entries(stats.pvzBreakdown).map(([pvzName, pvzStats]) => (
                                      <div key={pvzName} className="bg-gray-50 p-3 rounded-lg text-sm">
                                        <div className="font-medium text-gray-800 mb-1">{pvzName}</div>
                                        <div className="text-gray-600">
                                          {pvzStats.total} шт. • {pvzStats.amount.toLocaleString()} ₽
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {storesDatabase.map(store => (
                            <div key={store.id} className="border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                  type="text"
                                  value={store.name}
                                  onChange={(e) => updateStoreInDatabase(store.id, 'name', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Название магазина"
                                />
                                <select
                                  value={store.type}
                                  onChange={(e) => updateStoreInDatabase(store.id, 'type', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="unknown">Неопределенный</option>
                                  <option value="good">Хороший</option>
                                  <option value="bad">Плохой</option>
                                </select>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <textarea
                                  value={store.notes}
                                  onChange={(e) => updateStoreInDatabase(store.id, 'notes', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Общие заметки о магазине"
                                  rows="3"
                                />
                                <textarea
                                  value={store.deliveryNotes}
                                  onChange={(e) => updateStoreInDatabase(store.id, 'deliveryNotes', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Нюансы доставки для этого магазина"
                                  rows="3"
                                />
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                  Создан: {new Date(store.createdAt).toLocaleDateString('ru-RU')}
                                </span>
                                <button
                                  onClick={() => deleteStoreFromDatabase(store.id)}
                                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          
                          {storesDatabase.length === 0 && (
                            <div className="text-center py-12">
                              <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 text-lg">База данных магазинов пуста</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {databaseTab === 'models' && (
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                          <h3 className="text-lg font-semibold text-gray-900">База данных моделей</h3>
                          <button
                            onClick={addModelToDatabase}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить модель
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {modelsDatabase.map(model => (
                            <div key={model.id} className="border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                <input
                                  type="text"
                                  value={model.brand}
                                  onChange={(e) => updateModelInDatabase(model.id, 'brand', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Бренд"
                                />
                                <input
                                  type="text"
                                  value={model.model}
                                  onChange={(e) => updateModelInDatabase(model.id, 'model', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Модель"
                                />
                                <input
                                  type="text"
                                  value={model.productLine || ''}
                                  onChange={(e) => updateModelInDatabase(model.id, 'productLine', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Линейка"
                                />
                                <input
                                  type="text"
                                  value={model.memory}
                                  onChange={(e) => updateModelInDatabase(model.id, 'memory', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Память"
                                />
                                <input
                                  type="text"
                                  value={model.color}
                                  onChange={(e) => updateModelInDatabase(model.id, 'color', e.target.value)}
                                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Цвет"
                                />
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                  Создан: {new Date(model.createdAt).toLocaleDateString('ru-RU')}
                                </span>
                                <button
                                  onClick={() => deleteModelFromDatabase(model.id)}
                                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          
                          {modelsDatabase.length === 0 && (
                            <div className="text-center py-12">
                              <Package2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 text-lg">База данных моделей пуста</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {databaseTab === 'orders' && (
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                          <h3 className="text-lg font-semibold text-gray-900">История заказов</h3>
                          <button
                            onClick={exportOrderHistory}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Выгрузить CSV
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {orderHistory.map((order, index) => (
                            <div key={index} className={`border rounded-xl p-4 md:p-6 ${
                              order.overallStatus === 'Возврат Ян' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                            }`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Заказ</div>
                                  <div className="font-medium">#{order.orderNumber}</div>
                                  <div className="text-sm text-gray-600">{order.customer}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">ПВЗ</div>
                                  <div className="text-sm">{order.pvzAddress}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Товар</div>
                                  <div className="text-sm font-medium">{order.brand} {order.model} {order.productLine}</div>
                                  <div className="text-xs text-gray-600">{order.memory} {order.color}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Статус</div>
                                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    order.overallStatus === 'Выдан' ? 'bg-green-100 text-green-800' :
                                    order.overallStatus === 'Возврат Ян' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {order.overallStatus}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Даты</div>
                                  <div className="text-sm space-y-1">
                                    <div>Покупка: {order.purchaseDate}</div>
                                    <div>Доставка: {order.actualDeliveryDate}</div>
                                    <div>В архиве: {order.movedToHistoryDate}</div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Детали</div>
                                  <div className="text-sm space-y-1">
                                    <div>Ячейка: {order.cellNumber}</div>
                                    <div>Количество: {order.quantity}</div>
                                    <div>Сумма: {order.amount} ₽</div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Управление отметками</div>
                                  <div className="space-y-2">
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={order.hasInquiry || false}
                                        onChange={(e) => {
                                          const updatedHistory = orderHistory.map((historyOrder, i) => 
                                            i === index ? { ...historyOrder, hasInquiry: e.target.checked } : historyOrder
                                          );
                                          setOrderHistory(updatedHistory);
                                        }}
                                        className="mr-2 rounded"
                                      />
                                      <span className="text-xs">Запрос</span>
                                    </label>
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={order.hasClaim || false}
                                        onChange={(e) => {
                                          const updatedHistory = orderHistory.map((historyOrder, i) => 
                                            i === index ? { ...historyOrder, hasClaim: e.target.checked } : historyOrder
                                          );
                                          setOrderHistory(updatedHistory);
                                        }}
                                        className="mr-2 rounded"
                                      />
                                      <span className="text-xs">Претензия</span>
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Отметки</div>
                                  <div className="flex flex-wrap gap-2">
                                    {order.hasInquiry && (
                                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Запрос
                                      </span>
                                    )}
                                    {order.hasClaim && (
                                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Претензия
                                      </span>
                                    )}
                                    {order.isReturn && (
                                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Возврат
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {orderHistory.length === 0 && (
                            <div className="text-center py-12">
                              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 text-lg">История заказов пуста</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reports Section */}
            {currentView === 'reports' && (
              <div className="space-y-6">
                {/* PVZ Statistics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Статистика по ПВЗ</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { id: 'week', label: 'Неделя' },
                      { id: '2weeks', label: '2 недели' },
                      { id: 'month', label: 'Месяц' },
                      { id: 'all', label: 'Все время' }
                    ].map(period => (
                      <button
                        key={period.id}
                        onClick={() => setStatsPeriod(period.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          statsPeriod === period.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ИП / ПВЗ</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Всего заказов</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Доставлено</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Возвраты</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Запросы</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Претензии</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getPvzStatistics(statsPeriod).map((stat, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{stat.ipName}</div>
                              <div className="text-sm text-gray-500">{stat.pvzAddress}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stat.totalOrders}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stat.deliveredOrders}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stat.returns}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stat.inquiries}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stat.claims}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stat.totalAmount.toLocaleString()} ₽</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Export Cards */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Отчеты и выгрузки</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                    {[
                      { 
                        icon: Store, 
                        title: 'База магазинов', 
                        count: `${storesDatabase.length} записей`, 
                        color: 'blue',
                        action: exportStores
                      },
                      { 
                        icon: Package2, 
                        title: 'База моделей', 
                        count: `${modelsDatabase.length} записей`, 
                        color: 'green',
                        action: exportModels
                      },
                      { 
                        icon: Package2, 
                        title: 'Активные заказы', 
                        count: `${getAllOrders().length} заказов`, 
                        color: 'yellow',
                        action: exportActiveOrders
                      },
                      { 
                        icon: Package2, 
                        title: 'Доставленные товары', 
                        count: `${getAllOrders().filter(o => o.deliveryStatus).length + orderHistory.length} товаров`, 
                        color: 'purple',
                        action: exportDeliveredOrders
                      },
                      { 
                        icon: History, 
                        title: 'История заказов', 
                        count: `${orderHistory.length} записей`, 
                        color: 'gray',
                        action: exportOrderHistory
                      }
                    ].map((item, index) => (
                      <div key={index} className={`bg-${item.color}-50 border border-${item.color}-200 rounded-xl p-4 md:p-6`}>
                        <div className="flex items-center mb-4">
                          <item.icon className={`w-8 h-8 text-${item.color}-600 mr-3`} />
                          <div>
                            <h3 className={`font-semibold text-${item.color}-900`}>{item.title}</h3>
                            <p className={`text-sm text-${item.color}-600`}>{item.count}</p>
                          </div>
                        </div>
                        <button
                          onClick={item.action}
                          className={`w-full bg-${item.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${item.color}-700 flex items-center justify-center transition-colors`}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Выгрузить CSV
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Overall Statistics */}
                  <div className="mt-8 p-4 md:p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Общая статистика</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                      {[
                        { value: ipList.length, label: 'ИП', color: 'blue' },
                        { value: pvzList.length, label: 'ПВЗ', color: 'green' },
                        { value: getAllOrders().length, label: 'Активных заказов', color: 'yellow' },
                        { value: orderHistory.length, label: 'В истории', color: 'gray' },
                        { value: getAllOrders().filter(o => o.hasInquiry).length + orderHistory.filter(o => o.hasInquiry).length, label: 'Запросов', color: 'blue' },
                        { value: getAllOrders().filter(o => o.hasClaim).length + orderHistory.filter(o => o.hasClaim).length, label: 'Претензий', color: 'red' }
                      ].map((stat, index) => (
                        <div key={index}>
                          <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Section */}
            {currentView === 'history' && (
              <div className="space-y-6">
                {/* History Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 md:px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={historySearchQuery}
                            onChange={(e) => setHistorySearchQuery(e.target.value)}
                            placeholder="Поиск в истории..."
                            className="pl-10 pr-4 py-3 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm"
                          />
                        </div>
                        
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <select
                            value={historyFilterStatus}
                            onChange={(e) => setHistoryFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm appearance-none"
                          >
                            <option value="all">Все статусы</option>
                            <option value="Выдан">Выдан</option>
                            <option value="Возврат Ян">Возврат Ян</option>
                            <option value="inquiry">С запросами</option>
                            <option value="claim">С претензиями</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm border">
                          <span className="font-medium">Записей:</span> {orderHistory.filter(order => {
                            const matchesSearch = !historySearchQuery || 
                              order.orderNumber.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                              order.customer.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                              order.pvzAddress.toLowerCase().includes(historySearchQuery.toLowerCase());
                            
                            const matchesStatus = historyFilterStatus === 'all' || 
                              order.overallStatus === historyFilterStatus ||
                              (historyFilterStatus === 'inquiry' && order.hasInquiry) ||
                              (historyFilterStatus === 'claim' && order.hasClaim);
                            
                            return matchesSearch && matchesStatus;
                          }).length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">История заказов</h2>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                      <div className="flex items-center text-yellow-800">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Претензии и запросы можно отмечать в течение 90 дней</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {orderHistory
                      .filter(order => {
                        const matchesSearch = !historySearchQuery || 
                          order.orderNumber.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                          order.pvzAddress.toLowerCase().includes(historySearchQuery.toLowerCase());
                        
                        const matchesStatus = historyFilterStatus === 'all' || 
                          order.overallStatus === historyFilterStatus ||
                          (historyFilterStatus === 'inquiry' && order.hasInquiry) ||
                          (historyFilterStatus === 'claim' && order.hasClaim);
                        
                        return matchesSearch && matchesStatus;
                      })
                      .map((order, index) => (
                      <div key={index} className={`p-4 border rounded-xl shadow-sm ${
                        order.overallStatus === 'Возврат Ян' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Номер заказа</div>
                            <div className="font-medium">#{order.orderNumber}</div>
                            <div className="text-sm text-gray-600">{order.customer}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">ПВЗ</div>
                            <div className="text-sm">{order.pvzAddress}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Дата поступления</div>
                            <div className="text-sm">{order.actualDeliveryDate || 'Не указана'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Дата статуса</div>
                            <div className="text-sm">{order.statusDate ? new Date(order.statusDate).toLocaleDateString('ru-RU') : 'Не указана'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Дата архива</div>
                            <div className="text-sm">{order.movedToHistoryDate}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ячейка</div>
                            <div className="text-sm">{order.cellNumber}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Статус</div>
                            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              order.overallStatus === 'Выдан' ? 'bg-green-100 text-green-800' :
                              order.overallStatus === 'Возврат Ян' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.overallStatus}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              <span className="flex items-center">
                                Отметки / Управление
                                <AlertTriangle className="w-3 h-3 ml-1 text-yellow-500" />
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-1 mb-2">
                                {order.hasInquiry && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Запрос
                                  </span>
                                )}
                                {order.hasClaim && (
                                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Претензия
                                  </span>
                                )}
                                {!order.hasInquiry && !order.hasClaim && (
                                  <span className="text-xs text-gray-400">Нет отметок</span>
                                )}
                              </div>
                              
                              <div className="bg-gray-50 p-2 rounded border space-y-1">
                                <label className="flex items-center text-xs cursor-pointer hover:bg-white rounded px-1 py-1 transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={order.hasInquiry || false}
                                    onChange={(e) => {
                                      const updatedHistory = orderHistory.map((historyOrder, i) => 
                                        i === index ? { ...historyOrder, hasInquiry: e.target.checked } : historyOrder
                                      );
                                      setOrderHistory(updatedHistory);
                                    }}
                                    className="mr-2 rounded text-blue-600 focus:ring-blue-500 focus:ring-1"
                                  />
                                  <span className="text-blue-700 font-medium">📞 Запрос</span>
                                </label>
                                <label className="flex items-center text-xs cursor-pointer hover:bg-white rounded px-1 py-1 transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={order.hasClaim || false}
                                    onChange={(e) => {
                                      const updatedHistory = orderHistory.map((historyOrder, i) => 
                                        i === index ? { ...historyOrder, hasClaim: e.target.checked } : historyOrder
                                      );
                                      setOrderHistory(updatedHistory);
                                    }}
                                    className="mr-2 rounded text-orange-600 focus:ring-orange-500 focus:ring-1"
                                  />
                                  <span className="text-orange-700 font-medium">⚠️ Претензия</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {orderHistory.filter(order => {
                      const matchesSearch = !historySearchQuery || 
                        order.orderNumber.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                        order.customer.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                        order.pvzAddress.toLowerCase().includes(historySearchQuery.toLowerCase());
                      
                      const matchesStatus = historyFilterStatus === 'all' || 
                        order.overallStatus === historyFilterStatus ||
                        (historyFilterStatus === 'inquiry' && order.hasInquiry) ||
                        (historyFilterStatus === 'claim' && order.hasClaim);
                      
                      return matchesSearch && matchesStatus;
                    }).length === 0 && (
                      <div className="text-center py-12">
                        <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">История заказов пуста</p>
                        <p className="text-gray-400 text-sm">Или не найдено результатов по вашему запросу</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Детали заказа #{selectedOrder.orderNumber}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 text-lg border-b pb-2">Информация о заказе</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ПВЗ:</span>
                      <span className="font-medium">{selectedOrder.pvzAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Покупатель:</span>
                      <span className="font-medium">{selectedOrder.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Магазин:</span>
                      <span className="font-medium">{selectedOrder.store}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Дата покупки:</span>
                      <span className="font-medium">{selectedOrder.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ожидаемая доставка:</span>
                      <span className="font-medium">{selectedOrder.expectedDeliveryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Номер ячейки:</span>
                      <span className="font-medium">{selectedOrder.cellNumber || 'Не указан'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 text-lg border-b pb-2">Информация о товаре</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Бренд:</span>
                      <span className="font-medium">{selectedOrder.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Модель:</span>
                      <span className="font-medium">{selectedOrder.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Линейка:</span>
                      <span className="font-medium">{selectedOrder.productLine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Объем памяти:</span>
                      <span className="font-medium">{selectedOrder.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Цвет:</span>
                      <span className="font-medium">{selectedOrder.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Количество:</span>
                      <span className="font-medium">{selectedOrder.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Сумма:</span>
                      <span className="font-medium">{selectedOrder.amount} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedOrder.deliveryStatus 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.deliveryStatus ? 'Доставлен' : 'Ожидает доставки'}
                    </span>
                    
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {selectedOrder.overallStatus}
                    </span>
                    
                    {selectedOrder.hasInquiry && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Запрос
                      </span>
                    )}
                    
                    {selectedOrder.hasClaim && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Претензия
                      </span>
                    )}
                    
                    {selectedOrder.isReturn && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Возврат
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementSystem;