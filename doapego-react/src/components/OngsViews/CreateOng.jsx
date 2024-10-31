// // src/components/CreateOng.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/views.css';
// import '../../styles/layout.css';

// const CreateOng = () => {
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [telefone, setTelefone] = useState('');
//   const [fundacao, setFundacao] = useState('');
//   const [descricao, setDescricao] = useState('');
//   const [whatsapp, setWhatsapp] = useState('');
//   const [ativo, setAtivo] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8080/ongs', {
//         nome,
//         email,
//         senha,
//         telefone,
//         fundacao,
//         descricao,
//         whatsapp,
//         ativo
//       });
//       alert('ONG criada com sucesso!');
//       navigate('/ongs');
//     } catch (err) {
//       console.error('Erro ao criar ONG:', err);
//       alert('Erro ao criar ONG. Tente novamente!');
//     }
//   };

//   return (
//     <div className="borda-view container-fluid my-5 p-4">
//       <p className='h2'>Criar nova ONG</p>
//       <hr />

//       <form onSubmit={handleSubmit}>
        
//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Nome:</label>
//           <input 
//             type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
//         </div>

//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Email:</label>
//           <input 
//             type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>

//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Senha:</label>
//           <input 
//             type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
//         </div>

//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Telefone:</label>
//           <input 
//             type="text" className="form-control" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
//         </div>

//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Data de Fundação:</label>
//           <input 
//             type="date" className="form-control" value={fundacao} onChange={(e) => setFundacao(e.target.value)} />
//         </div>

//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Descrição:</label>
//           <textarea 
//             className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="3" />
//         </div>

//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Whatsapp:</label>
//           <input 
//             type="text" className="form-control" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
//         </div>

//         <div className="form-group col-10 col-md-11 mb-2">
//           <label>Ativo:</label>
//           <select className="form-control" value={ativo} onChange={(e) => setAtivo(e.target.value === 'true')} required>
//             <option value="true">Sim</option>
//             <option value="false">Não</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <button type="submit" className="btn btn-add mt-3">Criar</button>
//           <button className="btn btn-voltar mt-3" onClick={() => navigate('/ongs')}>Voltar</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateOng;
