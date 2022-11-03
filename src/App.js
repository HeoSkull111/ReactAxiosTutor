import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Component } from 'react';
const api = axios.create({
  baseURL: 'http://localhost:3004/data'
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
        url: 'http://localhost:3004/data',
      }).then(({ data }) => data);
      this.setState({ NhanVien: data });
    } catch (err) {
      console.log(err);
    }
  }

  createNhanVien = async () => {
    let res = await api.post('/', { "HoTen": "test4", "ChucVu": "test4", "DiaChi": "test4" })
    .catch(err => console.log(err));
    console.log(res);
    this.getNhanVien();
  }

  DeleteNhanVien = async (id) => {
    let data = await api.delete(`/${id}`);
    this.getNhanVien();
  }

  UpdateNhanVien = async(id, val) => {
    let data = await api.patch(`/${id}`, { "HoTen": val })
    this.getNhanVien();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.createNhanVien}>createNhanVien</button>
          {this.state.NhanVien.map(NhanVien =>
            <h2 key={NhanVien.id}>{NhanVien.HoTen}
            <button onClick={() => this.UpdateNhanVien(NhanVien.id, `${NhanVien.HoTen}1`)} class="button">Update</button>
              <button onClick={() => this.DeleteNhanVien(NhanVien.id)} class="button">x</button>
            </h2>)}

          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}


export default App;
