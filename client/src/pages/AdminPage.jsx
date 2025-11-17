import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminPage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    personId: "",
    birthYear: "",
    mobileNo: "",
    status: "تحت الاجراء",
    travelStatus: 0,
    returnReason: "",
    categoryId: "1",
    internalStatusCode: 1
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loadPatients = async () => {
    try {
      const { data } = await api.get("/api/patients");
      setPatients(data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPatientId) {
      await api.put(`/api/patients/${editingPatientId}`, form);
      setEditingPatientId(null);
    } else {
      await api.post("/api/patients", form);
    }
    setForm({
      fullName: "",
      personId: "",
      birthYear: "",
      mobileNo: "",
      status: "تحت الاجراء",
      travelStatus: 0,
      returnReason: "",
      categoryId: "1",
      internalStatusCode: 1
    });
    loadPatients();
  };

  const handleEdit = (patient) => {
    setForm({
      fullName: patient.fullName,
      personId: patient.personId,
      birthYear: patient.birthYear,
      mobileNo: patient.mobileNo,
      status: patient.status,
      travelStatus: patient.travelStatus,
      returnReason: patient.returnReason || "",
      categoryId: patient.categoryId,
      internalStatusCode: patient.internalStatusCode
    });
    setEditingPatientId(patient._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المريض؟")) {
      await api.delete(`/api/patients/${id}`);
      loadPatients();
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedPatients = useMemo(() => {
    if (!sortColumn) return patients;
    return [...patients].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
  }, [patients, sortColumn, sortDirection]);

  return (
    <div className="card shadow-sm border-0 w-100 mb-10">
      <div className="card-body py-10">
        <div className="d-flex justify-content-between align-items-center mb-8">
          <h2 className="text-primary fw-bold mb-0">
            لوحة التحكم - إدارة المرضى
          </h2>
          <button onClick={handleLogout} className="btn btn-outline-danger">
            تسجيل الخروج
          </button>
        </div>

        {/* Form */}
        <form className="row g-4 mb-10" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label className="form-label">اسم المريض</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">رقم الهوية</label>
            <input
              type="text"
              name="personId"
              className="form-control"
              value={form.personId}
              maxLength={9}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "personId",
                    value: e.target.value.replace(/\D/g, "")
                  }
                })
              }
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">سنة الميلاد</label>
            <input
              type="text"
              name="birthYear"
              className="form-control"
              value={form.birthYear}
              maxLength={4}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "birthYear",
                    value: e.target.value.replace(/\D/g, "")
                  }
                })
              }
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">رقم الجوال</label>
            <input
              type="text"
              name="mobileNo"
              className="form-control"
              value={form.mobileNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">الحالة</label>
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              <option value="تحت الاجراء">تحت الاجراء</option>
              <option value="معتمد">معتمد</option>
              <option value="متابعة محلية">متابعة محلية</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Travel Status</label>
            <input
              type="number"
              name="travelStatus"
              className="form-control"
              value={form.travelStatus}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">سبب الإرجاع (إن وجد)</label>
            <input
              type="text"
              name="returnReason"
              className="form-control"
              value={form.returnReason}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Category ID</label>
            <input
              type="text"
              name="categoryId"
              className="form-control"
              value={form.categoryId}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Status Code</label>
            <input
              type="number"
              name="internalStatusCode"
              className="form-control"
              value={form.internalStatusCode}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-primary px-10">
              {editingPatientId ? "تحديث المريض" : "حفظ المريض"}
            </button>
            {editingPatientId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingPatientId(null);
                  setForm({
                    fullName: "",
                    personId: "",
                    birthYear: "",
                    mobileNo: "",
                    status: "تحت الاجراء",
                    travelStatus: 0,
                    returnReason: "",
                    categoryId: "1",
                    internalStatusCode: 1
                  });
                }}
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-row-dashed table-striped align-middle">
            <thead>
              <tr>
                <th>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleSort('fullName')}>
                    الاسم {sortColumn === 'fullName' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleSort('personId')}>
                    رقم الهوية {sortColumn === 'personId' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleSort('birthYear')}>
                    سنة الميلاد {sortColumn === 'birthYear' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleSort('mobileNo')}>
                    الجوال {sortColumn === 'mobileNo' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleSort('status')}>
                    الحالة {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleSort('travelStatus')}>
                    Travel {sortColumn === 'travelStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => handleSort('categoryId')}>
                    Category {sortColumn === 'categoryId' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients.map((p) => (
                <tr key={p._id}>
                  <td>{p.fullName}</td>
                  <td>{p.personId}</td>
                  <td>{p.birthYear}</td>
                  <td>{p.mobileNo}</td>
                  <td>{p.status}</td>
                  <td>{p.travelStatus}</td>
                  <td>{p.categoryId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(p)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p._id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    لا يوجد بيانات بعد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
