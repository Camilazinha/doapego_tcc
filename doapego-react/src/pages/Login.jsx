import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [emailAdmin, setEmailAdmin] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarMe, setLembrarMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
          'http://localhost:8080/auth/admin/login',
          { email: emailAdmin, senha }
      );

      // 2. Se quiser implementar "Lembrar-me" com JWT depois:
      if (lembrarMe) {
        localStorage.setItem('token', response.data.token); // Adapte quando tiver JWT
      }

      // 3. Redireciona se sucesso
      navigate('/inicio');

    } catch (error) {
      // 4. Trata erros
      setError(error.response?.data || 'Erro ao conectar com o servidor');;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container my-5">
        <div className="form-container">
          <h2 className='titulo-pagina-container'>LOGIN</h2>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor='email-admin' className='form-label'>E-mail</label>
              <input
                id='email-admin'
                type="email"
                className='form-control'
                placeholder="Insira seu e-mail"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor='senha-admin' className='form-label'>Senha</label>
              <input
                id='senha-admin'
                type="password"
                className='form-control'
                placeholder="Insira sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className='form-group form-check'>
              <input 
                className="form-check-input" 
                type="checkbox" 
                id='remember-me' 
                checked={lembrarMe}
                onChange={(e) => setLembrarMe(e.target.checked)}
                disabled={loading}
              />
              <div className="d-flex justify-content-between">
                <label className='form-check-label' htmlFor='remember-me'>Lembrar-me</label>
                <Link to="/esqueci-minha-senha" className='form-link'>Esqueci minha senha</Link>
              </div>
            </div>

            <div className="form-group">
              <button 
                type="submit" 
                className="btn btn-custom-filled" 
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
            </div>

            <section className="form-group">
              <p>Ainda não cadastrado? <Link to="/solicitar-cadastro" className='form-link'>Solicitar cadastro</Link></p>
            </section>
          </form>
        </div>
      </div>
    </main>
  );
}