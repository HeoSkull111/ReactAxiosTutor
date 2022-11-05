import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Component } from 'react';
const api = axios.create({
  baseURL: 'http://localhost:4000/api/get/nhanvien'
})

class App extends Component {
  state = {
    NhanVien: []
  }
  constructor() {
    super();
    this.getNhanVien();
  }

  getNhanVien = async () => {
    try {
      // let data = await api.get('/').then(({ data }) => data);
      let data = await axios({
        method: 'get',
        url: 'http://localhost:4000/api/get/nhanvien',
      }).then(({ data }) => data);
      this.setState({ NhanVien: data });
    } catch (err) {
      console.log(err);
    }
  }

  createNhanVien = async () => {
    let res = await api.post('/', { "HoTen": "test4", "ChucVu": "test4", "DiaChi": "test4", "Tuoi": 4 })
      .catch(err => console.log(err));
    console.log(res);
    this.getNhanVien();
  }

  DeleteNhanVien = async (id) => {
    let data = await api.delete(`/${id}`);
    this.getNhanVien();
  }

  UpdateNhanVien = async (id, val) => {
    let data = await api.patch(`/${id}`, { "HoTen": val })
    this.getNhanVien();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <button onClick={this.createNhanVien} class="button">Thêm Nhân Viên</button> */}
          {this.state.NhanVien.map(NhanVien =>
            <h2><span>id:</span> {NhanVien.id} - <span>Họ và tên:</span> {NhanVien.HoTen} - <span>Chức vụ:</span> {NhanVien.ChucVu} - <span>Địa chỉ:</span> {NhanVien.DiaChi} - <span>Tuổi:</span> {NhanVien.Tuoi}
              {/* <button onClick={() => this.UpdateNhanVien(NhanVien.id, `${NhanVien.HoTen}1`)} class="button">Update</button>
              <button onClick={() => this.DeleteNhanVien(NhanVien.id)} class="button">Delete</button> */}
            </h2>)}
        </header>
      </div>
    );
  }
}


export default App;
