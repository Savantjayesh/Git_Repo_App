import React, { useState, useEffect } from 'react';

const GitHubRepositories = () => {
  const [username, setUsername] = useState('');
  const [perPage, setPerPage] = useState('10');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRepositories = () => {
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}`;

    setLoading(true);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }
        return response.json();
      })
      .then(repositories => {
        setLoading(false);

        displayProfile(username);

        if (Array.isArray(repositories)) {
          setRepositories(repositories);

          displayPagination(repositories.length, perPage);
        } else {
          setRepositories([]);
        }
      })
      .catch(error => {
        setLoading(false);

        setRepositories([]);
        console.error('Error fetching repositories:', error);
      });
  };

  useEffect(() => {
    if (username) {
      getRepositories();
    }
  }, [username, perPage]);

 const displayRepositories = () => {
  if (repositories.length === 0) {
    return <p>No repositories found.</p>;
  }

  const userProfile = repositories[0];

  return (
    <div className="container">
      <div className="text-center mt-4" style={{ padding: '50px' }}>
        <img
          src={userProfile.owner.avatar_url}
          alt={`${userProfile.owner.login}'s Avatar`}
          className="rounded-circle" // Apply the 'rounded-circle' class
          style={{ width: '100px', height: '100px', borderRadius: '50%' }} // Set borderRadius to create a circular shape
        />
        <h4 className="mt-3">{userProfile.owner.login}</h4>
        <p className="text-muted">
          <a href={userProfile.owner.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
        </p>
      </div>
  
      <div className="row mt-5">
        {repositories.map(repo => (
          <div key={repo.id} className="col-md-6">
            <div className="card mb-4 px-3" style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <div className="card-body">
                <h5 className="card-title">{repo.name}</h5>
                <p className="card-text">{repo.description || 'No description available'}</p>
  
                {repo.language && (
                  <p>
                    <strong>Language:</strong> <span className="btn btn-primary" style={{ border: '1px solid black',padding:'5px', borderRadius: '5px'}}>{repo.language}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


  const displayProfile = (username) => {
    
  };

  const displayPagination = (totalRepositories, perPage) => {
    
  };

  return (
    <div className="container">
      <style>
        {`
          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            margin: 10px;
            padding: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .card-title {
            font-size: 1.2em;
            margin-bottom: 10px;
          }

          .card-text {
            color: #555;
          }

          .btn-primary {
            background-color: #007bff;
            color: #fff;
          }

          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="container">
        <h1 style={{ margin:'30px',padding:'10px', textAlign:"center"}}>GitHub Repositories</h1>

        <div className="form-group"style={{marginLeft:'30px'}}>
          <label htmlFor="perPage">Repositories Per Page:</label>
          <select className="form-control" id="perPage" value={perPage} onChange={e => setPerPage(e.target.value)}style={{ margin:'10px',padding:'10px'}}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="form-group " style={{marginLeft:'30px'}}>
          <label htmlFor="username">GitHub Username:</label>
          <input type="text" className="form-control" id="username" placeholder="Enter GitHub username" value={username} onChange={e => setUsername(e.target.value)}style={{ margin:'10px',padding:'10px'}} />
        </div>

        <button className="btn btn-primary pd-100px " onClick={getRepositories}style={{ marginLeft:'30px',padding:'10px'}}>
          Get Repositories
        </button>

        <div id="repositories" className="mt-4">
          {loading ? <div className="loader"></div> : displayRepositories()}
        </div>
      </div>
    </div>
  );
};

export default GitHubRepositories;
