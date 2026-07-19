import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";
import Register from "../pages/Register/Register";
import Eligibility from "../pages/Eligibility/Eligibility";
import Results from "../pages/Results/Results";
import History from "../pages/History/History";
import Profile from "../pages/Profile/Profile";
import AdminRoute from "../components/AdminRoute";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageSchemes from "../pages/Admin/ManageSchemes";
import AddScheme from "../pages/Admin/AddScheme";
import EditScheme from "../pages/Admin/EditScheme";
import AdminHistory from "../pages/Admin/AdminHistory";
import HistoryDetails from "../pages/Admin/HistoryDetails";
import Reports from "../pages/Admin/Reports";
import HistoryDet from '../pages/History/HistoryDet'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/admin"
        element={
        <AdminRoute>
          <Admin/>
        </AdminRoute>
      }
      />
      <Route
      path="/admin/users"
      element={
      <AdminRoute>
        <ManageUsers />
      </AdminRoute>
      }
      />
      <Route
        path="/admin/schemes"
        element={
          <AdminRoute>
            <ManageSchemes />
          </AdminRoute>
        }
      />

        <Route
          path="/admin/add-scheme"
          element={
            <AdminRoute>
              <AddScheme />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-scheme/:id"
          element={
            <AdminRoute>
              <EditScheme />
            </AdminRoute>
          }
        />
        <Route
        path="/admin/history"
        element={
          <AdminRoute>
            <AdminHistory />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/history/:id"
        element={
          <AdminRoute>
            <HistoryDetails />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <Reports />
          </AdminRoute>
        }
      />
      <Route path="/eligibility" element={<Eligibility />} />
      <Route path="/results" element={<Results />}/>
      <Route path="/history" element={<History />} />
      <Route
        path="/history/:id"
        element={<HistoryDet />}
      />
      <Route path="/profile" element={<Profile />} />
      
    </Routes>
  );
};

export default AppRoutes;