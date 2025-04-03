import axios from 'axios';

const API = 'http://44.205.22.49:8080/api'; 

export const EstatisticasService = {
  async getEgressosAprovados() {
    const response = await axios.get(`${API}/egresso/buscarAprovados`);
    return response.data;
  },
  async getCursos() {
    const response = await axios.get(`${API}/cursos/listarCursos`);
    return response.data;
  },
  async getEgressosPorCurso(id: number) {
    const response = await axios.get(`${API}/cursos/listar_egressos_por_curso/${id}`);
    return response.data;
  },
  async getCargosPorEgresso(id: number) {
    const response = await axios.get(`${API}/cargo/egresso/${id}`);
    return response.data;
  }
};
