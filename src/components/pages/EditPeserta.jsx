import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditPeserta() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [nama_siswa, setNamaSiswa] = useState("");
  const [alamat_siswa, setAlamatSiswa] = useState("");
  const [tanggal_siswa, setTanggalSiswa] = useState("");
  const [jurusan_siswa, setJurusanSiswa] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataById();
  }, []);

  const fetchDataById = () => {
    axios
      .get(`http://localhost:3000/api/peserta/${id}`)
      .then((response) => {
        console.log(response.data);
        const myData = response.data;
        setNamaSiswa(myData["nama_siswa"]);
        setAlamatSiswa(myData["alamat_siswa"]);
        setTanggalSiswa(myData["tanggal_siswa"]);
        setJurusanSiswa(myData["jurusan_siswa"]);
      })
      .catch((error) => {
        console.error("Gagal menampilkan data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/peserta/${id}`, {
        nama_siswa: nama_siswa,
        alamat_siswa: alamat_siswa,
        tanggal_siswa: tanggal_siswa,
        jurusan_siswa: jurusan_siswa,
      })
      .then((response) => {
        console.log(response);
        var message = response.data.message;
        if (message) {
          alert("Data berhasil diupdate");
        }
        navigate("/");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <h2 className="mb-3 mt-3 text-center">Ubah Peserta</h2>
        <div className="modal-body container">
          <form onSubmit={handleUpdate}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="nama_siswa"
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
                placeholder="alamat_siswa"
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
                placeholder="tanggal_siswa"
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
                placeholder="jurusan_siswa"
                value={jurusan_siswa}
                onChange={(e) => setJurusanSiswa(e.target.value)}
              />
              <label htmlFor="floatingStudy">Jurusan</label>
            </div>

            <button className="btn btn-primary container mb-2">Simpan</button>

            <Link className="btn btn-secondary text-light container" to="/">
              Kembali
            </Link>

          </form>
        </div>
      </div>
    </>
  );
}
