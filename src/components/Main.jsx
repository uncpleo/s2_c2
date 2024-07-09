"use client";
import React, { useState, useEffect } from 'react';
import '../styles/main.css';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error(`Fallo del fetch data: ${res.status}`);
  }
  const data = await res.json();
  return data
}

export default function Home() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: '', body: '' });
  const [isEditing, setIsEditing] = useState(false); // Para cambiar el botón
  const [editId, setEditId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    (async () => {
      const initialData = await getData();
      setData(initialData);
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    if (form.title && form.body) {
      setData([...data, { id: Date.now(), title: form.title, body: form.body }]);
      setForm({ title: '', body: '' });
    }
  };

  const handleEdit = (id) => {
    const item = data.find((d) => d.id === id);
    setForm({ title: item.title, body: item.body });
    setIsEditing(true);
    setEditId(id);
  };

  const handleUpdate = () => {
    setData(
      data.map((item) =>
        item.id === editId ? { ...item, title: form.title, body: form.body } : item
      )
    );
    setForm({ title: '', body: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <main className='container-main'>
      <div className='div-container'>
        <h4 className='main-title'>List CRUD</h4>
        <div className='set-input'>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name='title'
            id='title'
            className='form-input1'
            placeholder='Título'
            value={form.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='set-input'>
          <label htmlFor="body">Cuerpo:</label>
          <input
            type="text"
            name='body'
            id='body'
            className='form-input1'
            placeholder='Cuerpo'
            value={form.body}
            onChange={handleInputChange}
          />
        </div>
        {isEditing ? (
          <button className='main-button' onClick={handleUpdate}>Actualizar</button>
        ) : (
          <button className='main-button' onClick={handleAdd}>Agregar</button>
        )}
      </div>
      <div className='div-container'>
        <div>
          <label htmlFor="body">Busqueda por título</label>
          <input
            className='form-input1'
            type="text"
            placeholder='Buscar por título'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {data.length === 0 ? (
          <p>No hay datos disponibles</p>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>Id</th>
                <th onClick={() => handleSort('title')}>Título</th>
                <th>Cuerpo</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(({ id, title, body }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                  <td><button className='main-button1' onClick={() => handleEdit(id)}>Editar</button></td>
                  <td><button className='main-buttone' onClick={() => handleDelete(id)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className='pagination'>
          <button className='main_button1' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
          <span>{currentPage} de {totalPages}</span>
          <button className='main-button1' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </div>
    </main>
  );
}
