import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [flights, setFlights] = useState([]);
  const [users, setUsers] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      const user = api.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        await loadData();
      }
      setLoading(false);
    };
    initApp();
  }, []);

  const loadData = async () => {
    try {
      const [fetchedTasks, fetchedFlights, fetchedUsers, fetchedNotifs] = await Promise.all([
        api.getTasks(),
        api.getFlights(),
        api.getUsers(),
        api.getNotifications()
      ]);
      setTasks(fetchedTasks);
      setFlights(fetchedFlights);
      setUsers(fetchedUsers);
      setNotifications(fetchedNotifs);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const login = async (username, password) => {
    const user = await api.login(username, password);
    setCurrentUser(user);
    await loadData();
  };

  const quickLogin = async (userId) => {
    const user = await api.quickLogin(userId);
    setCurrentUser(user);
    await loadData();
  };

  const logout = () => {
    api.logout();
    setCurrentUser(null);
    setTasks([]);
    setNotifications([]);
  };

  const addNotification = (title, body) => {
    const newNotif = { id: Date.now(), title, body, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    api.saveNotifications(updated);
  };

  const markAllNotifsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    api.saveNotifications(updated);
  };

  const updateTask = async (updatedTask) => {
    const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    setTasks(newTasks);
    await api.saveTasks(newTasks);
  };

  const addTask = async (newTask) => {
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
    await api.saveTasks(newTasks);
    addNotification('New task assigned', `"${newTask.title}" assigned to ${users[newTask.assignedTo]?.name || 'Crew'}`);
  };

  const deleteTask = async (taskId) => {
    const newTasks = tasks.filter(t => t.id !== taskId);
    setTasks(newTasks);
    await api.saveTasks(newTasks);
  };

  return (
    <AppContext.Provider value={{
      currentUser, login, quickLogin, logout,
      tasks, updateTask, addTask, deleteTask,
      flights, users,
      notifications, addNotification, markAllNotifsRead,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
