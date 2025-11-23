import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-info d-grid gap-0 row-gap-3 mb-3">
      <div className="container-fluid">
        <a className="navbar-brand ms-4" href="#">
          Data Peserta
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-4">
            <Link className="nav-link active" aria-current="page" to="/">
              Siswa
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
