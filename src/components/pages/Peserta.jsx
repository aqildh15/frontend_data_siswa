import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";

export default function Peserta() {
  const [peserta, setPeserta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nama_siswa, setNamaSiswa] = useState("");
  const [alamat_siswa, setAlamatSiswa] = useState("");
  const [tanggal_siswa, setTanggalSiswa] = useState("");
  const [jurusan_siswa, setJurusanSiswa] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/peserta")
      .then((response) => {
        setPeserta(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gagal menampilkan data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/peserta", {
        nama_siswa: nama_siswa,
        alamat_siswa: alamat_siswa,
        tanggal_siswa: tanggal_siswa,
        jurusan_siswa: jurusan_siswa,
      })
      .then((response) => {
        setNamaSiswa("");
        setAlamatSiswa("");
        setTanggalSiswa("");
        setJurusanSiswa("");
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gagal menyimpan data:", error);
      })
      .finally(() => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.hide();
        document.body.classList.remove("modal-open");
        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((bd) => bd.remove());
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin akan menghapus data ini?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/api/peserta/${id}`)
      .then((response) => {
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container d-grid gap-0 row-gap-3 border border-success p-2 mb-2 border-opacity-75 rounded-3">
        <h1 className="mb-3 mt-3 text-center">Data Siswa</h1>
        <div className="card-body">
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary container"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Tambah Siswa
          </button>
          <hr />
          <table className="table table-striped text-center">
            <thead className="table-info">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Kode Siswa</th>
                <th scope="col">Nama</th>
                <th scope="col">Alamat</th>
                <th scope="col">Tanggal Lahir</th>
                <th scope="col">Jurusan</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>

            <tbody className="table-group-divider">
              {peserta.map((peserta, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{peserta.kode_siswa}</td>
                  <td>{peserta.nama_siswa}</td>
                  <td>{peserta.alamat_siswa}</td>
                  <td>
                    {new Date(peserta.tanggal_siswa).toLocaleDateString(
                      "id-ID",
                      { day: "2-digit", month: "2-digit", year: "numeric" }
                    )}
                  </td>
                  <td>{peserta.jurusan_siswa}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(peserta.kode_siswa)}
                      className="btn btn-warning me-2"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => handleDelete(peserta.kode_siswa)}
                      className="btn btn-danger"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-name fs-5" id="exampleModalLabel">
                Tambah Siswa
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="name"
                    value={nama_siswa}
                    onChange={(e) => setNamaSiswa(e.target.value)}
                  />
                  <label htmlFor="floatingName">Nama</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingAddress"
                    placeholder="Address"
                    value={alamat_siswa}
                    onChange={(e) => setAlamatSiswa(e.target.value)}
                  />
                  <label htmlFor="floatingCategory">Alamat</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="floatingDate"
                    placeholder="Date"
                    value={tanggal_siswa}
                    onChange={(e) => setTanggalSiswa(e.target.value)}
                  />
                  <label htmlFor="floatingPrice">Tanggal Lahir</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingStudy"
                    placeholder="Study"
                    value={jurusan_siswa}
                    onChange={(e) => setJurusanSiswa(e.target.value)}
                  />
                  <label htmlFor="floatingStock">Jurusan</label>
                </div>

                <button className="btn btn-primary container">Simpan</button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
