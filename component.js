// <stdin>
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
import { Download, Plus, Trash2, Settings, Calendar, ChevronLeft, ChevronRight, X, AlertTriangle, Package2, History, Users, Store, Database, FileText, Menu, Bell, Search, Filter, Eye, Edit3, MoreVertical, Link, BookOpen, ExternalLink } from "https://esm.sh/lucide-react?deps=react@18.2.0,react-dom@18.2.0";
var { useStoredState } = hatch;
var OrderManagementSystem = () => {
  const [ipList, setIpList] = useStoredState("ipList", []);
  const [pvzList, setPvzList] = useStoredState("pvzList", []);
  const [storesDatabase, setStoresDatabase] = useStoredState("storesDatabase", []);
  const [modelsDatabase, setModelsDatabase] = useStoredState("modelsDatabase", []);
  const [orders, setOrders] = useStoredState("orders", {});
  const [orderHistory, setOrderHistory] = useStoredState("orderHistory", []);
  const [currentView, setCurrentView] = useState("main");
  const [selectedDate, setSelectedDate] = useState(/* @__PURE__ */ new Date());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editorTab, setEditorTab] = useState("ip");
  const [databaseTab, setDatabaseTab] = useState("stores");
  const [statsPeriod, setStatsPeriod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statisticsTab, setStatisticsTab] = useState("pvz");
  const [expandedPvz, setExpandedPvz] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [pvzTimePeriod, setPvzTimePeriod] = useState("all");
  const [customerTimePeriod, setCustomerTimePeriod] = useState("all");
  const [historySearchQuery, setHistorySearchQuery] = useState("");
  const [historyFilterStatus, setHistoryFilterStatus] = useState("all");
  const [toolsData, setToolsData] = useStoredState("toolsData", []);
  const [newOrder, setNewOrder] = useState({
    pvzId: "",
    orderNumber: "",
    customer: "",
    store: "",
    purchaseDate: "",
    expectedDeliveryDate: "",
    brand: "",
    model: "",
    productLine: "",
    memory: "",
    color: "",
    quantity: 1,
    amount: 0
  });
  useEffect(() => {
    const initializeDatabase = () => {
      const iPhoneModels = [
        // iPhone 16 Pro 512GB
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "512GB", color: "\u041D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "512GB", color: "\u0427\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "512GB", color: "\u0411\u0435\u043B\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "512GB", color: "\u041F\u0435\u0441\u043E\u0447\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        // iPhone 16 Pro 1TB
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "1TB", color: "\u041D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "1TB", color: "\u0427\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "1TB", color: "\u0411\u0435\u043B\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro", memory: "1TB", color: "\u041F\u0435\u0441\u043E\u0447\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        // iPhone 16 Pro Max 512GB
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "512GB", color: "\u041D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "512GB", color: "\u0427\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "512GB", color: "\u0411\u0435\u043B\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "512GB", color: "\u041F\u0435\u0441\u043E\u0447\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        // iPhone 16 Pro Max 1TB
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "1TB", color: "\u041D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "1TB", color: "\u0427\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "1TB", color: "\u0411\u0435\u043B\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" },
        { brand: "Apple", model: "iPhone", productLine: "16 Pro Max", memory: "1TB", color: "\u041F\u0435\u0441\u043E\u0447\u043D\u044B\u0439 \u0442\u0438\u0442\u0430\u043D" }
      ];
      if (modelsDatabase.length === 0) {
        const modelsWithIds = iPhoneModels.map((model, index) => ({
          id: Date.now() + index,
          ...model,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
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
      const now = /* @__PURE__ */ new Date();
      let hasChanges = false;
      const newOrders = { ...orders };
      const newHistory = [...orderHistory];
      Object.keys(newOrders).forEach((pvzId) => {
        newOrders[pvzId] = newOrders[pvzId].filter((order) => {
          if (order.deliveryStatus && order.actualDeliveryDate) {
            const deliveryDate = new Date(order.actualDeliveryDate);
            const daysDiff = Math.floor((now - deliveryDate) / (1e3 * 60 * 60 * 24));
            if (daysDiff >= 7) {
              newHistory.push({
                ...order,
                pvzAddress: pvzList.find((p) => p.id === parseInt(pvzId))?.address || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
                movedToHistoryDate: now.toISOString().split("T")[0]
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
    const interval = setInterval(moveOldOrdersToHistory, 24 * 60 * 60 * 1e3);
    return () => clearInterval(interval);
  }, [orders, orderHistory, pvzList]);
  const checkOrderAlerts = () => {
    const now = /* @__PURE__ */ new Date();
    let alertCount2 = 0;
    Object.values(orders).forEach((pvzOrders) => {
      pvzOrders.forEach((order) => {
        if (order.deliveryStatus && order.actualDeliveryDate && order.overallStatus !== "\u0413\u043E\u0442\u043E\u0432") {
          const deliveryDate = new Date(order.actualDeliveryDate);
          const daysDiff = Math.floor((now - deliveryDate) / (1e3 * 60 * 60 * 24));
          if (daysDiff >= 5) alertCount2++;
        }
      });
    });
    return alertCount2;
  };
  const getOrderColor = (order) => {
    if (order.overallStatus === "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D" && order.previousStatus !== "\u0413\u043E\u0442\u043E\u0432") {
      return "bg-red-50 border-red-200 shadow-red-100";
    }
    if (order.overallStatus === "\u0413\u043E\u0442\u043E\u0432") return "bg-white border-gray-200";
    if (!order.deliveryStatus || !order.actualDeliveryDate) return "bg-white border-gray-200";
    const now = /* @__PURE__ */ new Date();
    const deliveryDate = new Date(order.actualDeliveryDate);
    const daysDiff = Math.floor((now - deliveryDate) / (1e3 * 60 * 60 * 24));
    if (daysDiff >= 7) return "bg-red-100 border-red-400 shadow-red-200";
    if (daysDiff >= 6) return "bg-red-75 border-red-300 shadow-red-100";
    if (daysDiff >= 5) return "bg-red-50 border-red-200 shadow-red-100";
    if (daysDiff >= 4) return "bg-orange-50 border-orange-200 shadow-orange-100";
    if (daysDiff >= 3) return "bg-yellow-50 border-yellow-200 shadow-yellow-100";
    if (daysDiff >= 2) return "bg-yellow-25 border-yellow-100";
    return "bg-white border-gray-200";
  };
  const saveToStoresDatabase = (storeName) => {
    if (!storeName || storesDatabase.some((s) => s.name.toLowerCase() === storeName.toLowerCase())) return;
    const newStore = {
      id: Date.now(),
      name: storeName,
      type: "unknown",
      notes: "",
      deliveryNotes: "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setStoresDatabase([...storesDatabase, newStore]);
  };
  const saveToModelsDatabase = (brand, model, productLine, memory, color) => {
    if (!brand && !model && !productLine && !memory && !color) return;
    const modelKey = `${brand}-${model}-${productLine}-${memory}-${color}`.toLowerCase();
    if (modelsDatabase.some((m) => `${m.brand}-${m.model}-${m.productLine}-${m.memory}-${m.color}`.toLowerCase() === modelKey)) return;
    const newModel = {
      id: Date.now(),
      brand: brand || "",
      model: model || "",
      productLine: productLine || "",
      memory: memory || "",
      color: color || "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setModelsDatabase([...modelsDatabase, newModel]);
  };
  const addIp = () => {
    const newIp = {
      id: Date.now(),
      name: "",
      phone: "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setIpList([...ipList, newIp]);
  };
  const updateIp = (id, field, value) => {
    setIpList(ipList.map(
      (ip) => ip.id === id ? { ...ip, [field]: value } : ip
    ));
  };
  const deleteIp = (id) => {
    setIpList(ipList.filter((ip) => ip.id !== id));
    setPvzList(pvzList.filter((pvz) => pvz.ipId !== id));
  };
  const addPvz = (ipId) => {
    const newPvz = {
      id: Date.now(),
      ipId,
      address: "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setPvzList([...pvzList, newPvz]);
  };
  const updatePvz = (id, field, value) => {
    setPvzList(pvzList.map(
      (pvz) => pvz.id === id ? { ...pvz, [field]: value } : pvz
    ));
  };
  const deletePvz = (id) => {
    setPvzList(pvzList.filter((pvz) => pvz.id !== id));
    const newOrders = { ...orders };
    delete newOrders[id];
    setOrders(newOrders);
  };
  const addStoreToDatabase = () => {
    const newStore = {
      id: Date.now(),
      name: "",
      type: "unknown",
      notes: "",
      deliveryNotes: "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setStoresDatabase([...storesDatabase, newStore]);
  };
  const updateStoreInDatabase = (id, field, value) => {
    setStoresDatabase(storesDatabase.map(
      (store) => store.id === id ? { ...store, [field]: value } : store
    ));
  };
  const deleteStoreFromDatabase = (id) => {
    setStoresDatabase(storesDatabase.filter((store) => store.id !== id));
  };
  const addModelToDatabase = () => {
    const newModel = {
      id: Date.now(),
      brand: "",
      model: "",
      productLine: "",
      memory: "",
      color: "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setModelsDatabase([...modelsDatabase, newModel]);
  };
  const updateModelInDatabase = (id, field, value) => {
    setModelsDatabase(modelsDatabase.map(
      (model) => model.id === id ? { ...model, [field]: value } : model
    ));
  };
  const deleteModelFromDatabase = (id) => {
    setModelsDatabase(modelsDatabase.filter((model) => model.id !== id));
  };
  const handleAddOrder = () => {
    if (!newOrder.pvzId || !newOrder.orderNumber) {
      alert("\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F: \u041F\u0412\u0417 \u0438 \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430");
      return;
    }
    const order = {
      id: Date.now(),
      ...newOrder,
      deliveryStatus: false,
      cellNumber: "",
      isReturn: false,
      overallStatus: "\u0412 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435",
      actualDeliveryDate: "",
      statusDate: (/* @__PURE__ */ new Date()).toISOString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const pvzId = newOrder.pvzId;
    setOrders((prev) => ({
      ...prev,
      [pvzId]: [...prev[pvzId] || [], order]
    }));
    saveToStoresDatabase(newOrder.store);
    saveToModelsDatabase(newOrder.brand, newOrder.model, newOrder.productLine, newOrder.memory, newOrder.color);
    setNewOrder({
      pvzId: "",
      orderNumber: "",
      customer: "",
      store: "",
      purchaseDate: "",
      expectedDeliveryDate: "",
      brand: "",
      model: "",
      productLine: "",
      memory: "",
      color: "",
      quantity: 1,
      amount: 0
    });
    setShowOrderForm(false);
  };
  const updateOrder = (pvzId, orderId, field, value) => {
    setOrders((prev) => ({
      ...prev,
      [pvzId]: prev[pvzId].map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, [field]: value };
          if (field === "deliveryStatus" && value === true && !order.cellNumber) {
            const cellNumber = prompt("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u044F\u0447\u0435\u0439\u043A\u0438:");
            if (cellNumber) {
              updatedOrder.cellNumber = cellNumber;
              updatedOrder.actualDeliveryDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
              updatedOrder.overallStatus = "\u041F\u043E\u0441\u0442\u0443\u043F\u0438\u043B \u043D\u0430 \u043F\u0443\u043D\u043A\u0442";
              updatedOrder.statusDate = (/* @__PURE__ */ new Date()).toISOString();
            } else {
              updatedOrder.deliveryStatus = false;
              return order;
            }
          }
          if (field === "overallStatus") {
            updatedOrder.statusDate = (/* @__PURE__ */ new Date()).toISOString();
          }
          if (field === "overallStatus" && (value === "\u0412\u044B\u0434\u0430\u043D" || value === "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D")) {
            const historyOrder = {
              ...updatedOrder,
              pvzAddress: pvzList.find((p) => p.id === parseInt(pvzId))?.address || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
              movedToHistoryDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
            };
            setOrderHistory((prevHistory) => [...prevHistory, historyOrder]);
            setTimeout(() => {
              setOrders((prevOrders) => ({
                ...prevOrders,
                [pvzId]: prevOrders[pvzId].filter((o) => o.id !== orderId)
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
    setOrders((prev) => ({
      ...prev,
      [pvzId]: prev[pvzId].filter((order) => order.id !== orderId)
    }));
  };
  const returnOrder = (pvzId, orderId) => {
    const order = orders[pvzId]?.find((o) => o.id === orderId);
    if (order) {
      const historyOrder = {
        ...order,
        isReturn: true,
        previousStatus: order.overallStatus,
        overallStatus: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D",
        returnDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        statusDate: (/* @__PURE__ */ new Date()).toISOString(),
        pvzAddress: pvzList.find((p) => p.id === parseInt(pvzId))?.address || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
        movedToHistoryDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      setOrderHistory((prev) => [...prev, historyOrder]);
      setOrders((prev) => ({
        ...prev,
        [pvzId]: prev[pvzId].filter((o) => o.id !== orderId)
      }));
    }
  };
  const getAllOrders = () => {
    const allOrders = [];
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find((p) => p.id === parseInt(pvzId));
      const ip = ipList.find((i) => i.id === pvz?.ipId);
      pvzOrders.forEach((order) => {
        allOrders.push({
          ...order,
          pvzId: parseInt(pvzId),
          pvzAddress: pvz?.address || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
          ipName: ip?.name || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
        });
      });
    });
    let filteredOrders = allOrders;
    if (searchQuery) {
      filteredOrders = filteredOrders.filter(
        (order) => order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.store.toLowerCase().includes(searchQuery.toLowerCase()) || order.brand.toLowerCase().includes(searchQuery.toLowerCase()) || order.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus !== "all") {
      filteredOrders = filteredOrders.filter((order) => {
        switch (filterStatus) {
          case "pending":
            return !order.deliveryStatus;
          case "delivered":
            return order.deliveryStatus && order.overallStatus !== "\u0413\u043E\u0442\u043E\u0432";
          case "ready":
            return order.overallStatus === "\u0413\u043E\u0442\u043E\u0432";
          case "inquiry":
            return order.hasInquiry;
          case "claim":
            return order.hasClaim;
          default:
            return true;
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
    const dateStr = date.toISOString().split("T")[0];
    const dayOrders = [];
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find((p) => p.id === parseInt(pvzId));
      pvzOrders.forEach((order) => {
        if (order.expectedDeliveryDate === dateStr) {
          dayOrders.push({
            ...order,
            pvzId: parseInt(pvzId),
            pvzAddress: pvz?.address || `\u041F\u0412\u0417 #${pvzId}`,
            pvz
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
    const store = storesDatabase.find((s) => s.name.toLowerCase().includes(storeName.toLowerCase()));
    if (store) {
      if (store.type === "good") return { status: "good", color: "bg-green-100 text-green-800 border-green-200", store };
      if (store.type === "bad") return { status: "bad", color: "bg-red-100 text-red-800 border-red-200", store };
    }
    return { status: "unknown", color: "bg-gray-100 text-gray-800 border-gray-200", store: null };
  };
  const getStoreStatistics = () => {
    const storeStats = {};
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find((p) => p.id === parseInt(pvzId));
      const ip = ipList.find((i) => i.id === pvz?.ipId);
      pvzOrders.forEach((order) => {
        if (!storeStats[order.store]) {
          storeStats[order.store] = {
            total: 0,
            amount: 0,
            pvzBreakdown: {}
          };
        }
        const pvzKey = `${ip?.name || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"} - ${pvz?.address || `\u041F\u0412\u0417 #${pvzId}`}`;
        if (!storeStats[order.store].pvzBreakdown[pvzKey]) {
          storeStats[order.store].pvzBreakdown[pvzKey] = { total: 0, amount: 0 };
        }
        storeStats[order.store].total += order.quantity;
        storeStats[order.store].amount += order.amount;
        storeStats[order.store].pvzBreakdown[pvzKey].total += order.quantity;
        storeStats[order.store].pvzBreakdown[pvzKey].amount += order.amount;
      });
    });
    orderHistory.forEach((order) => {
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
  const getPvzStatistics = (period = "all") => {
    const now = /* @__PURE__ */ new Date();
    const pvzStats = {};
    const isInPeriod = (dateStr) => {
      if (period === "all") return true;
      const date = new Date(dateStr);
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      switch (period) {
        case "week":
          return diffDays <= 7;
        case "2weeks":
          return diffDays <= 14;
        case "month":
          return diffDays <= 30;
        default:
          return true;
      }
    };
    pvzList.forEach((pvz) => {
      const ip = ipList.find((i) => i.id === pvz.ipId);
      pvzStats[pvz.id] = {
        pvzAddress: pvz.address,
        ipName: ip?.name || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
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
      pvzOrders.forEach((order) => {
        if (isInPeriod(order.createdAt)) {
          pvzStats[pvzId].totalOrders += 1;
          pvzStats[pvzId].totalAmount += order.amount;
          if (order.deliveryStatus) pvzStats[pvzId].deliveredOrders += 1;
          if (order.hasInquiry) pvzStats[pvzId].inquiries += 1;
          if (order.hasClaim) pvzStats[pvzId].claims += 1;
        }
      });
    });
    orderHistory.forEach((order) => {
      const pvzId = pvzList.find((p) => p.address === order.pvzAddress)?.id;
      if (!pvzStats[pvzId] || !isInPeriod(order.createdAt)) return;
      pvzStats[pvzId].totalOrders += 1;
      pvzStats[pvzId].deliveredOrders += 1;
      pvzStats[pvzId].totalAmount += order.amount;
      if (order.overallStatus === "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D") pvzStats[pvzId].returns += 1;
      if (order.hasInquiry) pvzStats[pvzId].inquiries += 1;
      if (order.hasClaim) pvzStats[pvzId].claims += 1;
    });
    return Object.values(pvzStats).filter((stat) => stat.totalOrders > 0);
  };
  const exportToCSV = (data, filename) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportStores = () => {
    const data = storesDatabase.map((store) => ({
      "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435": store.name,
      "\u0422\u0438\u043F": store.type === "good" ? "\u0425\u043E\u0440\u043E\u0448\u0438\u0439" : store.type === "bad" ? "\u041F\u043B\u043E\u0445\u043E\u0439" : "\u041D\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439",
      "\u0417\u0430\u043C\u0435\u0442\u043A\u0438": store.notes,
      "\u041D\u044E\u0430\u043D\u0441\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438": store.deliveryNotes,
      "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F": new Date(store.createdAt).toLocaleDateString("ru-RU")
    }));
    exportToCSV(data, "stores_database.csv");
  };
  const exportModels = () => {
    const data = modelsDatabase.map((model) => ({
      "\u0411\u0440\u0435\u043D\u0434": model.brand,
      "\u041C\u043E\u0434\u0435\u043B\u044C": model.model,
      "\u041B\u0438\u043D\u0435\u0439\u043A\u0430": model.productLine || "",
      "\u041F\u0430\u043C\u044F\u0442\u044C": model.memory,
      "\u0426\u0432\u0435\u0442": model.color,
      "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F": new Date(model.createdAt).toLocaleDateString("ru-RU")
    }));
    exportToCSV(data, "models_database.csv");
  };
  const exportActiveOrders = () => {
    const data = getAllOrders().map((order) => ({
      "\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430": order.orderNumber,
      "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C": order.customer,
      "\u0418\u041F": order.ipName,
      "\u041F\u0412\u0417": order.pvzAddress,
      "\u041C\u0430\u0433\u0430\u0437\u0438\u043D": order.store,
      "\u0411\u0440\u0435\u043D\u0434": order.brand,
      "\u041C\u043E\u0434\u0435\u043B\u044C": order.model,
      "\u041B\u0438\u043D\u0435\u0439\u043A\u0430": order.productLine || "",
      "\u041F\u0430\u043C\u044F\u0442\u044C": order.memory,
      "\u0426\u0432\u0435\u0442": order.color,
      "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E": order.quantity,
      "\u0421\u0443\u043C\u043C\u0430": order.amount,
      "\u0414\u0430\u0442\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0438": order.purchaseDate,
      "\u041E\u0436\u0438\u0434\u0430\u0435\u043C\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430": order.expectedDeliveryDate,
      "\u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430": order.actualDeliveryDate,
      "\u042F\u0447\u0435\u0439\u043A\u0430": order.cellNumber,
      "\u0421\u0442\u0430\u0442\u0443\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438": order.deliveryStatus ? "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D" : "\u041E\u0436\u0438\u0434\u0430\u0435\u0442",
      "\u041E\u0431\u0449\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441": order.overallStatus,
      "\u0417\u0430\u043F\u0440\u043E\u0441": order.hasInquiry ? "\u0414\u0430" : "\u041D\u0435\u0442",
      "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F": order.hasClaim ? "\u0414\u0430" : "\u041D\u0435\u0442",
      "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F": new Date(order.createdAt).toLocaleDateString("ru-RU")
    }));
    exportToCSV(data, "active_orders.csv");
  };
  const exportOrderHistory = () => {
    const data = orderHistory.map((order) => ({
      "\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430": order.orderNumber,
      "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C": order.customer,
      "\u041F\u0412\u0417": order.pvzAddress,
      "\u041C\u0430\u0433\u0430\u0437\u0438\u043D": order.store,
      "\u0411\u0440\u0435\u043D\u0434": order.brand,
      "\u041C\u043E\u0434\u0435\u043B\u044C": order.model,
      "\u041B\u0438\u043D\u0435\u0439\u043A\u0430": order.productLine || "",
      "\u041F\u0430\u043C\u044F\u0442\u044C": order.memory,
      "\u0426\u0432\u0435\u0442": order.color,
      "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E": order.quantity,
      "\u0421\u0443\u043C\u043C\u0430": order.amount,
      "\u0414\u0430\u0442\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0438": order.purchaseDate,
      "\u0414\u0430\u0442\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438": order.actualDeliveryDate,
      "\u042F\u0447\u0435\u0439\u043A\u0430": order.cellNumber,
      "\u0421\u0442\u0430\u0442\u0443\u0441": order.overallStatus,
      "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441": order.previousStatus || "",
      "\u0417\u0430\u043F\u0440\u043E\u0441": order.hasInquiry ? "\u0414\u0430" : "\u041D\u0435\u0442",
      "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F": order.hasClaim ? "\u0414\u0430" : "\u041D\u0435\u0442",
      "\u0414\u0430\u0442\u0430 \u0430\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F": order.movedToHistoryDate
    }));
    exportToCSV(data, "order_history.csv");
  };
  const exportDeliveredOrders = () => {
    const deliveredActive = getAllOrders().filter((order) => order.deliveryStatus);
    const deliveredHistory = orderHistory.filter((order) => order.actualDeliveryDate);
    const allDelivered = [...deliveredActive, ...deliveredHistory];
    const data = allDelivered.map((order) => ({
      "\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430": order.orderNumber,
      "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C": order.customer,
      "\u041F\u0412\u0417": order.pvzAddress || order.pvzAddress,
      "\u041C\u0430\u0433\u0430\u0437\u0438\u043D": order.store,
      "\u0411\u0440\u0435\u043D\u0434": order.brand,
      "\u041C\u043E\u0434\u0435\u043B\u044C": order.model,
      "\u041B\u0438\u043D\u0435\u0439\u043A\u0430": order.productLine || "",
      "\u041F\u0430\u043C\u044F\u0442\u044C": order.memory,
      "\u0426\u0432\u0435\u0442": order.color,
      "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E": order.quantity,
      "\u0421\u0443\u043C\u043C\u0430": order.amount,
      "\u0414\u0430\u0442\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0438": order.purchaseDate,
      "\u0414\u0430\u0442\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438": order.actualDeliveryDate,
      "\u042F\u0447\u0435\u0439\u043A\u0430": order.cellNumber,
      "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441": order.overallStatus,
      "\u0417\u0430\u043F\u0440\u043E\u0441": order.hasInquiry ? "\u0414\u0430" : "\u041D\u0435\u0442",
      "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F": order.hasClaim ? "\u0414\u0430" : "\u041D\u0435\u0442",
      "\u0412 \u0438\u0441\u0442\u043E\u0440\u0438\u0438": orderHistory.some((h) => h.orderNumber === order.orderNumber) ? "\u0414\u0430" : "\u041D\u0435\u0442"
    }));
    exportToCSV(data, "delivered_orders.csv");
  };
  const alertCount = checkOrderAlerts();
  const getPvzStatisticsDetailed = (period = "all") => {
    const now = /* @__PURE__ */ new Date();
    const pvzStats = {};
    const isInPeriod = (dateStr) => {
      if (period === "all") return true;
      const date = new Date(dateStr);
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      switch (period) {
        case "week":
          return diffDays <= 7;
        case "month":
          return diffDays <= 30;
        default:
          return true;
      }
    };
    pvzList.forEach((pvz) => {
      const ip = ipList.find((i) => i.id === pvz.ipId);
      pvzStats[pvz.id] = {
        id: pvz.id,
        address: pvz.address,
        ipName: ip?.name || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
        totalItems: 0,
        orders: [],
        productBreakdown: {}
      };
    });
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      if (!pvzStats[pvzId]) return;
      pvzOrders.forEach((order) => {
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
    orderHistory.forEach((order) => {
      const pvzId = pvzList.find((p) => p.address === order.pvzAddress)?.id;
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
    return Object.values(pvzStats).filter((stat) => stat.totalItems > 0).sort((a, b) => b.totalItems - a.totalItems);
  };
  const getCustomerStatistics = (period = "all") => {
    const now = /* @__PURE__ */ new Date();
    const customerStats = {};
    const isInPeriod = (dateStr) => {
      if (period === "all") return true;
      const date = new Date(dateStr);
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return period === "month" ? diffDays <= 30 : true;
    };
    Object.entries(orders).forEach(([pvzId, pvzOrders]) => {
      const pvz = pvzList.find((p) => p.id === parseInt(pvzId));
      const ip = ipList.find((i) => i.id === pvz?.ipId);
      pvzOrders.forEach((order) => {
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
        const pvzKey = `${ip?.name || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"} - ${pvz?.address || `\u041F\u0412\u0417 #${pvzId}`}`;
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
    orderHistory.forEach((order) => {
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
  const addToolsSection = () => {
    const newSection = {
      id: Date.now(),
      title: "",
      description: "",
      subsections: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setToolsData([...toolsData, newSection]);
  };
  const updateToolsSection = (id, field, value) => {
    setToolsData(toolsData.map(
      (section) => section.id === id ? { ...section, [field]: value } : section
    ));
  };
  const deleteToolsSection = (id) => {
    setToolsData(toolsData.filter((section) => section.id !== id));
  };
  const addSubsection = (sectionId) => {
    const newSubsection = {
      id: Date.now(),
      title: "",
      description: "",
      links: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setToolsData(toolsData.map(
      (section) => section.id === sectionId ? { ...section, subsections: [...section.subsections, newSubsection] } : section
    ));
  };
  const updateSubsection = (sectionId, subsectionId, field, value) => {
    setToolsData(toolsData.map(
      (section) => section.id === sectionId ? {
        ...section,
        subsections: section.subsections.map(
          (sub) => sub.id === subsectionId ? { ...sub, [field]: value } : sub
        )
      } : section
    ));
  };
  const deleteSubsection = (sectionId, subsectionId) => {
    setToolsData(toolsData.map(
      (section) => section.id === sectionId ? {
        ...section,
        subsections: section.subsections.filter((sub) => sub.id !== subsectionId)
      } : section
    ));
  };
  const addLink = (sectionId, subsectionId) => {
    const newLink = {
      id: Date.now(),
      title: "",
      url: "",
      description: "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setToolsData(toolsData.map(
      (section) => section.id === sectionId ? {
        ...section,
        subsections: section.subsections.map(
          (sub) => sub.id === subsectionId ? { ...sub, links: [...sub.links, newLink] } : sub
        )
      } : section
    ));
  };
  const updateLink = (sectionId, subsectionId, linkId, field, value) => {
    setToolsData(toolsData.map(
      (section) => section.id === sectionId ? {
        ...section,
        subsections: section.subsections.map(
          (sub) => sub.id === subsectionId ? {
            ...sub,
            links: sub.links.map(
              (link) => link.id === linkId ? { ...link, [field]: value } : link
            )
          } : sub
        )
      } : section
    ));
  };
  const deleteLink = (sectionId, subsectionId, linkId) => {
    setToolsData(toolsData.map(
      (section) => section.id === sectionId ? {
        ...section,
        subsections: section.subsections.map(
          (sub) => sub.id === subsectionId ? { ...sub, links: sub.links.filter((link) => link.id !== linkId) } : sub
        )
      } : section
    ));
  };
  const navigationItems = [
    { id: "main", label: "\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0437\u043E\u043D\u0430", icon: Package2, count: getAllOrders().length },
    { id: "statistics", label: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430", icon: FileText },
    { id: "tools", label: "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B", icon: Settings },
    { id: "editor", label: "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440", icon: Edit3 },
    { id: "database", label: "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445", icon: Database },
    { id: "reports", label: "\u041E\u0442\u0447\u0435\u0442\u044B", icon: Download },
    { id: "history", label: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F", icon: History, count: orderHistory.length }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-50" }, /* @__PURE__ */ React.createElement("header", { className: "bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40" }, /* @__PURE__ */ React.createElement("div", { className: "px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center h-14 md:h-16" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center min-w-0" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors",
      onClick: () => setShowMobileMenu(!showMobileMenu)
    },
    /* @__PURE__ */ React.createElement(Menu, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement("div", { className: "ml-2 md:ml-0 min-w-0" }, /* @__PURE__ */ React.createElement("h1", { className: "text-lg md:text-xl lg:text-2xl font-bold text-gray-900 truncate" }, "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u0447\u0451\u0442\u0430 \u041F\u0412\u0417"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-1 sm:space-x-2 md:space-x-4" }, alertCount > 0 && /* @__PURE__ */ React.createElement("div", { className: "flex bg-red-100 border border-red-300 text-red-700 px-2 py-1 md:px-3 md:py-2 rounded-lg items-center text-xs md:text-sm" }, /* @__PURE__ */ React.createElement(Bell, { className: "w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "hidden lg:inline" }, "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! "), /* @__PURE__ */ React.createElement("span", { className: "truncate" }, alertCount, " \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043B\u0435\u0436\u0430\u0442 \u0431\u043E\u043B\u0435\u0435 5 \u0434\u043D\u0435\u0439")), currentView === "main" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowOrderForm(!showOrderForm),
      className: "bg-green-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-green-700 flex items-center text-xs md:text-sm transition-colors"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" }),
    /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline whitespace-nowrap" }, "\u041D\u043E\u0432\u044B\u0439 \u0437\u0430\u043A\u0430\u0437"),
    /* @__PURE__ */ React.createElement("span", { className: "sm:hidden" }, "\u0417\u0430\u043A\u0430\u0437")
  ))))), /* @__PURE__ */ React.createElement("div", { className: "flex" }, showMobileMenu && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-30 md:hidden" }, /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity", onClick: () => setShowMobileMenu(false) }), /* @__PURE__ */ React.createElement("div", { className: "fixed left-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b bg-gray-50" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-semibold text-gray-900" }, "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowMobileMenu(false),
      className: "p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
  ))), /* @__PURE__ */ React.createElement("nav", { className: "p-4 space-y-1 overflow-y-auto h-full pb-20" }, navigationItems.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      onClick: () => {
        setCurrentView(item.id);
        setShowMobileMenu(false);
      },
      className: `w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentView === item.id ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`
    },
    /* @__PURE__ */ React.createElement(item.icon, { className: "w-5 h-5 mr-3 flex-shrink-0" }),
    /* @__PURE__ */ React.createElement("span", { className: "flex-1 text-left" }, item.label),
    item.count !== void 0 && /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${currentView === item.id ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-700"}` }, item.count)
  ))))), /* @__PURE__ */ React.createElement("aside", { className: "hidden md:flex md:flex-shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-64 lg:w-72 bg-white border-r border-gray-200 shadow-sm" }, /* @__PURE__ */ React.createElement("nav", { className: "p-4 space-y-2" }, navigationItems.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      onClick: () => setCurrentView(item.id),
      className: `w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${currentView === item.id ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm transform scale-[1.02]" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"}`
    },
    /* @__PURE__ */ React.createElement(item.icon, { className: "w-5 h-5 mr-3 flex-shrink-0" }),
    /* @__PURE__ */ React.createElement("span", { className: "flex-1 text-left" }, item.label),
    item.count !== void 0 && /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded-full text-xs font-medium transition-colors ${currentView === item.id ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-700"}` }, item.count)
  ))))), /* @__PURE__ */ React.createElement("main", { className: "flex-1 min-w-0 bg-gray-50" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 sm:p-4 md:p-6 lg:p-8 max-w-full" }, currentView === "tools" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-purple-50 to-indigo-50 px-4 md:px-6 py-4 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg md:text-xl font-semibold text-gray-900" }, "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u0441\u0441\u044B\u043B\u043A\u0438"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mt-1" }, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u0430\u043C\u0438, \u0441\u0441\u044B\u043B\u043A\u0430\u043C\u0438 \u0438 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F\u043C\u0438")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: addToolsSection,
      className: "bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center transition-colors"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-2" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, toolsData.map((section) => /* @__PURE__ */ React.createElement("div", { key: section.id, className: "border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u0430"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: section.title,
      onChange: (e) => updateToolsSection(section.id, "title", e.target.value),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors",
      placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B FBY"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-end" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => deleteToolsSection(section.id),
      className: "bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4 mr-2" }),
    "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B"
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u0430"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: section.description,
      onChange: (e) => updateToolsSection(section.id, "description", e.target.value),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors",
      placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u0430 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
      rows: "2"
    }
  )))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-800" }, "\u041F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u044B \u0438 \u0441\u0441\u044B\u043B\u043A\u0438"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addSubsection(section.id),
      className: "bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-3 h-3 mr-1" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B"
  )), section.subsections.map((subsection) => /* @__PURE__ */ React.createElement("div", { key: subsection.id, className: "bg-white p-4 rounded-lg border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0430"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: subsection.title,
      onChange: (e) => updateSubsection(section.id, subsection.id, "title", e.target.value),
      className: "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: iPhone"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-end space-x-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addLink(section.id, subsection.id),
      className: "bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center"
    },
    /* @__PURE__ */ React.createElement(Link, { className: "w-3 h-3 mr-1" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => deleteSubsection(section.id, subsection.id),
      className: "bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-3 h-3" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0430"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: subsection.description,
      onChange: (e) => updateSubsection(section.id, subsection.id, "description", e.target.value),
      className: "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0430 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
      rows: "2"
    }
  )), subsection.links.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("h5", { className: "font-medium text-gray-700 text-sm" }, "\u0421\u0441\u044B\u043B\u043A\u0438:"), subsection.links.map((link) => /* @__PURE__ */ React.createElement("div", { key: link.id, className: "bg-gray-50 p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-medium text-gray-600" }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: link.title,
      onChange: (e) => updateLink(section.id, subsection.id, link.id, "title", e.target.value),
      className: "w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors",
      placeholder: "16 Pro Max"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-medium text-gray-600" }, "URL"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "url",
      value: link.url,
      onChange: (e) => updateLink(section.id, subsection.id, link.id, "url", e.target.value),
      className: "w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors",
      placeholder: "https://example.com"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-end" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => deleteLink(section.id, subsection.id, link.id),
      className: "bg-red-600 text-white px-2 py-2 rounded text-sm hover:bg-red-700 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-3 h-3" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-medium text-gray-600" }, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: link.description,
      onChange: (e) => updateLink(section.id, subsection.id, link.id, "description", e.target.value),
      className: "w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors",
      placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
      rows: "1"
    }
  )))))))), section.subsections.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-8 text-gray-500" }, /* @__PURE__ */ React.createElement(BookOpen, { className: "w-8 h-8 mx-auto mb-2 text-gray-400" }), /* @__PURE__ */ React.createElement("p", null, "\u041D\u0435\u0442 \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B.")))))), toolsData.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(Settings, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u041D\u0435\u0442 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm" }, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0440\u0430\u0437\u0434\u0435\u043B \u0434\u043B\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0441\u044B\u043B\u043E\u043A \u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438"))), toolsData.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-8 border-t pt-8" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-6" }, "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" }, toolsData.map((section) => /* @__PURE__ */ React.createElement("div", { key: `display-${section.id}`, className: "bg-white border border-gray-200 rounded-xl p-4" }, /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-gray-900 text-lg" }, section.title), section.description && /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mt-1" }, section.description)), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, section.subsections.map((subsection) => /* @__PURE__ */ React.createElement("div", { key: `display-sub-${subsection.id}`, className: "border-l-2 border-blue-200 pl-4" }, /* @__PURE__ */ React.createElement("h5", { className: "font-medium text-gray-800" }, subsection.title), subsection.description && /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mb-2" }, subsection.description), subsection.links.map((link) => /* @__PURE__ */ React.createElement("div", { key: `display-link-${link.id}`, className: "mb-2" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: link.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "text-blue-600 hover:text-blue-800 underline flex items-center text-sm"
    },
    /* @__PURE__ */ React.createElement(ExternalLink, { className: "w-3 h-3 mr-1" }),
    link.title
  ), link.description && /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500 ml-4" }, link.description))))))))))))), currentView === "statistics" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap space-x-0 sm:space-x-8 px-4 sm:px-6 py-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setStatisticsTab("pvz"),
      className: `pb-2 border-b-2 font-medium text-sm transition-colors mb-2 sm:mb-0 ${statisticsTab === "pvz" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`
    },
    /* @__PURE__ */ React.createElement(Package2, { className: "inline-block w-4 h-4 mr-2" }),
    "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u041F\u0412\u0417"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setStatisticsTab("customers"),
      className: `pb-2 border-b-2 font-medium text-sm transition-colors ${statisticsTab === "customers" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`
    },
    /* @__PURE__ */ React.createElement(Users, { className: "inline-block w-4 h-4 mr-2" }),
    "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 md:p-6" }, statisticsTab === "pvz" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg md:text-xl font-semibold text-gray-900" }, "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u041F\u0412\u0417"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPvzTimePeriod("all"),
      className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pvzTimePeriod === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
    },
    "\u0417\u0430 \u0432\u0441\u0435 \u0432\u0440\u0435\u043C\u044F"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPvzTimePeriod("week"),
      className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pvzTimePeriod === "week" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
    },
    "\u0417\u0430 \u043D\u0435\u0434\u0435\u043B\u044E"
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, getPvzStatisticsDetailed(pvzTimePeriod).map((pvzStat) => /* @__PURE__ */ React.createElement("div", { key: pvzStat.id, className: "border border-gray-200 rounded-xl bg-gray-50" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "p-4 md:p-6 cursor-pointer hover:bg-gray-100 transition-colors",
      onClick: () => setExpandedPvz(expandedPvz === pvzStat.id ? null : pvzStat.id)
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 mb-2" }, /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-semibold text-gray-900" }, pvzStat.ipName), /* @__PURE__ */ React.createElement("span", { className: "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u041F\u0412\u0417")), /* @__PURE__ */ React.createElement("div", { className: "text-gray-600 mb-3" }, pvzStat.address), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-blue-600" }, pvzStat.totalItems), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u0422\u043E\u0432\u0430\u0440\u043E\u0432")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-green-600" }, pvzStat.orders.length), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u0417\u0430\u043A\u0430\u0437\u043E\u0432")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-purple-600" }, Object.keys(pvzStat.productBreakdown).length), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u041F\u043E\u0437\u0438\u0446\u0438\u0439")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-orange-600" }, pvzStat.orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString(), " \u20BD"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u0421\u0443\u043C\u043C\u0430")))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-gray-400" }, /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-5 h-5 transition-transform ${expandedPvz === pvzStat.id ? "rotate-90" : ""}` })))
  ), expandedPvz === pvzStat.id && /* @__PURE__ */ React.createElement("div", { className: "border-t border-gray-200 p-4 md:p-6 bg-white" }, /* @__PURE__ */ React.createElement("h5", { className: "font-semibold text-gray-800 mb-4" }, "\u0414\u0435\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E \u0442\u043E\u0432\u0430\u0440\u0430\u043C:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" }, Object.entries(pvzStat.productBreakdown).map(([product, stats]) => /* @__PURE__ */ React.createElement("div", { key: product, className: "bg-gray-50 p-4 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-gray-900 mb-2" }, product), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600 space-y-1" }, /* @__PURE__ */ React.createElement("div", null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.quantity)), /* @__PURE__ */ React.createElement("div", null, "\u0421\u0443\u043C\u043C\u0430: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.amount.toLocaleString(), " \u20BD")), /* @__PURE__ */ React.createElement("div", null, "\u041F\u0430\u043C\u044F\u0442\u044C: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.memory)), /* @__PURE__ */ React.createElement("div", null, "\u0426\u0432\u0435\u0442: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.color))))))))), getPvzStatisticsDetailed(pvzTimePeriod).length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(Package2, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0435\u0440\u0438\u043E\u0434\u0430")))), statisticsTab === "customers" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg md:text-xl font-semibold text-gray-900" }, "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F\u043C"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setCustomerTimePeriod("all"),
      className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${customerTimePeriod === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
    },
    "\u0417\u0430 \u0432\u0441\u0435 \u0432\u0440\u0435\u043C\u044F"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setCustomerTimePeriod("month"),
      className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${customerTimePeriod === "month" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
    },
    "\u0417\u0430 \u043C\u0435\u0441\u044F\u0446"
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, getCustomerStatistics(customerTimePeriod).map((customerStat, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "border border-gray-200 rounded-xl bg-gray-50" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "p-4 md:p-6 cursor-pointer hover:bg-gray-100 transition-colors",
      onClick: () => setExpandedCustomer(expandedCustomer === customerStat.name ? null : customerStat.name)
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 mb-3" }, /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-semibold text-gray-900" }, customerStat.name), /* @__PURE__ */ React.createElement("span", { className: "bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-blue-600" }, customerStat.totalItems), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u0422\u043E\u0432\u0430\u0440\u043E\u0432")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-green-600" }, customerStat.orders.length), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u0417\u0430\u043A\u0430\u0437\u043E\u0432")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-purple-600" }, Object.keys(customerStat.pvzBreakdown).length), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u041F\u0412\u0417")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-3 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-orange-600" }, customerStat.totalAmount.toLocaleString(), " \u20BD"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u0421\u0443\u043C\u043C\u0430")))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-gray-400" }, /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-5 h-5 transition-transform ${expandedCustomer === customerStat.name ? "rotate-90" : ""}` })))
  ), expandedCustomer === customerStat.name && /* @__PURE__ */ React.createElement("div", { className: "border-t border-gray-200 p-4 md:p-6 bg-white" }, /* @__PURE__ */ React.createElement("h5", { className: "font-semibold text-gray-800 mb-4" }, "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E \u041F\u0412\u0417:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" }, Object.entries(customerStat.pvzBreakdown).map(([pvz, stats]) => /* @__PURE__ */ React.createElement("div", { key: pvz, className: "bg-gray-50 p-4 rounded-lg border" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-gray-900 mb-2" }, pvz), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600 space-y-1" }, /* @__PURE__ */ React.createElement("div", null, "\u0422\u043E\u0432\u0430\u0440\u043E\u0432: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.quantity)), /* @__PURE__ */ React.createElement("div", null, "\u0417\u0430\u043A\u0430\u0437\u043E\u0432: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.orders)), /* @__PURE__ */ React.createElement("div", null, "\u0421\u0443\u043C\u043C\u0430: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.amount.toLocaleString(), " \u20BD"))))))))), getCustomerStatistics(customerTimePeriod).length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(Users, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0435\u0440\u0438\u043E\u0434\u0430"))))))), currentView === "main" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, showOrderForm && /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 px-4 md:px-6 py-4 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-lg md:text-xl font-semibold text-gray-900" }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0437\u0430\u043A\u0430\u0437"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mt-1" }, "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0437\u0430\u043A\u0430\u0437\u0435")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowOrderForm(false),
      className: "text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041F\u0412\u0417 *"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: newOrder.pvzId,
      onChange: (e) => setNewOrder({ ...newOrder, pvzId: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u041F\u0412\u0417"),
    pvzList.map((pvz) => {
      const ip = ipList.find((i) => i.id === pvz.ipId);
      return /* @__PURE__ */ React.createElement("option", { key: pvz.id, value: pvz.id }, ip?.name, " - ", pvz.address || `\u041F\u0412\u0417 #${pvz.id}`);
    })
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430 *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.orderNumber,
      onChange: (e) => setNewOrder({ ...newOrder, orderNumber: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.customer,
      onChange: (e) => setNewOrder({ ...newOrder, customer: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u0418\u043C\u044F \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.store,
      onChange: (e) => setNewOrder({ ...newOrder, store: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430",
      list: "stores-list"
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "stores-list" }, storesDatabase.map((store) => /* @__PURE__ */ React.createElement("option", { key: store.id, value: store.name })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u0414\u0430\u0442\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0438"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: newOrder.purchaseDate,
      onChange: (e) => setNewOrder({ ...newOrder, purchaseDate: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041E\u0436\u0438\u0434\u0430\u0435\u043C\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: newOrder.expectedDeliveryDate,
      onChange: (e) => setNewOrder({ ...newOrder, expectedDeliveryDate: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u0411\u0440\u0435\u043D\u0434"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.brand,
      onChange: (e) => setNewOrder({ ...newOrder, brand: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u0411\u0440\u0435\u043D\u0434 (Apple)",
      list: "brands-list"
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "brands-list" }, [...new Set(modelsDatabase.map((m) => m.brand).filter(Boolean))].map((brand) => /* @__PURE__ */ React.createElement("option", { key: brand, value: brand })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041C\u043E\u0434\u0435\u043B\u044C"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.model,
      onChange: (e) => setNewOrder({ ...newOrder, model: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u041C\u043E\u0434\u0435\u043B\u044C (iPhone)",
      list: "models-list"
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "models-list" }, [...new Set(modelsDatabase.filter((m) => !newOrder.brand || m.brand === newOrder.brand).map((m) => m.model).filter(Boolean))].map((model) => /* @__PURE__ */ React.createElement("option", { key: model, value: model })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041B\u0438\u043D\u0435\u0439\u043A\u0430"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.productLine,
      onChange: (e) => setNewOrder({ ...newOrder, productLine: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u041B\u0438\u043D\u0435\u0439\u043A\u0430 (16 Pro / 16 Pro Max)",
      list: "productlines-list"
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "productlines-list" }, [...new Set(modelsDatabase.filter(
    (m) => (!newOrder.brand || m.brand === newOrder.brand) && (!newOrder.model || m.model === newOrder.model)
  ).map((m) => m.productLine).filter(Boolean))].map((line) => /* @__PURE__ */ React.createElement("option", { key: line, value: line })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041E\u0431\u044A\u0435\u043C \u043F\u0430\u043C\u044F\u0442\u0438"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.memory,
      onChange: (e) => setNewOrder({ ...newOrder, memory: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u041E\u0431\u044A\u0435\u043C \u043F\u0430\u043C\u044F\u0442\u0438",
      list: "memory-list"
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "memory-list" }, [...new Set(modelsDatabase.map((m) => m.memory).filter(Boolean))].map((memory) => /* @__PURE__ */ React.createElement("option", { key: memory, value: memory })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u0426\u0432\u0435\u0442"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrder.color,
      onChange: (e) => setNewOrder({ ...newOrder, color: e.target.value }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u0426\u0432\u0435\u0442",
      list: "color-list"
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "color-list" }, [...new Set(modelsDatabase.map((m) => m.color).filter(Boolean))].map((color) => /* @__PURE__ */ React.createElement("option", { key: color, value: color })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: newOrder.quantity,
      onChange: (e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
      min: "1"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-sm font-medium text-gray-700" }, "\u0421\u0443\u043C\u043C\u0430"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: newOrder.amount,
      onChange: (e) => setNewOrder({ ...newOrder, amount: parseFloat(e.target.value) }),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      placeholder: "\u0421\u0443\u043C\u043C\u0430",
      step: "0.01"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "sm:col-span-2 lg:col-span-3 xl:col-span-4 pt-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleAddOrder,
      className: "w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-2 inline" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437"
  ))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 px-4 md:px-6 py-4 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C, \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C, \u0442\u043E\u0432\u0430\u0440\u0430\u043C...",
      className: "pl-10 pr-4 py-3 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Filter, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: filterStatus,
      onChange: (e) => setFilterStatus(e.target.value),
      className: "pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm appearance-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "all" }, "\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B"),
    /* @__PURE__ */ React.createElement("option", { value: "pending" }, "\u041E\u0436\u0438\u0434\u0430\u044E\u0442 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"),
    /* @__PURE__ */ React.createElement("option", { value: "delivered" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u044B"),
    /* @__PURE__ */ React.createElement("option", { value: "ready" }, "\u0413\u043E\u0442\u043E\u0432\u044B \u043A \u0432\u044B\u0434\u0430\u0447\u0435"),
    /* @__PURE__ */ React.createElement("option", { value: "inquiry" }, "\u0421 \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C\u0438"),
    /* @__PURE__ */ React.createElement("option", { value: "claim" }, "\u0421 \u043F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F\u043C\u0438")
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm border" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "\u041D\u0430\u0439\u0434\u0435\u043D\u043E:"), " ", getAllOrders().length, " \u0437\u0430\u043A\u0430\u0437\u043E\u0432"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("h2", { className: "text-lg md:text-xl font-semibold text-gray-900" }, "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u043E\u043A"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center sm:justify-end space-x-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)),
      className: "p-2 rounded-lg hover:bg-gray-100 transition-colors"
    },
    /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement("span", { className: "text-lg font-medium min-w-48 text-center" }, selectedDate.toLocaleDateString("ru-RU", { month: "long", year: "numeric" })), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)),
      className: "p-2 rounded-lg hover:bg-gray-100 transition-colors"
    },
    /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-7 gap-1 mb-2" }, ["\u0412\u0441", "\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431"].map((day) => /* @__PURE__ */ React.createElement("div", { key: day, className: "p-2 text-center font-medium text-gray-500 text-sm" }, day))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-7 gap-1" }, getDaysInMonth(selectedDate).map((day, index) => {
    const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
    const isToday = day.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
    const dayOrders = getOrdersForDate(day);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: index,
        className: `min-h-24 p-1 border rounded-lg transition-colors ${isCurrentMonth ? "bg-white" : "bg-gray-50"} ${isToday ? "ring-2 ring-blue-500" : ""}`
      },
      /* @__PURE__ */ React.createElement("div", { className: `text-sm font-medium mb-1 ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}` }, day.getDate()),
      dayOrders.map((order) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: `${order.pvzId}-${order.id}`,
          onClick: () => setSelectedOrder(order),
          className: "text-xs p-1 mb-1 bg-blue-100 hover:bg-blue-200 rounded cursor-pointer truncate transition-colors",
          title: `${order.pvzAddress} - ${order.orderNumber}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, order.pvzAddress),
        /* @__PURE__ */ React.createElement("div", { className: "text-blue-600" }, "#", order.orderNumber)
      ))
    );
  }))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-lg md:text-xl font-semibold text-gray-900 mb-4" }, "\u0421\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u043A\u0430\u0437\u043E\u0432"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, getAllOrders().map((order) => {
    const storeStatus = getStoreStatus(order.store);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: `${order.pvzId}-${order.id}`,
        className: `p-4 border rounded-xl shadow-sm transition-all hover:shadow-md ${getOrderColor(order)}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-gray-900" }, "#", order.orderNumber), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, order.customer), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1" }, order.hasInquiry && /* @__PURE__ */ React.createElement("span", { className: "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u0417\u0430\u043F\u0440\u043E\u0441"), order.hasClaim && /* @__PURE__ */ React.createElement("span", { className: "bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "\u0418\u041F / \u041F\u0412\u0417"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium" }, order.ipName), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, order.pvzAddress)), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, order.store), /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded-full text-xs border ${storeStatus.color}` }, storeStatus.status === "good" ? "\u2713" : storeStatus.status === "bad" ? "\u2717" : "?")), storeStatus.store?.deliveryNotes && /* @__PURE__ */ React.createElement("div", { className: "text-xs text-orange-600 bg-orange-50 p-1 rounded" }, "\u{1F4DD} ", storeStatus.store.deliveryNotes)), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "\u0422\u043E\u0432\u0430\u0440"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium" }, order.brand, " ", order.model), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-600" }, order.productLine, " ", order.memory, " ", order.color)), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "\u0414\u0430\u0442\u044B"), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, "\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F: ", order.expectedDeliveryDate), order.actualDeliveryDate && /* @__PURE__ */ React.createElement("div", { className: "text-sm text-green-600" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D: ", order.actualDeliveryDate), order.cellNumber && /* @__PURE__ */ React.createElement("div", { className: "text-xs bg-gray-100 px-2 py-1 rounded" }, "\u042F\u0447\u0435\u0439\u043A\u0430: ", order.cellNumber)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "checkbox",
          checked: order.deliveryStatus,
          onChange: (e) => updateOrder(order.pvzId, order.id, "deliveryStatus", e.target.checked),
          className: "rounded"
        }
      ), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D")), order.deliveryStatus && /* @__PURE__ */ React.createElement(
        "select",
        {
          value: order.overallStatus,
          onChange: (e) => updateOrder(order.pvzId, order.id, "overallStatus", e.target.value),
          className: "text-xs p-2 border border-gray-300 rounded w-full"
        },
        /* @__PURE__ */ React.createElement("option", { value: "\u041F\u043E\u0441\u0442\u0443\u043F\u0438\u043B \u043D\u0430 \u043F\u0443\u043D\u043A\u0442" }, "\u041F\u043E\u0441\u0442\u0443\u043F\u0438\u043B \u043D\u0430 \u043F\u0443\u043D\u043A\u0442"),
        /* @__PURE__ */ React.createElement("option", { value: "\u0413\u043E\u0442\u043E\u0432" }, "\u0413\u043E\u0442\u043E\u0432"),
        /* @__PURE__ */ React.createElement("option", { value: "\u0412\u044B\u0434\u0430\u043D" }, "\u0412\u044B\u0434\u0430\u043D"),
        /* @__PURE__ */ React.createElement("option", { value: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D" }, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D")
      ), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-1" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center" }, /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "checkbox",
          checked: order.hasInquiry || false,
          onChange: (e) => updateOrder(order.pvzId, order.id, "hasInquiry", e.target.checked),
          className: "mr-1 rounded"
        }
      ), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, "\u0417\u0430\u043F\u0440\u043E\u0441")), /* @__PURE__ */ React.createElement("label", { className: "flex items-center" }, /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "checkbox",
          checked: order.hasClaim || false,
          onChange: (e) => updateOrder(order.pvzId, order.id, "hasClaim", e.target.checked),
          className: "mr-1 rounded"
        }
      ), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F")))))), /* @__PURE__ */ React.createElement("div", { className: "flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setSelectedOrder(order),
          className: "bg-blue-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-blue-700 transition-colors flex items-center"
        },
        /* @__PURE__ */ React.createElement(Eye, { className: "w-3 h-3 mr-1" }),
        "\u0414\u0435\u0442\u0430\u043B\u0438"
      ), order.overallStatus === "\u0413\u043E\u0442\u043E\u0432" && !order.isReturn && /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => returnOrder(order.pvzId, order.id),
          className: "bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-yellow-700 transition-colors"
        },
        "\u0412\u043E\u0437\u0432\u0440\u0430\u0442"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => deleteOrder(order.pvzId, order.id),
          className: "bg-red-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-red-700 transition-colors flex items-center"
        },
        /* @__PURE__ */ React.createElement(Trash2, { className: "w-3 h-3 mr-1" }),
        "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"
      )))
    );
  }), getAllOrders().length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(Package2, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u0417\u0430\u043A\u0430\u0437\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm" }, "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u0438\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0437\u0430\u043A\u0430\u0437"))))), currentView === "editor" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex space-x-8 px-6 py-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEditorTab("ip"),
      className: `pb-2 border-b-2 font-medium text-sm transition-colors ${editorTab === "ip" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`
    },
    /* @__PURE__ */ React.createElement(Users, { className: "inline-block w-4 h-4 mr-2" }),
    "\u0418\u041F \u0438 \u041F\u0412\u0417"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-6" }, editorTab === "ip" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0418\u041F \u0438 \u041F\u0412\u0417"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: addIp,
      className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-2" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0418\u041F"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, ipList.map((ip) => /* @__PURE__ */ React.createElement("div", { key: ip.id, className: "border border-gray-200 rounded-xl p-6 bg-gray-50" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 items-start" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: ip.name,
      onChange: (e) => updateIp(ip.id, "name", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0418\u041F"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: ip.phone,
      onChange: (e) => updateIp(ip.id, "phone", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => deleteIp(ip.id),
      className: "bg-red-600 text-white px-3 py-3 rounded-lg hover:bg-red-700 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-700" }, "\u041F\u0412\u0417 \u044D\u0442\u043E\u0433\u043E \u0418\u041F"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => addPvz(ip.id),
      className: "bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-3 h-3 mr-1" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u041F\u0412\u0417"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, pvzList.filter((pvz) => pvz.ipId === ip.id).map((pvz) => /* @__PURE__ */ React.createElement("div", { key: pvz.id, className: "flex gap-3 items-center" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: pvz.address,
      onChange: (e) => updatePvz(pvz.id, "address", e.target.value),
      className: "flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u0410\u0434\u0440\u0435\u0441 \u041F\u0412\u0417"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => deletePvz(pvz.id),
      className: "bg-red-600 text-white px-3 py-3 rounded-lg hover:bg-red-700 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-3 h-3" })
  )))))))))))), currentView === "database" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap space-x-0 sm:space-x-8 px-4 sm:px-6 py-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setDatabaseTab("stores"),
      className: `pb-2 border-b-2 font-medium text-sm transition-colors mb-2 sm:mb-0 ${databaseTab === "stores" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`
    },
    /* @__PURE__ */ React.createElement(Store, { className: "inline-block w-4 h-4 mr-2" }),
    "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B (",
    storesDatabase.length,
    ")"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setDatabaseTab("models"),
      className: `pb-2 border-b-2 font-medium text-sm transition-colors mb-2 sm:mb-0 ${databaseTab === "models" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`
    },
    /* @__PURE__ */ React.createElement(Package2, { className: "inline-block w-4 h-4 mr-2" }),
    "\u041C\u043E\u0434\u0435\u043B\u0438 (",
    modelsDatabase.length,
    ")"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setDatabaseTab("orders"),
      className: `pb-2 border-b-2 font-medium text-sm transition-colors ${databaseTab === "orders" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`
    },
    /* @__PURE__ */ React.createElement(History, { className: "inline-block w-4 h-4 mr-2" }),
    "\u0418\u0441\u0442\u043E\u0440\u0438\u044F (",
    orderHistory.length,
    ")"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 md:p-6" }, databaseTab === "stores" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: addStoreToDatabase,
      className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-2" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0433\u0430\u0437\u0438\u043D"
  )), /* @__PURE__ */ React.createElement("div", { className: "mb-6 p-4 md:p-6 bg-blue-50 rounded-xl border border-blue-100" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-blue-900 mb-4" }, "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E\u043A\u0443\u043F\u043E\u043A \u043F\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430\u043C"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, Object.entries(getStoreStatistics()).map(([storeName, stats]) => /* @__PURE__ */ React.createElement("div", { key: storeName, className: "bg-white p-4 md:p-6 rounded-lg border border-blue-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-gray-900 text-lg" }, storeName), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, "\u0412\u0441\u0435\u0433\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.total), " | ", "\u0421\u0443\u043C\u043C\u0430: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, stats.amount.toLocaleString(), " \u20BD")))), /* @__PURE__ */ React.createElement("div", { className: "border-t pt-4" }, /* @__PURE__ */ React.createElement("h5", { className: "font-medium text-gray-700 mb-3" }, "\u0420\u0430\u0437\u0431\u0438\u0432\u043A\u0430 \u043F\u043E \u041F\u0412\u0417:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" }, Object.entries(stats.pvzBreakdown).map(([pvzName, pvzStats]) => /* @__PURE__ */ React.createElement("div", { key: pvzName, className: "bg-gray-50 p-3 rounded-lg text-sm" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-gray-800 mb-1" }, pvzName), /* @__PURE__ */ React.createElement("div", { className: "text-gray-600" }, pvzStats.total, " \u0448\u0442. \u2022 ", pvzStats.amount.toLocaleString(), " \u20BD"))))))))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, storesDatabase.map((store) => /* @__PURE__ */ React.createElement("div", { key: store.id, className: "border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: store.name,
      onChange: (e) => updateStoreInDatabase(store.id, "name", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430"
    }
  ), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: store.type,
      onChange: (e) => updateStoreInDatabase(store.id, "type", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    },
    /* @__PURE__ */ React.createElement("option", { value: "unknown" }, "\u041D\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439"),
    /* @__PURE__ */ React.createElement("option", { value: "good" }, "\u0425\u043E\u0440\u043E\u0448\u0438\u0439"),
    /* @__PURE__ */ React.createElement("option", { value: "bad" }, "\u041F\u043B\u043E\u0445\u043E\u0439")
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" }, /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: store.notes,
      onChange: (e) => updateStoreInDatabase(store.id, "notes", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u041E\u0431\u0449\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435",
      rows: "3"
    }
  ), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: store.deliveryNotes,
      onChange: (e) => updateStoreInDatabase(store.id, "deliveryNotes", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u041D\u044E\u0430\u043D\u0441\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430",
      rows: "3"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-500" }, "\u0421\u043E\u0437\u0434\u0430\u043D: ", new Date(store.createdAt).toLocaleDateString("ru-RU")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => deleteStoreFromDatabase(store.id),
      className: "bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" })
  )))), storesDatabase.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(Store, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432 \u043F\u0443\u0441\u0442\u0430")))), databaseTab === "models" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: addModelToDatabase,
      className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-2" }),
    "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, modelsDatabase.map((model) => /* @__PURE__ */ React.createElement("div", { key: model.id, className: "border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: model.brand,
      onChange: (e) => updateModelInDatabase(model.id, "brand", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u0411\u0440\u0435\u043D\u0434"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: model.model,
      onChange: (e) => updateModelInDatabase(model.id, "model", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u041C\u043E\u0434\u0435\u043B\u044C"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: model.productLine || "",
      onChange: (e) => updateModelInDatabase(model.id, "productLine", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u041B\u0438\u043D\u0435\u0439\u043A\u0430"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: model.memory,
      onChange: (e) => updateModelInDatabase(model.id, "memory", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u041F\u0430\u043C\u044F\u0442\u044C"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: model.color,
      onChange: (e) => updateModelInDatabase(model.id, "color", e.target.value),
      className: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      placeholder: "\u0426\u0432\u0435\u0442"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-500" }, "\u0421\u043E\u0437\u0434\u0430\u043D: ", new Date(model.createdAt).toLocaleDateString("ru-RU")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => deleteModelFromDatabase(model.id),
      className: "bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" })
  )))), modelsDatabase.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(Package2, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043F\u0443\u0441\u0442\u0430")))), databaseTab === "orders" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: exportOrderHistory,
      className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4 mr-2" }),
    "\u0412\u044B\u0433\u0440\u0443\u0437\u0438\u0442\u044C CSV"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, orderHistory.map((order, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: `border rounded-xl p-4 md:p-6 ${order.overallStatus === "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D" ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}` }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u0417\u0430\u043A\u0430\u0437"), /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, "#", order.orderNumber), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, order.customer)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u041F\u0412\u0417"), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, order.pvzAddress)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u0422\u043E\u0432\u0430\u0440"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium" }, order.brand, " ", order.model, " ", order.productLine), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-600" }, order.memory, " ", order.color)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u0421\u0442\u0430\u0442\u0443\u0441"), /* @__PURE__ */ React.createElement("div", { className: `inline-block px-3 py-1 rounded-full text-xs font-medium ${order.overallStatus === "\u0412\u044B\u0434\u0430\u043D" ? "bg-green-100 text-green-800" : order.overallStatus === "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}` }, order.overallStatus))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "\u0414\u0430\u0442\u044B"), /* @__PURE__ */ React.createElement("div", { className: "text-sm space-y-1" }, /* @__PURE__ */ React.createElement("div", null, "\u041F\u043E\u043A\u0443\u043F\u043A\u0430: ", order.purchaseDate), /* @__PURE__ */ React.createElement("div", null, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430: ", order.actualDeliveryDate), /* @__PURE__ */ React.createElement("div", null, "\u0412 \u0430\u0440\u0445\u0438\u0432\u0435: ", order.movedToHistoryDate))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "\u0414\u0435\u0442\u0430\u043B\u0438"), /* @__PURE__ */ React.createElement("div", { className: "text-sm space-y-1" }, /* @__PURE__ */ React.createElement("div", null, "\u042F\u0447\u0435\u0439\u043A\u0430: ", order.cellNumber), /* @__PURE__ */ React.createElement("div", null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ", order.quantity), /* @__PURE__ */ React.createElement("div", null, "\u0421\u0443\u043C\u043C\u0430: ", order.amount, " \u20BD"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043C\u0435\u0442\u043A\u0430\u043C\u0438"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: order.hasInquiry || false,
      onChange: (e) => {
        const updatedHistory = orderHistory.map(
          (historyOrder, i) => i === index ? { ...historyOrder, hasInquiry: e.target.checked } : historyOrder
        );
        setOrderHistory(updatedHistory);
      },
      className: "mr-2 rounded"
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, "\u0417\u0430\u043F\u0440\u043E\u0441")), /* @__PURE__ */ React.createElement("label", { className: "flex items-center" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: order.hasClaim || false,
      onChange: (e) => {
        const updatedHistory = orderHistory.map(
          (historyOrder, i) => i === index ? { ...historyOrder, hasClaim: e.target.checked } : historyOrder
        );
        setOrderHistory(updatedHistory);
      },
      className: "mr-2 rounded"
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "\u041E\u0442\u043C\u0435\u0442\u043A\u0438"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, order.hasInquiry && /* @__PURE__ */ React.createElement("span", { className: "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u0417\u0430\u043F\u0440\u043E\u0441"), order.hasClaim && /* @__PURE__ */ React.createElement("span", { className: "bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F"), order.isReturn && /* @__PURE__ */ React.createElement("span", { className: "bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442")))))), orderHistory.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(History, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043F\u0443\u0441\u0442\u0430"))))))), currentView === "reports" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-lg md:text-xl font-semibold text-gray-900 mb-6" }, "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E \u041F\u0412\u0417"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-6" }, [
    { id: "week", label: "\u041D\u0435\u0434\u0435\u043B\u044F" },
    { id: "2weeks", label: "2 \u043D\u0435\u0434\u0435\u043B\u0438" },
    { id: "month", label: "\u041C\u0435\u0441\u044F\u0446" },
    { id: "all", label: "\u0412\u0441\u0435 \u0432\u0440\u0435\u043C\u044F" }
  ].map((period) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: period.id,
      onClick: () => setStatsPeriod(period.id),
      className: `px-4 py-2 rounded-lg transition-colors ${statsPeriod === period.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
    },
    period.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "min-w-full divide-y divide-gray-200" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-gray-50" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "\u0418\u041F / \u041F\u0412\u0417"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u043E\u0432"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442\u044B"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "\u0417\u0430\u043F\u0440\u043E\u0441\u044B"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u0438"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "\u0421\u0443\u043C\u043C\u0430"))), /* @__PURE__ */ React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, getPvzStatistics(statsPeriod).map((stat, index) => /* @__PURE__ */ React.createElement("tr", { key: index, className: "hover:bg-gray-50" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium text-gray-900" }, stat.ipName), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, stat.pvzAddress)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-4 whitespace-nowrap text-sm text-gray-900" }, stat.totalOrders), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-4 whitespace-nowrap text-sm text-gray-900" }, stat.deliveredOrders), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-4 whitespace-nowrap text-sm text-gray-900" }, stat.returns), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-4 whitespace-nowrap text-sm text-gray-900" }, stat.inquiries), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-4 whitespace-nowrap text-sm text-gray-900" }, stat.claims), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-4 whitespace-nowrap text-sm text-gray-900" }, stat.totalAmount.toLocaleString(), " \u20BD"))))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-lg md:text-xl font-semibold text-gray-900 mb-6" }, "\u041E\u0442\u0447\u0435\u0442\u044B \u0438 \u0432\u044B\u0433\u0440\u0443\u0437\u043A\u0438"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6" }, [
    {
      icon: Store,
      title: "\u0411\u0430\u0437\u0430 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432",
      count: `${storesDatabase.length} \u0437\u0430\u043F\u0438\u0441\u0435\u0439`,
      color: "blue",
      action: exportStores
    },
    {
      icon: Package2,
      title: "\u0411\u0430\u0437\u0430 \u043C\u043E\u0434\u0435\u043B\u0435\u0439",
      count: `${modelsDatabase.length} \u0437\u0430\u043F\u0438\u0441\u0435\u0439`,
      color: "green",
      action: exportModels
    },
    {
      icon: Package2,
      title: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B",
      count: `${getAllOrders().length} \u0437\u0430\u043A\u0430\u0437\u043E\u0432`,
      color: "yellow",
      action: exportActiveOrders
    },
    {
      icon: Package2,
      title: "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B",
      count: `${getAllOrders().filter((o) => o.deliveryStatus).length + orderHistory.length} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`,
      color: "purple",
      action: exportDeliveredOrders
    },
    {
      icon: History,
      title: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432",
      count: `${orderHistory.length} \u0437\u0430\u043F\u0438\u0441\u0435\u0439`,
      color: "gray",
      action: exportOrderHistory
    }
  ].map((item, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: `bg-${item.color}-50 border border-${item.color}-200 rounded-xl p-4 md:p-6` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center mb-4" }, /* @__PURE__ */ React.createElement(item.icon, { className: `w-8 h-8 text-${item.color}-600 mr-3` }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `font-semibold text-${item.color}-900` }, item.title), /* @__PURE__ */ React.createElement("p", { className: `text-sm text-${item.color}-600` }, item.count))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: item.action,
      className: `w-full bg-${item.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${item.color}-700 flex items-center justify-center transition-colors`
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4 mr-2" }),
    "\u0412\u044B\u0433\u0440\u0443\u0437\u0438\u0442\u044C CSV"
  )))), /* @__PURE__ */ React.createElement("div", { className: "mt-8 p-4 md:p-6 bg-gray-50 rounded-xl" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-gray-900 mb-4" }, "\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center" }, [
    { value: ipList.length, label: "\u0418\u041F", color: "blue" },
    { value: pvzList.length, label: "\u041F\u0412\u0417", color: "green" },
    { value: getAllOrders().length, label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432", color: "yellow" },
    { value: orderHistory.length, label: "\u0412 \u0438\u0441\u0442\u043E\u0440\u0438\u0438", color: "gray" },
    { value: getAllOrders().filter((o) => o.hasInquiry).length + orderHistory.filter((o) => o.hasInquiry).length, label: "\u0417\u0430\u043F\u0440\u043E\u0441\u043E\u0432", color: "blue" },
    { value: getAllOrders().filter((o) => o.hasClaim).length + orderHistory.filter((o) => o.hasClaim).length, label: "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u0439", color: "red" }
  ].map((stat, index) => /* @__PURE__ */ React.createElement("div", { key: index }, /* @__PURE__ */ React.createElement("div", { className: `text-2xl font-bold text-${stat.color}-600` }, stat.value), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, stat.label))))))), currentView === "history" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-gray-50 to-blue-50 px-4 md:px-6 py-4 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: historySearchQuery,
      onChange: (e) => setHistorySearchQuery(e.target.value),
      placeholder: "\u041F\u043E\u0438\u0441\u043A \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0438...",
      className: "pl-10 pr-4 py-3 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Filter, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: historyFilterStatus,
      onChange: (e) => setHistoryFilterStatus(e.target.value),
      className: "pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white shadow-sm appearance-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "all" }, "\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0412\u044B\u0434\u0430\u043D" }, "\u0412\u044B\u0434\u0430\u043D"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D" }, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D"),
    /* @__PURE__ */ React.createElement("option", { value: "inquiry" }, "\u0421 \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C\u0438"),
    /* @__PURE__ */ React.createElement("option", { value: "claim" }, "\u0421 \u043F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F\u043C\u0438")
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm border" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "\u0417\u0430\u043F\u0438\u0441\u0435\u0439:"), " ", orderHistory.filter((order) => {
    const matchesSearch = !historySearchQuery || order.orderNumber.toLowerCase().includes(historySearchQuery.toLowerCase()) || order.customer.toLowerCase().includes(historySearchQuery.toLowerCase()) || order.pvzAddress.toLowerCase().includes(historySearchQuery.toLowerCase());
    const matchesStatus = historyFilterStatus === "all" || order.overallStatus === historyFilterStatus || historyFilterStatus === "inquiry" && order.hasInquiry || historyFilterStatus === "claim" && order.hasClaim;
    return matchesSearch && matchesStatus;
  }).length))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("h2", { className: "text-lg md:text-xl font-semibold text-gray-900" }, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432"), /* @__PURE__ */ React.createElement("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-yellow-800" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-4 h-4 mr-2" }), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u0438 \u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043C\u0435\u0447\u0430\u0442\u044C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 90 \u0434\u043D\u0435\u0439")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, orderHistory.filter((order) => {
    const matchesSearch = !historySearchQuery || order.orderNumber.toLowerCase().includes(historySearchQuery.toLowerCase()) || order.customer.toLowerCase().includes(historySearchQuery.toLowerCase()) || order.pvzAddress.toLowerCase().includes(historySearchQuery.toLowerCase());
    const matchesStatus = historyFilterStatus === "all" || order.overallStatus === historyFilterStatus || historyFilterStatus === "inquiry" && order.hasInquiry || historyFilterStatus === "claim" && order.hasClaim;
    return matchesSearch && matchesStatus;
  }).map((order, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: `p-4 border rounded-xl shadow-sm ${order.overallStatus === "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D" ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}` }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430"), /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, "#", order.orderNumber), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-600" }, order.customer)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u041F\u0412\u0417"), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, order.pvzAddress)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, order.actualDeliveryDate || "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u0414\u0430\u0442\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430"), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, order.statusDate ? new Date(order.statusDate).toLocaleDateString("ru-RU") : "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u0414\u0430\u0442\u0430 \u0430\u0440\u0445\u0438\u0432\u0430"), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, order.movedToHistoryDate)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u042F\u0447\u0435\u0439\u043A\u0430"), /* @__PURE__ */ React.createElement("div", { className: "text-sm" }, order.cellNumber)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "\u0421\u0442\u0430\u0442\u0443\u0441"), /* @__PURE__ */ React.createElement("div", { className: `inline-block px-2 py-1 rounded-full text-xs font-medium ${order.overallStatus === "\u0412\u044B\u0434\u0430\u043D" ? "bg-green-100 text-green-800" : order.overallStatus === "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u042F\u043D" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}` }, order.overallStatus)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center" }, "\u041E\u0442\u043C\u0435\u0442\u043A\u0438 / \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435", /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-3 h-3 ml-1 text-yellow-500" }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1 mb-2" }, order.hasInquiry && /* @__PURE__ */ React.createElement("span", { className: "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u0417\u0430\u043F\u0440\u043E\u0441"), order.hasClaim && /* @__PURE__ */ React.createElement("span", { className: "bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F"), !order.hasInquiry && !order.hasClaim && /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-400" }, "\u041D\u0435\u0442 \u043E\u0442\u043C\u0435\u0442\u043E\u043A")), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-50 p-2 rounded border space-y-1" }, /* @__PURE__ */ React.createElement("label", { className: "flex items-center text-xs cursor-pointer hover:bg-white rounded px-1 py-1 transition-colors" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: order.hasInquiry || false,
      onChange: (e) => {
        const updatedHistory = orderHistory.map(
          (historyOrder, i) => i === index ? { ...historyOrder, hasInquiry: e.target.checked } : historyOrder
        );
        setOrderHistory(updatedHistory);
      },
      className: "mr-2 rounded text-blue-600 focus:ring-blue-500 focus:ring-1"
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "text-blue-700 font-medium" }, "\u{1F4DE} \u0417\u0430\u043F\u0440\u043E\u0441")), /* @__PURE__ */ React.createElement("label", { className: "flex items-center text-xs cursor-pointer hover:bg-white rounded px-1 py-1 transition-colors" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: order.hasClaim || false,
      onChange: (e) => {
        const updatedHistory = orderHistory.map(
          (historyOrder, i) => i === index ? { ...historyOrder, hasClaim: e.target.checked } : historyOrder
        );
        setOrderHistory(updatedHistory);
      },
      className: "mr-2 rounded text-orange-600 focus:ring-orange-500 focus:ring-1"
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "text-orange-700 font-medium" }, "\u26A0\uFE0F \u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F")))))))), orderHistory.filter((order) => {
    const matchesSearch = !historySearchQuery || order.orderNumber.toLowerCase().includes(historySearchQuery.toLowerCase()) || order.customer.toLowerCase().includes(historySearchQuery.toLowerCase()) || order.pvzAddress.toLowerCase().includes(historySearchQuery.toLowerCase());
    const matchesStatus = historyFilterStatus === "all" || order.overallStatus === historyFilterStatus || historyFilterStatus === "inquiry" && order.hasInquiry || historyFilterStatus === "claim" && order.hasClaim;
    return matchesSearch && matchesStatus;
  }).length === 0 && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement(History, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-lg" }, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043F\u0443\u0441\u0442\u0430"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm" }, "\u0418\u043B\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443")))))))), selectedOrder && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-gray-900" }, "\u0414\u0435\u0442\u0430\u043B\u0438 \u0437\u0430\u043A\u0430\u0437\u0430 #", selectedOrder.orderNumber), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedOrder(null),
      className: "text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-6 h-6" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-700 text-lg border-b pb-2" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0437\u0430\u043A\u0430\u0437\u0435"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041F\u0412\u0417:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.pvzAddress)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.customer)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.store)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u0414\u0430\u0442\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0438:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.purchaseDate)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041E\u0436\u0438\u0434\u0430\u0435\u043C\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.expectedDeliveryDate)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041D\u043E\u043C\u0435\u0440 \u044F\u0447\u0435\u0439\u043A\u0438:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.cellNumber || "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-700 text-lg border-b pb-2" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0442\u043E\u0432\u0430\u0440\u0435"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u0411\u0440\u0435\u043D\u0434:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.brand)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041C\u043E\u0434\u0435\u043B\u044C:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.model)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041B\u0438\u043D\u0435\u0439\u043A\u0430:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.productLine)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041E\u0431\u044A\u0435\u043C \u043F\u0430\u043C\u044F\u0442\u0438:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.memory)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u0426\u0432\u0435\u0442:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.color)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.quantity)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "\u0421\u0443\u043C\u043C\u0430:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedOrder.amount, " \u20BD"))))), /* @__PURE__ */ React.createElement("div", { className: "border-t pt-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, /* @__PURE__ */ React.createElement("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${selectedOrder.deliveryStatus ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}` }, selectedOrder.deliveryStatus ? "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D" : "\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"), /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium" }, selectedOrder.overallStatus), selectedOrder.hasInquiry && /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium" }, "\u0417\u0430\u043F\u0440\u043E\u0441"), selectedOrder.hasClaim && /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium" }, "\u041F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u044F"), selectedOrder.isReturn && /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium" }, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedOrder(null),
      className: "bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
    },
    "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
  )))))));
};
var stdin_default = OrderManagementSystem;
export {
  stdin_default as default
};
