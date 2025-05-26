import React, { useState } from "react";
import axios from "axios";

const endpoints = [
  {
    name: "Get All Books",
    method: "GET",
    url: "/books/allBooks",
    body: null,
  },
  {
    name: "Create Book",
    method: "POST",
    url: "/books/newBook",
    body: {
      title: "",
      subtitle: "",
      author: "",
      publishedDate: "",
      publisher: "",
      description: "",
      website: "",
    },
  },
  {
    name: "Get Book By ID",
    method: "GET",
    url: "/books/{id}",
    body: null,
  },
  {
    name: "Update Book",
    method: "PUT",
    url: "/books/updatebook/{id}",
    body: {
      title: "",
      subtitle: "",
      author: "",
      publishedDate: "",
      publisher: "",
      description: "",
      website: "",
    },
  },
  {
    name: "Delete Book",
    method: "DELETE",
    url: "/books/deletebook/{id}",
    body: null,
  },
  {
    name: "Register User",
    method: "POST",
    url: "/user/register",
    body: {
      userName: "",
      password: "",
    },
  },
  {
    name: "Login User",
    method: "POST",
    url: "/user/login",
    body: {
      userName: "",
      password: "",
    },
  },
  {
    name: "Place Order",
    method: "POST",
    url: "/order/placeorder",
    body: {
      userId: "",
      bookId: "",
    },
  },
  {
    name: "Get All Orders",
    method: "GET",
    url: "/order/getorders",
    body: null,
  },
];

const API_BASE = "http://localhost:3000";

function App() {
  const [selected, setSelected] = useState(endpoints[0]);
  const [form, setForm] = useState({});
  const [param, setParam] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (ep) => {
    setSelected(ep);
    setForm(ep.body ? { ...ep.body } : {});
    setParam("");
    setResponse(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = API_BASE + selected.url;
    
    if (url.includes("{id}")) {
      if (!param) {
        setResponse({ error: "Please enter an ID" });
        setLoading(false);
        return;
      }
      url = url.replace("{id}", param);
    }

    try {
      const config = {
        method: selected.method.toLowerCase(),
        url,
      };

      if (selected.method !== "GET" && selected.method !== "DELETE") {
        config.data = form;
      }

      const res = await axios(config);
      setResponse(res.data);
    } catch (err) {
      setResponse(err.response?.data || { error: "Error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  // Group endpoints by category
  const endpointCategories = {
    'Books': endpoints.filter(ep => ep.url.startsWith('/books')),
    'Users': endpoints.filter(ep => ep.url.startsWith('/user')),
    'Orders': endpoints.filter(ep => ep.url.startsWith('/order'))
  };
  
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Book Store API</h1>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Sidebar */}
        <div style={{ width: '350px', flexShrink: 0 }}>
          {Object.entries(endpointCategories).map(([category, endpoints]) => (
            <div key={category} style={{ marginBottom: '15px' }}>
              <div 
                onClick={() => toggleCategory(category)}
                style={{
                  padding: '12px 15px',
                  background: expandedCategory === category ? '#e6f7ff' : '#f8f9fa',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: expandedCategory === category ? '#91d5ff' : '#f0f0f0',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  ':hover': {
                    borderColor: '#91d5ff',
                    background: '#e6f7ff'
                  }
                }}
              >
                <div style={{ 
                  fontWeight: '600',
                  color: expandedCategory === category ? '#1890ff' : '#333',
                  fontSize: '1.1em'
                }}>
                  {category}
                </div>
                <div style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: expandedCategory === category ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}>
                  ▼
                </div>
              </div>
              
              {expandedCategory === category && (
                <div style={{ 
                  padding: '10px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  background: 'white'
                }}>
                  {endpoints.map((ep, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelect(ep)}
                      style={{
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        background: selected === ep ? '#f0f8ff' : 'transparent',
                        border: '1px solid',
                        borderColor: selected === ep ? '#91d5ff' : '#f0f0f0',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        ':hover': {
                          borderColor: '#69c0ff',
                          background: '#f0f8ff'
                        }
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px'
                      }}>
                        <span style={{ 
                          fontWeight: '500',
                          fontSize: '0.9em',
                          color: selected === ep ? '#1890ff' : '#333'
                        }}>
                          {ep.name}
                        </span>
                        <span style={{
                          padding: '2px 6px',
                          background: ep.method === 'GET' ? '#e6f7ff' : 
                                      ep.method === 'POST' ? '#e6ffed' :
                                      ep.method === 'PUT' ? '#fff7e6' :
                                      ep.method === 'DELETE' ? '#fff1f0' : '#f5f5f5',
                          color: ep.method === 'GET' ? '#1890ff' :
                                 ep.method === 'POST' ? '#52c41a' :
                                 ep.method === 'PUT' ? '#fa8c16' :
                                 ep.method === 'DELETE' ? '#f5222d' : '#333',
                          borderRadius: '4px',
                          fontSize: '0.7em',
                          fontWeight: 'bold',
                          minWidth: '50px',
                          textAlign: 'center'
                        }}>
                          {ep.method}
                        </span>
                      </div>
                      <div style={{ 
                        fontSize: '0.75em', 
                        color: selected === ep ? '#666' : '#888',
                        wordBreak: 'break-word',
                        fontFamily: 'monospace',
                        paddingTop: '4px',
                        marginTop: '4px',
                        borderTop: '1px dashed #eee'
                      }}>
                        {ep.url}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ 
          flex: 1, 
          background: 'white',
          borderRadius: '8px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          {selected && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>
                <span style={{
                  display: 'inline-block',
                  background: selected.method === 'GET' ? '#61affe' : 
                              selected.method === 'POST' ? '#49cc90' :
                              selected.method === 'PUT' ? '#fca130' :
                              selected.method === 'DELETE' ? '#f93e3e' : '#61affe',
                  color: 'white',
                  padding: '3px 10px',
                  borderRadius: '3px',
                  marginRight: '10px',
                  fontSize: '0.9em'
                }}>
                  {selected.method}
                </span>
                {selected.url}
              </h2>
              
              <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                {selected.url.includes("{id}") && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Book ID:</div>
                    <input
                      type="text"
                      value={param}
                      onChange={(e) => setParam(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                      placeholder="Enter book ID"
                    />
                  </div>
                )}
                
                {selected.body && Object.entries(selected.body).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '15px' }}>
                    <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </div>
                    <input
                      type={key.toLowerCase().includes('password') ? 'password' : 'text'}
                      name={key}
                      value={form[key] || ''}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                      placeholder={`Enter ${key}`}
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </button>
              </form>
              
              {response && (
                <div style={{ marginTop: '20px' }}>
                  <h3>Response:</h3>
                  <pre style={{
                    background: '#f5f5f5',
                    padding: '15px',
                    borderRadius: '4px',
                    maxHeight: '400px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}>
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;